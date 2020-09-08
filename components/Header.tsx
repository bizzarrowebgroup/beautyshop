import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
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
                    <Ionicons name="md-return-left" size={30} color="#181818" style={styles.icona} onPress={props.onPress} />
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
                    backgroundColor: Colors.light.arancioDes,
                    // borderBottomLeftRadius: 20,
                    borderBottomRightRadius: 20
                }}>
                    <View style={{ height: 190 }}>
                        {props.loggedIn && (
                            <View>
                                <TouchableOpacity style={{
                                    width: 30,
                                    height: 30,
                                    position: "absolute",
                                    right: 40,
                                    top: 15,
                                    zIndex: 2
                                }} onPress={() => {
                                    console.warn("hai premuto")
                                }}>
                                    <Ionicons name="ios-color-wand" size={30} color="black" />
                                </TouchableOpacity>
                                <Circle width="154" height="115" style={{
                                    position: "absolute",
                                    left: 30,
                                    top: 50
                                }} />
                                <BaseText styles={styles.titlo}>{"Il tuo profilo"}</BaseText>
                                <Image source={{ uri: props.image }} style={{
                                    width: 80,
                                    height: 80,
                                    borderRadius: 40,
                                    position: "absolute",
                                    left: 50,
                                    top: 75,
                                    zIndex: 1
                                }} />
                                <View style={{
                                    position: "absolute",
                                    right: 80,
                                    top: 75,
                                    flexDirection: "column",
                                    alignItems: "flex-start",
                                }}>
                                    <BaseText weight={700} styles={[styles.bold, {
                                        fontSize: 20,
                                        marginBottom: 10
                                    }]}>{props.username}</BaseText>
                                    <BaseText styles={[styles.text, {
                                        fontSize: 15,
                                        lineHeight: 20,
                                        textAlign: "left"
                                    }]}>{props.email}</BaseText>
                                    <BaseText styles={[styles.text, {
                                        fontSize: 15,
                                        lineHeight: 20,
                                        textAlign: "left"
                                    }]}>{props.phonenumber}</BaseText>
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
            return (
                <View style={{ paddingTop: Constants.statusBarHeight, backgroundColor: Colors.light.arancioDes }}>
                    <View style={styles.container}>
                        <BaseText styles={styles.titlo}>{props.title ? props.title : ""}</BaseText>
                        {props.hasBack &&
                            <BackIcon width={25} height={25} style={styles.icona} onPress={props.onPress}/> 
                        }
                        {/* <Ionicons name="md-return-left" size={30} color="#181818" style={styles.icona} onPress={props.onPress} /> */}
                    </View>
                </View>
            );
        }
    }
};

export default Header;

const styles = StyleSheet.create({
    container: {
        width: "100%",
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
        fontSize: 20,
        // fontFamily: "Montserrat_700Bold",
        paddingVertical: 20,
        paddingLeft: 55
    },
    number: {
        fontSize: 30,
        // fontFamily: "Montserrat_400Regular"
    },
    icona: {
        position: "absolute",
        top: 20,
        left: 20
    },
    text: {
        // fontFamily: "Montserrat_400Regular",
        color: Colors.light.nero
    },
    bold: {
        // fontFamily: "Montserrat_700Bold",
        color: Colors.light.nero
    }
});
