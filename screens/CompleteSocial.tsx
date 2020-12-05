import React, { useState, useContext } from 'react';
import {
  SafeAreaView,
  Keyboard,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  View,
  Alert,
  ActivityIndicator
} from 'react-native';

//import { registerWithEmail } from '../network/Firebase';
import Colors from '../constants/Colors';
import BaseText from '../components/StyledText';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AppTextInput from '../components/TextInput';

import { logout, completeSocialProfile } from '../network/Firebase';
import CustomSwitch from '../components/CustomSwitch';
import { AppContext } from '../context/Appcontext';


const CompleteSocial = ({ navigation, route }) => {
  const { showToast } = useContext(AppContext);
  const [schermata, setSchermata] = useState(1)
  const [userId, setUserId] = useState(route.params?.userid);
  const [nomecognome, setNome] = useState(route.params?.nomecognome);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [privacy, setPrivacy] = useState(true);
  const [newsletter, setNews] = useState(false);
  const [cookie, setCookie] = useState(false);

  const [validatore1, setValidatore1] = useState(false);
  const [validatore2, setValidatore2] = useState(false);
  const [validatore3, setValidatore3] = useState(false);
  const [validatore4, setValidatore4] = useState(false);

  const [loadingComplete, setLoadingComplete] = useState(false);

  //const checkNome = () => {
  //  //if (!nomecognome.trim()) setValidatore1(false);
  //}
  const checkEmail = () => {
    var filter = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!filter.test(email)) {
      console.log('Please provide a valid email address');
      if (validatore2) setValidatore2(false)
    } else if (filter.test(email)) {
      if (!validatore2) setValidatore2(true)
    } else {
      if (validatore2) setValidatore2(false)
    }
  }


  function changeNome(value) {
    //if (!nomecognome.trim()) setValidatore1(false);
    setValidatore1(true);
    if (value) setNome(value);
  }

  function changeEmail(value) {
    setEmail(value);
    //if (!email.trim()) setValidatore2(false);
    //setValidatore2(true);
    checkEmail()
  }
  function changePhone(value) {
    //setPhone(value);
    //if (!email.trim()) setValidatore2(false);
    //setValidatore2(true);
    //checkPhone()
    setValidatore3(true);
    if (value) setPhone(value);
  }

  async function completeProfile() {
    setLoadingComplete(true)
    //completeSocialProfile = async (email, phone, name, userId, newsletter, privacy, cookie)
    let result = await completeSocialProfile({ email, phone, name: nomecognome, userId, privacy, cookie, newsletter });
    //console.log("res", result) // userId // error 
    if (result.type == "complete_social") {
      showToast("Completa profilo", "Sei riuscito a completare il tuo profilo con successo!", "success", "bottom", 2000);
      navigation.navigate("Homepage");
    } else if (result.type == "error") {
      showToast("Completa profilo", result.error, "error", "bottom", 2000);
    }
    setLoadingComplete(false);
  }

  function checkAndGoOn(parte) {
    switch (parte) {
      case 1:
        setSchermata(2)
        break;
      case 2:
        //checkEmail();
        console.log("---validatore2--", validatore2)
        if (validatore2 === true) {
          setSchermata(3)
        } else {
          alert("Inserisci almeno un email valida")
        }
        break;
      case "-":
        setSchermata(schermata - 1)
        break;
      case "+":
        setSchermata(schermata + 1)
        break;
    }
  }

  React.useEffect(() => {
    changeNome()
  }, [])
  //async function handleOnSignUp(values) {
  //  const { email, password } = values;
  //  try {
  //    await registerWithEmail(email, password);
  //  } catch (error) {
  //    setRegisterError(error.message);
  //  }
  //}
  async function handleSignOut() {
    try {
      await logout();
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  }

  const goBack = () => {
    if (schermata !== 1) {
      setValidatore2(false);
      return setSchermata(schermata - 1);
    }
    if (schermata == 1) {
      // chiedi per andare indietro e in caso fai log-out
      Alert.alert(
        'Profilo',
        'Tornando indietro effettuerai la disconessione, così facendo potrai completare il tuo account in un futuro momento.',
        [
          //{
          //  text: 'Ask me later',
          //  onPress: () => console.log('Ask me later pressed')
          //},
          {
            text: 'Annulla',
            onPress: () => {
              //console.log('Cancell Pressed')
            },
          },
          {
            text: 'Esci',
            style: 'destructive',
            onPress: () => {
              console.log('Esci Pressed');
              handleSignOut()
            }
          }
        ],
        { cancelable: true }
      );
    }
    //navigation.goBack();
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
                  <BaseText size={30} weight={600} fontSpacing={0.77} styles={{ marginTop: 20 }}>{"Completa il tuo \nprofilo"}</BaseText>
                  <BaseText fontSpacing={0.77} color={"#8E8E8E"} styles={{ marginTop: 30 }}>{"Per registrarti conferma il tuo nome e cognome"}</BaseText>
                  <AppTextInput
                    name="name"
                    leftIcon="account"
                    placeholder="Nome cognome"
                    autoFocus={true}
                    value={nomecognome}
                    onChangeText={value => changeNome(value)}
                  //onEndEditing={() => checkNome()}
                  />
                </View>
                <View style={{ position: "absolute", bottom: 80, left: 0, right: 0 }}>
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
                  <BaseText size={30} weight={600} fontSpacing={0.77} styles={{ marginTop: 20 }}>{"Completa il tuo \nprofilo"}</BaseText>
                  <BaseText fontSpacing={0.77} color={"#8E8E8E"} styles={{ marginTop: 30 }}>{"Inserisci la tua email per invarti comunicazioni riguardanti le tue prenotazioni"}</BaseText>
                  <AppTextInput
                    name="Email"
                    placeholder="paolo@libero.it"
                    autoFocus={true}
                    value={email}
                    onChangeText={value => changeEmail(value)}
                    onEndEditing={() => checkEmail()}
                  />
                </View>
                <View style={{ position: "absolute", bottom: 80, left: 0, right: 0 }}>
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
            {schermata === 3 && (
              <>
                <View style={{ paddingLeft: 20 }}>
                  <BaseText size={30} weight={600} fontSpacing={0.77} styles={{ marginTop: 20 }}>{"Completa il tuo \nprofilo"}</BaseText>
                  <BaseText fontSpacing={0.77} color={"#8E8E8E"} styles={{ marginTop: 30 }}>{"Inserisci il tuo numero di telefono"}</BaseText>
                  <AppTextInput
                    name="Telefono"
                    placeholder="*** *******"
                    autoFocus={true}
                    value={phone}
                    keyboardType="numeric"
                    onChangeText={value => changePhone(value)}
                  //onEndEditing={() => checkPhone()}
                  />
                </View>
                <View style={{ position: "absolute", bottom: 80, left: 0, right: 0 }}>
                  <TouchableOpacity disabled={validatore3 ? false : true} onPress={() => checkAndGoOn("+")} activeOpacity={0.4} style={{
                    backgroundColor: validatore3 ? "#FB6F3B" : "#e0e0e0",
                    height: 70,
                    marginHorizontal: 20,
                    borderRadius: 30,
                    flex: 1,
                    justifyContent: "center",
                    alignContent: "center",
                    alignItems: "center"
                  }}>
                    <BaseText color={validatore3 ? Colors.light.bianco : "#888888"} weight={700} letterSpacing={0.77} size={13}>{"Prossimo"}</BaseText>
                  </TouchableOpacity>
                </View>
              </>
            )}
            {schermata === 4 && (
              <>
                <View style={{ paddingLeft: 20 }}>
                  <BaseText size={30} weight={600} fontSpacing={0.77} styles={{ marginTop: 20 }}>{"Termini del\nservizio"}</BaseText>
                  <View style={{ marginVertical: 20 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: 'center', alignContent: 'center' }}>
                      <BaseText styles={{ maxWidth: "80%" }}>{"Accetto i termini e le condizioni del servizio"}</BaseText>
                      <CustomSwitch
                        isEnabled={privacy}
                        toggleSwitch={() => setPrivacy(!privacy)}
                        style={{ marginRight: 20 }}
                      />
                    </View>
                    <View style={{ marginTop: 20, flexDirection: "row", justifyContent: "space-between", alignItems: 'center', alignContent: 'center' }}>
                      <BaseText styles={{ maxWidth: "80%" }}>{"Accetto di iscrivermi alla newsletter"}</BaseText>
                      <CustomSwitch
                        isEnabled={newsletter}
                        toggleSwitch={() => setNews(!newsletter)}
                        style={{ marginRight: 20 }}
                      />
                    </View>
                    <View style={{ marginTop: 20, flexDirection: "row", justifyContent: "space-between", alignItems: 'center', alignContent: 'center' }}>
                      <BaseText styles={{ maxWidth: "80%" }}>{"Accetto di profilarmi con i cookies del servizio"}</BaseText>
                      <CustomSwitch
                        isEnabled={cookie}
                        toggleSwitch={() => setCookie(!cookie)}
                        style={{ marginRight: 20 }}
                      />
                    </View>
                  </View>
                </View>
                <View style={{ position: "absolute", bottom: 80, left: 0, right: 0 }}>
                  <TouchableOpacity disabled={validatore3 ? false : true} onPress={completeProfile} activeOpacity={0.4} style={{
                    backgroundColor: validatore3 ? "#FB6F3B" : "#e0e0e0",
                    height: 70,
                    marginHorizontal: 20,
                    borderRadius: 30,
                    flex: 1,
                    justifyContent: "center",
                    alignContent: "center",
                    alignItems: "center"
                  }}>
                    {loadingComplete && <ActivityIndicator color={Colors.light.bianco} size="large" style={{ alignSelf: "center" }} />}
                    {!loadingComplete && <BaseText color={validatore3 ? Colors.light.bianco : "#888888"} weight={700} letterSpacing={0.77} size={13}>{"Completa"}</BaseText>}
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
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    shadowColor: Colors.light.nero,
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