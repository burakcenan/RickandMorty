import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import {BottomBar, Wrapper} from '../../../components';
import {apiUrl, COLORS, formatDate, height, width} from '../../../constants';
import axios from 'axios';
const styles = StyleSheet.create({
  characterItem: {
    backgroundColor: COLORS.GRAY,
    marginVertical: 10,
    marginHorizontal: 15,
    height: height * 0.07,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  characterNameText: {
    flex: 1,
    textAlign: 'center',
    color: COLORS.WHITE,
  },
  header: {
    backgroundColor: COLORS.GRAY,
    marginVertical: 10,
    marginHorizontal: 15,
    height: height * 0.07,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.WHITE,
  },
});

export const EpisodeScreen = props => {
  const [characters, setCharacters] = useState(false);
  const [loading, setLoading] = useState(false);

  const episode = props.route?.params?.episode;
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    console.log(apiUrl + 'episode/' + episode.id);
    axios
      .get(apiUrl + 'episode/' + episode.id)
      .then(res => {
        setCharacters(res.data.characters);

        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  };

  const renderEpisodes = ({item}) => (
    <TouchableOpacity
      style={styles.characterItem}
      onPress={() => {
        props.navigation.navigate('Character', {url: item});
      }}>
      <Text style={styles.characterNameText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <Wrapper
      isBack
      headerText={episode?.name + ' (' + episode?.episode + ')'}
      navigation={props.navigation}
      loading={false}>
      <FlatList
        data={characters}
        renderItem={renderEpisodes}
        refreshing={loading}
        onRefresh={() => {
          getData();
        }}
        showsVerticalScrollIndicator={false}
      />
    </Wrapper>
  );
};
