import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator, TransitionPresets, CardStyleInterpolators } from '@react-navigation/stack';

import * as React from 'react';
import { Text, View } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import HomePage from '../screens/HomePage';
import Shop from '../screens/Shop';
import Review from '../screens/Review';
import Book from '../screens/Book';
import Preferiti from '../screens/Preferiti';
import Prenotazioni from '../screens/Prenotazioni';
import Profilo from '../screens/Profilo';

import Login from '../screens/Login';
import Register from '../screens/Register';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';

import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';

import { BottomTabParamList, TabOneParamList, TabTwoParamList } from '../types';

import Spinner from '../components/Spinner';
import { AuthUserContext } from './AuthUserProvider';
import { auth } from '../network/Firebase';
import BottomIcon from '../components/svg/BottomIcon';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  const { user, setUser } = React.useContext(AuthUserContext);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // onAuthStateChanged returns an unsubscriber
    const unsubscribeAuth = auth.onAuthStateChanged(async authUser => {
      try {
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
    return <Spinner />;
  }
  return (
    <BottomTab.Navigator
      initialRouteName="Esplora"
      tabBarOptions={{
        activeTintColor: Colors[colorScheme].tint,
        inactiveTintColor: Colors[colorScheme].tabIconDefault,
        allowFontScaling: true,
        labelStyle: {
          fontSize: 12,
          fontFamily: "Montserrat_400Regular",
          paddingTop: 5
        },
        tabStyle: {
          paddingTop: 5
        },
        style: {
          position: 'absolute',
          backgroundColor: 'rgba(255, 255, 255, 1)',
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
        },
      }}>
      <BottomTab.Screen
        name="Esplora"
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-search" color={color} size={30} style={{ marginBottom: -3 }} />,
        }}
      />
      <BottomTab.Screen
        name="Preferiti"
        component={PreferitiNav}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-heart-empty" color={color} size={30} style={{ marginBottom: -3 }} />,
        }}
      />
      <BottomTab.Screen
        name="Add"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-add" color={color} size={40} style={{
          }} brd={Colors.light.arancioDes} />,
          tabBarLabel: () => <></>
        }}
      />
      <BottomTab.Screen
        name="Prenotazioni"
        component={PrenotazioniNav}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-calendar" color={color} size={30} style={{ marginBottom: -3 }} />,
        }}
      />
      <BottomTab.Screen
        name="Profilo"
        component={user ? ProfiloNav : AuthNav}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-people" color={color} size={30} style={{ marginBottom: -3 }} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

function TabBarIcon(props: { name: string; color: string, size: number | 30, style: any, brd?: any }) {
  if (props.name === "ios-add") {
    return (
      <View style={{
        // overflow: "hidden",
        // backgroundColor: "red",
        // position: "absolute",
        // bottom: 0,
        // overflow: "hidden"
        // borderBottomLeftRadius: 80,
        // borderBottomRightRadius: 80,
        width: 80,
        height: 80,
        backgroundColor: Colors.light.bg,
        // backgroundColor: "transparent",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        // top: -20,
        borderRadius: 40,
        position: "absolute",
        bottom: 0
      }}>
        <View style={[props.style, {
          borderRadius: 30,
          width: 60,
          height: 60,
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
          backgroundColor: props.brd,
          // shadowOpacity: 0.25,
          // shadowRadius: 4,
          // shadowOffset: {
          //   width: 0,
          //   height: 4
          // },
          // zIndex: 999999,
          // overflow: 'visible',
        }]}>
          <BottomIcon type={props.name} color={props.color} size={props.size} />
          {/* <Ionicons name={props.name} color={props.color} size={props.size} /> */}
        </View>
      </View>
    );
  }
  return <View style={[props.style]}>
    <BottomIcon type={props.name} color={props.color} size={props.size} />
  </View>;
}

const TabOneStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="Homepage"
        component={HomePage}
        options={{ headerShown: false }}
      />
      <TabOneStack.Screen
        name="Shop"
        component={Shop}
        options={{ headerShown: false }}
      />
      <TabOneStack.Screen
        name="Review"
        component={Review}
        options={{ headerShown: false }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator screenOptions={{
      headerShown: false,
      // cardStyle: { backgroundColor: 'red' },
      // cardOverlayEnabled: true,
      ...TransitionPresets.ModalPresentationIOS,
    }} mode="modal">
      <TabTwoStack.Screen
        name="Book"
        component={Book}
        // options={{
        //   cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
        // }}
      />
    </TabTwoStack.Navigator>
  );
}
const PreferitiStack = createStackNavigator();

function PreferitiNav() {
  return (
    <PreferitiStack.Navigator>
      <PreferitiStack.Screen
        name="Preferiti"
        component={Preferiti}
        options={{ headerShown: false }}
      />
    </PreferitiStack.Navigator>
  );
}
const PrenotaziniStack = createStackNavigator();

function PrenotazioniNav() {
  return (
    <PrenotaziniStack.Navigator>
      <PrenotaziniStack.Screen
        name="Prenotazioni"
        component={Prenotazioni}
        options={{ headerShown: false }}
      />
    </PrenotaziniStack.Navigator>
  );
}
const ProfiloStack = createStackNavigator();

function ProfiloNav() {
  return (
    <ProfiloStack.Navigator>
      <ProfiloStack.Screen
        name="Profilo"
        component={Profilo}
        options={{ headerShown: false }}
      />
    </ProfiloStack.Navigator>
  );
}

const AuthStack = createStackNavigator();

function AuthNav() {
  return (
    <AuthStack.Navigator initialRouteName="Login">
      <AuthStack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="Register"
        component={Register}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={{ headerShown: false }}
      />
    </AuthStack.Navigator>
  );
}