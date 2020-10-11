import React from 'react';
import { ImageStyle, StyleSheetProperties, ViewStyle } from 'react-native';
import { SvgXml } from 'react-native-svg';

interface DeskProps {
  style?: ViewStyle | ImageStyle;
  width?: string | number;
  height?: string | number;
  color?: string;
};

export default function Desk({ style, width, height, color }: DeskProps) {
  const desk = `<svg width="210" height="243" viewBox="0 0 210 243" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <rect y="-15" width="262" height="258" fill="url(#pattern0)"/>
    <defs>
    <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
    <use xlink:href="#image0" transform="translate(-0.0883512) scale(0.000888748)"/>
    </pattern>
    <image id="image0" width="1324" height="1108" xlink:href="data:image/png;base64,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AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFQeAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8P/bg2MCAAAAhEHrn9oUfgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD9UAmK4MdBBlPy0AAAAASUVORK5CYII="/>
    </defs>
    </svg>
    `;
  return <SvgXml style={style} xml={desk} width={width} height={height} fill={color} />;
}