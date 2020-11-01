
import React from 'react';
import { ImageStyle, ViewStyle, TouchableOpacity } from 'react-native';
import { SvgXml } from 'react-native-svg';

interface HeartIconProps {
  type?: "full" | "normal";
  style?: ViewStyle | ImageStyle;
  size?: any | number;
  color?: string;
  onPress?: () => void;
};

export default function HeartIcon({ type = "normal", style, size, color, onPress }: HeartIconProps) {
  if (!color) {
    color = "#181818"
  }
  const heart = `<svg width="24" height="21" viewBox="0 0 24 21" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M11.9996 19.054C-8 7.99991 5.99999 -4.00009 11.9996 3.58797C18 -4.00009 32 7.99991 11.9996 19.054Z" stroke="`+ color + `" stroke-width="1.8"/>
  </svg>`;
  const heart_full = `<svg width="24" height="21" viewBox="0 0 24 21" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M11.9996 19.054C-8 7.99991 5.99999 -4.00009 11.9996 3.58797C18 -4.00009 32 7.99991 11.9996 19.054Z" fill="`+ color + `" stroke="` + color + `" stroke-width="1.8"/>
  </svg>`
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <SvgXml xml={type == "normal" ? heart : heart_full} width={size} height={size} />
    </TouchableOpacity>
  );
}