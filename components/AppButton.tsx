import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';
import BaseText from './StyledText';

export default function AppButton({ height, style, title, onPress, color = Colors.light.grigio, textColor = Colors.light.nero, hasBorder }) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        style,
        {
          height: height ? height : 35,
          backgroundColor: color,
          borderWidth: hasBorder ? 1 : 0,
          borderColor: hasBorder ? textColor : "none",
        }]}
      onPress={onPress}>
      <BaseText color={textColor} size={13} weight={400} textAlign="center">{`${title ? title : ""}`}</BaseText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  }
});