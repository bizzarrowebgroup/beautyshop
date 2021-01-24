import React, { useEffect } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import moment from 'moment';
// import { Ionicons } from '@expo/vector-icons';
// import CalendarPicker from 'react-native-calendar-picker';
// CONTENTX
import { AuthUserContext } from '../navigation/AuthUserProvider';
// COMPONENTS
import Header from '../components/Header';
import Colors from '../constants/Colors';
// SVG
//import Capelli from '../components/svg/Capelli';
import NoFavorites from '../components/svg/NoFavorites';
import BaseText from '../components/StyledText';
import { db, dbVal } from '../network/Firebase';
import { SafeAreaView } from 'react-native-safe-area-context';


const Prenotazioni = ({ navigation }) => {
  const [selectedType, setselectedType] = React.useState(true);
  const [selectedStartDate, setStartDate] = React.useState(null);
  const { user, setUser } = React.useContext(AuthUserContext);
  const [prenotazioniFatte, setPrenotazioniFatte] = React.useState(undefined);

  useEffect(() => {
    loadScreen()
  }, []);

  const loadScreen = async () => {
    if (user) {
      let dbPren = await db.collection('prenotazioni').orderBy('pren_date', 'desc').get();
      if (!dbPren.empty) {
        let finalpreno = [];
        dbPren.forEach(item => {
          let data = item.data();
          finalpreno.push({ id: item.id, ...data });
        })
        finalpreno = finalpreno.filter(i => i.userId === user.uid)
        if (finalpreno && finalpreno.length > 0) {
          console.log("---finalpreno---", finalpreno.length);
          setPrenotazioniFatte(finalpreno)
        }
      }
    }
  }

  const checkNewPrenotazioni = async (observer) => {
    if (user) {
      return observer = db.collection('prenotazioni').where('userId', '==', user.uid)
        .onSnapshot(querySnapshot => {
          querySnapshot.docChanges().forEach(change => {
            if (change.type === 'modified') {
              loadScreen()
            }
            if (change.type === 'removed') {
              loadScreen()
            }
          });
        });
    } else {
      setPrenotazioniFatte(undefined);
    }
  }

  useEffect(() => {
    let observer = undefined;
    checkNewPrenotazioni(observer);
    return () => {
      if (observer !== undefined) observer();
    };
  }, [user])

  const renderItem = ({ item }) => {
    // DEFAULT CONFERMATA
    let color = '#CB860B', textColor = "black", statusLabel = "Confermata"
    switch (item.state) {
      case 1:
        // ACCETTATA
        color = '#00C537'
        statusLabel = "Accettata"
        break;
      case 2:
        // FINITA
        color = Colors.light.ARANCIO
        statusLabel = "Finita"
        break;
      case 3:
        // ANNULATA
        color = '#CA1E13'
        statusLabel = "Annulata"
        break;
    }
    return (
      <TouchableOpacity
        style={{
          borderRadius: 8,
          paddingVertical: 10,
          paddingHorizontal: 20,
          backgroundColor: "#f6f6f6",
          shadowColor: "black",
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowRadius: 1.4,
          shadowOpacity: .3,
          marginVertical: 10
        }}
        key={item.id}
        onPress={() => { navigation.navigate("InfoPren", { prenotazione: item }) }}>
        <View style={{ backgroundColor: "transparent", flexDirection: "row", alignContent: "center", alignItems: "center", justifyContent: "flex-start", }}>
          <BaseText weight={500} color={Colors.light.nero} styles={{ textTransform: "capitalize" }}>{moment(item.slot_date).format("dddd DD MMMM")} | </BaseText>
          <BaseText weight={500} color={Colors.light.nero}>{item.slot_time}  - </BaseText>
          <BaseText weight={500} color={Colors.light.nero}>{item.slot_end_time}</BaseText>
        </View>
        <BaseText weight={600} color={Colors.light.nero} styles={{ marginVertical: 5 }}>{item.title}</BaseText>
        <View style={{ flexDirection: "row", justifyContent: 'space-between', alignItems: "center", alignContent: "center", marginTop: 10 }}>
          <BaseText weight={400} color={Colors.light.nero}>{item.totale + " €"}</BaseText>
          <View style={{
            borderColor: color,
            borderWidth: 1.5,
            borderRadius: 10,
            width: 120,
            height: 25,
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center"
          }}>
            <BaseText color={color} size={10} weight={700}>{statusLabel}</BaseText>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
  console.log("prenotazioniFatte---", prenotazioniFatte)
  return (
    <View style={{ backgroundColor: Colors.light.bianco, flex: 1 }}>
      <Header hasBack={true} hasTitleHeight={true} title={`I tuoi appuntamenti`} onPress={() => navigation.goBack()} />
      {/* <View style={{ backgroundColor: Colors.light.ARANCIO, height: 200, position: "absolute", top: 0, left: 0, right: 0 }} /> */}
      <View style={styles.container}>
        <View style={styles.contentRows}>
          {prenotazioniFatte !== undefined && (
            <FlatList
              data={prenotazioniFatte}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              style={{ flex: 1, top: 30 }}
              contentContainerStyle={{ marginHorizontal: 20, }}
            />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    top: -40,
    backgroundColor: Colors.light.bianco,
    flex: 1,
  },
  contentRows: {
    // paddingHorizontal: 20,
    // paddingVertical: 20,
    flex: 1
  },
  switchBox: {
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    justifyContent: 'center',
    marginHorizontal: 40,
    marginTop: 40
  },
  light: {
  },
  text: {
  },
  bold: {
  },
  shadow: {
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: .2,
    shadowRadius: 10,
    elevation: 1,
  }
});

export default Prenotazioni;

{/*
            <View style={{
          marginVertical: 20,
          marginHorizontal: 20,
          backgroundColor: Colors.light.bianco,
          borderRadius: 10
        }}>
          <CalendarPicker
            onDateChange={(date) => onDateChange(date)}
            weekdays={['L', 'M', 'M', 'G', 'V', 'S', 'D']}
            months={['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre']}
            startFromMonday={true}
            nextTitle={">"}
            previousTitle={"<"}
            // maxDate={moment()}
            // minDate={moment()}
            applyMinMaxDateOnMonthSelection={true}
            previousTitleStyle={{
              fontFamily: "Montserrat_700Bold",
              color: Colors.light.arancioDes,
              paddingLeft: 20,
              paddingTop: 5,
            }}
            nextTitleStyle={{
              fontFamily: "Montserrat_700Bold",
              color: Colors.light.arancioDes,
              paddingRight: 20,
              paddingTop: 5,
            }}
            disabledDates={disabledDates}
            disabledDatesTextStyle={{
              color: Colors.light.grigio,
            }}
            selectedDayColor={Colors.light.arancioDes}
            selectedDayTextColor={Colors.light.nero}
            todayBackgroundColor={Colors.light.grigio}
            selectYearTitle={"Scegli anno"}
            selectMonthTitle={"Scegli mese nel "}
            customDatesStyles={customDatesStyles}
            enableDateChange={false}
            restrictMonthNavigation={true}
            textStyle={{
              fontFamily: 'Montserrat_400Regular',
              // color: 'white',
            }}
            textWeekStyle={{
              fontFamily: 'Montserrat_700Bold',
              color: Colors.light.bianco
            }}
            dayLabelsWrapper={{
              backgroundColor: Colors.light.violaDes,
              color: Colors.light.bianco,
              marginHorizontal: 5
            }}
          />
        </View>*/}