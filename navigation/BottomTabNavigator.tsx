import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
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

import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';

import { BottomTabParamList, TabOneParamList, TabTwoParamList } from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Esplora"
      tabBarOptions={{
        activeTintColor: Colors[colorScheme].tint,
        inactiveTintColor: Colors[colorScheme].tabIconDefault,
        labelStyle: {
          fontSize: 12,
          fontFamily: "Montserrat_400Regular"
        },
        style: {
          width: '100%',
          position: 'absolute',
          zIndex: 1,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          // marginTop: 20,
          // borderWidth: 1,
          // borderColor: 'red'
        },
        // style: {
        //   backgroundColor: 'white',
        //   borderTopLeftRadius: 15,
        //   borderTopRightRadius: 15,
        //   position: 'absolute',
        //   left: 0,
        //   right: 0,
        //   bottom: 0,
        //   elevation: 0,
        //   // overflow: 'hidden',
        // }
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
        component={ProfiloNav}
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
        // zIndex: -999999999,
        // overflow: "hidden",
        // backgroundColor: "red",
        // position: "absolute",
        // bottom: 0,
        // overflow: "hidden"
        // borderBottomLeftRadius: 80,
        // borderBottomRightRadius: 80,
        width: 80,
        height: 80,
        // backgroundColor: Colors.light.bg,
        backgroundColor: 'transparent',
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        top: -20,
        borderRadius: 60,
      }}>
        <View style={[props.style, {
          borderRadius: 30,
          borderWidth: 0,
          width: 58,
          height: 58,
          top: 0,
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
          backgroundColor: props.brd,
          shadowOpacity: 0.25,
          shadowRadius: 4,
          shadowOffset: {
            width: 0,
            height: 4
          },
          zIndex: 999999,
          overflow: 'visible',
        }]}>
          <Ionicons name={props.name} color={props.color} size={props.size} />
        </View>
      </View>
    );
  }
  return <View style={props.style}>
    <Ionicons {...props} />
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
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="Book"
        component={Book}
        options={{ headerShown: false }}
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
