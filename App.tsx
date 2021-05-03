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
import * as Notifications from 'expo-notifications';

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

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

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
    
    if (serviziFirebase) {
      const tempDoc = serviziFirebase.docs.map((doc) => {
        return { id: doc.id, ...doc.data() }
      })
      tempDoc.sort((a, b) => parseFloat(a.order) - parseFloat(b.order));

      setServizi(tempDoc);
    } else {
    }
  }
  const checkCommercianti = async () => {
    const commerciantiFirebase = await db.collection('commercianti').get();
    if (commerciantiFirebase) {
      const tempDoc = commerciantiFirebase.docs.map((doc) => {
        return { id: doc.id, ...doc.data() }
      })
      let FinlatempDoc = tempDoc.filter(i => i.status);
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
        console.log("doneDBGOT-firebase")
      })
    } catch (e) {
      console.log(e, "error")
    }
  }

  // const [lang, setLang] = useState("it");
  useEffect(() => {
    Instabug.setLocale(Instabug.locale.italian);
    Surveys.setShouldShowWelcomeScreen(true);
    Instabug.setWelcomeMessageMode(Instabug.welcomeMessageMode.live) // For live users
    Instabug.startWithToken('a76401d7b38130efe962e84ad540da48', [__DEV__? Instabug.invocationEvent.none : Instabug.invocationEvent.shake]);
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