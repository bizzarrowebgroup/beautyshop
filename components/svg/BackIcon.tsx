
import React from 'react';
import { ImageStyle, ViewStyle, TouchableOpacity } from 'react-native';
import { SvgXml } from 'react-native-svg';

interface BackIconProps {
  style?: ViewStyle | ImageStyle;
  width?: any | number;
  height?: any | number;
  color?: string;
  onPress?: () => void;
};

export default function BackIcon({ style, width, height, color, onPress }: BackIconProps) {
  if (!color) {
    color = "#181818"
  }
  const desk = `<svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.5 10.5L1 6M1 6L5.5 1.5M1 6L17 6" stroke="`+ color + `" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
  </svg>`;
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <SvgXml xml={desk} width={width} height={height} />
    </TouchableOpacity>
  );
}