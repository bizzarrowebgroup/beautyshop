//import { StatusBar } from "expo-status-bar";
import React, { useRef } from "react";
//import * as Device from 'expo-device';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Deprecation warning', 'VirtualizedList', 'Non-serializable']);

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Colors from './constants/Colors';
import Navigation from "./navigation";
import Loader from './components/Loader';

import 'moment';
import 'moment/locale/it';
import moment from 'moment-timezone';
moment().locale('it');

import NetInfo from "@react-native-community/netinfo";
// import * as Sentry from "sentry-expo";
// import * as firebase from "firebase";
import Toast from "react-native-toast-message"
import { db } from './network/Firebase';
import { AppContext } from './context/Appcontext';
//import { View } from "react-native";
//import { withSecurityScreen } from "./components/withSecurityScreen";

// Sentry.init({
//   dsn: "https://6f3d61d6211445b4a5af61e57aaecbaa@o421980.ingest.sentry.io/5342571",
//   enableInExpoDevelopment: true,
//   debug: true,
// });

// const FirebaseConfig = {
//   apiKey: "AIzaSyDTRi3LQzoW4dMkbfPOpZVayYyMkYyp0ac",
//   authDomain: "beautyshop-afe23.firebaseapp.com",
//   databaseURL: "https://beautyshop-afe23.firebaseio.com",
//   projectId: "beautyshop-afe23",
//   storageBucket: "beautyshop-afe23.appspot.com",
//   messagingSenderId: "470013044742",
//   appId: "1:470013044742:web:c5cabae0efe0f2da96bb87"
// }

function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [servizi, setServizi] = React.useState([]);
  const [commercianti, setCommercianti] = React.useState([]);
  const [prenotazione, setPrenotazione] = React.useState([]);
  const [foto, setFoto] = React.useState([]);
  const [fetching, setFetching] = React.useState(true);
  const [currentUser, setCurrentUser] = React.useState(undefined);

  const errorToast = useRef(null);

  const checkServizi = async () => {
    const serviziFirebase = await db.collection('servizi').get();
    // const messageRef = db.collection('rooms').doc('roomA').collection('messages').doc('message1');
    // const currentUserId = auth.currentUser.uid;
    // const serviziFirebase = db.ref(`notes/${currentUserId}`);
    //.where('ownerId','==',uid)
    //.doc(id)
    if (serviziFirebase) {
      const tempDoc = serviziFirebase.docs.map((doc) => {
        return { id: doc.id, ...doc.data() }
      })
      tempDoc.sort((a, b) => parseFloat(a.order) - parseFloat(b.order));

      // setFetching(false);
      setServizi(tempDoc);
      // userId: currentUserId
    } else {
      // setFetching(false);
    }
  }
  const checkCommercianti = async () => {
    const commerciantiFirebase = await db.collection('commercianti').get();
    if (commerciantiFirebase) {
      const tempDoc = commerciantiFirebase.docs.map((doc) => {
        return { id: doc.id, ...doc.data() }
      })
      let FinlatempDoc = tempDoc.filter(i => i.status);
      console.log(JSON.stringify(FinlatempDoc, null, 2));
      setCommercianti(FinlatempDoc);
    } else {
    }
  }
  const checkFoto = async () => {
    const fotoFirebase = await db.collection('foto').get();
    if (fotoFirebase) {
      const tempDoc = fotoFirebase.docs.map((doc) => {
        return { id: doc.id, ...doc.data() }
      })
      // tempDoc.sort((a, b) => parseFloat(a.order) - parseFloat(b.order));
      setFoto(tempDoc);
    } else {
    }
  }

  const startDb = async () => {
    try {
      await Promise.all([
        checkCommercianti(),
        checkServizi(),
        checkFoto()
      ]).then(() => {
        setFetching(false);
        console.log("doneDBGOT-firebase")
      })
    } catch (e) {
      console.log(e, "error")
    }
  }

  React.useEffect(() => {
    startDb();
  }, [])
  // const [lang, setLang] = React.useState("it");
  // Listen for authentication state to change.
  React.useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
    });
    // firebase.initializeApp(FirebaseConfig);
    // firebase.auth().onAuthStateChanged((user) => {
    //   if (user != null) {
    //     console.log("We are authenticated now!");
    //   }
    // });
    return () => {
      unsubscribe();
    }
  }, []);

  const showToast = (header, message, type = 'error', pos = 'top', duration = 1500) => {
    errorToast.current.show({
      text1: header,
      text2: message,
      type: type,
      position: pos,
      visibilityTime: duration,
      topOffset: 50,
      bottomOffset: 120
    });
    return null;
  };

  const context = {
    showToast,
    servizi,
    commercianti,
    foto,
    currentUser,
    setCurrentUser,
    prenotazione,
    setPrenotazione
  };

  if (!isLoadingComplete || fetching) {
    //if (true) {
    return (
      <Loader color={Colors.light.bianco} size={"large"} animating={true} />
    )
  }
  return (
    <SafeAreaProvider>
      <AppContext.Provider value={context}>
        <Navigation colorScheme={colorScheme} />
        <Toast
          ref={errorToast}
        />
      </AppContext.Provider>
    </SafeAreaProvider>
  );
}

//export default withSecurityScreen(App);
export default App;