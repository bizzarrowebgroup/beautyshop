import * as React from 'react';
import {
  Image,
  // Text,
  View,
  // StatusBar,
  StyleSheet,
  TouchableOpacity,
  // ScrollView,
  // SafeAreaView,
  SectionList,
  // Linking
} from 'react-native'
import InstaBug, { FeatureRequests, Replies } from 'instabug-reactnative';
// import Header from '../components/Header';
import Colors from '../constants/Colors';
// import { Ionicons } from '@expo/vector-icons';
import { logout, db } from '../network/Firebase';
import { Feather as Icon } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";
import { ParamListBase } from "@react-navigation/native";
import { AuthUserContext } from '../navigation/AuthUserProvider';
import BaseText from '../components/StyledText';
import * as WebBrowser from 'expo-web-browser';
import BackIcon from '../components/svg/BackIcon';
import DeviceInfo from 'react-native-device-info';

// import Constants from "expo-constants";
// import { backgroundImage } from './Commerciante/HeaderImage';

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
  // console.log("---getBundleId---", DeviceInfo.getBundleId())
  // DeviceInfo.getIpAddress().then((ip) => {
  //   console.log("---ip---", ip)
  // });
  // DeviceInfo.getPhoneNumber().then((phoneNumber) => {
  //   // Android: null return: no permission, empty string: unprogrammed or empty SIM1, e.g. "+15555215558": normal return value
  //   console.log("---phoneNumber---", phoneNumber)
  // });
  const sections = [
    {
      title: "",
      data: [
        {
          realheader: true
        }
      ]
    },
    {
      title: "Informazioni personali",
      data: [
        {
          title: "I miei appuntamenti",
          icon: true,
          navigateTo: "Prenotazioni"
        },
        {
          title: "Le mie informazioni",
          icon: true,
          navigateTo: "EditProfile"
        },
        //{
        //  title: "Le tue recensioni",
        //  icon: true,
        //  navigateTo: ""
        //},
        {
          title: "Impostazioni",
          icon: false,
          navigateTo: "ProfileSettings"
        },
      ]
    },
    // {
    //   title: "Promozioni",
    //   data: [
    //     {
    //       title: "Invita i tuoi amici",
    //       subtitle: "Ottieni uno sconto di €5 sul tuo prossimo\nappuntamento di bellezza.",
    //       icon: true,
    //       navigateTo: ""
    //     },
    //   ]
    // },
    {
      title: "Assistenza",
      data: [
        {
          title: "Cos'è BeautyShop",
          icon: false,
          openWeb: "https://bizzarro.org/beautyshop/"
        },
        {
          title: "Ricevi assistenza",
          icon: false,
          openApp: true
          // openWeb: "https://bizzarro.org/contact"
        },
        {
          title: "Inviaci il tuo feedback",
          icon: false,
          openFeature: true
          // openWeb: "https://bizzarro.org/contact"
        },
      ]
    },
    {
      title: "Informazioni Legali",
      data: [
        {
          title: "Termini del servizio",
          icon: true,
          openWeb: "https://bizzarro.org/beautyshop/terms.html"
          // navigateTo: ""
        },
        {
          title: "Informazioni per la privacy",
          icon: true,
          openWeb: "https://bizzarro.org/beautyshop/privacy.html"
          // navigateTo: ""
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
          title: `Versione App ${DeviceInfo.getVersion()} (${DeviceInfo.getBuildNumber() || 0})`,
          special: true,
          version: true,
        }
      ]
    }
  ];

  async function handleSignOut() {
    // console.log("presed")
    try {
      await logout();
      setUser(null);
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  }

  const RenderHeader = () => {
    // console.log("--user", { photoUrl, name })
    return (
      <View style={styles.mainHeader}>
        <View style={styles.mainHeaderRow}>
          <BackIcon width={20} height={20} style={{ position: "absolute", left: 25 }} onPress={() => { navigation.goBack() }} color={Colors.light.nero} />
          <View>
            {photoUrl && <Image source={{ uri: photoUrl }} style={styles.headerImage} />}
            <BaseText weight={800} size={22} styles={styles.headerName}>{`${name ? "Ciao " + name.substring(0, 8) + "!" : ""}`}</BaseText>
          </View>
        </View>
      </View>
    )
  }

  const Item = ({ data, index }) => {
    const { realheader, title, subtitle, icon, navigateTo, special, version, logout, openWeb, openApp, openFeature } = data;
    var header = realheader ? true : false;
    if (header) {
      return (
        <RenderHeader />
      )
    } else {

      const navigateToScreen =
        logout ? handleSignOut :
          navigateTo && navigateTo !== "" ? () => navigation.navigate(navigateTo) :
            openWeb && openWeb !== "" ? () => WebBrowser.openBrowserAsync(openWeb) :
              openApp && openApp !== "" && openApp === true ? () => Replies.hasChats(previousChats => {
                if (previousChats) {
                  // Has chats
                  Replies.show()
                } else {
                  InstaBug.show()
                }
              }) :
                openFeature && openFeature !== "" && openFeature === true ? () => FeatureRequests.show() :
                  undefined;
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
              <BaseText size={version ? 10 : 15} weight={titleWeight} styles={titleStyle}>{title}</BaseText>
              {icon && (
                <Icon name="arrow-right" size={20} color="black" />
              )}
            </View>
            {subtitle && subtitle !== "" && <BaseText size={11} styles={{ marginTop: 5, marginBottom: 15 }}>{subtitle}</BaseText>}
          </View>
        </TouchableOpacity>
      )
    }
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

  }, [user]);

  return (
    <View style={styles.container}>
      <SectionList
        sections={sections}
        stickySectionHeadersEnabled={false}
        style={{ backgroundColor: "white" }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ backgroundColor: "white", paddingBottom: 100 }}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ index, item }) => <Item data={item} index={index} />}
        renderSectionHeader={({ section: { title } }) => {
          if (title)
            return (
              <View style={styles.headerRow}>
                <BaseText color={"#898A8D"} weight={700}>{title}</BaseText>
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
    paddingHorizontal: 25,
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
    paddingHorizontal: 25,
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
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    paddingHorizontal: 25,
    paddingBottom: 20
  },
  headerImage: {
    height: 70,
    width: 70,
    borderRadius: 70 / 2,
    marginRight: 10,
    alignSelf: "center"
  },
});

export default Profilo;

