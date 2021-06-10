import React, {useEffect, useState} from 'react';
import {StyleSheet, FlatList, TouchableOpacity, Text} from 'react-native';
import {Wrapper} from '../../../components';
import {apiUrl, COLORS, formatDate, height, width} from '../../../constants';
import axios from 'axios';
const styles = StyleSheet.create({
  episodeItem: {
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
  episodeNameText: {
    color: COLORS.WHITE,
    maxWidth: width * 0.6,
  },
});

export const HomeScreen = props => {
  const [episodes, setEpisodes] = useState(false);
  const [info, setInfo] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    axios
      .get(apiUrl + 'episode/')
      .then(res => {
        setEpisodes(res?.data?.results);
        console.log(res.data);
        setInfo(res?.data?.info);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  };
  const endReached = async () => {
    if (info.next) {
      if (loading) {
        return;
      }
      setLoading(true);
      axios
        .get(info.next)
        .then(res => {
          setEpisodes([...episodes, ...res?.data?.results]);
          setInfo(res?.data?.info);
          setLoading(false);
        })
        .catch(error => {
          console.log(error);
          setLoading(false);
        });
    }
  };
  const renderEpisodes = ({item}) => (
    <TouchableOpacity
      style={styles.episodeItem}
      onPress={() => {
        props.navigation.navigate('Episode', {episode: item});
      }}>
      <Text style={styles.episodeNameText}>
        {item.name + ' (' + item.episode + ')'}
      </Text>
      <Text style={styles.episodeNameText}>{formatDate(item.created)}</Text>
    </TouchableOpacity>
  );
  return (
    <Wrapper
      headerText={'Anasayfa'}
      navigation={props.navigation}
      loading={false}>
      <FlatList
        data={episodes}
        renderItem={renderEpisodes}
        refreshing={loading}
        onRefresh={() => {
          getData();
        }}
        onEndReached={({distanceFromEnd}) => {
          if (distanceFromEnd != 0) {
            endReached();
          }
        }}
        onEndReachedThreshold={0.5}
        showsVerticalScrollIndicator={false}
      />
    </Wrapper>
  );
};
