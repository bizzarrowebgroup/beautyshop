import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Animated
} from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { BottomMenuItem } from "./BottomMenuItem";
import { Vibration } from "../constants";
import Colors from "../constants/Colors";
//import { blue } from "../../styles";
export const TabBar = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  const [translateValue] = useState(new Animated.Value(0));

  const totalWidth = Dimensions.get("window").width;
  const tabWidth = totalWidth / state.routes.length;
  return (
    <View style={[style.tabContainer, { width: totalWidth }]}>
      <View style={{ flexDirection: "row", alignContent: "center", alignItems: "center", justifyContent: "center" }}>
        <Animated.View
          style={[
            style.slider,
            {
              backgroundColor: Colors.light.newviola,
              transform: [{ translateX: translateValue }],
              //width: tabWidth / 2 - 30,
              //width: tabWidth - 35,
              //left: 20,
              width: tabWidth,
              //borderTopLeftRadius: 20,
              //borderTopRightRadius: 20,
              //height: 80,
              //left: tabWidth / 2 - 5,
            },
          ]}
        />
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name;
          const isFocused = state.index === index;
          const onPress = () => {
            Vibration.impactTouch("Light");
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });
            Animated.spring(translateValue, {
              toValue: index * tabWidth,
              velocity: 10,
              useNativeDriver: true,
            }).start();
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          }
          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };
          return (
            <TouchableOpacity
              //accessibilityRole="button"
              //accessibilityStates={isFocused ? ["selected"] : []}
              //accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{ flex: 1 }}
              key={index}
            >
              <BottomMenuItem
                iconName={label.toString()}
                isCurrent={isFocused}
              />
            </TouchableOpacity>
          );
        })
        }
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  tabContainer: {
    height: 60,
    //marginBottom: 10,
    //paddingBottom: 40,
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4.0,
    shadowColor: "black",
    backgroundColor: "white",
    //borderTopRightRadius: 20,
    //borderTopLeftRadius: 20,
    elevation: 1,
    position: "absolute",
    bottom: 0,
  },
  slider: {
    //height: 3,
    //width: 10,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    //backgroundColor: "#DF7865",
    //backgroundColor: "#43377B",
    //backgroundColor: "#43377B",
    //borderRadius: 10,
  },
});