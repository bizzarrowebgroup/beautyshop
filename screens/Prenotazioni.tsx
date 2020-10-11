import * as React from 'react';
import { Text, View, StyleSheet, TouchableWithoutFeedback, ScrollView, TouchableOpacity } from 'react-native';
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

interface PrenotazioniProps {
  navigation?: any;
}

const Prenotazioni = (props: PrenotazioniProps) => {
  const [selectedType, setselectedType] = React.useState(true);
  const [selectedStartDate, setStartDate] = React.useState(null);
  const { user, setUser } = React.useContext(AuthUserContext);
  const onDateChange = (date) => {
    setStartDate(date);
  }
  React.useEffect(() => {
    moment.updateLocale('it', localization);
  }, [])
  let today = null, day = "", day1 = null, customDatesStyles = [], disabledDates = [], prenotazioniFatte = [];
  if (user) {
    today = moment();
    day = today.clone();
    day1 = today.clone().startOf('month');

    customDatesStyles.push(
      {
        date: moment().add(3, 'day'),
        style: { backgroundColor: Colors.light.arancioDes },
        textStyle: { color: Colors.light.nero },
        containerStyle: [],
      },
      {
        date: moment().add(4, 'day'),
        style: { backgroundColor: Colors.light.arancioDes },
        textStyle: { color: Colors.light.nero },
        containerStyle: [],
      }
    );

    while (day1.add(1, 'day').isSame(today, 'month')) {
      if (day1.day() == 0) {
        // sabato & domenica
        // if (day1.day() == 6 || day1.day() == 0) {
        disabledDates.push(
          {
            date: day1.date(),
            style: { backgroundColor: Colors.light.arancioDes },
            textStyle: { color: Colors.light.nero },
            containerStyle: [],
          }
        )
      }

    }

    prenotazioniFatte = [
      {
        data: moment().add(3, 'day').format("LLLL"),
        oraInizio: moment().add(3, 'day').format("LT"),
        oraFine: moment().add(3, 'day').add(30, 'm').format("LT"),
        servizio: "Lavaggio + Taglio + Piega",
        oper: "Marika",
        salon: "Salone Le Noir",
        inRitardo: false
      },
      {
        data: moment().add(4, 'day').format("LLLL"),
        oraInizio: moment().add(4, 'day').add(60, 'm').format("LT"),
        oraFine: moment().add(4, 'day').add(120, 'm').format("LT"),
        servizio: "Manicure",
        oper: "Giovanna",
        salon: "Salone L'Araba Fenice",
        inRitardo: false
      }
    ];
  }

  return (
    <View style={styles.container}>
      <Header hasBack={false} title="Prenotazioni" />
      {user && (<ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={styles.switchBox}>
          <TouchableWithoutFeedback onPress={() => setselectedType(!selectedType)}>
            <View style={{
              marginLeft: 10,
              width: "50%",
              backgroundColor: selectedType ? "#DF7865" : "#E7B3A9",
              height: 40,
              alignItems: "center",
              justifyContent: 'center',
              borderTopLeftRadius: 5,
              borderBottomLeftRadius: 5,
            }}>
              <Text style={[styles.text, { fontSize: 13, color: selectedType ? "#FBFBFB" : "#6B6B6B" }]}>Nuove</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => setselectedType(!selectedType)}>
            <View style={{
              marginRight: 10,
              width: "50%",
              backgroundColor: selectedType ? "#E7B3A9" : "#DF7865",
              height: 40,
              alignItems: "center",
              justifyContent: 'center',
              borderTopRightRadius: 5,
              borderBottomRightRadius: 5,
            }}>
              <Text style={[styles.text, { fontSize: 13, color: selectedType ? "#6B6B6B" : "#FBFBFB" }]}>Vecchie</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        {/*<View style={{
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
        {prenotazioniFatte.map(({ data, oraInizio, oraFine, servizio, oper, salon, inRitardo }, index) => (
          <View key={index} style={{
            backgroundColor: "white",
            height: 150,
            marginVertical: 10,
            marginHorizontal: 20,
            borderRadius: 10,
          }}>
            <View style={{
              backgroundColor: Colors.light.arancioDes,
              height: 50,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              paddingLeft: 20,
              paddingTop: 10,
            }}>
              <Text style={[styles.bold, { textTransform: "capitalize" }]}>{data.slice(0, -5)}</Text>
              <Text style={[styles.bold, { textTransform: "capitalize" }]}>{oraInizio + " - " + oraFine}</Text>
              <View style={{
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
              </View>
            </View>
            <View style={{
              flexDirection: "row",
            }}>
              <View style={{
                width: 52,
                height: 52,
                backgroundColor: index % 2 ? Colors.light.arancioDes : Colors.light.viola,
                borderRadius: 26,
                justifyContent: "center",
                marginLeft: 25,
                marginTop: 15
              }}>
                <Capelli width="15" height="24" style={{ alignSelf: "center" }} color="white" />
              </View>
              <View style={{ marginLeft: 20, marginTop: 15 }}>
                <Text style={[styles.text, { fontSize: 15 }]}>{servizio}</Text>
                <Text style={[styles.text, { fontSize: 15 }]}>{"con " + oper}</Text>
                <Text style={[styles.light, { fontSize: 12 }]}>{salon}</Text>
              </View>
            </View>
            <View style={{
              flexDirection: "row",
              position: "absolute",
              bottom: 5,
              right: 10
            }}>
              <TouchableOpacity style={{
                flexDirection: "row",
                alignContent: "center",
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Text style={{ color: Colors.light.nero, fontSize: 10, fontFamily: "Montserrat_700Bold", marginRight: 5 }}>INDICAZIONI</Text>
                <Ionicons name="ios-pin" size={20} color={Colors.light.arancioDes} style={{ marginRight: 20 }} />
              </TouchableOpacity>
              <TouchableOpacity style={{
                flexDirection: "row",
                alignContent: "center",
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Text style={{ color: Colors.light.nero, fontSize: 10, fontFamily: "Montserrat_700Bold", marginRight: 5 }}>DETTAGLI</Text>
                <Ionicons name="md-return-right" size={12} color={Colors.light.arancioDes} />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>)}
      {!user && (
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
      )}
    </View>
  );
};

export default Prenotazioni;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.bg
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
    fontFamily: "Montserrat_300Light"
  },
  text: {
    fontFamily: "Montserrat_400Regular"
  },
  bold: {
    fontFamily: "Montserrat_700Bold",
  },
});
