import * as React from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import Header from '../components/Header';
import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { logout, db } from '../network/Firebase';

import { StackNavigationProp } from "@react-navigation/stack";
import { ParamListBase } from "@react-navigation/native";
import { AuthUserContext } from '../navigation/AuthUserProvider';
import BaseText from '../components/StyledText';

// import { TextInput } from 'react-native-gesture-handler';
// import { getDateNow } from "../constants/Utils";
//import * as firebase from 'firebase';
//import 'firebase/auth';

// import * as Localization from "expo-localization";
// import { User } from "../models/User";
// import { Profile } from "../models/Profile";
// import NetworkManager from "../network/NetworkManager";

// import { isAvailableSignInWithApple } from "./AppleLogin";
// import * as firebase from "firebase";
// import "firebase/auth";
// import * as Google from "expo-google-app-auth";
// import * as AppleAuthentication from "expo-apple-authentication";

// import * as Crypto from "expo-crypto";

// import * as Notifications from "expo-notifications";
// import { ProfileColor } from "../models/ProfileColor";
// import Toast from 'react-native-toast-message'

interface ProfiloProps {
  example?: "test" | "amen";
  fontSize?: number;
  onPress?: () => void;
  androidClientId: string;
  iosClientId: string;
  iosStandaloneAppClientId: string;
  androidStandaloneAppClientId: string;
  scopes: string[];
  signedIn: (userUuid: string) => Promise<void>;
  navigation: StackNavigationProp<ParamListBase>;
}

