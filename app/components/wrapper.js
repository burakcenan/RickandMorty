import React from 'react';
import {StyleSheet, View, ActivityIndicator, SafeAreaView} from 'react-native';
import {COLORS, height, width} from '../constants';

import {Header} from './index';
const styles = StyleSheet.create({
  wr: {
    width: width,
    height: height,
    backgroundColor: COLORS.BLACK,
  },
  icon: {
    color: COLORS.WHITE,
    opacity: 0.8,
    fontSize: 22,
  },

  iconWr: {
    height: 60,
    width: width / 3,
    alignItems: 'center',
    justifyContent: 'center',
  },

  notifText: {color: COLORS.WHITE},
  notifWr: {
    backgroundColor: COLORS.GRAY,
    position: 'absolute',
    bottom: 15,
    right: width * 0.11,
    width: 20,
    height: 20,
    borderRadius: 910,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingWr: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const Wrapper = ({
  navigation,
  children,
  isBack,
  headerText,
  loading,
}) => {
  return (
    <SafeAreaView style={styles.wr}>
      <Header text={headerText} navigation={navigation} isBack={isBack} />
      {loading ? (
        <View style={styles.loadingWr}>
          <ActivityIndicator size="large" color={COLORS.WHITE} />
        </View>
      ) : (
        children
      )}
    </SafeAreaView>
  );
};
