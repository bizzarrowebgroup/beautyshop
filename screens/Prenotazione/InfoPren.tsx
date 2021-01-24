import React, { useEffect, useRef, useState } from 'react'
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { StatusBar } from 'expo-status-bar';
import BaseText from "../../components/StyledText";
import Colors from "../../constants/Colors";
import ShareInstagramStory from 'react-native-share-instagram-story';

import moment from 'moment';
// import { CommonActions } from "@react-navigation/native";
// import { AppContext } from '../../context/Appcontext';
const styles = StyleSheet.create({
    animationContainer: {
        flex: 1
    },
    buttonContainer: {
        position: "absolute",
        top: 40,
        left: 0,
        right: 0,
    },
    textCtn: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
    },
    boxInfo: {
        minWidth: "90%",
        backgroundColor: "white",
        borderRadius: 10,
        paddingVertical: 20,
        paddingHorizontal: 20,
        marginVertical: 10,
    },
});

const InfoPren = ({ route, navigation }) => {
    const [prenotazione, setPrenotazione] = useState(route.params?.prenotazione)
    const handleBack = () => {
        navigation.goBack();
    }
    // console.log("-----INFOPREN", JSON.stringify(prenotazione, null, 2))
    let realStatus = prenotazione.state;
    let realStatusColor;
    switch (realStatus) {
        case 0:
            realStatus = "PRESA IN CARICO";
            realStatusColor = "#CB860B";
            break;
        case 1:
            realStatus = "CONFERMATA";
            realStatusColor = "#00C537";
            break;
        case 2:
            realStatus = "CONCLUSA";
            realStatusColor = Colors.light.ARANCIO;
            break;
        case 3:
            realStatus = "ANNULLATA";
            realStatusColor = "#CA1E13";
            break;
    }


    const shareIg = async () => {
        try {
            const Commerciante = encodeURI(prenotazione.title);
            console.log("---Commerciante---", Commerciante)
            const pngUrl = `https://bs-images.herokuapp.com/ig/${Commerciante}`;
            console.log("---pngURL----", pngUrl)
            await ShareInstagramStory.shareBackgroundVideo(
                'https://bizzarro.org/beautyshop/',
                "it.bizzarro.beautshop",
                pngUrl
            );
        } catch (error) {
            console.log("--errr", error)
        }
    }
    return (
        <View style={styles.animationContainer}>
            <StatusBar style={"dark"} />
            <View style={styles.textCtn}>
                {/* <View style={[styles.boxInfo, { backgroundColor: Colors.light.bianco, marginHorizontal: 20 }]}>
                    <Image source={require("../../assets/images/logoBS.png")} style={{ width: 50, height: 50, }} />
                    <BaseText weight={700} styles={{ textAlign: "left", marginVertical: 2 }}>{"La tua prenotazione sarà presa in carico dal Commerciante!"}</BaseText>
                    <BaseText weight={500} color={"grey"} size={10} styles={{ textAlign: "left", marginVertical: 2 }}>{"Verrai avvisato con un'email o una notifica in tempo reale."}</BaseText>
                </View> */}
                <View style={[styles.boxInfo, { backgroundColor: Colors.light.bianco }]}>
                    <BaseText>{"Data"}</BaseText>
                    <BaseText weight={700}>{moment(prenotazione.slot_date).format("dddd DD MMMM YYYY")}</BaseText>
                </View>
                <View style={[styles.boxInfo, { backgroundColor: Colors.light.bianco }]}>
                    <BaseText>{"Stato"}</BaseText>
                    <BaseText weight={700} color={realStatusColor}>{realStatus}</BaseText>
                </View>
                <View style={[styles.boxInfo, { backgroundColor: Colors.light.bianco }]}>
                    <BaseText>{"Codice identificativo"}</BaseText>
                    <BaseText weight={700}>{prenotazione.id}</BaseText>
                </View>
                <View style={[styles.boxInfo, { backgroundColor: Colors.light.bianco }]}>
                    <BaseText>{"Commerciante"}</BaseText>
                    <BaseText weight={700}>{prenotazione.title}</BaseText>
                </View>
                <View style={[styles.boxInfo, { backgroundColor: Colors.light.bianco }]}>
                    <BaseText>{"Totale"}</BaseText>
                    <BaseText weight={700} color={Colors.light.ARANCIO}>{prenotazione.totale + " €"}</BaseText>
                </View>
                <View style={[styles.boxInfo, { backgroundColor: Colors.light.bianco }]}>
                    <BaseText>{"Orario"}</BaseText>
                    <BaseText weight={700}>{prenotazione.slot_time}</BaseText>
                </View>
                <TouchableOpacity onPress={() => shareIg()} style={[styles.boxInfo, { backgroundColor: Colors.light.bianco, }]}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", alignContent: "center" }}>
                        <BaseText weight={600}>{"Condividi su Instagram"}</BaseText>
                        <Image source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/1024px-Instagram_logo_2016.svg.png" }} style={{ height: 40, width: 40 }} />
                    </View>
                </TouchableOpacity>
            </View>
            <View
                style={{
                    position: "absolute",
                    bottom: 40,
                    left: 0,
                    right: 0,
                    paddingHorizontal: 20,
                }}
            >
                <TouchableOpacity
                    onPress={() => handleBack()}
                    style={{
                        borderRadius: 10,
                        backgroundColor: "#FB6E3B",
                        height: 45,
                        alignContent: "center",
                        justifyContent: "center",
                        paddingHorizontal: 10,
                        alignItems: "center",
                        flexDirection: "row"
                    }}>
                    <BaseText weight={900} size={14} color={Colors.light.bianco}>{"Torna alla Home"}</BaseText>
                </TouchableOpacity>
            </View>
        </View>
    );
}
export default InfoPren;