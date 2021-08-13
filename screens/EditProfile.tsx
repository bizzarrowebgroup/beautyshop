import React, { useContext, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import Header from '../components/Header'
import BaseText from '../components/StyledText'
import Colors from '../constants/Colors'
import Layout from '../constants/Layout'
import { AppContext } from '../context/Appcontext'

const EditProfile = ({ navigation }) => {
  const {
    currentUser,
    setCurrentUser,
    showToast
  } = useContext(AppContext);
  useEffect(() => {
    // console.log("--currentUser", currentUser)
    if (currentUser == undefined || currentUser.length <= 0) {
      showToast(
        "ERRORE GENERICO",
        "Non riesco a recuperare le tue informazioni",
        "error",
        "bottom",
        4000
      );
      navigation.goBack();
    }
  }, [currentUser])
  if (currentUser == undefined || currentUser.length <= 0) return <View></View>;
  const onPressEditRowsInfo = (type) => {
    switch (type) {
      case 0:
        break;
      case 1:
        navigation.navigate("EditEmail");
        break;
      case 2:
        break;
    }
  }
  const { photoURL, phone, displayName, email } = currentUser;
  return (
    <View>
      <StatusBar style="light" />
      <Header hasBack={true} hasTitleHeight={true} title={`Modifica le\ninformazioni personali`} onPress={() => navigation.goBack()} />
      <View style={styles.content}>
        <View style={styles.contentRows}>
          <TouchableOpacity style={[styles.row, styles.profileIconRow]}>
            <Image source={{ uri: photoURL }} style={styles.profileIcon} />
            <BaseText styles={styles.profileIconEditText}>{"Modifica immagine profilo"}</BaseText>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onPressEditRowsInfo(0)} style={[styles.row, styles.rowInfos]}>
            <BaseText weight={700} styles={styles.infoTitle}>{"Nome"}</BaseText>
            <View style={styles.rowValueContent}>
              <BaseText styles={styles.infoValue}>{displayName ? displayName : ""}</BaseText>
              <BaseText styles={styles.infoEditValue}>{"Modifica"}</BaseText>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onPressEditRowsInfo(1)} style={[styles.row, styles.rowInfos]}>
            <BaseText weight={700} styles={styles.infoTitle}>{"Email"}</BaseText>
            <View style={styles.rowValueContent}>
              <BaseText styles={styles.infoValue}>{email ? email : ""}</BaseText>
              <BaseText styles={styles.infoEditValue}>{"Modifica"}</BaseText>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onPressEditRowsInfo(2)} style={[styles.row, styles.rowInfos]}>
            <BaseText weight={700} styles={styles.infoTitle}>{"Numero di telefono"}</BaseText>
            <View style={styles.rowValueContent}>
              <BaseText styles={styles.infoValue}>{phone ? phone : ""}</BaseText>
              <BaseText styles={styles.infoEditValue}>{"Modifica"}</BaseText>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default EditProfile;

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
  row: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  rowInfos: {
    //paddingVertical: 10,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignContent: "flex-start",
    alignItems: "flex-start"
  },
  profileIconRow: {
    paddingBottom: 25
  },
  profileIcon: {
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
    marginRight: 20
  },
  profileIconEditText: {
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textDecorationColor: "#000",
  },
  infoEditValue: {
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textDecorationColor: "#2A49CC",
    color: "#2A49CC"
  },
  infoTitle: {
  },
  infoValue: {
    paddingVertical: 20
  },
  rowValueContent: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center"
  }
})
