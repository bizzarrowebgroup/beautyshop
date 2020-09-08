import React from 'react';
import { ImageStyle, ViewStyle } from 'react-native';
import { SvgXml } from 'react-native-svg';

interface CircleProps {
    style?: ViewStyle | ImageStyle;
    width?: any | number;
    height?: any | number;
    color?: string;
};

export default function Circle({ style, width, height, color }: CircleProps) {
    if (!color) {
        color = "#F4C36C"
    }
    //  width="` + width + `" height="` + height + `" viewBox="0 0 ` + width + ` ` + height + `"
    const desk = `<svg fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M154 64.5C159 103 119.526 115.5 77 115.5C34.4741 115.5 0 100.122 0 64.5C0 47.8035 6.07357 41.454 18.5 30C21.9558 26.8146 32.852 10.5547 37 8C49.7587 0.142173 59.9496 0 77 0C119.526 0 137.5 15.5 154 64.5Z" fill="` + color + `"/></svg>`;
    return <SvgXml style={style} xml={desk} width={width} height={height} />;
}