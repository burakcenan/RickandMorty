import {Icon} from 'native-base';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS, width} from '../constants';

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.GRAY,
    width: width,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {color: COLORS.WHITE, fontSize: 18, fontWeight: 'bold'},
  backIcon: {color: COLORS.WHITE},
  backIconWr: {position: 'absolute', left: 15},
});

export const Header = ({text, navigation, isBack}) => {
  return (
    <View style={styles.header}>
      {isBack && (
        <TouchableOpacity
          style={styles.backIconWr}
          onPress={() => navigation.goBack()}>
          <Icon name="angle-left" type="FontAwesome5" style={styles.backIcon} />
        </TouchableOpacity>
      )}
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};
