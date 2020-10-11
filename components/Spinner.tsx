import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import Colors from '../constants/Colors';


export default function Spinner() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={Colors.light.arancioDes} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});