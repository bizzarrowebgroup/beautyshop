import React, { useState } from 'react';
import {
  SafeAreaView,
  Keyboard,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  View
} from 'react-native';

//import { registerWithEmail } from '../network/Firebase';
import Colors from '../constants/Colors';
import BaseText from '../components/StyledText';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AppTextInput from '../components/TextInput';

const CompleteSocial = ({ navigation }) => {
  const [schermata, setSchermata] = useState(1)
  const [nomecognome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [validatore1, setValidatore1] = useState(false); // validatore1, setValidatore1
  const [validatore2, setValidatore2] = useState(false); // validatore1, setValidatore1

  const checkNome = () => { if (!nomecognome.trim()) setValidatore1(false); }
  const checkEmail = () => { if (!email.trim()) setValidatore2(false); }

  function changeNome(value) {
    if (!nomecognome.trim()) setValidatore1(false);
    setValidatore1(true);
    setNome(value);
  }

  function changeEmail(value) {
    if (!email.trim()) setValidatore2(false);
    setValidatore2(true);
    setEmail(value);
  }

  function checkAndGoOn(parte) {
    switch (parte) {
      case 1:
        setSchermata(2)
        break;
      case 2:
        setSchermata(3)
        break;
      case "-":
        setSchermata(schermata - 1)
        break;
      case "+":
        setSchermata(schermata + 1)
        break;
    }
  }
  //async function handleOnSignUp(values) {
  //  const { email, password } = values;
  //  try {
  //    await registerWithEmail(email, password);
  //  } catch (error) {
  //    setRegisterError(error.message);
  //  }
  //}

  const goBack = () => {
    if (schermata !== 1) return setSchermata(schermata - 1);
    navigation.goBack();
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss}>
          <View style={{ flex: 1 }}>
            <TouchableOpacity onPress={goBack} style={{ paddingHorizontal: 20, paddingVertical: 5 }}>
              <View style={styles.backButton}>
                <Ionicons name="ios-arrow-back" size={30} color={Colors.light.nero} />
              </View>
            </TouchableOpacity>
            {schermata === 1 && (
              <>
                <View style={{ paddingLeft: 20 }}>
                  <BaseText size={30} weight={600} fontSpacing={0.77}>{"Inserisci il tuo \nNome e Cognome"}</BaseText>
                  <BaseText fontSpacing={0.77} color={"#8E8E8E"} styles={{ marginTop: 30 }}>{"Per iniziare incominciamo dalle basi"}</BaseText>
                  <AppTextInput
                    name="name"
                    leftIcon="account"
                    placeholder="Paolo Rossi"
                    autoFocus={true}
                    value={nomecognome}
                    onChangeText={value => changeNome(value)}
                    onEndEditing={() => checkNome()}
                  />
                </View>
                <View style={{ position: "absolute", bottom: 40, left: 0, right: 0 }}>
                  <TouchableOpacity disabled={validatore1 ? false : true} onPress={() => checkAndGoOn(1)} activeOpacity={0.4} style={{
                    backgroundColor: validatore1 ? "#FB6F3B" : "#e0e0e0",
                    height: 70,
                    marginHorizontal: 20,
                    borderRadius: 30,
                    flex: 1,
                    justifyContent: "center",
                    alignContent: "center",
                    alignItems: "center"
                  }}>
                    <BaseText color={validatore1 ? Colors.light.bianco : "#888888"} weight={700} letterSpacing={0.77} size={13}>{"Prossimo"}</BaseText>
                  </TouchableOpacity>
                </View>
              </>
            )}
            {schermata === 2 && (
              <>
                <View style={{ paddingLeft: 20 }}>
                  <BaseText size={30} weight={600} fontSpacing={0.77}>{"Inserisci la tua \nEmail"}</BaseText>
                  <BaseText fontSpacing={0.77} color={"#8E8E8E"} styles={{ marginTop: 30 }}>{"Per invarti comunicazioni riguardanti le tue prenotazioni"}</BaseText>
                  <AppTextInput
                    name="Email"
                    placeholder="paolo@libero.it"
                    autoFocus={true}
                    value={email}
                    onChangeText={value => changeEmail(value)}
                    onEndEditing={() => checkEmail()}
                  />
                </View>
                <View style={{ position: "absolute", bottom: 40, left: 0, right: 0 }}>
                  <TouchableOpacity disabled={validatore2 ? false : true} onPress={() => checkAndGoOn(2)} activeOpacity={0.4} style={{
                    backgroundColor: validatore2 ? "#FB6F3B" : "#e0e0e0",
                    height: 70,
                    marginHorizontal: 20,
                    borderRadius: 30,
                    flex: 1,
                    justifyContent: "center",
                    alignContent: "center",
                    alignItems: "center"
                  }}>
                    <BaseText color={validatore2 ? Colors.light.bianco : "#888888"} weight={700} letterSpacing={0.77} size={13}>{"Prossimo"}</BaseText>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.bianco
  },
  backButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.light.bianco,
    shadowColor: Colors.light.nero,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: .2,
    shadowRadius: 2,
    elevation: 1,
  },
});
export default CompleteSocial;