import * as React from 'react';

import { View, Text } from 'react-native';

import fontSize from '../constants/fontSize';
/**
 * The BaseText component is a component that render the text for the whole app
 * @param italic is the font italic boolean
 * @param weight the font weight number 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
 * @param style the font style StyleViewProps
 * @param size the font size
 * @param color the font color string
 * @param background the font bg color string
 * @param textAlign the text align string
 * @param lineHeight the line height number
 * @param fontFamily not needed string
 */
const BaseText = ({ ...props }) => {
  let fontFamily = "WorkSans_400Regular";
  switch (props.weight) {
    case 100:
      fontFamily = props.italic ? "WorkSans_100Thin_Italic" : "WorkSans_100Thin"
      break;
    case 200:
      fontFamily = props.italic ? "WorkSans_200ExtraLight_Italic" : "WorkSans_200ExtraLight"
      break;
    case 300:
      fontFamily = props.italic ? "WorkSans_300Light_Italic" : "WorkSans_300Light"
      break;
    case 400:
      fontFamily = props.italic ? "WorkSans_400Regular_Italic" : "WorkSans_400Regular"
      break;
    case 500:
      fontFamily = props.italic ? "WorkSans_500Medium_Italic" : "WorkSans_500Medium"
      break;
    case 600:
      fontFamily = props.italic ? "WorkSans_600SemiBold_Italic" : "WorkSans_600SemiBold"
      break;
    case 700:
      fontFamily = props.italic ? "WorkSans_700Bold_Italic" : "WorkSans_700Bold"
      break;
    case 800:
      fontFamily = props.italic ? "WorkSans_800ExtraBold_Italic" : "WorkSans_800ExtraBold"
      break;
    case 900:
      fontFamily = props.italic ? "WorkSans_900Black_Italic" : "WorkSans_900Black"
      break;
  }
  return (
    <View {...props}>
      <Text style={[
        {
          fontSize: fontSize(props.size) || fontSize(12),
          color: props.color || "black",
          backgroundColor: props.background || "transparent",
          textAlign: props.textAlign,
          lineHeight: props.lineHeight,
          fontFamily: props.fontFamily || fontFamily,
          width: props.maxWidth,
          height: props.maxHeight,
        }, props.styles]} {...props} />
    </View>
  );
};

export default BaseText;