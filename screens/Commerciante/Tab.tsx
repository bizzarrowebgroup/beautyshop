import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const styles = StyleSheet.create({
  container: {
    height: 45,
    paddingHorizontal: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  text: {
    fontSize: 14,
    fontFamily: "Gilroy_Regular",
  },
});

interface TabProps {
  color: string;
  title: string;
  onMeasurement?: (measurement: number) => void;
  onPress?: () => void;
}

export default ({ title, color, onMeasurement, onPress }: TabProps) => {
  return (
    <TouchableWithoutFeedback  onPress={onPress}>
      <View
        onLayout={
          onMeasurement
            ? ({
              nativeEvent: {
                layout: { width },
              },
            }) => onMeasurement(width)
            : undefined
        }
        style={styles.container}
      >
        <Text style={[styles.text, { color }]}>{title}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};