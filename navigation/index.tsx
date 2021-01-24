import * as React from 'react';
import { ColorSchemeName, View } from 'react-native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';

import { RootStackParamList } from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';

import Colors from '../constants/Colors';
import Loader from '../components/Loader';
import { AuthUserContext, AuthUserProvider } from './AuthUserProvider';
import { auth } from '../network/Firebase';

import NotFoundScreen from '../screens/NotFoundScreen';
import Login from '../screens/Login';
import Register from '../screens/Register';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import IntroScreen from '../screens/IntroScreen';
import NewHomePage from '../screens/NewHomePage';
import Profilo from '../screens/Profilo';
import Review from '../screens/Review';
//import Shop from '../screens/Shop';
import Shop from '../screens/Commerciante/Home';
import Prenotazione from '../screens/Prenotazione/Home';
import DettagliPrenotazione from '../screens/Prenotazione/DettagliPrenotazione';
import PrenotazioneOk from '../screens/Prenotazione/PrenotazioneOk';
import InfoPren from '../screens/Prenotazione/InfoPren';

import Preferiti from '../screens/Preferiti';
import Prenotazioni from '../screens/Prenotazioni';
import CompleteSocial from '../screens/CompleteSocial';
import EditProfile from '../screens/EditProfile';
import EditEmail from '../screens/EditEmail';
import ProfileSettings from '../screens/ProfileSettings';
import SplashScreen from '../screens/SplashScreen';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      //theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
      theme={DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

//const Stack = createStackNavigator<RootStackParamList>();
const Stack = createStackNavigator();

function RootNavigator() {
  const { user, setUser } = React.useContext(AuthUserContext);
  // const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // onAuthStateChanged returns an unsubscriber
    const unsubscribeAuth = auth.onAuthStateChanged(async authUser => {
      try {
        // console.log("_____authUser_______", authUser)
        await (authUser ? setUser(authUser) : setUser(null));
        // setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    });

    // unsubscribe auth listener on unmount
    return unsubscribeAuth;
  }, []);

  // if (isLoading) {
  //   return (
  //     <View style={{ flex: 1, backgroundColor: Colors.light.ARANCIO, }}>
  //       <Loader size="large" />
  //     </View>
  //   );
  // }

  return (
    <Stack.Navigator
      initialRouteName="SplashScreen"
      mode="modal"
    >
      <Stack.Screen name="Root" component={BottomTabNavigator} />
      <Stack.Screen name="IntroScreen" component={IntroScreen}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen name="Review" component={Review}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen name="Shop" component={Shop}
        options={{
          //cardOverlayEnabled: false,
          //...TransitionPresets.ModalPresentationIOS,
          //gestureEnabled: true,
          headerShown: false,
        }}
      />
      <Stack.Screen name="Prenotazione" component={Prenotazione}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="DettagliPrenotazione" component={DettagliPrenotazione}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="PrenotazioneOk" component={PrenotazioneOk}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen name="InfoPren" component={InfoPren}
        options={{
          headerShown: false,
          gestureEnabled: true,
        }}
      />
      <Stack.Screen name="Homepage" component={NewHomePage}
        options={{
          headerShown: false,
          gestureEnabled: false,
          cardOverlayEnabled: false,
        }}
      />
      <Stack.Screen name="Auth" component={AuthNav}
        options={{
          ...TransitionPresets.ModalPresentationIOS,
          gestureEnabled: true,
          headerShown: false,
          cardOverlayEnabled: false,
        }}
      />
      <Stack.Screen name="SplashScreen" component={SplashScreen}
        options={{
          headerShown: false,
          gestureEnabled: false,
          cardOverlayEnabled: false,
        }}
      />
      <Stack.Screen
        name="Profilo"
        component={Profilo}
        options={{
          //...TransitionPresets.ModalPresentationIOS,
          //gestureEnabled: true,
          headerShown: false,
          //cardOverlayEnabled: false,
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          //...TransitionPresets.ModalPresentationIOS,
          //gestureEnabled: true,
          headerShown: false,
          //cardOverlayEnabled: false,
        }}
      />
      <Stack.Screen
        name="EditEmail"
        component={EditEmail}
        options={{
          //...TransitionPresets.ModalPresentationIOS,
          //gestureEnabled: true,
          headerShown: false,
          //cardOverlayEnabled: false,
        }}
      />
      <Stack.Screen
        name="ProfileSettings"
        component={ProfileSettings}
        options={{
          //...TransitionPresets.ModalPresentationIOS,
          //gestureEnabled: true,
          headerShown: false,
          //cardOverlayEnabled: false,
        }}
      />
      <Stack.Screen
        name="Preferiti"
        component={Preferiti}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Prenotazioni"
        component={Prenotazioni}
        options={{
          //...TransitionPresets.ModalPresentationIOS,
          //gestureEnabled: true,
          headerShown: false,
          //cardOverlayEnabled: false,
        }}
      />
      <Stack.Screen name="NotFound" component={NotFoundScreen}
        options={{
          ...TransitionPresets.ModalPresentationIOS,
          headerShown: false,
          gestureEnabled: true,
        }}
      />
    </Stack.Navigator>
  );
}

const AuthStack = createStackNavigator();

function AuthNav() {
  return (
    <AuthStack.Navigator initialRouteName="Login">
      <AuthStack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
          gestureEnabled: false
        }}
      />
      <AuthStack.Screen
        name="Register"
        component={Register}
        options={{
          headerShown: false
        }}
      />
      <AuthStack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={{
          headerShown: false
        }}
      />
      <AuthStack.Screen
        name="CompleteSocial"
        component={CompleteSocial}
        options={{
          headerShown: false,
          gestureEnabled: false
        }}
      />

    </AuthStack.Navigator>
  );
}