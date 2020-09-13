import React from 'react'
import { StyleSheet } from 'react-native'
import TouchableScale from '@jonny/touchable-scale';

import BaseText from './StyledText';
import Colors from '../constants/Colors';

const BaseButton = ({ title, onPress }) => {
  //const onPress = React.useCallback(() => console.log('pressed'), []);
  return <TouchableScale onPress={onPress} style={[styles.button, { backgroundColor: Colors.light.arancioDes }]}>
    <BaseText color={Colors.light.nero} size={13} weight={400} styles={styles.buttonText} textAlign="center">{title}</BaseText>
  </TouchableScale>;
}

export default BaseButton

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    height: 35,
  },
  buttonText: {
    textTransform: 'uppercase'
  }
})
