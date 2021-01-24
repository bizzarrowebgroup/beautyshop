import React, { useState, useRef, useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { LogBox, View } from 'react-native';
LogBox.ignoreLogs(['Deprecation warning', 'VirtualizedList', 'Non-serializable']);

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
// import Colors from './constants/Colors';
import Navigation from "./navigation";
// import Loader from './components/Loader';
import AppLoading from 'expo-app-loading';

import 'moment';
import 'moment/locale/it';
import moment from 'moment-timezone';
moment().locale('it');

// import * as Sentry from "sentry-expo";
import Toast from "react-native-toast-message"
import { db } from './network/Firebase';
import { AppContext } from './context/Appcontext';
import { AuthUserContext, AuthUserProvider } from "./navigation/AuthUserProvider";
import AppOfflineNotice from "./components/AppOffline";
import Colors from "./constants/Colors";

//import { withSecurityScreen } from "./components/withSecurityScreen";

// Sentry.init({
//   dsn: "https://6f3d61d6211445b4a5af61e57aaecbaa@o421980.ingest.sentry.io/5342571",
//   enableInExpoDevelopment: true,
//   debug: true,
// });
import Instabug, { Surveys } from 'instabug-reactnative';

function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [servizi, setServizi] = useState([]);
  const [commercianti, setCommercianti] = useState([]);
  const [prenotazione, setPrenotazione] = useState(undefined);
  const [foto, setFoto] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [currentUser, setCurrentUser] = useState(undefined);
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
      // console.log(JSON.stringify(FinlatempDoc, null, 2));
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
        checkFoto(),
      ]).then(() => {
        // setFetching(false);
        console.log("doneDBGOT-firebase")
      })
    } catch (e) {
      console.log(e, "error")
    }
  }

  // const [lang, setLang] = useState("it");
  useEffect(() => {
    console.log("__DEV__", __DEV__)
    if (__DEV__ === false) {
      Instabug.setLocale(Instabug.locale.italian);
      Surveys.setShouldShowWelcomeScreen(true);
      Instabug.setWelcomeMessageMode(Instabug.welcomeMessageMode.live) // For live users
      // Instabug.setWelcomeMessageMode(Instabug.welcomeMessageMode.beta) // For beta testers
      // Instabug.setWelcomeMessageMode(Instabug.welcomeMessageMode.disabled) // Disable welcome message

      // Instabug.isRunningLive((isLive) => {
      // if (isLive) {
      Instabug.startWithToken('a76401d7b38130efe962e84ad540da48', [Instabug.invocationEvent.shake]);
      // } else {
      // Instabug.startWithToken('aa8227dafbd16f944712ffd9aae2af7d', [Instabug.invocationEvent.shake]);
      // }
      // });

    }
  })

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
    return (
      <View style={{ flex: 1, backgroundColor: Colors.light.ARANCIO }}>
        <AppLoading startAsync={startDb} onFinish={() => setFetching(false)} onError={console.warn} />
      </View>
    );
  }
  return (
    <SafeAreaProvider>
      <AuthUserProvider>
        <AppContext.Provider value={context}>
          {/* <AppOfflineNotice /> */}
          <Navigation colorScheme={colorScheme} />
          <Toast
            ref={errorToast}
          />
        </AppContext.Provider>
      </AuthUserProvider>
    </SafeAreaProvider>
  );
}

//export default withSecurityScreen(App);
export default App;