/* eslint-disable max-len */
import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { AntDesign as Icon } from "@expo/vector-icons";
import Animated, { Extrapolate, interpolate } from "react-native-reanimated";

import { HEADER_IMAGE_HEIGHT } from "./HeaderImage";
import { MIN_HEADER_HEIGHT } from "./Header";
import BaseText from "../../components/StyledText";
import { TouchableOpacity } from "react-native-gesture-handler";
import Colors from "../../constants/Colors";

const { height } = Dimensions.get("window");

//const items = [
//  {
//    title: "Long Hongdae Nights",
//    description:
//      "Korean fried chicken glazed with Gochujang, garnished with sesame & spring onions, served with fries & Miss Miu Mayo",
//    price: "26 CHF",
//  },
//  {
//    title: "Late Sunset",
//    description:
//      "Korean fried chicken starter with dirty cheese sauce and Artisan Hot Sauce - the naughty version new, favourite",
//    price: "13.50 CHF",
//  },
//  {
//    title: "Cabbage Kimchi",
//    description: "Portion, vegan",
//    price: "5.00 CHF",
//  },
//  {
//    title: "Namur by Pieces",
//    description:
//      "Homemade steamed dim sum with minced pork, shiitake mushrooms and smokey honey flavour, four pcs",
//    price: "10.50 CHF",
//  },
//  {
//    title: "Silim Lights",
//    description:
//      "Beef Bibimbap, sesame oil, rice, beans, spinach, carrots, spring onions, Chinese cabbage, shiitake mushrooms, roasted onions and egg",
//    price: "26.50 CHF",
//  },
//];

//const menu = [
//  { name: "Starters", items },
//  { name: "Order Again", items },
//  { name: "Picked for you", items },
//  { name: "Gimbap Sushi", items },
//];

//export const defaultTabs = menu.map(({ name }) => ({ name, anchor: 0 }));
//console.log("defaultTabs", defaultTabs)

const styles = StyleSheet.create({
  section: {
    padding: 16,
  },
  placeholder: {
    height: HEADER_IMAGE_HEIGHT,
    marginBottom: MIN_HEADER_HEIGHT,
  },
  text: {
    //fontFamily: "UberMoveRegular",
    fontSize: 14,
  },
  title1: {
    //fontFamily: "UberMoveMedium",
    fontSize: 24,
  },
  title2: {
    //fontFamily: "UberMoveMedium",
    fontSize: 16,
  },
  divider: {
    height: 2,
    backgroundColor: "#e2e3e4",
  },
  info: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  ratings: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 8,
  },
  link: {
    color: "#247A00",
  },
  item: {
    borderBottomColor: "#e2e3e4",
    borderBottomWidth: 1,
    //marginTop: 16,
  },
  title: {
    //fontFamily: "UberMoveMedium",
    fontSize: 16,
    marginBottom: 8,
  },
  description: {
    marginBottom: 8,
  },
  price: {
    //fontFamily: "UberMoveMedium",
    marginBottom: 16,
  },
});

export interface TabModel {
  title: string;
  anchor: number;
}

interface ContentProps {
  y: Animated.Node<number>;
  data?: any;
  servizi?: any;
  onMeasurement: (index: number, tab: TabModel) => void;
  setCarrello?: any;
  carrello?: any;
}

export default ({ y, onMeasurement, data, servizi, carrello, setCarrello }: ContentProps) => {
  const opacity = interpolate(y, {
    inputRange: [
      HEADER_IMAGE_HEIGHT - MIN_HEADER_HEIGHT - 100,
      HEADER_IMAGE_HEIGHT - MIN_HEADER_HEIGHT,
    ],
    outputRange: [1, 0],
    extrapolate: Extrapolate.CLAMP,
  });
  const {
    economy,
    stars,
    via
  } = data;
  let economyTitle = "€";
  if (economy) {
    switch (economy) {
      case 1:
        economyTitle = "€€";
        break;
      case 2:
        economyTitle = "€€€";
        break;
    }
  }
  return (
    <>
      <View style={styles.placeholder} />
      <Animated.View style={[styles.section, { opacity }]}>
        <BaseText styles={styles.text}>{economyTitle} • {`${data && data.tipo == 1 ? "Estetista" : "Parrucchiere"}`}</BaseText>
        <View style={styles.info}>
          <BaseText styles={styles.text}>Apre alle 11:00</BaseText>
          <View style={styles.ratings}>
            <Icon name="star" color="#f4c945" size={24} style={styles.icon} />
            <BaseText styles={styles.text}>({stars})</BaseText>
          </View>
        </View>
      </Animated.View>
      <View style={styles.divider} />
      <View style={styles.section}>
        <BaseText weight={600} styles={styles.title2}>{`Informazioni ${data && data.tipo == 1 ? "Estetista" : "Parrucchiere"}`}</BaseText>
        <View style={styles.info}>
          <BaseText styles={styles.text}>{via ? via : ""}</BaseText>
          {/*<BaseText styles={styles.link}>Più info</BaseText>*/}
        </View>
      </View>
      <View style={styles.divider} />
      {servizi && servizi.map(({ title, data: menuItems }, index) => {
        return (
          <View
            //style={{}}
            key={index}
            onLayout={({
              nativeEvent: {
                layout: { y: anchor },
              },
            }) => onMeasurement(index, { title, anchor: anchor - 142 })}
          >
            <BaseText weight={600} styles={[styles.title1, { padding: 16 }]}>{title}</BaseText>
            {menuItems.map(({ titolo, desc, cost }, j) => {
              let isSelected = carrello !== undefined ? carrello.find(item => {
                //console.log(item.index, "item");
                //console.log(index, "index");
                //console.log(item.index === index, "isEqual");
                return item.index === j
              }) : false;
              return (
                <TouchableOpacity style={[styles.item, { borderLeftWidth: 6, borderLeftColor: isSelected ? Colors.light.ARANCIO : "transparent" }]} key={j} onPress={() => setCarrello({ title: titolo, cost, index: j })} >
                  <View style={{
                    padding: 16
                  }}>
                    <BaseText weight={600} styles={styles.title}>{titolo}</BaseText>
                    <BaseText styles={styles.description} numberOfLines={2}>
                      {desc}
                    </BaseText>
                    <BaseText weight={isSelected ? 800 : 400} styles={[styles.price, { color: isSelected ? Colors.light.ARANCIO : Colors.light.nero }]}>{cost + " €"} {isSelected ? "x1" : ""}</BaseText>
                  </View>
                </TouchableOpacity>
              )
            })}
          </View>
        )
      }
      )}
      <View style={{ height }} />
    </>
  );
};