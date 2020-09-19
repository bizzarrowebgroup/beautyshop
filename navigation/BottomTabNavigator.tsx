//import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator, TransitionPresets, CardStyleInterpolators } from '@react-navigation/stack';

import * as React from 'react';
import { View, TouchableOpacity } from 'react-native';

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

//import TabOneScreen from '../screens/TabOneScreen';
//import TabTwoScreen from '../screens/TabTwoScreen';

import { BottomTabParamList, TabOneParamList, TabTwoParamList } from '../types';

import Spinner from '../components/Spinner';
import { AuthUserContext } from './AuthUserProvider';
import { auth } from '../network/Firebase';
import BottomIcon from '../components/svg/BottomIcon';
import BaseText from '../components/StyledText';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();
//import { SvgXml } from 'react-native-svg';
import Subtract from '../assets/svg/Subtract.svg';
import Layout from '../constants/Layout';

const TabBar = ({ state, descriptors, navigation, }) => {
  return (
    <>
      <Subtract width={Layout.window.width} height={88} style={{
        position: "absolute",
        bottom: 0,
        //backgroundColor: "blue",
        //padding: 20,
        //alignSelf: "center",
      }} />
      <View style={{
        flexDirection: "row",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        bottom: 5,
      }}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{
                flexDirection: "column",
                backgroundColor: "transparent",
                alignItems: "center",
                alignContent: "center",
                justifyContent: "center",
                //marginHorizontal: 5,
                width: 80,
                height: 80
              }}
            >
              {options.tabBarIcon !== undefined && options.tabBarIcon(isFocused ? Colors["light"].tint : Colors["light"].tabIconDefault)}
              <BaseText size={10} styles={{
                color: isFocused ? '#673ab7' : '#222',
                marginTop: 10,
              }}>
                {label}
              </BaseText>
            </TouchableOpacity>
          );
        })
        }
      </View>
      {/*<View style={{ backgroundColor: "white", width: "100%", height: 10 }} />*/}
    </>
  )
}

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();
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
      }}
      tabBar={TabBar}
    >
      <BottomTab.Screen
        name="Esplora"
        component={TabOneNavigator}
        options={{
          tabBarIcon: (color) => <TabBarIcon name="ios-search" color={color} size={22} style={{ marginBottom: -3 }} />,
        }}
      />
      <BottomTab.Screen
        name="Preferiti"
        component={PreferitiNav}
        options={{
          tabBarIcon: (color) => <TabBarIcon name="ios-heart-empty" color={color} size={22} style={{ marginBottom: -3 }} />,
        }}
      />
      <BottomTab.Screen
        name="Add"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: (color) => <TabBarIcon name="ios-add" color={color} size={22} style={{
          }} brd={Colors.light.arancioDes} />,
          tabBarLabel: null,
        }}
      />
      <BottomTab.Screen
        name="Prenotazioni"
        component={PrenotazioniNav}
        options={{
          tabBarIcon: (color) => <TabBarIcon name="ios-calendar" color={color} size={22} style={{ marginBottom: -3 }} />,
        }}
      />
      <BottomTab.Screen
        name="Profilo"
        component={user ? ProfiloNav : AuthNav}
        options={{
          tabBarIcon: (color) => <TabBarIcon name="ios-people" color={color} size={22} style={{ marginBottom: -3 }} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

function TabBarIcon(props: { name: string; color: any, size: number | 18, style: any, brd?: any }) {
  console.log(props.color, "props.color")
  if (props.name === "ios-add") {
    return (
      <View style={[props.style, {
        borderRadius: 30,
        width: 60,
        height: 60,
        bottom: 15,
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        backgroundColor: props.brd,
        //zIndex: -10
      }]}>
        <BottomIcon type={props.name} color={props.color} size={props.size} />
      </View>
    );
  }
  return (
    <View style={{
      //backgroundColor: "red",
      //height: 20,
      //width: Layout.window.width
    }}>
      <View style={[props.style, { backgroundColor: "transparent" }]}>
        <BottomIcon type={props.name} color={props.color} size={props.size} />
      </View>
    </View>
  );
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