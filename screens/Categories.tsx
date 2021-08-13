import React from "react";
import { View, Text } from "react-native";

export default function CategoriesScreen({ navigation, route }) {
  const categoryTitle = route.params?.categoryTitle;
  const categoryId = route.params?.categoryId;
  return (
    <View>
      <Text>{"CategoriesScreen"}</Text>
    </View>
  );
}
