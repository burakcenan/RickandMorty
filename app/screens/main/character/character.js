import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import {Wrapper} from '../../../components';
import {COLORS, formatDate, height, width} from '../../../constants';
import axios from 'axios';
const styles = StyleSheet.create({
  infoWr: {
    alignItems: 'center',
    backgroundColor: COLORS.GRAY,
    width: width * 0.9,
    height: height * 0.8,
    borderRadius: 20,
    padding: 15,
    justifyContent: 'space-between',
  },
  characterNameText: {
    color: COLORS.WHITE,
    fontSize: 22,
    fontWeight: 'bold',
  },
  characterExpText: {
    color: COLORS.WHITE,
    fontSize: 18,
  },
  image: {width: width * 0.5, height: width * 0.5, borderRadius: width * 0.25},
  wr: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});

export const CharacterScreen = props => {
  const [character, setCharacter] = useState({});
  const [info, setInfo] = useState(false);
  const [loading, setLoading] = useState(false);

  const url = props.route?.params?.url;
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    console.log(url);
    axios
      .get(url)
      .then(res => {
        setCharacter(res.data);
        console.log(res.data);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <Wrapper
      isBack
      headerText={character?.name}
      navigation={props.navigation}
      loading={loading}>
      <View style={styles.wr}>
        <View style={styles.infoWr}>
          <Image source={{uri: character?.image}} style={styles.image} />
          <Text style={styles.characterNameText}>{character?.name}</Text>
          <Text style={styles.characterExpText}>{character?.gender}</Text>
          <Text style={styles.characterExpText}>{character?.species}</Text>
          <Text style={styles.characterExpText}>{character?.status}</Text>
          <Text style={styles.characterExpText}>
            {'Created ' + formatDate(character?.created)}
          </Text>
          <Text style={styles.characterExpText}>
            {'Played in ' + character?.episode?.length + ' episodes'}
          </Text>
        </View>
      </View>
    </Wrapper>
  );
};
