import React, { useEffect, useRef, useState } from 'react'
import { ScrollView, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { StatusBar } from 'expo-status-bar';
import BaseText from "../../components/StyledText";
import Colors from "../../constants/Colors";
import ShareInstagramStory from 'react-native-share-instagram-story';
// import LottieView from 'lottie-react-native';

import moment from 'moment';
// import Layout from '../../constants/Layout';
// import { CommonActions } from "@react-navigation/native";
// import { AppContext } from '../../context/Appcontext';
const styles = StyleSheet.create({
    animationContainer: {
        flex: 1,
        paddingTop: 40,
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
        marginVertical: 5,
    },
});

const InfoPren = ({ route, navigation }) => {
    const [prenotazione, setPrenotazione] = useState(route.params?.prenotazione)
    const lottieAnimation = useRef();
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
            // console.log("---Commerciante---", Commerciante)
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
        <>
            <StatusBar style={"dark"} />
            <ScrollView style={styles.animationContainer}>
                {/* <View style={{
                    width: "100%",
                    height: 240,
                    // alignContent: "center",
                    // alignItems: "center",
                    // justifyContent: "center"
                }}>
                    <LottieView
                        ref={lottieAnimation}
                        style={{
                            // width: Layout.window.width / 4,
                            // height: 200,
                            flex: 1,
                            backgroundColor: 'transparent',

                        }}
                        autoPlay
                        loop
                        // autoSize
                        source={require('../../assets/animations/prenwaiting.json')}
                    />
                </View> */}
                <View style={styles.textCtn}>
                    {prenotazione.state === 0 && (<View style={[styles.boxInfo, { backgroundColor: Colors.light.bianco, marginHorizontal: 20 }]}>
                        <Image source={require("../../assets/images/logoBS.png")} style={{ width: 50, height: 50, }} />
                        <BaseText weight={700} styles={{ textAlign: "left", marginVertical: 2 }}>{"La tua prenotazione è stata presa in carico!"}</BaseText>
                        <BaseText weight={500} color={"grey"} size={10} styles={{ textAlign: "left", marginVertical: 2 }}>{"Verrai avvisato con un'email o una notifica in tempo reale, una volta confermata o annullata da parte del commerciante."}</BaseText>
                    </View>)}
                    {prenotazione.state === 1 && (<View style={[styles.boxInfo, { backgroundColor: Colors.light.bianco, marginHorizontal: 20 }]}>
                        <Image source={require("../../assets/images/logoBS.png")} style={{ width: 50, height: 50, }} />
                        <BaseText weight={700} styles={{ textAlign: "left", marginVertical: 2 }}>{"La tua prenotazione è stata confermata!"}</BaseText>
                        <BaseText weight={500} color={"grey"} size={10} styles={{ textAlign: "left", marginVertical: 2 }}>{"Ricordati di recarti in tempo al tuo appuntamento!"}</BaseText>
                    </View>)}
                    {prenotazione.state === 2 && (<View style={[styles.boxInfo, { backgroundColor: Colors.light.bianco, marginHorizontal: 20 }]}>
                        <Image source={require("../../assets/images/logoBS.png")} style={{ width: 50, height: 50, }} />
                        <BaseText weight={700} styles={{ textAlign: "left", marginVertical: 2 }}>{"La tua prenotazione è conclusa!"}</BaseText>
                        <BaseText weight={500} color={"grey"} size={10} styles={{ textAlign: "left", marginVertical: 2 }}>{"Grazie mille, lasciati un feedback e condividi sui social la tua prenotazione!"}</BaseText>
                    </View>)}
                    {prenotazione.state === 3 && (<View style={[styles.boxInfo, { backgroundColor: Colors.light.bianco, marginHorizontal: 20 }]}>
                        <Image source={require("../../assets/images/logoBS.png")} style={{ width: 50, height: 50, }} />
                        <BaseText weight={700} styles={{ textAlign: "left", marginVertical: 2 }}>{"La tua prenotazione è annullata!"}</BaseText>
                        <BaseText weight={500} color={"grey"} size={10} styles={{ textAlign: "left", marginVertical: 2 }}>{"Ci dispiace, ma il commerciante non ha la disponibilità per quel giorno. Prova a prenotare di nuovo!"}</BaseText>
                    </View>)}
                    <View style={[styles.boxInfo, { backgroundColor: Colors.light.bianco }]}>
                        <BaseText size={10} styles={{ marginBottom: 3 }}>{"Commerciante"}</BaseText>
                        <BaseText weight={700}>{prenotazione.title}</BaseText>
                    </View>
                    <View style={[styles.boxInfo, { backgroundColor: Colors.light.bianco }]}>
                        <BaseText size={10} styles={{ marginBottom: 3 }}>{"Data "}</BaseText>
                        <BaseText weight={700}>{moment(prenotazione.slot_date).format("dddd DD MMMM YYYY")}</BaseText>
                    </View>
                    <View style={[styles.boxInfo, { backgroundColor: Colors.light.bianco }]}>
                        <BaseText size={10} styles={{ marginBottom: 3 }}>{"Orario"}</BaseText>
                        <BaseText weight={700}>{`Dalle ${prenotazione.slot_time} alle ${prenotazione.slot_end_time}`}</BaseText>
                    </View>
                    <View style={[styles.boxInfo, { backgroundColor: Colors.light.bianco }]}>
                        <BaseText size={10} styles={{ marginBottom: 3 }}>{"Totale"}</BaseText>
                        <BaseText weight={700} color={Colors.light.ARANCIO}>{prenotazione.totale + " €"}</BaseText>
                    </View>
                    <View style={[styles.boxInfo, { backgroundColor: Colors.light.bianco }]}>
                        <BaseText size={10} styles={{ marginBottom: 3 }}>{"Stato"}</BaseText>
                        <BaseText weight={700} color={realStatusColor}>{realStatus}</BaseText>
                    </View>
                    <View style={[styles.boxInfo, { backgroundColor: Colors.light.bianco }]}>
                        <BaseText size={10} styles={{ marginBottom: 3 }}>{"Codice identificativo"}</BaseText>
                        <BaseText weight={700}>{prenotazione.id}</BaseText>
                    </View>
                    <TouchableOpacity onPress={() => shareIg()} style={[styles.boxInfo, { backgroundColor: Colors.light.bianco, }]}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", alignContent: "center" }}>
                            <BaseText weight={600} size={10}>{"Condividi la tua prenotazione su Instagram !"}</BaseText>
                            <Image source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/1024px-Instagram_logo_2016.svg.png" }} style={{ height: 40, width: 40 }} />
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
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
        </>
    );
}
export default InfoPren;