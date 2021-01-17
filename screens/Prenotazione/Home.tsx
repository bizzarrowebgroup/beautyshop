import React, { useRef, useState } from "react";
import { StyleSheet, ScrollView, TouchableOpacity, View, Platform, Dimensions } from "react-native";
import { StatusBar } from "expo-status-bar";
import CalendarStrip from 'react-native-calendar-strip';
import { db } from '../../network/Firebase';

import Header from "../../components/Header";
import Loader from "../../components/Loader";
import BaseText from "../../components/StyledText";
import Colors from "../../constants/Colors";
import Layout from '../../constants/Layout'

//import 'moment';
//import 'moment/locale/it';
//moment().locale('it');
import moment from 'moment';

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
    paddingVertical: 20
  },
});

export default ({ route, navigation }) => {
  const [selectedDate, setSelectedDate] = useState(undefined);
  const [blocks, setBlocks] = React.useState(null);
  const [blockSelected, setBlockSelected] = React.useState(undefined);
  const [timeSelected, setTimeSelected] = React.useState(undefined);
  const [orari, setOrari] = React.useState(undefined);
  const [commercianteId, setCommerciante] = React.useState(undefined);
  const [prenotazioni, setPrenotazioni] = React.useState(undefined);
  const [daySelected, setDateSelected] = React.useState(undefined);
  const [cart, setCart] = React.useState(undefined);
  const [titoloNegozio, setTitoloNegozio] = React.useState(route.params?.title);
  React.useEffect(() => {

    let carrello = route.params?.carrello;
    let commerciante = route.params?.commerciante;
    if (commerciante) {
      setCommerciante(commerciante)
      initPrenota(commerciante);
    }
    if (!carrello) {
      navigation.goBack();
      alert("Errore con il carrello")
    } else {
      setCart(carrello)
    }
  }, []);

  function iterateOrari(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const citiesRef = db.collection('orari');
        const snapshot = await citiesRef.where('commercianti', '==', id).get();
        if (snapshot.empty) {
          console.log('No matching documents.');
          resolve(undefined)
        } else {
          let commercianteId;
          snapshot.forEach(item => {
            if (item.data().commercianti == id) {
              commercianteId = item.id;
            }
          });
          const timesSnapShot = await citiesRef.doc(commercianteId).collection('orario').orderBy('day').get();
          if (timesSnapShot.empty) {
            console.log('No matching inside orari documents.');
            resolve(undefined);
          } else {
            let finalTimes = [];
            timesSnapShot.forEach(item => {
              let id = item.id;
              finalTimes.push({ ...item.data(), id })
            })
            resolve(finalTimes);
          }
        }
      } catch (e) {
        console.warn(e, "iterateOrari")
      }
    });
  }
  const checkPrenotazioni = async () => {
    return new Promise(async (resolve, reject) => {
      let dbPren = await db.collection('prenotazioni').get();
      if (!dbPren.empty) {
        let finalpreno = [];
        dbPren.forEach(item => {
          let data = item.data();
          //if (data.slot_date) {
          //  console.log(moment(data.slot_date).isoWeekday(), "momentDateFromDB");
          //}
          finalpreno.push({ id: data.id, ...data });
        })
        resolve(finalpreno)
      } else {
        console.log("non ci sono PRENOTAZIONI, proseguo con undefined");
        resolve(undefined)
      }
    })
  }
  const initPrenota = async (id) => {
    let orariFb = await iterateOrari(id);
    let prenotazioni = await checkPrenotazioni();
    setPrenotazioni(prenotazioni);
    setOrari(orariFb);
  }
  const onDateChange = (date) => {
    //
    // let realDate = moment(date).add(1, "day");
    let realDate = moment(date);
    let today = date.isoWeekday();
    //console.log(today, "---today")
    setDateSelected(realDate);
    setSelectedDate(realDate);
    workSlots(today, undefined, realDate);
  }
  const workSlots = async (isoWeekday?, orariFb = undefined, realDate?) => {
    let today = isoWeekday ? isoWeekday : moment().isoWeekday();
    let todayHours = [];
    // check if i recive or force the render of timeslots
    if (orari !== undefined) {
      orari.forEach(element => {
        //console.log(element,"element-orari")
        if (element.day == today) {
          todayHours.push(element);
        }
      });
    } else if (orariFb !== undefined) {
      orariFb.forEach(element => {
        //console.log(element,"element-orariFB")
        if (element.day == today) {
          todayHours.push(element);
        }
      });
    }

    if (todayHours.length > 0) {
      let open = todayHours[0].open.split(":");
      let openHours = open[0] ? open[0] : 0;
      let openMinutes = open[1] ? open[1] : 0;

      let close = todayHours[0].close.split(":");
      let closeHours = close[0] ? close[0] : 0;
      let closeMinutes = close[1] ? close[1] : 0;
      //console.log("---realDate---", realDate, openHours, openMinutes, closeHours, closeMinutes)
      //let start = moment(realDate).hours(openHours).minute(openMinutes).second(0).millisecond(0).utc().utcOffset("-02:00", true);
      //let end = moment(realDate).hours(closeHours).minute(closeMinutes).second(0).millisecond(0).utc().utcOffset("-02:00", true);
      let start = moment(realDate).hours(openHours).minute(openMinutes).second(0).millisecond(0)
      let end = moment(realDate).hours(closeHours).minute(closeMinutes).second(0).millisecond(0)
      //console.log("--ORARIO APERTURA--", start)
      //console.log("--ORARIO CHIUSURA--", end)
      const step = (x) => {
        return moment(x).add(15, 'minutes');
      }
      const blocksSlots = [];
      let cursor = start;
      while (end > cursor) {
        blocksSlots.push(cursor);
        cursor = step(cursor);
      }
      //console.log("---blocksGOT---", blocksSlots)
      if (prenotazioni !== undefined) {
        let finalBlockedPrenotazioni = [];
        // BLOCK PRENOTAZIONI BY SERVICEID WRONG WRONG WRONG
        //prenotazioni.forEach(d => {
        //  if (d.serviceId === serviceId) {
        //    let realMonth = moment(realDate).month();
        //    let slotMonth = moment(d.slot_date).month();
        //    let realDay = moment(realDate).format('DD');
        //    let slotDay = moment(d.slot_date).format('DD');
        //    // old moment(d.slot_date).isoWeekday() == today
        //    if (realMonth === slotMonth && realDay === slotDay) {

        //      //console.log("--STO BLOCCANDO QUESTO GIORNO--", slotDay)
        //      let open = d.slot_time.split(":");
        //      let openHours = open[0] ? open[0] : 0;
        //      let openMinutes = open[1] ? open[1] : 0;

        //      let close = d.slot_end_time.split(":");
        //      let closeHours = close[0] ? close[0] : 0;
        //      let closeMinutes = close[1] ? close[1] : 0;

        //      // let realDataOpen = moment(d.slot_date).hours(openHours).minutes(openMinutes).second(0).millisecond(0).utc().utcOffset("-02:00", true);
        //      // let realDataClose = moment(d.slot_date).hours(closeHours).minutes(closeMinutes).second(0).millisecond(0).utc().utcOffset("-02:00", true);
        //      let realDataOpen = moment(d.slot_date).hours(openHours).minutes(openMinutes).second(0).millisecond(0)
        //      let realDataClose = moment(d.slot_date).hours(closeHours).minutes(closeMinutes).second(0).millisecond(0)
        //      finalBlockedPrenotazioni.push({ open: realDataOpen, close: realDataClose });
        //      //let minore = moment().format('x') < moment(realDataOpen).format('x');
        //      //let maggiore = moment().format('x') >= moment(realDataClose).format('x');
        //      //if (minore || maggiore) return true;
        //      //else return false;
        //      //} else {
        //      //  return false;
        //      //}
        //      //} else {
        //      //  return false;
        //      //}
        //      //});
        //    }
        //  }
        //});
        if (finalBlockedPrenotazioni.length > 0 && blocksSlots.length > 0) {
          //console.log("---finalBlockedPrenotazioni---", finalBlockedPrenotazioni)
          //console.log("---blocksSlots---", blocksSlots)
          let blockSlotsFiltered = blocksSlots.filter((e) => {
            return finalBlockedPrenotazioni.some((d) => {
              let open = d.open;
              let close = d.close;
              let minore = moment(e).format('x') < moment(open).format('x');
              let maggiore = moment(e).format('x') >= moment(close).format('x');
              if (minore || maggiore) return false;
              else return true;
            });
          });
          const arrayRemove = (arr1, arr2) => {
            //console.log("--array1--", arr1)
            //console.log("--array2--", arr2)
            const filteredArray = arr1.filter(function (x) {
              return arr2.indexOf(x) < 0;
            });
            return filteredArray;
          }
          let finalBlocks = arrayRemove(blocksSlots, blockSlotsFiltered);
          //console.log(finalBlocks, "--finalBlocks--")
          setBlocks(finalBlocks);
        } else if (blocksSlots.length > 0) {
          setBlocks(blocksSlots);
        } else {
          setBlocks(undefined);
        }
      } else if (blocksSlots.length > 0) {
        setBlocks(blocksSlots);
      } else {
        setBlocks(undefined);
      }
    }
  }
  return (
    <>
      <View>
        <StatusBar style="light" />
        <Header hasBack={true} hasTitleHeight={true} title={`Quando`} onPress={() => navigation.goBack()} />
        <View style={styles.content}>
          <View style={styles.contentRows}>
            {/*<View style={{ width: "100%", height: 1, backgroundColor: "grey" }} />*/}
            <CalendarStrip
              scrollable
              calendarAnimation={{ type: 'sequence', duration: 30, }}
              daySelectionAnimation={{ type: 'background', duration: 200, highlightColor: Colors.light.ARANCIO }}
              style={{ height: 140, paddingTop: 0 }}
              calendarHeaderStyle={{ color: 'black', fontFamily: "Gilroy_Bold", fontSize: 15, }}
              calendarColor={'transparent'}
              onDateSelected={onDateChange}
              selectedDate={selectedDate}
              startingDate={moment()}
              minDate={moment()}
              maxDate={moment().add(1, 'months')}
              dateNumberStyle={{ color: 'black', fontFamily: "Gilroy_Regular", fontSize: 15 }}
              dateNameStyle={{ color: '#dddddd', fontFamily: "Gilroy_Bold", fontSize: 15, }}
              highlightDateNumberStyle={{ color: 'white', fontFamily: "Gilroy_Regular", fontSize: 15, }}
              highlightDateNameStyle={{ color: '#dddddd', fontFamily: "Gilroy_Bold", fontSize: 15, }}
              disabledDateNameStyle={{ color: 'grey' }}
              disabledDateNumberStyle={{ color: 'grey' }}
              iconContainer={{ flex: 0.0001 }}
              iconLeftStyle={{ display: "none" }}
              iconRightStyle={{ display: "none" }}
              locale={{
                name: "it",
                config: {
                  months: 'Gennaio_Febbraio_Marzo_Aprile_Maggio_Giugno_Luglio_Agosto_Settembre_Ottobre_Novembre_Dicembre'.split(
                    '_'
                  ),
                  monthsShort: 'Gen_Feb_Mar_Apr_Mag_Giu_Lug_Ago_Set_Ott_Nov_Dic'.split(
                    '_'
                  ),
                  weekdays: 'Domenica_Lunedi_Martedi_Mercoledi_Giovedi_Venerdi_Sabato'.split('_'),
                  weekdaysShort: 'D_L_M_M_G_V_S'.split('_'),
                  weekdaysMin: 'Do_Lu_Ma_Me_Gi_Ve_Sa'.split('_'),
                  longDateFormat: {
                    LT: 'HH:mm',
                    LTS: 'HH:mm:ss',
                    L: 'DD/MM/YYYY',
                    LL: 'D MMMM YYYY',
                    LLL: 'D MMMM YYYY LT',
                    LLLL: 'dddd D MMMM YYYY LT'
                  },
                  calendar: {
                    sameDay: "[Aujourd'hui à] LT",
                    nextDay: '[Demain à] LT',
                    nextWeek: 'dddd [à] LT',
                    lastDay: '[Hier à] LT',
                    lastWeek: 'dddd [dernier à] LT',
                    sameElse: 'L'
                  },
                  relativeTime: {
                    future: 'dans %s',
                    past: 'il y a %s',
                    s: 'quelques secondes',
                    m: 'une minute',
                    mm: '%d minutes',
                    h: 'une heure',
                    hh: '%d heures',
                    d: 'un jour',
                    dd: '%d jours',
                    M: 'un mois',
                    MM: '%d mois',
                    y: 'une année',
                    yy: '%d années'
                  },
                  ordinalParse: /\d{1,2}(er|ème)/,
                  ordinal: function (number) {
                    return number + (number === 1 ? 'er' : 'ème');
                  },
                  meridiemParse: /PD|MD/,
                  isPM: function (input) {
                    return input.charAt(0) === 'M';
                  },
                  // in case the meridiem units are not separated around 12, then implement
                  // this function (look at locale/id.js for an example)
                  // meridiemHour : function (hour, meridiem) {
                  //     return /* 0-23 hour, given meridiem token and hour 1-12 */
                  // },
                  meridiem: function (hours, minutes, isLower) {
                    return hours < 12 ? 'PD' : 'MD';
                  },
                  week: {
                    dow: 1, // Monday is the first day of the week.
                    doy: 4 // The week that contains Jan 4th is the first week of the year.
                  }
                }
              }}
            />
            <View style={{ top: -20, width: "100%", height: 1, backgroundColor: "#dddddd", alignSelf: "center" }} />

          </View>
          <ScrollView
            style={{
              top: -30
            }}
            contentContainerStyle={{
              //display: blocks === null ? "none" : "flex",
              //display: blocks == undefined && blocks == null ? "none" : "flex"
              paddingBottom: Dimensions.get("window").height + 150,
            }}
          >
            {blocks === undefined && (
              <View style={{ alignSelf: "center" }}>
                <BaseText size={10} weight={600} color={Colors.light.rosso}>{"🚨 In questa data il commerciante è chiuso! 🚨".toUpperCase()}</BaseText>
              </View>
            )}
            {
              blocks !== undefined && blocks !== null && blocks.map((slot, index) => {
                const onPress = () => {
                  if (index == blockSelected) {
                    setBlockSelected(undefined);
                  } else {
                    setTimeSelected(slot.format("HH:mm"));
                    setBlockSelected(index);
                  }
                }
                return (
                  <TouchableOpacity key={index} onPress={() => onPress()} style={{
                    marginVertical: 10,
                    paddingHorizontal: 20,
                    //backgroundColor: blockSelected == index ? Colors.light.arancio : Colors.light.grigio,
                  }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignContent: "center", alignItems: "center" }}>
                      <View style={{ backgroundColor: blockSelected == index ? Colors.light.ARANCIO : "transparent", width: 25, height: 25, borderRadius: 25 / 2, borderWidth: 2, borderColor: blockSelected == index ? Colors.light.ARANCIO : "grey", marginBottom: 5 }} />
                      <View style={{ height: .5, backgroundColor: blockSelected == index ? Colors.light.ARANCIO : "#dddddd", width: "75%", }} />
                      <BaseText size={12} weight={600} color={blockSelected == index ? Colors.light.ARANCIO : "black"} letterSpacing={0.4}>
                        {slot.format("HH:mm")}
                      </BaseText>
                    </View>
                  </TouchableOpacity>
                )
              })
            }
            {selectedDate === undefined && blocks !== undefined && (
              <View style={{ alignSelf: "center" }}>
                <BaseText size={10} weight={800} color={Colors.light.ARANCIO}>{"Scegli quando".toUpperCase()}</BaseText>
              </View>
            )}
          </ScrollView>
        </View>
      </View>
      {timeSelected !== undefined && daySelected !== undefined && (
        <View style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          width: "100%",
          minHeight: 100,
          shadowOffset: {
            width: 0,
            height: -4
          },
          shadowColor: "black",
          shadowOpacity: .22,
          shadowRadius: 4,
          backgroundColor: "white",
          alignContent: "center",
          justifyContent: "flex-start"
        }}>
          <TouchableOpacity onPress={() => navigation.navigate("DettagliPrenotazione", { cart, commercianteId, daySelected, timeSelected, titoloNegozio })} style={{
            marginHorizontal: 20,
            marginTop: 10,
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
        </View>)}
    </>
  );
};