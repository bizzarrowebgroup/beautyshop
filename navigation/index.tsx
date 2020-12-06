import * as React from 'react';
import { ColorSchemeName, View } from 'react-native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';

import { RootStackParamList } from '../types';
import { AuthUserProvider } from './AuthUserProvider';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';

import Colors from '../constants/Colors';
import Loader from '../components/Loader';
import { AuthUserContext } from './AuthUserProvider';
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
import Preferiti from '../screens/Preferiti';
import Prenotazioni from '../screens/Prenotazioni';
import CompleteSocial from '../screens/CompleteSocial';
import EditProfile from '../screens/EditProfile';
import EditEmail from '../screens/EditEmail';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      //theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
      theme={DefaultTheme}
    >
      <AuthUserProvider>
        <RootNavigator />
      </AuthUserProvider>
    </NavigationContainer>
  );
}

//const Stack = createStackNavigator<RootStackParamList>();
const Stack = createStackNavigator();

function RootNavigator() {
  const { user, setUser } = React.useContext(AuthUserContext);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // onAuthStateChanged returns an unsubscriber
    const unsubscribeAuth = auth.onAuthStateChanged(async authUser => {
      try {
        //console.log(authUser, "authUser")
        await (authUser ? setUser(authUser) : setUser(null));
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    });

    // unsubscribe auth listener on unmount
    return unsubscribeAuth;
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: Colors.light.ARANCIO, }}>
        <Loader size="large" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: Colors.light.ARANCIO, }}>
      <Stack.Navigator
        initialRouteName="Homepage"
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
            //...TransitionPresets.ModalPresentationIOS,
            //gestureEnabled: true,
            headerShown: false,
            //cardOverlayEnabled: false,
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
    </View>
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