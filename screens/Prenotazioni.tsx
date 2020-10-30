import * as React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, ScrollView, TouchableOpacity } from 'react-native';
import moment from 'moment';
import localization from 'moment/locale/it';
import { Ionicons } from '@expo/vector-icons';
import CalendarPicker from 'react-native-calendar-picker';
// CONTENTX
import { AuthUserContext } from '../navigation/AuthUserProvider';
// COMPONENTS
import Header from '../components/Header';
import Colors from '../constants/Colors';
// SVG
import Capelli from '../components/svg/Capelli';
import NoFavorites from '../components/svg/NoFavorites';
import BaseText from '../components/StyledText';
import { db, dbVal } from '../network/Firebase';

interface PrenotazioniProps {
  navigation?: any;
}

const Prenotazioni = (props: PrenotazioniProps) => {
  const [selectedType, setselectedType] = React.useState(true);
  const [selectedStartDate, setStartDate] = React.useState(null);
  const { user, setUser } = React.useContext(AuthUserContext);
  const [prenotazioniFatte, setPrenotazioniFatte] = React.useState(undefined);

  const onDateChange = (date) => {
    setStartDate(date);
  }
  React.useEffect(() => {
    moment.updateLocale('it', localization);
    //loadScreen()
  }, []);
  React.useEffect(() => {
    loadScreen()
  }, []);

  const loadScreen = async () => {
    if (user) {
      let prenotazioni = await checkPrenotazioni(user);
      //console.log("--PREN OTTENUTE", prenotazioni);
      let finalPrenotazioni = await editPrenotazioni(prenotazioni)
      console.log("--FINALI OTTENUTE", finalPrenotazioni);
      //  "commercianteId": "HHCFptUM91FqhMq2INjE",
      //"id": undefined,
      //"notes": "Prova note ",
      //"serviceId": "TkCtPKg8qdSTLAIp9JrO",
      //"slot_date": "Sat Oct 24 2020 12:00:00 GMT+0200",
      //"slot_end_time": "09:30",
      //"slot_time": "09:00",
      //"state": 0,
      //"userId": "cZwX2TifjefsQInUkPq89O3wmiP2",
      //data: moment().add(3, 'day').format("LLLL"),
      //      oraInizio: moment().add(3, 'day').format("LT"),
      //      oraFine: moment().add(3, 'day').add(30, 'm').format("LT"),
      //      servizio: "Lavaggio + Taglio + Piega",
      //      oper: "Marika",
      //      salon: "Salone Le Noir",
      //      inRitardo: false
      //          data,
      //          oraInizio,
      //          oraFine,
      //          servizio,
      //          oper,
      //          salon,
      //          inRitardo
      setPrenotazioniFatte(finalPrenotazioni);
    }
  }

  const editPrenotazioni = async (prenotazioni) => {
    return new Promise(async (resolve, reject) => {
      if (prenotazioni) {
        await prenotazioni.forEach(async (prenotazione) => {
          let dbServizi = await db.collection('servizicommercianti').where(dbVal.FieldPath.documentId(), "==", prenotazione.serviceId).get();
          dbServizi.forEach(servizio => {
            let dataServizio = servizio.data();
            //console.log("--dataServizio--", dataServizio)
            //console.log("--prenotazione--", prenotazione)
            prenotazione.serviceTitle = dataServizio.titolo;
            //console.log("--prenotazione--", prenotazione)
            //Object.defineProperty(prenotazione, "serviceTitle", {
            //  value: dataServizio.titolo,
            //  writable: true,
            //  enumerable: true,
            //  configurable: true
            //});
          });
        });
        console.log("EDITED PREN", prenotazioni)
        resolve(prenotazioni);
      } else {
        resolve(undefined)
      }
    })
  }

  const checkPrenotazioni = async (user) => {
    return new Promise(async (resolve, reject) => {
      let dbPren = await db.collection('prenotazioni').get();
      if (!dbPren.empty) {
        let finalpreno = [];
        dbPren.forEach(item => {
          let data = item.data();
          if (data.userId == user.uid) {
            finalpreno.push({ id: item.id, ...data });
          }
        })
        resolve(finalpreno)
      } else {
        console.log("non ci sono PRENOTAZIONI, proseguo con undefined");
        resolve(undefined)
      }
    })
  }

  //let today = null, day = "", day1 = null, customDatesStyles = [], disabledDates = [], prenotazioniFatte = [];
  //if (user) {
  //  today = moment();
  //  day = today.clone();
  //  day1 = today.clone().startOf('month');

  //  customDatesStyles.push(
  //    {
  //      date: moment().add(3, 'day'),
  //      style: { backgroundColor: Colors.light.arancioDes },
  //      textStyle: { color: Colors.light.nero },
  //      containerStyle: [],
  //    },
  //    {
  //      date: moment().add(4, 'day'),
  //      style: { backgroundColor: Colors.light.arancioDes },
  //      textStyle: { color: Colors.light.nero },
  //      containerStyle: [],
  //    }
  //  );

  //  while (day1.add(1, 'day').isSame(today, 'month')) {
  //    if (day1.day() == 0) {
  //      // sabato & domenica
  //      // if (day1.day() == 6 || day1.day() == 0) {
  //      disabledDates.push(
  //        {
  //          date: day1.date(),
  //          style: { backgroundColor: Colors.light.arancioDes },
  //          textStyle: { color: Colors.light.nero },
  //          containerStyle: [],
  //        }
  //      )
  //    }

  //  }

  //  prenotazioniFatte = [
  //    {
  //      data: moment().add(3, 'day').format("LLLL"),
  //      oraInizio: moment().add(3, 'day').format("LT"),
  //      oraFine: moment().add(3, 'day').add(30, 'm').format("LT"),
  //      servizio: "Lavaggio + Taglio + Piega",
  //      oper: "Marika",
  //      salon: "Salone Le Noir",
  //      inRitardo: false
  //    },
  //    {
  //      data: moment().add(4, 'day').format("LLLL"),
  //      oraInizio: moment().add(4, 'day').add(60, 'm').format("LT"),
  //      oraFine: moment().add(4, 'day').add(120, 'm').format("LT"),
  //      servizio: "Manicure",
  //      oper: "Giovanna",
  //      salon: "Salone L'Araba Fenice",
  //      inRitardo: false
  //    }
  //  ];
  //}

  return (
    <View style={styles.container}>
      <Header hasBack={false} title="Prenotazioni" />
      {user && (
        <>
          <View style={[styles.switchBox, styles.shadow]}>
            <TouchableWithoutFeedback onPress={() => setselectedType(!selectedType)}>
              <View style={{
                marginLeft: 10,
                width: "50%",
                backgroundColor: selectedType ? Colors.light.newviola : Colors.light.grigio,
                height: 40,
                alignItems: "center",
                justifyContent: 'center',
                borderTopLeftRadius: 20,
                borderBottomLeftRadius: 20,
              }}>
                <BaseText color={selectedType ? Colors.light.grigio : Colors.light.newviola}>{"Nuove"}</BaseText>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => setselectedType(!selectedType)}>
              <View style={{
                marginRight: 10,
                width: "50%",
                backgroundColor: selectedType ? Colors.light.grigio : Colors.light.newviola,
                height: 40,
                alignItems: "center",
                justifyContent: 'center',
                borderTopRightRadius: 20,
                borderBottomRightRadius: 20,
              }}>
                <BaseText color={selectedType ? Colors.light.newviola : Colors.light.grigio}>{"Vecchie"}</BaseText>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 100,
              marginVertical: 20
            }}
          >
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
            {prenotazioniFatte !== undefined && prenotazioniFatte.map((
              {
                //  "commercianteId": "HHCFptUM91FqhMq2INjE",
                //"id": undefined,
                //"notes": "Prova note ",
                //"serviceId": "TkCtPKg8qdSTLAIp9JrO",
                //"slot_date": "Sat Oct 24 2020 12:00:00 GMT+0200",
                //"slot_end_time": "09:30",
                //"slot_time": "09:00",
                //"state": 0,
                //"userId": "cZwX2TifjefsQInUkPq89O3wmiP2",
                slot_date,
                slot_time,
                slot_end_time,
                serviceId,
                serviceTitle,
                oper,
                commercianteId,
                inRitardo
              }, index) => {
              console.log("..serviceTitle..", serviceTitle)
              return (
                <TouchableOpacity key={index} style={[
                  {
                    backgroundColor: "white",
                    height: 160,
                    marginBottom: 20,
                    //marginVertical: 0,
                    marginHorizontal: 20,
                    borderRadius: 10,
                  },
                  styles.shadow
                ]}>
                  <View style={{
                    backgroundColor: Colors.light.grigio,
                    height: 50,
                    alignContent: "center",
                    alignItems: "flex-start",
                    justifyContent: "center",
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    paddingLeft: 20,
                    //paddingTop: 5,
                  }}>
                    <BaseText weight={600} color={Colors.light.nero} styles={{ textTransform: "uppercase" }}>{moment(slot_date).format("LLLL").slice(0, -6)}</BaseText>
                    <BaseText weight={600} color={Colors.light.nero} styles={{ textTransform: "capitalize" }}>{slot_time + " - " + slot_end_time}</BaseText>
                    {/*<View style={{
                    position: "absolute",
                    right: 15,
                    bottom: 10,
                    flexDirection: "row",
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignContent: 'center',
                  }}>
                    <TouchableOpacity>
                      <Ionicons name="ios-brush" size={25} color={Colors.light.nero} style={{ marginRight: 20 }} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Ionicons name="ios-power" size={25} color={Colors.light.nero} />
                    </TouchableOpacity>
                  </View>*/}
                  </View>
                  <View style={{
                    flexDirection: "row",
                  }}>
                    {/*<View style={{
                    width: 52,
                    height: 52,
                    backgroundColor: index % 2 ? "#656FDF" : "#A9C6E7",
                    //backgroundColor: index % 2 ? Colors.light.arancioDes : Colors.light.viola,
                    borderRadius: 26,
                    justifyContent: "center",
                    marginLeft: 25,
                    marginTop: 15
                  }}>
                    <Capelli width="15" height="24" style={{ alignSelf: "center" }} color="white" />
                  </View>*/}
                    <View style={{ marginLeft: 20, marginTop: 15 }}>
                      <BaseText size={13}>{serviceTitle !== "" ? serviceTitle : serviceId}</BaseText>
                      {/*<BaseText size={13}>{"con " + oper}</BaseText>*/}
                      <BaseText size={10} weight={300}>{"Presso: " + commercianteId}</BaseText>
                    </View>
                  </View>
                  <View style={{ height: .5, opacity: .3, backgroundColor: "black", width: "100%", alignSelf: "center", marginTop: 30 }} />
                  <View style={{
                    flexDirection: "row",
                    position: "absolute",
                    bottom: 5,
                    right: 10
                  }}>
                    {/*<TouchableOpacity style={{
                    flexDirection: "row",
                    alignContent: "center",
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <BaseText size={9} styles={{ marginRight: 5 }}>{"Indicazioni"}</BaseText>
                    <Ionicons name="ios-pin" size={20} color={Colors.light.viola} style={{ marginRight: 20 }} />
                  </TouchableOpacity>*/}
                    <View style={{
                      flexDirection: "row",
                      alignContent: "center",
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <BaseText size={9} styles={{ marginRight: 5 }}>{"Vedi i dettagli"}</BaseText>
                      {/*<Ionicons name="md-return-right" size={20} color={Colors.light.viola} />*/}
                    </View>
                  </View>
                </TouchableOpacity>
              )
            }
            )}
          </ScrollView>
        </>
      )
      }
      {
        !user && (
          //{true && (
          <ScrollView contentContainerStyle={{
            marginVertical: 20,
            marginHorizontal: 20,
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <View style={{
              marginTop: 100,
              width: "100%",
              height: 300
            }}>
              <BaseText textAlign="center" weight={400} size={15}>{"Non ci sono nuove prenotazioni.\nQui puoi trovare tutte le prenotazioni che sono state confermate dai gestori ed eventuali comunicazioni.\n\nPer aggiungere una nuova prenotazione fai logo di BeautyShop dal menu."}</BaseText>
              <NoFavorites style={{ bottom: 0 }} />
            </View>
          </ScrollView>
        )
      }
    </View >
  );
};

export default Prenotazioni;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: Colors.light.bg
    backgroundColor: Colors.light.bianco
  },
  switchBox: {
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    justifyContent: 'center',
    marginHorizontal: 40,
    marginTop: 20
  },
  light: {
    //fontFamily: "Montserrat_300Light"
  },
  text: {
    //fontFamily: "Montserrat_400Regular"
  },
  bold: {
    //fontFamily: "Montserrat_700Bold",
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
