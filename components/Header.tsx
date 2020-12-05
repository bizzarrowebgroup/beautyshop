import * as React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, StyleSheetProperties } from 'react-native';
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons';
import Intro4 from './svg/Intro4';
import Colors from '../constants/Colors';

import Circle from './svg/Circle';
import BaseText from './StyledText';
import BackIcon from './svg/BackIcon';

interface HeaderProps {
  title?: string;
  review?: boolean;
  profile?: boolean;
  number?: number;
  onPress?: any;
  hasBack?: boolean;
  image?: any;
  username?: any;
  email?: any;
  phonenumber?: any;
  loggedIn?: boolean;
  styles?: StyleSheetProperties;
}

const Header = (props: HeaderProps) => {
  if (props.review) {
    return (
      <View style={{
        paddingTop: Constants.statusBarHeight,
        backgroundColor: Colors.light.arancioDes,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
      }}>
        <View style={{ height: 190 }}>
          <Intro4 width="259" height="212" style={{ position: "absolute", top: 20, right: 0, bottom: 0 }} />
          <BaseText weight={700} styles={styles.titlo}>{props.title ? props.title : ""}</BaseText>
          <Ionicons name="md-return-left" size={30} color={Colors.light.bianco} style={styles.icona} onPress={props.onPress} />
          <View style={{ width: 105, top: 0, left: 20 }}>
            <BaseText styles={styles.number}>{props.number ? props.number : "4.6"} / 5</BaseText>
            <View style={{ flexDirection: "row", marginTop: 5, justifyContent: "flex-start", alignItems: "center" }}>
              <Ionicons name="ios-star" size={20} color={Colors.light.giallo} />
              <Ionicons name="ios-star" size={20} color={Colors.light.giallo} />
              <Ionicons name="ios-star" size={20} color={Colors.light.giallo} />
              <Ionicons name="ios-star" size={20} color={Colors.light.giallo} />
              <Ionicons name="ios-star-outline" size={20} color={Colors.light.giallo} />
            </View>
          </View>
          <View style={styles.btn}>
            <BaseText styles={{ fontSize: 15, textTransform: "uppercase" }}>Aggiungi recensione</BaseText>
          </View>
        </View>
      </View>
    );
  } else {
    if (props.profile) {
      return (
        <View style={{
          paddingTop: Constants.statusBarHeight,
          backgroundColor: Colors.light.newviola,
          borderBottomRightRadius: 20
        }}>
          <View style={{ height: 190 }}>
            {props.loggedIn && (
              <View style={{ justifyContent: "space-between", alignItems: "stretch", alignContent: "center" }}>
                <View style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignContent: "center",
                  alignItems: "center",
                  paddingHorizontal: 20,
                  //paddingTop: 10
                }}>
                  <BaseText weight={400} size={18} styles={{ color: Colors.light.bianco }}>{"Il tuo profilo"}</BaseText>
                  <TouchableOpacity style={{
                    width: 30,
                    height: 30,
                  }} onPress={() => {
                    console.warn("Non ancora implementato 💀😪")
                  }}>
                    <Ionicons name="ios-color-wand" size={30} color="white" />
                  </TouchableOpacity>
                </View>
                <View style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  //alignContent: "center",
                  //alignItems: "center"
                }}>
                  <View style={{
                    marginLeft: 20
                  }}>
                    <Circle width="154" height="115" style={{
                      position: "absolute",
                      left: -5,
                      top: 10
                    }} />
                    <Image source={{ uri: props.image }} style={{
                      width: 80,
                      height: 80,
                      borderRadius: 40,
                      left: 30,
                      top: 25,
                      zIndex: 1
                    }} />
                  </View>
                  <View style={{
                    top: 30,
                    flexDirection: "column",
                    alignItems: "flex-end",
                    maxWidth: 250,
                    marginRight: 20,
                  }}>
                    <BaseText size={18 - 2} weight={700} styles={{
                      //marginBottom: 10,
                      textAlign: "right",
                      color: Colors.light.bianco
                    }}>{props.username}</BaseText>
                    <BaseText size={13 - 2} styles={{
                      lineHeight: 20,
                      //textAlign: "left",
                      color: Colors.light.bianco
                    }}>{props.email}</BaseText>
                    <BaseText size={13 - 2} styles={{
                      lineHeight: 20,
                      //textAlign: "left",
                      color: Colors.light.bianco
                    }}>{props.phonenumber}</BaseText>
                  </View>
                </View>
              </View>
            )}
            {(!props.loggedIn && (
              <View>
                <Intro4 width="259" height="212" style={{ position: "absolute", top: 27, right: 0, bottom: 0 }} />
                <BaseText styles={styles.titlo}>{"Accedi o registrati"}</BaseText>
                <BaseText styles={[styles.text, {
                  width: 200,
                  left: 55,
                }]}>{"Crea il tuo account e prenota il tuo appuntamento ora!"}</BaseText>
              </View>
            ))}
          </View>
        </View>
      );
    } else {
      //console.log("Constants.statusBarHeight",Constants.statusBarHeight)
      return (
        <View style={[{ paddingTop: 175, backgroundColor: Colors.light.ARANCIO }, props.styles]}>
          <View style={[styles.container, {
            justifyContent: "flex-start",
            alignItems: "center",
            alignContent: "center",
            flexDirection: "row",
            bottom: 50,
          }]}>
            {props.hasBack &&
              <BackIcon width={20} height={20} style={styles.icona} onPress={props.onPress} color={Colors.light.bianco} />
            }
            <BaseText styles={styles.titlo} size={25} weight={600} color={Colors.light.bianco}>{props.title ? props.title : ""}</BaseText>
          </View>
        </View>
      );
    }
  }
};

export default Header;

const styles = StyleSheet.create({
  container: {
    height: 56,
  },
  btn: {
    backgroundColor: "#DE9182",
    top: 13,
    height: 32,
    width: 320,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: Colors.light.nero,
    shadowOpacity: 0.25,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 4,
    borderRadius: 10
  },
  titlo: {
    marginLeft: 15
  },
  number: {
    fontSize: 30,
  },
  icona: {
    marginLeft: 20
  },
  text: {
    color: Colors.light.nero
  },
  bold: {
    color: Colors.light.nero
  }
});
