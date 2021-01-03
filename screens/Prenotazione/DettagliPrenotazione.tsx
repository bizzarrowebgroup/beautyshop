import React, { useState, useEffect } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import moment from 'moment';
import { StatusBar } from "expo-status-bar";

import Header from "../../components/Header";
import BaseText from "../../components/StyledText";
import Colors from "../../constants/Colors";
import { FlatList } from 'react-native-gesture-handler';
import { somma } from '../../constants/Utils';

const styles = StyleSheet.create({
  content: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    top: -35,
    backgroundColor: Colors.light.bianco,
    //height: Layout.window.height,
  },
  contentRows: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    //paddingTop: 60,
  },
  item: {
    flexDirection: "row",
    alignContent: "flex-start",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginVertical: 5,
  },
  date: {
    flexDirection: "column",
    alignContent: "flex-start",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginVertical: 5,
  }
})

const Item = ({ data }) => {
  let {
    title,
    cost,
    category,
    id
  } = data
  return (
    <View style={styles.item}>
      <BaseText>{title}</BaseText>
      <BaseText>{cost + " €"}</BaseText>
    </View>
  )
};

const DettagliPrenotazione = ({ route, navigation }) => {
  const [title, setTitle] = useState(undefined);
  const [cart, setCart] = useState(route.params?.cart);
  const [date, setDate] = useState(undefined);
  const [timeSelected, setTimeSelected] = useState(route.params?.timeSelected);

  useEffect(() => {
    let commercianteId = route.params?.commercianteId;
    let daySelected = route.params?.daySelected;
    let titoloNegozio = route.params?.titoloNegozio;
    if (cart && commercianteId && daySelected && timeSelected) {
      let date = moment(daySelected),
        time = moment(timeSelected, 'HH:mm');
      date.set({
        hour: time.get('hour') + 1, // check this
        minute: time.get('minute'),
        second: time.get('second')
      });
      setDate(date);
      setTitle(titoloNegozio);
      console.log("DATAPAGES---", JSON.stringify({ titoloNegozio, cart, commercianteId, date, }))
    } else {
      navigation.goBack();
      alert("Errore nel carrello.")
    }
  }, [])
  const renderItem = ({ item }) => (
    <Item data={item} />
  );
  return (
    <View style={{ backgroundColor: Colors.light.bianco, flex: 1 }}>
      <StatusBar style="light" />
      <Header hasBack={true} hasTitleHeight={true} title={title} onPress={() => navigation.goBack()} />
      <View style={styles.content}>
        <View style={styles.contentRows}>
          {/*<View style={{ height: 1, backgroundColor: "#ddd", width: "100%", marginVertical: 10 }} />*/}
          <View style={styles.date}>
            <BaseText size={14} weight={800}>{moment(date).format("dddd DD MMMM")}</BaseText>
            {/*<BaseText styles={{ paddingTop: 10 }}>{`Il tuo appuntamento inizierà alle ${moment(date).format('HH:mm')} e terminerà alle ___.`}</BaseText>*/}
            <BaseText styles={{ paddingTop: 10 }}>{`Il tuo appuntamento inizierà alle ${moment(date).format('HH:mm')}.`}</BaseText>
            <View style={{ height: 1, backgroundColor: "#ddd", width: "100%", marginVertical: 10 }} />
          </View>
          {/*<View style={{ paddingTop: 100, paddingBottom: 20 }}>*/}
          <BaseText size={14} weight={800}>{"Riepilogo"}</BaseText>
          {/*</View>*/}
          <FlatList
            data={cart}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
          <View style={{ height: 1, backgroundColor: "#ddd", width: "100%", marginVertical: 10 }} />
          <View style={styles.item}>
            <BaseText weight={800}>{"Totale"}</BaseText>
            <BaseText>{somma(cart, "cost")}</BaseText>
          </View>
          <View style={{ height: 1, backgroundColor: "#ddd", width: "100%", marginVertical: 10 }} />
        </View>
      </View>
      <View
        style={{
          position: "absolute",
          bottom: 40,
          left: 0,
          right: 0,
          paddingHorizontal: 20,
        }}
      >
        <TouchableOpacity
          //onPress={() => navigation.navigate("DettagliPrenotazione", { cart, commercianteId, daySelected, timeSelected, titoloNegozio })}
          style={{
            //marginHorizontal: 20,
            //marginTop: 10,
            borderRadius: 10,
            backgroundColor: "#FB6E3B",
            height: 45,
            alignContent: "center",
            justifyContent: "center",
            paddingHorizontal: 10,
            alignItems: "center",
            flexDirection: "row"
          }}>
          <BaseText weight={900} size={14} color={Colors.light.bianco}>Continua</BaseText>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default DettagliPrenotazione