const Profilo = ({
  example,
  fontSize,
  onPress,
  androidClientId,
  iosClientId,
  iosStandaloneAppClientId,
  androidStandaloneAppClientId,
  scopes,
  signedIn,
  navigation
}: ProfiloProps) => {

  const [isOn, setIson] = React.useState(false);
  const { user, setUser } = React.useContext(AuthUserContext);

  const [name, setName] = React.useState(undefined);
  const [email, setEmail] = React.useState(undefined);
  const [photoUrl, setPhotoUrl] = React.useState(undefined);
  const [emailVerified, setEmailVerified] = React.useState(undefined);
  const [uid, setUid] = React.useState(undefined);
  // obtain phone from uid
  const [phone, setPhone] = React.useState(undefined);

  const toggleHandle = () => {
    setIson(!isOn);
  }

  const getPhone = async (id) => {
    const utentiApp = db.collection('utentiApp');
    const snapshot = await utentiApp.where('userId', '==', id).get();
    if (snapshot.empty) {
      console.log('Non trovo il telefono per questo utente a db.');
    }
    snapshot.forEach(doc => {
      console.log(doc.id, '=>', doc.data());
      let data = doc.data();
      setPhone(data.phone);
    });
  }

  React.useEffect(() => {
    if (user != null) {
      setName(user.displayName);
      setEmail(user.email);
      setPhotoUrl(user.photoURL);
      setEmailVerified(user.emailVerified);

      setUid(user.uid);

      getPhone(user.uid);
      // The user's ID, unique to the Firebase project. Do NOT use
      // this value to authenticate with your backend server, if
      // you have one. Use User.getToken() instead.
    }

  }, []);
  async function handleSignOut() {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <View style={styles.container}>
      <Header
        profile={true}
        loggedIn={true}
        image={photoUrl ? photoUrl : "https://api.adorable.io/avatars/100/abott@adorable.png"}
        username={name ? name : "Nome undefined"}
        email={email ? email : "email undefined"}
        phonenumber={phone ? phone : "phone undefined"}
      />
      <View style={{
        zIndex: -2,
        height: 0
      }}>
        <View style={{ backgroundColor: Colors.light.arancioDes, height: 50, width: "10%" }} />
        <View style={{ backgroundColor: Colors.light.bg, height: 50, width: "20%", borderTopLeftRadius: 30, top: -50 }} />
      </View>
      <ScrollView style={{
        zIndex: 1,
        paddingTop: 20
      }}>
        <View>
          <View style={{ marginLeft: 20 }}>
            <Text style={[styles.text, { fontSize: 13, textTransform: "uppercase" }]}>Tessera fedeltà</Text>
            <View style={{
              backgroundColor: Colors.light.giallo,
              height: 191,
              borderRadius: 10,
              marginLeft: 10,
              marginRight: 40,
              marginTop: 10,
              marginBottom: 20
            }}>
              <View style={{ marginHorizontal: 40, marginTop: 10 }}>
                <Image source={{ uri: "http://barcodes4.me/barcode/c39/" + uid + ".png?resolution=1&margin=0&height=70&IsReverseColor=0" }} style={{
                  width: "100%",
                  height: 70,
                  backgroundColor: 'transparent',
                  borderRadius: 10,
                  resizeMode: "cover"
                }} />
                <BaseText styles={[styles.text, { marginTop: 5, fontSize: 12, color: Colors.light.nero, textAlign: "center" }]}>Scade il 15/07/2021</BaseText>
              </View>
              <View style={{
                flexDirection: "row",
                alignContent: "center",
                alignItems: "center",
                justifyContent: "space-around",
                marginHorizontal: 40
              }}>
                <Image source={require('../assets/images/logoBS.png')} style={{
                  width: 102,
                  height: 92,
                }} />
                <View style={{
                  justifyContent: "center",
                  alignContent: "center",
                  alignItems: "flex-end"
                }}>
                  <BaseText weight={700} styles={{ fontSize: 12 }}>{name}</BaseText>
                  <View style={{ flexDirection: "row", alignItems: "center", alignContent: "center", justifyContent: "center" }}>
                    <BaseText styles={{ fontSize: 13, marginRight: 5 }}>{"Punti:"}</BaseText>
                    <BaseText weight={700} styles={{ fontSize: 20 }}>150</BaseText>
                  </View>
                </View>
              </View>
            </View>
            <BaseText style={[styles.text, { fontSize: 12, color: "#333333", marginRight: 20, textAlign: "center" }]}>{"Spiegazione tessere, come accumulare punti etc.\nAmet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet."}</BaseText>
          </View>
          <View style={{ marginHorizontal: 40, marginVertical: 20, height: 1, backgroundColor: "#A6A6A6" }} />
          <View style={{
            backgroundColor: Colors.light.bianco,
            height: 45,
            alignItems: "center",
            justifyContent: "space-between",
            alignContent: "center",
            flexDirection: "row"
          }}>
            <Text style={[styles.text, { fontSize: 16, marginLeft: 20 }]}>Notifiche</Text>
            <TouchableOpacity
              activeOpacity={0.5}
              style={{
                width: 64,
                height: 32,
                borderRadius: 32,
                padding: 4,
                backgroundColor: isOn
                  ? Colors.light.arancioDes
                  : Colors.light.grigio,
                marginRight: 20
              }}
              onPress={toggleHandle}
            >
              <View style={{
                width: 24,
                height: 24,
                borderRadius: 32,
                backgroundColor: Colors.light.bianco,
                left: isOn ? 32 : 0,
              }} />
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 5, marginHorizontal: 20, marginBottom: 10 }}>
            <Text style={[styles.text, { color: "#696969", fontSize: 12 }]}>Le notifiche sono relative alle prenotazioni ed eventuali promozioni specifiche</Text>
          </View>
          <TouchableOpacity style={{
            backgroundColor: Colors.light.bianco,
            height: 45,
            alignItems: "center",
            justifyContent: "space-between",
            alignContent: "center",
            flexDirection: "row"
          }} >
            <Text style={[styles.text, { fontSize: 16, marginLeft: 20 }]}>Le tue recensioni</Text>
            <Ionicons name="ios-return-right" size={30} color={Colors.light.arancioDes} style={{
              marginRight: 20
            }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSignOut} style={{
            backgroundColor: Colors.light.arancio,
            borderRadius: 10,
            marginHorizontal: 20,
            marginTop: 20,
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
            height: 40
          }}>
            <BaseText size={14} weight={300}>Esci dal tuo account</BaseText>
          </TouchableOpacity>
          <View style={{ alignContent: "center", alignItems: "center", justifyContent: "center", marginVertical: 20 }}>
            <BaseText size={9} weight={700}>{"Versione App 1.0 (1.0)"}</BaseText>
          </View>
        </View>
      </ScrollView>
    </View>
  );
  // }
};

export default Profilo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.bg
  },
  input: {
    height: 40,
    marginHorizontal: 20,
    marginVertical: 10,
    backgroundColor: "white",
    borderRadius: 10,
    justifyContent: 'center',
  },
  text: {
    //fontFamily: "Montserrat_400Regular"
  },
  bold: {
    //fontFamily: "Montserrat_700Bold"
  },
  btn: {
    backgroundColor: "#DE9182",
    height: 40,
    marginHorizontal: 20,
    marginVertical: 10,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 10,
    // shadowColor: Colors.light.nero,
    // shadowOpacity: 0.25,
    // shadowOffset: {
    //     width: 0,
    //     height: 4
    // },
    // shadowRadius: 4,
  },
});
