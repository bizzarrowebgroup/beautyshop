import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import NetInfo from "@react-native-community/netinfo";
import * as Sentry from 'sentry-expo';
import * as firebase from "firebase";

// Sentry.init({
//   dsn: "https://6f3d61d6211445b4a5af61e57aaecbaa@o421980.ingest.sentry.io/5342571",
//   enableInExpoDevelopment: true,
//   debug: true,
// });

const FirebaseConfig = {
  apiKey: "AIzaSyDTRi3LQzoW4dMkbfPOpZVayYyMkYyp0ac",
  authDomain: "beautyshop-afe23.firebaseapp.com",
  databaseURL: "https://beautyshop-afe23.firebaseio.com",
  projectId: "beautyshop-afe23",
  storageBucket: "beautyshop-afe23.appspot.com",
  messagingSenderId: "470013044742",
  appId: "1:470013044742:web:c5cabae0efe0f2da96bb87"
}

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  React.useEffect(() => {
    // const unsubscribe = NetInfo.addEventListener(state => {
    //   console.log("Connection type", state.type);
    //   console.log("Is connected?", state.isConnected);
    // });
    if (!firebase.apps.length) {
      firebase.initializeApp(FirebaseConfig);
    }
    // return () => {
    //   unsubscribe();
    // }
  }, []);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
