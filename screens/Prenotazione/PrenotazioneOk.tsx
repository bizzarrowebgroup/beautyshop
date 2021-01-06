import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, Button, View, Image, TouchableOpacity } from 'react-native'
import LottieView from 'lottie-react-native';
import { StatusBar } from 'expo-status-bar';
import BaseText from "../../components/StyledText";
import Colors from "../../constants/Colors";
const styles = StyleSheet.create({
  lottieBox: {
    flex: 1,
    backgroundColor: '#fff',
  },
  animationContainer: {
    backgroundColor: '#fff',
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
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 1
    },
    shadowRadius: 5,
    shadowOpacity: .333,
    marginVertical: 10,
  },
});

const PrenotazioneOk = ({ route, navigation }) => {
  let animation = useRef(undefined);
  const [isLooping, setLoop] = useState(false);
  useEffect(() => {
    animation.current.play();
  }, [])

  const resetAnimation = () => {
    animation.current.reset();
    animation.current.play();
  };

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
      <View style={styles.textCtn}>
        {/*<View style={[styles.buttonContainer, { top: 50 }]}>
        </View>*/}
        <View style={styles.boxInfo}>
          <Image source={require("../../assets/images/logoBS.png")} style={{ width: 50, height: 50, alignSelf: "center" }} />
          <BaseText weight={700} styles={{ textAlign: "center" }}>{"Prenotazione riuscita!"}</BaseText>
          <BaseText styles={{ textAlign: "center", marginTop: 10 }}>{"A breve riceverai un'email di conferma del tuo appuntamento."}</BaseText>
        </View>
        <View style={[styles.boxInfo, { backgroundColor: Colors.light.ARANCIO }]}>
          <BaseText weight={700} color={Colors.light.bianco}>{"IMarloo Mestre"}</BaseText>
          <BaseText color={Colors.light.bianco} styles={{ marginTop: 10 }}>{"Sabato 31 Ottobre - Marika"}</BaseText>
          <BaseText color={Colors.light.bianco}>{"11:30-09:45"}</BaseText>
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
          //onPress={() => handlePrenotazione()}
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
          <BaseText weight={900} size={14} color={Colors.light.bianco}>{"Concludi prenotazione"}</BaseText>
        </TouchableOpacity>
      </View>
    </View >
  )
}

export default PrenotazioneOk