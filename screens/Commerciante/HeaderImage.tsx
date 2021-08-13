import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";
import Colors from "../../constants/Colors";

const { Extrapolate, interpolateNode } = Animated;
const { height: wHeight, width: wWidth } = Dimensions.get("window");

export const backgroundImage = require("../../assets/images/salon.jpeg");

export const HEADER_IMAGE_HEIGHT = wHeight / 3;
const styles = StyleSheet.create({
  image: {
    position: "absolute",
    top: 0,
    left: 0,
    width: wWidth,
    resizeMode: "cover",
    zIndex: -2,
  },
  imageHover: {
    position: "absolute",
    top: 0,
    left: 0,
    width: wWidth,
    zIndex: -1,
    backgroundColor: Colors.light.ARANCIO,
  },
});

interface HeaderImageProps {
  y: Animated.Value<number>;
  image: string;
}

export default ({ y, image }: HeaderImageProps) => {
  const height = interpolateNode(y, {
    inputRange: [-100, 0],
    outputRange: [HEADER_IMAGE_HEIGHT + 100, HEADER_IMAGE_HEIGHT],
    extrapolateRight: Extrapolate.CLAMP,
  });
  const top = interpolateNode(y, {
    inputRange: [0, 100],
    outputRange: [0, -100],
    extrapolateLeft: Extrapolate.CLAMP,
  });
  const opacity = interpolateNode(y, {
    inputRange: [0, 200],
    outputRange: [0, 1],
    extrapolateLeft: Extrapolate.CLAMP,
  });
  return (
    <>
      <Animated.View
        style={[
          styles.imageHover,
          {
            top,
            height,
            opacity,
          },
        ]}
      ></Animated.View>
      <Animated.Image
        source={{
          uri: image
            ? image
            : "https://images.unsplash.com/photo-1582582450303-48cc2cfa2c43?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
        }}
        style={[
          styles.image,
          {
            top,
            height,
          },
        ]}
      />
    </>
  );
};
