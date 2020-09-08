import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
const StarsReview = () => {
  return (
    <>
      <Ionicons name="ios-star" size={15} color={Colors.light.giallo} style={{ marginLeft: 10 }} />
      <Ionicons name="ios-star" size={15} color={Colors.light.giallo} />
      <Ionicons name="ios-star" size={15} color={Colors.light.giallo} />
      <Ionicons name="ios-star" size={15} color={Colors.light.giallo} />
      <Ionicons name="ios-star" size={15} color={Colors.light.giallo} />
    </>
  )
}

export default StarsReview;

const styles = StyleSheet.create({})
