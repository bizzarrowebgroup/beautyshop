



import React from 'react';
import { ImageStyle, ViewStyle } from 'react-native';
import { SvgXml } from 'react-native-svg';

interface BottomIconProps {
  style?: ViewStyle | ImageStyle;
  size?: number;
  type?: string;
  color?: string;

};

export default function BottomIcon({ style, size, type, color = "#181818" }: BottomIconProps) {
  let icon = "";
  let width = size;
  let height = size;
  const search = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="10" r="7.5" stroke="`+ color + `" stroke-width="1.8"/>
    <path d="M21 21L15.5 15.5" stroke="`+ color + `" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
  const heart = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M11.9996 21.0542C-8 10 5.99999 -1.99997 11.9996 5.58809C18 -1.99997 32 10 11.9996 21.0542Z" stroke="`+ color + `" stroke-width="1.8"/>
  </svg>`;
  const plus = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 3V12M12 21V12M12 12H21M12 12H3" stroke="`+ color + `" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
  const calendar = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M20.5 8H3.5M6 21H18C19.6569 21 21 19.6569 21 18V8C21 6.34315 19.6569 5 18 5H6C4.34315 5 3 6.34315 3 8V18C3 19.6569 4.34315 21 6 21Z" stroke="`+ color + `" stroke-width="1.8" stroke-linecap="round"/>
  <path d="M7.5 5V2.75" stroke="`+ color + `" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M16.5 5V2.75" stroke="`+ color + `" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M8.25 17.5H6.75M8.25 14.5H6.75M8.25 11.5H6.75M12.75 17.5H11.25M12.75 14.5H11.25M12.75 11.5H11.25M17.25 17.5H15.75M17.25 14.5H15.75M17.25 11.5H15.75" stroke="`+ color + `" stroke-width="1.8" stroke-linecap="round"/>
  </svg>`;
  const profile = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="12" cy="6.5" rx="4" ry="4.5" stroke="`+ color + `" stroke-width="1.8"/>
  <path d="M20 19C20 22.5 16 21.5 12 21.5C8 21.5 4 22.5 4 19C4 17 7.58172 14.5 12 14.5C16.4183 14.5 20 17 20 19Z" stroke="`+ color + `" stroke-width="1.8"/>
  </svg>`;
  switch (type) {
    case 'ios-search':
      icon = search;
      break;
    case 'ios-heart-empty':
      icon = heart;
      break;
    case 'ios-add':
      icon = plus;
      break;
    case 'ios-calendar':
      icon = calendar;
      break;
    case 'ios-people':
      icon = profile;
      break;
  }

  return <SvgXml style={style} xml={icon} width={width} height={height} />;
}