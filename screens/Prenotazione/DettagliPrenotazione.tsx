import React, { useState, useEffect } from 'react'
import { StyleSheet, View, TouchableOpacity, ActivityIndicator, TextInput, Keyboard } from 'react-native'
import moment from 'moment';
import { StatusBar } from "expo-status-bar";


import Header from "../../components/Header";
import BaseText from "../../components/StyledText";
import Colors from "../../constants/Colors";
import { FlatList } from 'react-native-gesture-handler';
import { somma } from '../../constants/Utils';
import { AuthUserContext } from '../../navigation/AuthUserProvider';
import { db } from '../../network/Firebase';

const styles = StyleSheet.create({
  content: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    top: -35,
    backgroundColor: Colors.light.bianco,
  },
  contentRows: {
    paddingHorizontal: 20,
    paddingVertical: 20,
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
  const [date, setDate] = useState(undefined);
  const [slot_end_time, setSlotEnd] = useState(undefined);
  const [notes, setNotes] = useState(undefined);
  const [loadingPrenotazione, setLoadingPrenotazione] = useState(false);
  const [cart, setCart] = useState(route.params?.cart);
  const [timeSelected, setTimeSelected] = useState(route.params?.timeSelected);
  const [commercianteId, setComID] = useState(route.params?.commercianteId);
  const { user, setUser } = React.useContext(AuthUserContext);

  useEffect(() => {
    let daySelected = route.params?.daySelected;
    let titoloNegozio = route.params?.titoloNegozio;
    if (cart && commercianteId && daySelected && timeSelected) {
      let date = moment(daySelected),
        time = moment(timeSelected, 'HH:mm');
      date.set({
        hour: time.get('hour'), // check this
        minute: time.get('minute'),
        second: time.get('second')
      });
      setDate(date);
      setTitle(titoloNegozio);
      let serviceDuration = cart.reduce((a, b) => +a + +b["durata"], 0);
      setSlotEnd(moment(date).add(serviceDuration * 10, 'minutes').format("HH:mm"))
      //console.log("dataRef---",{ date, serviceDuration, slot_end_time, titoloNegozio, commercianteId, date,  })
      //console.log("cart---", JSON.stringify({ cart }))
    } else {
      navigation.goBack();
      alert("Errore nel carrello.")
    }
  }, [])
  const renderItem = ({ item }) => (
    <Item data={item} />
  );
  const handlePrenotazione = async () => {
    setLoadingPrenotazione(true)
    try {
      if (user !== null) {
        let prenotazione = {
          userId: user.uid,
          slot_date: date.toString(),
          slot_time: timeSelected,
          slot_end_time: slot_end_time,
          state: 0,
          cart,
          commercianteId,
          notes,
          totale: somma(cart, "cost", false)
        }
        console.log("prenotazione", prenotazione)
        // const res = await db.collection('prenotazioni').add(prenotazione);
        // console.log('Added prenotazione with ID: ', res.id);
        navigation.navigate("PrenotazioneOk", { prenotazione, title })
        setLoadingPrenotazione(false)
      }
    } catch (error) {
      setLoadingPrenotazione(false)
      console.log(error)
      alert(error)
    }
  }
  return (
    <View style={{ backgroundColor: Colors.light.bianco, flex: 1 }}>
      <StatusBar style="light" />
      <Header hasBack={true} hasTitleHeight={true} title={title} onPress={() => navigation.goBack()} />
      <View style={styles.content}>
        <View style={styles.contentRows}>
          <View style={styles.date}>
            <BaseText size={14} weight={800}>{moment(date).format("dddd DD MMMM")}</BaseText>
            <BaseText styles={{ paddingTop: 10, lineHeight: 20 }}>{`Il tuo appuntamento inizierà alle ${moment(date).format('HH:mm')}\ne terminerà alle ${slot_end_time}`}</BaseText>
            <View style={{ height: 1, backgroundColor: "#ddd", width: "100%", marginVertical: 10 }} />
          </View>
          <BaseText size={14} weight={800}>{"Riepilogo"}</BaseText>
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
        <View style={{ marginHorizontal: 20 }}>
          <TextInput
            value={notes}
            onChangeText={(value) => { setNotes(value) }}
            multiline
            numberOfLines={4}
            placeholder={"Note informative (Ex. Allergie , Esigenze, Speciali Richieste, etc.."}
            placeholderStyle={{
              fontFamily: "Gilroy_Regular"
            }}
            placeholderTextColor={"black"}
            onSubmitEditing={() => { Keyboard.dismiss() }}
            style={{
              //lineHeight: 30,
              marginTop: 20,
              fontFamily: "Gilroy_Regular",
              borderRadius: 8,
              borderWidth: 1,
              paddingVertical: 20,
              height: 100,
              paddingHorizontal: 10,
              borderColor: "#ddd"
            }}
          />
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
          onPress={() => handlePrenotazione()}
          style={{
            borderRadius: 10,
            backgroundColor: "#FB6E3B",
            height: 45,
            alignContent: "center",
            justifyContent: "center",
            paddingHorizontal: 10,
            alignItems: "center",
            flexDirection: "row"
          }}>
          {loadingPrenotazione && (<ActivityIndicator size={"small"} color="white" />)}
          {!loadingPrenotazione && (<BaseText weight={900} size={14} color={Colors.light.bianco}>{"Prenota"}</BaseText>)}
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default DettagliPrenotazione

