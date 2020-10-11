import React from "react";
import { View } from "react-native";
import BottomIcon from "../components/svg/BottomIcon";
type Props = {
  iconName: string;
  isCurrent?: boolean;
};
export const BottomMenuItem = ({ iconName, isCurrent }: Props) => {
  console.log(iconName, "--iconName--");
  switch (iconName) {
    case "Esplora":
      iconName = "ios-search";
      break;
    case "Profilo":
      iconName = "ios-people";
      break;
  }
  return (
    <View
      style={{
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <BottomIcon type={iconName} color={isCurrent ? "white" : "#43377B"} size={32} />
    </View>
  );
};