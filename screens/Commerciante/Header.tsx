import React, { RefObject } from "react";
import { StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";
import { useValue, withTimingTransition } from "react-native-redash";
import { Feather as Icon } from "@expo/vector-icons";
import { useSafeArea } from "react-native-safe-area-context";
import { useNavigation } from '@react-navigation/native';

import { TouchableWithoutFeedback } from "react-native-gesture-handler";

import { HEADER_IMAGE_HEIGHT } from "./HeaderImage";
import TabHeader from "./TabHeader";
import { TabModel } from "./Content";
import Colors from "../../constants/Colors";

const ICON_SIZE = 24;
const PADDING = 16;
export const MIN_HEADER_HEIGHT = 45;
const { interpolate, Extrapolate, useCode, greaterThan, lessThan, set, block, Value } = Animated;

const styles = StyleSheet.create({
  container: {
    //position: "absolute",
    //top: 0,
    //left: 0,
    //right: 0,
    //zIndex: 200,
    height: MIN_HEADER_HEIGHT + 100,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: .2,
    shadowRadius: 5,
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    //height: MIN_HEADER_HEIGHT,
    paddingTop: 50,
    alignItems: "center",
    justifyContent: "space-between",
    alignContent: "center",
    paddingHorizontal: PADDING,
    //zIndex: 100,
    //backgroundColor: "white"
  },
  title: {
    fontFamily: "Gilroy_Bold",
    fontSize: 20,
    marginLeft: PADDING - 10,
    flex: 1,
    color: Colors.light.ARANCIO,
  },
});

interface HeaderProps {
  y: Animated.Value<number>;
  tabs: TabModel[];
  scrollView: RefObject<Animated.ScrollView>;
  title?: String;
}

export default ({ y, tabs, scrollView, title }: HeaderProps) => {
  const { goBack } = useNavigation();
  const toggle = useValue<0 | 1>(0);
  const toggleShadow = useValue<0 | 1>(0);
  //console.log("toggleShadow--", toggleShadow)
  const insets = useSafeArea();
  const transition = withTimingTransition(toggle, { duration: 100 });
  const shadow = withTimingTransition(toggleShadow, { duration: 100 });
  const { top: paddingTop } = insets;
  const translateX = interpolate(y, {
    inputRange: [0, HEADER_IMAGE_HEIGHT],
    outputRange: [-ICON_SIZE - PADDING, 0],
    extrapolate: Extrapolate.CLAMP,
  });
  const translateY = interpolate(y, {
    inputRange: [-HEADER_IMAGE_HEIGHT / 3.5, 0, HEADER_IMAGE_HEIGHT],
    outputRange: [
      HEADER_IMAGE_HEIGHT - MIN_HEADER_HEIGHT + 100,
      HEADER_IMAGE_HEIGHT - MIN_HEADER_HEIGHT + 15,
      0,
    ],
    extrapolateRight: Extrapolate.CLAMP,
  });
  const opacity = transition;
  useCode(
    () => block(
      [
        set(toggle, greaterThan(y, HEADER_IMAGE_HEIGHT)),
        set(toggleShadow, lessThan(y, HEADER_IMAGE_HEIGHT)),
      ]
    ),
    [
      toggle,
      toggleShadow,
      y,
    ]
  );
  return (
    <Animated.View style={[styles.container, { paddingTop: 0 }]}>
      <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject,
          opacity,
          backgroundColor: "white",
        }}
      />
      <View style={styles.header}>
        <TouchableWithoutFeedback onPress={() => goBack()}>
          <View>
            <Animated.View style={{
              height: ICON_SIZE + 10,
              width: ICON_SIZE + 10,
              borderRadius: ICON_SIZE + 10 / 2,
              backgroundColor: "white",
              justifyContent: "center",
              //shadowColor: "black",
              //shadowRadius: 5,
              //shadowOpacity: shadow,
              //shadowOffset: {
              //  width: 1,
              //  height: 0
              //}
            }}>
              <Icon name="arrow-left" size={ICON_SIZE} color="black" style={{ alignSelf: "center" }} />
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
        <Animated.Text
          style={[
            styles.title,
            { transform: [{ translateX }, { translateY }] },
          ]}
        >
          {title ? title : "NO/TITLE"}
        </Animated.Text>
        {/* <Animated.View style={{
          height: ICON_SIZE + 10,
          width: ICON_SIZE + 10,
          borderRadius: ICON_SIZE + 10 / 2,
          backgroundColor: "white",
          justifyContent: "center",
          //shadowColor: "black",
          //shadowRadius: 5,
          //shadowOpacity: shadow,
          //shadowOffset: {
          //  width: 1,
          //  height: 0
          //}
        }}>
          <Icon name="heart" size={ICON_SIZE - 5} color="black" style={{ alignSelf: "center" }} />
        </Animated.View> */}
      </View>
      <View style={{ paddingLeft: 20, paddingTop: 5 }}>
        {tabs && <TabHeader {...{ y, transition, tabs, scrollView }} />}
      </View>
    </Animated.View>
  );
};
