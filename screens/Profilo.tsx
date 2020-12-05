import * as React from 'react';
import {
  Image,
  Text,
  View,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  SectionList
} from 'react-native';
import Header from '../components/Header';
import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { logout, db } from '../network/Firebase';
import { Feather as Icon } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";
import { ParamListBase } from "@react-navigation/native";
import { AuthUserContext } from '../navigation/AuthUserProvider';
import BaseText from '../components/StyledText';

import Constants from "expo-constants";
import { backgroundImage } from './Commerciante/HeaderImage';

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

  //const [isOn, setIson] = React.useState(false);
  const { user, setUser } = React.useContext(AuthUserContext);

  const [name, setName] = React.useState(undefined);
  const [email, setEmail] = React.useState(undefined);
  const [photoUrl, setPhotoUrl] = React.useState(undefined);
  const [emailVerified, setEmailVerified] = React.useState(undefined);
  const [uid, setUid] = React.useState(undefined);
  // obtain phone from uid
  const [phone, setPhone] = React.useState(undefined);

  const getPhone = async (id) => {
    const utentiApp = db.collection('utentiApp');
    const snapshot = await utentiApp.where('userId', '==', id).get();
    if (snapshot.empty) {
      console.log('Non trovo il telefono per questo utente a db.');
    }
    snapshot.forEach(doc => {
      let data = doc.data();
      setPhone(data.phone);
    });
  }
  const sections = [
    {
      title: "Informazioni personali",
      data: [
        {
          title: "I miei appuntamenti",
          icon: true,
          navigateTo: ""
        },
        {
          title: "Le mie informazioni",
          icon: true,
          navigateTo: ""
        },
        {
          title: "Le tue recensioni",
          icon: true,
          navigateTo: ""
        },
        {
          title: "Impostazioni",
          icon: false,
          navigateTo: ""
        },
      ]
    },
    {
      title: "Promozioni",
      data: [
        {
          title: "Invita i tuoi amici",
          subtitle: "Ottieni uno sconto di €5 sul tuo prossimo\nappuntamento di bellezza.",
          icon: true,
          navigateTo: ""
        },
      ]
    },
    {
      title: "Assistenza",
      data: [
        {
          title: "Cos'è BeautyShop",
          icon: false,
          navigateTo: ""
        },
        {
          title: "Ricevi assistenza",
          icon: false,
          navigateTo: ""
        },
        {
          title: "Inviaci il tuo feedback",
          icon: false,
          navigateTo: ""
        },
      ]
    },
    {
      title: "Informazioni Legali",
      data: [
        {
          title: "Termini del servizio",
          icon: true,
          navigateTo: ""
        },
        {
          title: "Informazioni per la privacy",
          icon: true,
          navigateTo: ""
        },
      ]
    },
    {
      data: [
        {
          title: "Esci",
          special: true,
          logout: true
        },
        {
          title: `Versione App ${Constants.manifest.version} (${Constants.platform.ios.buildNumber || 0})`,
          special: true,
          version: true,
        }
      ]
    }
  ];

  async function handleSignOut() {
    console.log("presed")
    try {
      await logout();
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  }

  const Item = ({ data }) => {
    const { title, subtitle, icon, navigateTo, special, version, logout } = data;
    const navigateToScreen = logout ? handleSignOut : navigateTo && navigateTo !== "" ? navigation.navigate(navigateTo) : undefined;
    let itemBorder = special ? {} : {
      borderBottomColor: "#EEEEEE",
      borderBottomWidth: 1,
    }
    let titleStyle = logout ? {
      textDecorationLine: "underline",
      textDecorationStyle: "solid",
      textDecorationColor: "#000",
    } : {};
    let titleWeight = logout ? 700 : 400;
    return (
      <TouchableOpacity onPress={navigateToScreen}>
        <View style={[styles.item, itemBorder]}>
          <View style={[styles.itemContent, { justifyContent: version ? "center" : "space-between" }]}>
            <BaseText size={version ? 10 : 17} weight={titleWeight} styles={titleStyle}>{title}</BaseText>
            {icon && (
              <Icon name="arrow-right" size={20} color="black" />
            )}
          </View>
          {subtitle && subtitle !== "" && <BaseText size={11} styles={{ marginTop: 5, marginBottom: 15 }}>{subtitle}</BaseText>}
        </View>
      </TouchableOpacity>
    )
  };

  React.useEffect(() => {
    if (user != null) {
      setName(user.displayName);
      setEmail(user.email);
      setPhotoUrl(user.photoURL);
      setEmailVerified(user.emailVerified);
      setUid(user.uid);
      getPhone(user.uid);
    }

  }, []);



  const renderHeader = () => {
    if (name && photoUrl)
      return (
        <View style={styles.mainHeader}>
          <View style={styles.mainHeaderRow}>
            <Image source={{ uri: photoUrl }} style={styles.headerImage} />
            <BaseText weight={800} size={22} styles={styles.headerName}>{`Ciao ${name.substring(0, 8)}!`}</BaseText>
          </View>
        </View>
      )
  }

  return (
    <View style={styles.container}>
      {renderHeader()}
      <SectionList
        sections={sections}
        stickySectionHeadersEnabled={false}
        style={{ backgroundColor: "white" }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 25, backgroundColor: "white", paddingBottom: 100 }}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Item data={item} />}
        renderSectionHeader={({ section: { title } }) => {
          if (title)
            return (
              <View style={styles.headerRow}>
                <BaseText color={"#898A8D"} weight={700} >{title}</BaseText>
              </View>
            )
        }}
      />
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  item: {
    backgroundColor: "white",
    height: 60,
    justifyContent: "center",
  },
  itemContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center"
  },
  headerName: {
  },
  headerRow: {
    marginVertical: 15,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 17
  },
  mainHeader: {
    top: 0,
    left: 0,
    right: 0,
    width: "100%",
    height: 162,
    backgroundColor: "#fff",
    justifyContent: "flex-end",
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 0,
    },
    shadowOpacity: .2,
    shadowRadius: 10,
    elevation: 1,
    zIndex: 100
  },
  mainHeaderRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignContent: "center",
    alignItems: "center",
    paddingHorizontal: 25,
    paddingBottom: 20
  },
  headerImage: {
    height: 70,
    width: 70,
    borderRadius: 70 / 2,
    marginRight: 10
  },
});

export default Profilo;

