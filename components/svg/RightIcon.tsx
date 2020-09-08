
import React from 'react';
import { ImageStyle, ViewStyle } from 'react-native';
import { SvgXml } from 'react-native-svg';

interface RightIconProps {
  style?: ViewStyle | ImageStyle;
  width?: any | number;
  height?: any | number;
  color?: string;
};

export default function RightIcon({ style, width, height }: RightIconProps) {
  const desk = `<svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M13 5H1M13 5L9 1M13 5L9 9" stroke="#DE9182" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
  return <SvgXml style={style} xml={desk} width={width} height={height} />;
}