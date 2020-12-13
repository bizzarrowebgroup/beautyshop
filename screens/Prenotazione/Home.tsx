import React, { useRef, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import moment from 'moment';
import { db } from '../../network/Firebase';

import Header from "../../components/Header";
import Loader from "../../components/Loader";
import BaseText from "../../components/StyledText";
import Colors from "../../constants/Colors";
import Layout from '../../constants/Layout'

const styles = StyleSheet.create({
  content: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    top: -35,
    backgroundColor: Colors.light.bianco,
    height: Layout.window.height,
  },
  contentRows: {
    paddingHorizontal: 20,
    paddingVertical: 20
  },
});

export default ({ route, navigation }) => {
  return (
    <View>
      <StatusBar style="light" />
      <Header hasBack={true} hasTitleHeight={true} title={`Quando?`} onPress={() => navigation.goBack()} />
      <View style={styles.content}>
        <View style={styles.contentRows}>

        </View>
      </View>
    </View>
  );
};