import React, { useContext, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View, TextInput, KeyboardAvoidingView, Platform } from 'react-native'
import Header from '../components/Header'
import BaseText from '../components/StyledText'
import Colors from '../constants/Colors'
import Layout from '../constants/Layout'
import { AppContext } from '../context/Appcontext'

const EditEmail = ({ navigation }) => {
  const {
    currentUser,
    setCurrentUser,
    showToast
  } = useContext(AppContext);
  const [emailEditing, setEmail] = React.useState('');
  useEffect(() => {
    // console.log("--currentUser", currentUser)
    if (currentUser == undefined || currentUser.length <= 0) {
      showToast(
        "ERRORE GENERICO",
        "Non riesco a recuperare le tue informazioni",
        "error",
        "bottom",
        4000
      );
      navigation.goBack();
    }
  }, [currentUser])
  if (currentUser == undefined || currentUser.length <= 0) return <View></View>;
  /**
    * 
    "cookie": false,
    "displayName": "Jonathan Derewith Canevese",
    "email": "Test@live.it",
    "loyalitypoints": 150,
    "newsletter": false,
    "notificationToken": "",
    "notificationsEnabled": false,
    "phone": "25104",
    "photoURL": "https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=3850142288329920&height=200&width=200&ext=1608160891&hash=AeQ5tSz9VMTsM9ZUtjs",
    "privacy": true,
    "pwd": "",
    "toBecompleted": false,
    "userId": "A3chZohI5QY4uj4bVBp2JAqolWH2",
   */
  const { email } = currentUser;
  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <StatusBar style="light" />
      <Header hasBack={true} title={`Modifca la tua email`} onPress={() => navigation.goBack()} />
      <View style={styles.content}>
        <View style={styles.contentRows}>
          <View style={styles.contentInfo}>
            <BaseText>
              {"Per accertarci sia proprio tu a mandare la richiesta, ti chiediamo di inserire la password del tuo account BeautyShop. Successivamente ti invieremo un’email per confermare questo nuovo indirizzo email."}
            </BaseText>
          </View>
          <View style={styles.contentInput}>
            <BaseText weight={700} size={15}>{"Nuovo indirizzo email"}</BaseText>
            <TextInput
              style={{
                height: 52,
                width: "100%",
                borderBottomWidth: 2,
                borderBottomColor: "#A5A5A5",
                fontSize: 15,
                fontFamily: "Gilroy_Regular"
              }}
              value={email}
              onChangeText={text => setEmail(text)}
              autoFocus
              autoCorrect={false}
              keyboardType={"email-address"}
            />
          </View>
        </View>
        <View style={styles.footerButton}>
          <View style={styles.saveBtn}>
            <BaseText size={20} color={Colors.light.bianco}>{"Salva"}</BaseText>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

export default EditEmail;

const styles = StyleSheet.create({
  content: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    top: -50,
    backgroundColor: Colors.light.bianco,
    height: Layout.window.height - 180,
  },
  contentRows: {
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  contentInfo: {
    marginTop: 40
  },
  contentInput: {
    marginTop: 30
  },
  footerButton: {
    position: "absolute",
    bottom: 50,
    right: 25,
    alignItems: "flex-end",
    width: "100%",
  },
  saveBtn: {
    backgroundColor: Colors.light.ARANCIO,
    width: 170,
    height: 70,
    borderRadius: 20,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center"
  }
})
