import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, Button, View, Image, TouchableOpacity } from 'react-native'
import LottieView from 'lottie-react-native';
import { StatusBar } from 'expo-status-bar';
import BaseText from "../../components/StyledText";
import Colors from "../../constants/Colors";
import moment from 'moment';
import { CommonActions } from "@react-navigation/native";
import { AppContext } from '../../context/Appcontext';

const styles = StyleSheet.create({
  lottieBox: {
    flex: 1,
    backgroundColor: '#ddd',
  },
  animationContainer: {
    backgroundColor: '#ddd',
    flex: 1,
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
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 1,
    //   height: 1
    // },
    // shadowRadius: 5,
    // shadowOpacity: .333,
    marginVertical: 10,
  },
});

const PrenotazioneOk = ({ route, navigation }) => {
  let animation = useRef(undefined);
  const [isLooping, setLoop] = useState(false);
  const [prenotazione, setPren] = useState(route.params?.prenotazione)
  const [title, setTitle] = useState(route.params?.title)
  const { setPrenotazione } = React.useContext(AppContext);

  useEffect(() => {
    animation.current.play();
  }, [])

  const resetAnimation = () => {
    animation.current.reset();
    animation.current.play();
  };

  const handlePrenotazione = () => {
    setPrenotazione({ title, ...prenotazione, })
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Homepage" }],
      })
    )
  }

  return (
    <View style={styles.animationContainer}>
      <StatusBar style={"dark"} />
      <LottieView
        ref={animation}
        style={styles.lottieBox}
        loop={isLooping}
        source={require('../../assets/animations/bg3.json')}
      />
      {false && (<View style={styles.buttonContainer}>
        <Button title="REPLAY ANIMAZIONE" onPress={() => resetAnimation()} />
        <Button title="LOOP" onPress={() => setLoop(!isLooping)} />
      </View>)}
      {/* <View style={styles.textCtn}>
        <View style={styles.boxInfo}>
          <Image source={require("../../assets/images/logoBS.png")} style={{ width: 50, height: 50, alignSelf: "center" }} />
          <BaseText weight={700} styles={{ textAlign: "center" }}>{"Prenotazione riuscita!"}</BaseText>
          <BaseText styles={{ textAlign: "center", marginTop: 10 }}>{"A breve riceverai un'email di conferma del tuo appuntamento."}</BaseText>
        </View>
        <View style={[styles.boxInfo, { backgroundColor: Colors.light.ARANCIO }]}>
          <BaseText weight={700} color={Colors.light.bianco}>{title}</BaseText>
          <BaseText color={Colors.light.bianco} styles={{ marginTop: 15, marginBottom: 5 }} size={15}>{moment(prenotazione.slot_date).format("dddd DD MMMM YYYY")}</BaseText>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignContent: "center", alignItems: "center" }}>
            <BaseText color={Colors.light.bianco}>{prenotazione.slot_time + " - " + prenotazione.slot_end_time}</BaseText>
            <BaseText color={Colors.light.bianco}>{prenotazione.totale + " €"}</BaseText>
          </View>
        </View>
      </View> */}
      <View style={styles.textCtn}>
        <View style={[styles.boxInfo, { backgroundColor: Colors.light.bianco, marginHorizontal: 20 }]}>
          <Image source={require("../../assets/images/logoBS.png")} style={{ width: 50, height: 50, }} />
          <BaseText weight={700} styles={{ textAlign: "left", marginVertical: 2 }}>{"La tua prenotazione sarà presa in carico dal Commerciante!"}</BaseText>
          <BaseText weight={500} color={"grey"} size={10} styles={{ textAlign: "left", marginVertical: 2 }}>{"Verrai avvisato con un'email o una notifica in tempo reale."}</BaseText>
        </View>
        <View style={[styles.boxInfo, { backgroundColor: Colors.light.bianco }]}>
          <BaseText>{"Totale"}</BaseText>
          <BaseText weight={700} color={Colors.light.ARANCIO}>{prenotazione.totale + " €"}</BaseText>
        </View>
        <View style={[styles.boxInfo, { backgroundColor: Colors.light.bianco }]}>
          <BaseText>{"Commerciante"}</BaseText>
          <BaseText weight={700}>{title}</BaseText>
        </View>
        <View style={[styles.boxInfo, { backgroundColor: Colors.light.bianco }]}>
          <BaseText>{"Data"}</BaseText>
          <BaseText weight={700}>{moment(prenotazione.slot_date).format("dddd DD MMMM YYYY")}</BaseText>
        </View>
        <View style={[styles.boxInfo, { backgroundColor: Colors.light.bianco }]}>
          <BaseText>{"Orario"}</BaseText>
          <BaseText weight={700}>{prenotazione.slot_time}</BaseText>
        </View>
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
          onPress={() => handlePrenotazione()}
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
    </View >
  )
}

export default PrenotazioneOk