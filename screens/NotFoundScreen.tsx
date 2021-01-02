import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import {
  Image,
  TextInput,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableWithoutFeedback,
  ScrollView,
  TouchableOpacity,
  Alert,
  Keyboard
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import CalendarPicker from 'react-native-calendar-picker';

import moment from 'moment';

import * as haptics from '../constants/Vibration';

import { db, registerFromNotFound } from '../network/Firebase';

import BottomSheet from '@gorhom/bottom-sheet';

import Handle from '../components/handle';
import BaseButton from '../components/BaseButton';
import FormField from '../components/Form/FormField';
import Form from '../components/Form/Form';
import FormButton from '../components/Form/FormButton';
import IconFooterSocial from '../components/svg/IconFooterSocial';

import { useValue } from 'react-native-redash';
import { useHeaderHeight } from '@react-navigation/stack';

//import * as Animate from 'react-native-animatable';
import StepIndicator from 'react-native-step-indicator';
//import AppButton from '../components/AppButton';
//import Loader from '../components/Loader';
import { AuthUserContext } from '../navigation/AuthUserProvider';

const tagli = [
  {
    title: 'Taglio donna',
    desc: 'Spigolature, rotondità e proporzioni possono essere riequilibrate con il giusto taglio e una pettinatura adatta.',
    price: '25'
  },
  {
    title: 'Taglio uomo',
    desc: 'Spigolature, rotondità e proporzioni possono essere riequilibrate con il giusto taglio e una pettinatura adatta.',
    price: '14'
  },
  {
    title: 'Taglio completo',
    desc: 'Spigolature, rotondità e proporzioni possono essere riequilibrate con il giusto taglio e una pettinatura adatta.',
    price: '30'
  }
]

const servizi = [
  { label: 'Taglio donna' },
  { label: 'Piega' },
  { label: 'Trattamenti' },
  { label: 'Colore' },
  { label: 'Ondulazione' },
  { label: 'Extension' },
  { label: 'Acconciature' },
  { label: 'Permanente' },
  { label: 'Non lo so' },
];

import { RootStackParamList } from '../types';
import BaseText from '../components/StyledText';
import Colors from '../constants/Colors';
import Loader from '../components/Loader';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.violaDes,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  switchBox: {
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    justifyContent: 'center',
    marginHorizontal: 40,
  },
  searchBar: {
    height: 44,
    marginVertical: 20,
    marginHorizontal: 40,
    borderRadius: 5,
    backgroundColor: '#E0E0E0',
    flexDirection: 'row',
    padding: 5,
    alignItems: 'center',
  },
  first: {
    marginLeft: 15
  },
  text: {
  },
  textBold: {
  },
  btn: {
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    height: 45,
    marginHorizontal: 50,
    shadowColor: Colors.light.nero,
    shadowOpacity: 0.25,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 4,
    borderRadius: 10,
  },
  image: {
    width: 50,
    height: 50,
    alignSelf: "center"
  },
  shadowBtn: {
    shadowColor: Colors.light.nero,
    shadowOpacity: 0.25,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 4,
  }
});

export default function NotFoundScreen({
  navigation,
  route,
}: StackScreenProps<RootStackParamList, 'NotFound'>) {
  // stato tipo negozio
  const [selectedType, setselectedType] = React.useState(true);
  // stato pagina in cui ci troviamo
  const [parte, setParte] = React.useState(1);

  // use This only when necessary
  const [isOnModal, setIsOn] = React.useState(false);

  const [searchValue, setSearchValue] = React.useState(undefined);
  const [salonValue, setSalonValue] = React.useState(undefined);

  // stato prenotazione servizio
  const [serviceId, setServiceId] = React.useState(undefined);
  const [daySelected, setDateSelected] = React.useState(undefined);
  // blocco stato orari che prendo da db
  const [blocks, setBlocks] = React.useState(null);
  const [blockSelected, setBlockSelected] = React.useState(undefined);
  const [timeSelected, setTimeSelected] = React.useState(undefined);
  const [orari, setOrari] = React.useState(undefined);

  const [serviceTitle, setServiceTitle] = React.useState(undefined);
  const [serviceDesc, setServiceDesc] = React.useState(undefined);
  const [serviceCost, setServiceCost] = React.useState(undefined);
  const [serviceDuration, setServiceDuration] = React.useState(undefined);
  const [serviceCustomer, setServiceCustomer] = React.useState(undefined);

  const [commercianteId, setCommerciante] = React.useState(undefined);

  const [isLoading, setLoading] = React.useState(false);
  const [notes, setNotes] = React.useState("");
  const [registerErrors, setRegisterError] = React.useState(undefined);

  const [prenotazioni, setPrenotazioni] = React.useState(undefined);

  const { user, setUser } = React.useContext(AuthUserContext);
  //React.useEffect(() => {
  //  if (user != null) {
  //    //name = user.displayName;
  //    //email = user.email;
  //    //photoUrl = user.photoURL;
  //    //emailVerified = user.emailVerified;
  //    //uid = user.uid;
  //  }
  //}, []);

  const customStyles = {
    stepIndicatorSize: 14,
    currentStepIndicatorSize: 14,
    separatorStrokeWidth: 3,
    currentStepStrokeWidth: 7,
    stepStrokeCurrentColor: '#DE9182',
    stepStrokeWidth: 0,
    stepStrokeFinishedColor: '#DE9182',
    stepStrokeUnFinishedColor: '#BDBDBD',
    separatorFinishedColor: '#DE9182',
    separatorUnFinishedColor: '#BDBDBD',
    stepIndicatorFinishedColor: '#DE9182',
    stepIndicatorUnFinishedColor: '#BDBDBD',
    stepIndicatorCurrentColor: '#BDBDBD',
  };
  const goBack = () => {
    navigation.replace('Root');
    // navigation.pop();
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

  const workSlots = async (isoWeekday?, orariFb = undefined, realDate?) => {
    let today = isoWeekday ? isoWeekday : moment().isoWeekday();
    let todayHours = [];
    console.log('---today---')
    console.log('---' + today + '---')
    console.log('------')
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
        prenotazioni.forEach(d => {
          if (d.serviceId === serviceId) {
            let realMonth = moment(realDate).month();
            let slotMonth = moment(d.slot_date).month();
            let realDay = moment(realDate).format('DD');
            let slotDay = moment(d.slot_date).format('DD');
            // old moment(d.slot_date).isoWeekday() == today
            if (realMonth === slotMonth && realDay === slotDay) {

              //console.log("--STO BLOCCANDO QUESTO GIORNO--", slotDay)
              let open = d.slot_time.split(":");
              let openHours = open[0] ? open[0] : 0;
              let openMinutes = open[1] ? open[1] : 0;

              let close = d.slot_end_time.split(":");
              let closeHours = close[0] ? close[0] : 0;
              let closeMinutes = close[1] ? close[1] : 0;

              // let realDataOpen = moment(d.slot_date).hours(openHours).minutes(openMinutes).second(0).millisecond(0).utc().utcOffset("-02:00", true);
              // let realDataClose = moment(d.slot_date).hours(closeHours).minutes(closeMinutes).second(0).millisecond(0).utc().utcOffset("-02:00", true);
              let realDataOpen = moment(d.slot_date).hours(openHours).minutes(openMinutes).second(0).millisecond(0)
              let realDataClose = moment(d.slot_date).hours(closeHours).minutes(closeMinutes).second(0).millisecond(0)
              finalBlockedPrenotazioni.push({ open: realDataOpen, close: realDataClose });
              //let minore = moment().format('x') < moment(realDataOpen).format('x');
              //let maggiore = moment().format('x') >= moment(realDataClose).format('x');
              //if (minore || maggiore) return true;
              //else return false;
              //} else {
              //  return false;
              //}
              //} else {
              //  return false;
              //}
              //});
            }
          }
        });
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

  function obtainCommercianteId(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const servizicommercianti = db.collection('servizicommercianti');
        await servizicommercianti.doc(id).get().then(res => {
          let jona = res.data().commerciante;
          if (jona) {
            resolve(jona);
          } else resolve(undefined)
        });
      } catch (error) {
        console.warn(error, "obtainCommercianteId")
      }
    });
  }

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
  /**
   * This function get from db the commercianteId from the serviceId and the orariSlots
   * @param id 
   */
  const initPrenota = async (id) => {
    setLoading(true);
    let serviceId = id;
    let commercianteId = await obtainCommercianteId(serviceId);
    setCommerciante(commercianteId);
    let orariFb = await iterateOrari(commercianteId);
    let prenotazioni = await checkPrenotazioni();
    setPrenotazioni(prenotazioni);

    setIsOn(true);

    setOrari(orariFb);
    setServiceId(serviceId);
    // te li forzo porco dio debug test
    //setDateSelected(moment());
    //setTimeout(() => {
    //workSlots(moment().isoWeekday(), orariFb, undefined);
    setLoading(false);
    //}, 1000);
  }

  React.useEffect(() => {
    let serviceId = route.params?.serviceId;

    let serviceDuration = route.params?.serviceDuration;
    let serviceCost = route.params?.serviceCost;
    let serviceDesc = route.params?.serviceDesc;
    let serviceTitle = route.params?.serviceTitle;
    let serviceCustomer = route.params?.serviceCustomer;

    if (serviceId !== undefined &&
      serviceDuration !== undefined &&
      serviceCost !== undefined &&
      serviceDesc !== undefined &&
      serviceTitle !== undefined &&
      serviceCustomer !== undefined) {

      initPrenota(serviceId);

      setServiceDuration(serviceDuration)
      setServiceCost(serviceCost);
      setServiceDesc(serviceDesc);
      setServiceTitle(serviceTitle);
      setServiceCustomer(serviceCustomer);

      setParte(3); // 1 2 3 4 5
      handleSnapPress(1);
    }
  }, [route.params]);

  const customDayHeaderStylesCallback = ({ dayOfWeek, month, year }) => {
    switch (dayOfWeek) { // can also evaluate month, year
      case 7:
        return {
          style: {
          },
          textStyle: {
            color: "#969696",
            fontSize: 15,
            //fontFamily: 'WorkSans_700Bold',
            fontFamily: 'Gilroy_Bold',
          }
        };
      default:
        return {
          style: {
          },
          textStyle: {
            color: Colors.light.nero,
            fontSize: 15,
            //fontFamily: 'WorkSans_700Bold',
            fontFamily: 'Gilroy_Bold',
          }
        }
    }
  }

  const onDateChange = (date) => {
    //setTimeout(() => {
    //console.log("DATA PREMUTA PORCO DO", date)
    setDateSelected(date);
    let today = moment(date).isoWeekday();
    workSlots(today, undefined, date);
    //}, 0);
  };

  const bottomSheetRef = React.useRef<BottomSheet>(null);
  const headerHeight = useHeaderHeight();

  // variables
  const snapPoints = React.useMemo(() => [0, 120, 280], []);
  const position = useValue<number>(0);
  const handleSnapPress = React.useCallback(index => {
    bottomSheetRef.current?.snapTo(index);
  }, []);

  const handleRegister = async (values, user) => {
    //console.log("values", values);
    if (values != null) {
      const { user, email, phone } = values;
      setLoading(true);
      try {
        let userId = await registerFromNotFound(user, email, phone).then(result => {
          //console.log("---registerFromNotFound---",result);
          return result;
        });
        await handlePrenotazione(userId).then(res => {
          if (res) {
            setIsOn(true);
            setParte(5);
            setLoading(false);
          } else {
            setLoading(false);
            //alert();
            //console.log("---handlePrenotazione---", res)
          }
        });
      } catch (error) {
        setLoading(false);
        //setRegisterError(error.message);
        console.log("---[registerFromNotFound][ERROR]---", error)
      }
    } else {
      setLoading(true);
      try {
        await handlePrenotazione().then(res => {
          if (res) {
            setIsOn(true);
            setParte(5);
            setLoading(false);
          } else {
            setLoading(false);
            alert("Errore a db! Contattaci al più presto chiamando il nostro numero verde!");
          }
        });
      } catch (error) {
        setLoading(false);
        //setRegisterError(error.message);
        console.log("---[handlePrenotazione][ERROR]---", error);
      }
    }
  }

  const handlePrenotazione = async (userId?) => {
    //console.log(daySelected, "moment(daySelected)")
    if (user !== null) {
      let prenotazione = {
        userId: user.uid,
        slot_date: daySelected.toString(),
        slot_time: moment(timeSelected).format("HH:mm"),
        slot_end_time: moment(timeSelected).add(serviceDuration * 10, 'minutes').format("HH:mm"),
        state: 0,
        serviceId,
        commercianteId,
        notes
      }
      try {
        const res = await db.collection('prenotazioni').add(prenotazione);
        console.log('Added document with ID: ', res.id);
        return true;
      } catch (error) {
        console.log(error, "handlePrenotazione");
        return false;
      }
    } else {
      if (userId) {
        let prenotazione = {
          userId: userId,
          //slot_date: moment(daySelected).format("dddd DD MMMM"),
          slot_date: daySelected.toString(),
          slot_time: moment(timeSelected).format("HH:mm"),
          slot_end_time: moment(timeSelected).add(serviceDuration * 10, 'minutes').format("HH:mm"),
          state: 0,
          serviceId,
          commercianteId,
          notes
        }
        try {
          const res = await db.collection('prenotazioni').add(prenotazione);
          console.log('Added document with ID: ', res.id);
          return true;
        } catch (error) {
          console.log("---[handlePrenotazione][ERROR]---", error)
          //console.log(error, "handlePrenotazione");
          return false;
        }
      } else {
        console.log('no user, wtf are you doing')
        return false;
      }
    }
  }

  const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback
      onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  );

  if (isLoading) {
    return (
      <Loader color={Colors.light.bianco} size={"large"} animating={true} />
    )
  }

  //console.log(route, "route-NotFoundScreen");
  //console.log(navigation, "route-NotFoundScreen");
  return (
    <SafeAreaView style={styles.container}>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        initialSnapIndex={0}
        handleComponent={() => <Handle style={{ backgroundColor: blockSelected == undefined ? "#E0E0E0" : Colors.light.arancio }} />}
        topInset={headerHeight}
        animatedPosition={position}
      >
        <View style={{
          backgroundColor: blockSelected == undefined ? "#E0E0E0" : Colors.light.arancio,
          minHeight: 320,
          paddingHorizontal: 50
        }}>
          <View style={{
            justifyContent: "space-between",
            alignContent: "center",
            alignItems: "center",
            flexDirection: "row",
            marginTop: 15,
          }}>
            <View>
              <BaseText size={15} weight={700} styles={{ flexWrap: 'wrap' }}>{serviceTitle}</BaseText>
              <BaseText size={10} weight={300} styles={{ flexWrap: 'wrap', maxWidth: 250 }}>{serviceDesc}</BaseText>
            </View>
            <BaseText size={14} weight={700}>{serviceCost} €</BaseText>
          </View>
          <View style={{ marginTop: 15 }}>
            <BaseText size={14} weight={400} styles={{
              textTransform: "capitalize"
            }}>
              {moment(daySelected).format("dddd DD MMMM")}
            </BaseText>
            {blockSelected != undefined && <BaseText size={14} weight={400} styles={{
              textTransform: "capitalize"
            }}>
              {moment(timeSelected).format("HH:mm")}
              {" - "}
              {moment(timeSelected).add(serviceDuration * 10, 'minutes').format("HH:mm")}
            </BaseText>}
          </View>
          {blockSelected != undefined && (<View style={{ marginBottom: 20 }}>
            <BaseButton title={"Avanti"} onPress={() => {
              //console.log("hai premuto avanti in BottomSheet NotFoundScreen.tsx");
              setParte(4);
              handleSnapPress(0);
              setIsOn(false)
            }} />
          </View>)}
        </View>
      </BottomSheet>
      {/**STEP INDICATOR */}
      <View style={{
        flexDirection: "row",
        alignItems: "center",
        marginTop: 20,
      }}>
        {parte <= 1 && (<View style={{ width: 40, height: 40 }}>
          <Ionicons name="ios-close" size={40} color={Colors.light.bianco} style={{ left: 20 }} onPress={goBack} />
        </View>
        )}
        {isOnModal && (<View style={{ width: 40, height: 40 }}>
          <Ionicons name="ios-close" size={40} color={Colors.light.bianco} style={{ left: 20 }} onPress={goBack} />
        </View>
        )}
        {parte > 1 && !isOnModal && (<View style={{ width: 40, height: 40 }}>
          <Ionicons name="ios-return-left" size={40} color={Colors.light.bianco} style={{ left: 20 }} onPress={() => {
            //console.log(parte,"--parte--")
            if (parte - 1 >= 1) setParte(parte - 1);
            if (parte === 4 || parte === 5) setIsOn(true)
          }} />
        </View>
        )}
        <View style={{ width: "70%", marginLeft: 20 }}>
          <StepIndicator
            customStyles={customStyles}
            currentPosition={parte - 1}
            renderStepIndicator={() => {
              return (
                <View />
              );
            }}
          />
        </View>
      </View>
      {parte === 1 && (<View>
        <BaseText styles={styles.first} size={10} color={Colors.light.bianco}>SCEGLI IL SERVIZIO</BaseText>
        {/* <Animate.View animation="slideInDown" duration={5000} */}
        <View
          style={styles.searchBar}>
          <TextInput
            onChangeText={(t) => setSearchValue(t)}
            style={{
              fontSize: 15,
              paddingLeft: 10,
              //fontFamily: searchValue ? "WorkSans_600SemiBold_Italic" : "WorkSans_600SemiBold"
              fontFamily: searchValue ? "Gilroy_SemiBoldItalic" : "Gilroy_SemiBold"
            }}
            placeholderTextColor={"grey"}
            placeholder="Cosa vorresti fare?"
          />
          <Ionicons
            name="ios-search"
            style={{ fontSize: 20, position: "absolute", right: 10 }} />
          {/* </Animate.View> */}
        </View>
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
              <BaseText color={selectedType ? "#FBFBFB" : "#6B6B6B"} size={13}>Parruchiere</BaseText>
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
              <BaseText color={!selectedType ? "#FBFBFB" : "#6B6B6B"} size={13}>Centro estetico</BaseText>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          marginVertical: 20
        }}>
          {servizi.map(({ label }, index) => (
            <TouchableOpacity key={index} style={{
              width: 100,
              marginHorizontal: 3,
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
              backgroundColor: "transparent",
              marginBottom: 20
            }}>
              <View style={{
                width: 65,
                height: 65,
                borderRadius: 30,
                backgroundColor: Colors.light.bianco,
                shadowColor: Colors.light.nero,
                shadowOpacity: 0.25,
                shadowOffset: {
                  width: 0,
                  height: 4
                },
                justifyContent: "center",
                alignItems: "center"
              }}>
                <Ionicons name="ios-star-outline" size={30} color={Colors.light.arancioDes} />
              </View>
              <View style={{ marginTop: 5, height: 20, width: 100 }}>
                <BaseText size={12} color={Colors.light.grigio} styles={{
                  textAlign: "center"
                }}>{label}</BaseText>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableWithoutFeedback onPress={() => { setParte(parte + 1) }}>
          <View style={[styles.btn, { marginTop: 120 }]}>
            <BaseText size={15} styles={{
              alignSelf: 'center',
              textTransform: "uppercase"
            }}>{"Avanti"}</BaseText>
          </View>
        </TouchableWithoutFeedback>
      </View>)}
      {parte === 2 && (<View style={{ flex: 1 }}>
        <BaseText styles={styles.first} size={10} color={Colors.light.bianco}>{"SCEGLI IL SALONE"}</BaseText>
        {/* <Animate.View animation="slideInDown" duration={300} */}
        <View style={styles.searchBar}>
          <TextInput
            onChangeText={(t) => setSalonValue(t)}
            placeholder="In quale salone?"
            placeholderTextColor={"grey"}
            style={{
              fontSize: 15,
              paddingLeft: 10,
              //fontFamily: salonValue ? "WorkSans_600SemiBold_Italic" : "WorkSans_600SemiBold"
              fontFamily: salonValue ? "Gilroy_SemiBoldItalic" : "Gilroy_SemiBold"
            }}
          />
          <Ionicons
            name="ios-search"
            style={{ fontSize: 20, position: "absolute", right: 10 }} />
          {/* </Animate.View> */}
        </View>
        <ScrollView contentContainerStyle={{
          flex: 1,
          paddingBottom: 300
        }}>
          <View style={{
            backgroundColor: Colors.light.bianco,
            marginVertical: 10,
            marginHorizontal: 20,
            borderRadius: 10,
            padding: 15,
          }}>
            <View style={{ flexDirection: "row" }}>
              <Image style={{ width: 40, height: 40, borderRadius: 5 }} source={require('../assets/images/salon.jpeg')} />
              <View style={{
                marginLeft: 10
              }}>
                <BaseText size={14} weight={500}>{"Salone l'Araba Fenice"}</BaseText>
                <View style={{
                  flexDirection: "row",
                  alignContent: "center",
                  alignItems: "center",
                }}>
                  <Ionicons name="ios-star" size={15} color={Colors.light.giallo} />
                  <Ionicons name="ios-star" size={15} color={Colors.light.giallo} />
                  <Ionicons name="ios-star" size={15} color={Colors.light.giallo} />
                  <Ionicons name="ios-star" size={15} color={Colors.light.giallo} />
                  <Ionicons name="ios-star" size={15} color={Colors.light.giallo} />
                  <BaseText size={10}>{"(50)"}</BaseText>
                </View>
              </View>
            </View>
            <View style={{ paddingBottom: 20, marginTop: 10 }}>
              {tagli.map(({ title, desc, price }, index) => {
                const dio = async () => {
                  haptics.selectionTouch();
                };
                return (
                  <TouchableWithoutFeedback key={index} onPress={dio}>
                    <View style={{ marginVertical: 5 }}>
                      <View style={{
                        minHeight: 40,
                        borderRadius: 5,
                        backgroundColor: Colors.light.grigio,
                      }}>
                        <Ionicons name="ios-checkbox-outline" size={20} color={"#DE9182"} style={{
                          position: "absolute",
                          left: 10,
                          top: 10,
                        }} />
                        <View style={{
                          flexDirection: "row",
                          flex: 1,
                          justifyContent: "space-between",
                          alignItems: "center",
                          alignContent: "center",
                          marginLeft: 40,
                          marginRight: 10
                        }}>
                          <BaseText size={13}>{title}</BaseText>
                          <BaseText size={12} weight={700}>{price} €</BaseText>
                        </View>
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                );
              })}
            </View>
            <View style={{
              flexDirection: "row",
              alignItems: "center",
              position: "absolute",
              right: 10,
              bottom: 5
            }}>
              <BaseText weight={700} size={9} italic styles={{
                marginRight: 5,
              }}>{"DETTAGLI"}</BaseText>
              <Ionicons name="md-return-right" size={20} color={Colors.light.arancioDes} />
            </View>
          </View>
          <View style={{
            backgroundColor: Colors.light.bianco,
            marginVertical: 10,
            marginHorizontal: 20,
            borderRadius: 10,
            padding: 15,
          }}>
            <View style={{ flexDirection: "row" }}>
              <Image style={{ width: 40, height: 40, borderRadius: 5 }} source={require('../assets/images/salon.jpeg')} />
              <View style={{
                marginLeft: 10
              }}>
                <BaseText size={14} weight={500}>{"Salone Le Noir"}</BaseText>
                <View style={{
                  flexDirection: "row",
                  alignContent: "center",
                  alignItems: "center",
                }}>
                  <Ionicons name="ios-star" size={15} color={Colors.light.giallo} />
                  <Ionicons name="ios-star" size={15} color={Colors.light.giallo} />
                  <Ionicons name="ios-star" size={15} color={Colors.light.giallo} />
                  <Ionicons name="ios-star" size={15} color={Colors.light.giallo} />
                  <Ionicons name="ios-star" size={15} color={Colors.light.giallo} />
                  <BaseText size={10}>{"(50)"}</BaseText>
                </View>
              </View>
            </View>
            <View style={{ paddingBottom: 20, marginTop: 10 }}>
              {tagli.map(({ title, desc, price }, index) => {
                //const dio = () => {
                //};
                return (
                  <TouchableWithoutFeedback key={index} >
                    <View style={{ marginVertical: 5 }}>
                      <View style={{
                        minHeight: 40,
                        borderRadius: 5,
                        backgroundColor: Colors.light.grigio,
                      }}>
                        <Ionicons name="ios-checkbox-outline" size={20} color={"#DE9182"} style={{
                          position: "absolute",
                          left: 10,
                          top: 10,
                        }} />
                        <View style={{
                          flexDirection: "row",
                          flex: 1,
                          justifyContent: "space-between",
                          alignItems: "center",
                          alignContent: "center",
                          marginLeft: 40,
                          marginRight: 10
                        }}>
                          <BaseText size={13}>{title}</BaseText>
                          <BaseText size={12} weight={700}>{price} €</BaseText>
                        </View>
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                );
              })}
            </View>
            <View style={{
              flexDirection: "row",
              alignItems: "center",
              position: "absolute",
              right: 10,
              bottom: 5
            }}>
              <BaseText weight={700} size={9} italic styles={{
                marginRight: 5,
              }}>{"DETTAGLI"}</BaseText>
              <Ionicons name="md-return-right" size={20} color={Colors.light.arancioDes} />
            </View>
          </View>
        </ScrollView>
        <View style={[styles.btn, { marginTop: 20 }]}>
          <BaseText styles={{
            alignSelf: 'center',
            textTransform: "uppercase"
          }}>{"Avanti"}</BaseText>
        </View>
      </View>)
      }
      {parte === 3 && (
        <>
          <BaseText styles={[styles.first, { marginBottom: 10, textTransform: "uppercase" }]} size={10} color={Colors.light.bianco}>Prenota giorno e ora</BaseText>
          {/*<BaseText style={[styles.text, styles.first, { marginBottom: 10 }]}>PRENOTA GIORNO E ORA</BaseText>*/}
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ zIndex: -1 }}
            contentContainerStyle={{ paddingBottom: 320 }}>
            <View style={{
              marginBottom: 15,
              marginHorizontal: 20,
              backgroundColor: Colors.light.bianco,
              borderRadius: 10
            }}>
              <CalendarPicker
                onDateChange={(date) => onDateChange(date)}
                //selectedStartDate={daySelected}
                date={daySelected}
                weekdays={['L', 'M', 'M', 'G', 'V', 'S', 'D']}
                months={['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre']}
                startFromMonday={true}
                nextTitle={">"}
                previousTitle={"<"}
                // maxDate={moment()}
                // minDate={moment()}
                // disabledDates={disabledDates}
                // monthsHeaderTextColor={"red"}
                // customDatesStyles={customDatesStyles}
                applyMinMaxDateOnMonthSelection={false}
                previousTitleStyle={{
                  color: Colors.light.arancioDes,
                  paddingLeft: 20,
                  paddingTop: 5,
                }}
                headingLevel={3}
                nextTitleStyle={{
                  color: Colors.light.arancioDes,
                  paddingRight: 20,
                  paddingTop: 5,
                }}
                disabledDatesTextStyle={{
                  color: Colors.light.grigio,
                }}
                selectedDayColor={Colors.light.arancioDes}
                selectedDayTextColor={Colors.light.nero}
                todayBackgroundColor={Colors.light.grigio}
                selectYearTitle={"Scegli anno"}
                selectMonthTitle={"Scegli mese nel "}
                enableDateChange={true}
                restrictMonthNavigation={true}
                textStyle={{
                  //fontFamily: 'WorkSans_400Regular',
                  fontFamily: 'Gilroy_Regular',
                  color: 'black',
                }}
                customDayHeaderStyles={customDayHeaderStylesCallback}
                dayLabelsWrapper={{
                  borderTopWidth: 0,
                  borderBottomWidth: 0,
                  backgroundColor: "#E0E0E0",
                  color: Colors.light.bianco,
                  marginHorizontal: 5
                }}
              />
            </View>
            <View style={{
              marginHorizontal: 20,
              backgroundColor: Colors.light.bianco,
              borderRadius: 10,
              display: blocks === null ? "none" : "flex"
            }}>
              <View style={{
                marginVertical: 15,
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center"
              }}>
                <BaseText size={14} weight={400} color={Colors.light.nero}>Orari disponibili</BaseText>
                {/*{blocks === null &&
                  <BaseText size={10} weight={600} color={Colors.light.rosso}>Scegli una data!</BaseText>
                }*/}
                {blocks === undefined &&
                  <BaseText size={10} weight={600} color={Colors.light.rosso}>🚨 In questa data il commerciante è chiuso! 🚨</BaseText>
                }
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{
                  flexDirection: "row",
                  //flexWrap: "wrap",
                  //alignContent: "center",
                  //alignItems: "center",
                  //justifyContent: "space-between",
                  marginHorizontal: 10,
                  marginTop: 15,
                  marginBottom: 10,
                  display: blocks == undefined && blocks == null ? "none" : "flex"
                }}>
                  {
                    blocks !== undefined && blocks !== null && blocks.map((slot, index) => {
                      //console.log("--slot--", slot)
                      const onPress = () => {
                        if (index == blockSelected) {
                          setBlockSelected(undefined);
                        } else {
                          handleSnapPress(1);
                          setTimeSelected(slot);
                          setBlockSelected(index);
                        }
                      }
                      return (
                        <TouchableOpacity key={index} onPress={() => onPress()} style={{
                          borderRadius: 5,
                          backgroundColor: blockSelected == index ? Colors.light.arancio : Colors.light.grigio,
                          width: 53,
                          height: 38,
                          alignContent: "center",
                          alignItems: "center",
                          justifyContent: "center",
                          marginVertical: 8,
                          marginHorizontal: 10
                        }}>
                          <BaseText size={12} weight={400}>
                            {/*{slot.utc().utcOffset("-02:00", true).format("HH:mm")}*/}
                            {slot.format("HH:mm")}
                          </BaseText>
                        </TouchableOpacity>
                      )
                    })
                  }
                </ScrollView>
              </View>
            </View>
          </ScrollView>
        </>
      )}
      {parte === 4 && (
        <>
          <ScrollView>
            <BaseText styles={[styles.first, { marginBottom: 10, textTransform: "uppercase" }]} size={10} color={Colors.light.bianco}>
              {user == null ? "registrazione" : "conferma dati prenotazione"}
            </BaseText>
            {/*<BaseText style={[styles.text, styles.first, { marginBottom: 10, textTransform: "uppercase" }]}>*/}
            {/*{user == null ? "registrazione" : "conferma dati prenotazione"}*/}
            {/*</BaseText>*/}
            <View style={{
              marginHorizontal: 30,
            }}>
              <View style={{
                backgroundColor: Colors.light.arancio,
                borderTopLeftRadius: 5,
                borderTopRightRadius: 5,
                paddingHorizontal: 20,
              }}>
                <View style={{
                  justifyContent: "space-between",
                  alignContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                  marginTop: 15,
                }}>
                  <View>
                    <BaseText size={15} weight={600} styles={{ flexWrap: 'wrap' }}>{serviceTitle}</BaseText>
                    <BaseText size={14} weight={300} styles={{ flexWrap: 'wrap', maxWidth: 250 }}>{serviceCustomer}</BaseText>
                  </View>
                  <BaseText size={14} weight={600}>{serviceCost} €</BaseText>
                </View>
                <View style={{ marginTop: 15, marginBottom: 10 }}>
                  <BaseText size={14} weight={400} styles={{
                    textTransform: "capitalize"
                  }}>
                    {moment(daySelected).format("dddd DD MMMM")}
                  </BaseText>
                  {blockSelected != undefined && <BaseText size={14} weight={400} styles={{
                    textTransform: "capitalize"
                  }}>
                    {moment(timeSelected).format("HH:mm")}
                    {" - "}
                    {moment(timeSelected).add(serviceDuration * 10, 'minutes').format("HH:mm")}
                  </BaseText>}
                </View>
              </View>
              <View style={{
                backgroundColor: Colors.light.bianco,
                //padding: 5,
                borderBottomLeftRadius: 5,
                borderBottomRightRadius: 5,
                paddingHorizontal: 20
              }}>
                {user == null && (
                  <>
                    <View style={{ marginTop: 20 }}>
                      <BaseText size={16} lineHeight={20} color="black" weight={600}>{"Registrati per prenotare"}</BaseText>
                    </View>
                    <View style={{ marginTop: 10 }}>
                      <Form
                        initialValues={{
                          user: 'Jonathan Canevese',
                          email: 'admin@bizzarro.org',
                          phone: '041611532'
                          //user: 'Jonathan Pergolo',
                          //email: 'dio@dio.it',
                          //phone: '3519032191'
                        }}
                        //validationSchema={validationSchema}
                        onSubmit={values => handleRegister(values)}
                      >
                        <BaseText size={10} lineHeight={15} color={Colors.light.violaDes}>Nome e Cognome</BaseText>
                        <FormField
                          name="user"
                          placeholder="Paolo Bergo"
                          autoCapitalize="none"
                          keyboardType="default"
                          textContentType="familyName"
                          autoFocus={false}
                        />
                        <BaseText size={10} lineHeight={15} color={Colors.light.violaDes}>Indirizzo Email</BaseText>
                        <FormField
                          name="email"
                          placeholder="mario.rossi@beautyshop.it"
                          autoCapitalize="none"
                          keyboardType="email-address"
                          textContentType="emailAddress"
                          autoFocus={false}
                        />
                        <BaseText size={10} lineHeight={15} color={Colors.light.violaDes}>Numero di telefono</BaseText>
                        <FormField
                          name="phone"
                          placeholder="3939024085"
                          autoCapitalize="none"
                          keyboardType="number-pad"
                          textContentType="telephoneNumber"
                          autoFocus={false}
                        />
                        <View style={{ marginBottom: 20 }}>
                          <FormButton title={'Prenota'} color={Colors.light.arancioDes} />
                        </View>
                        {/*{<FormErrorMessage error={loginError} visible={true} />}*/}
                      </Form>
                      <View style={{ paddingHorizontal: 70, marginBottom: 5 }}>
                        <View style={{
                          height: 2,
                          width: "100%",
                          backgroundColor: Colors.light.nero
                        }} />
                      </View>
                      <View style={{
                        alignContent: "center",
                        alignItems: "center",
                        justifyContent: "center",
                        paddingHorizontal: 30
                      }}>
                        <BaseText size={8} weight={400} italic>oppure prenota con il tuo account social</BaseText>
                      </View>
                      <View style={{ flexDirection: "row", alignItems: "center", alignContent: "center", justifyContent: "center", marginVertical: 20 }}>
                        <TouchableOpacity style={[styles.shadowBtn, { width: 87, height: 58, backgroundColor: "white", borderRadius: 5, justifyContent: "center", }]}>
                          <IconFooterSocial type="google" width={24} height={24} style={{ alignSelf: "center", }} />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.shadowBtn, { width: 87, height: 58, backgroundColor: "white", borderRadius: 5, marginHorizontal: 12, justifyContent: "center" }]}>
                          <IconFooterSocial type="facebook" width={24} height={24} style={{ alignSelf: "center", }} />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.shadowBtn, { width: 87, height: 58, backgroundColor: "white", borderRadius: 5, justifyContent: "center" }]}>
                          <IconFooterSocial type="apple" width={24} height={24} style={{ alignSelf: "center", }} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </>
                )}
                {user != null && (
                  <View style={{ marginBottom: 20 }}>
                    {/*<DismissKeyboard>*/}
                    <TextInput
                      value={notes}
                      onChangeText={(value) => { setNotes(value) }}
                      multiline
                      numberOfLines={4}
                      placeholder={"Note informative"}
                      style={{
                        //lineHeight: 30,
                        marginTop: 20,
                        borderRadius: 8,
                        borderWidth: 1,
                        paddingVertical: 20,
                        height: 100,
                        paddingHorizontal: 10,
                        borderColor: "black"
                      }}
                    />
                    {/*</DismissKeyboard>*/}
                    <BaseButton title={"Prenota"} onPress={() => {
                      //console.log("hai premuto prenota in parte 4");
                      Alert.alert(
                        //title
                        'Prenotazione',
                        //body
                        'Stai per mandare la richiesta al commerciante, ricordati che dovrai aspettare la sua conferma!',
                        [
                          { text: 'Ok', onPress: () => handleRegister(null, user) },
                          { text: 'Annulla', style: 'cancel' },
                        ],
                        { cancelable: false }
                        //clicking out side of alert will not cancel
                      );

                    }} />
                  </View>
                )}
              </View>
            </View>
          </ScrollView>
        </>
      )}
      {parte === 5 && (
        <>
          <BaseText styles={[styles.first, { marginBottom: 10, textTransform: "uppercase" }]} size={10} color={Colors.light.bianco}>
            {"Prenotazione riuscita"}
          </BaseText>
          {/*<BaseText style={[styles.text, styles.first, { marginBottom: 10, textTransform: "uppercase" }]}>
            {"Prenotazione riuscita"}
          </BaseText>*/}
          <View style={{
            marginHorizontal: 30,
          }}>
            <View style={{
              backgroundColor: Colors.light.arancio,
              borderTopLeftRadius: 5,
              borderTopRightRadius: 5,
              paddingHorizontal: 20,
            }}>
              <View style={{
                justifyContent: "space-between",
                alignContent: "center",
                alignItems: "center",
                flexDirection: "row",
                marginTop: 15,
              }}>
                <View>
                  <BaseText size={15} weight={600} styles={{ flexWrap: 'wrap' }}>{serviceTitle}</BaseText>
                  <BaseText size={14} weight={300} styles={{ flexWrap: 'wrap', maxWidth: 250 }}>{serviceCustomer}</BaseText>
                </View>
                <BaseText size={14} weight={600}>{serviceCost} €</BaseText>
              </View>
              <View style={{ marginTop: 15, marginBottom: 10 }}>
                <BaseText size={14} weight={400} styles={{
                  textTransform: "capitalize"
                }}>
                  {moment(daySelected).format("dddd DD MMMM")}
                </BaseText>
                {blockSelected != undefined && <BaseText size={14} weight={400} styles={{
                  textTransform: "capitalize"
                }}>
                  {moment(timeSelected).format("HH:mm")}
                  {" - "}
                  {moment(timeSelected).add(serviceDuration * 10, 'minutes').format("HH:mm")}
                </BaseText>}
              </View>
            </View>
            <View style={{
              backgroundColor: "white",
              //padding: 5,
              borderBottomLeftRadius: 5,
              borderBottomRightRadius: 5,
              paddingHorizontal: 20,
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center"
            }}>
              <BaseText size={15} weight={600} styles={{ marginVertical: 10 }}>Prenotazione riuscita!</BaseText>
              <View style={{
                width: 65,
                height: 14,
                borderRadius: 5,
                backgroundColor: "rgba(193, 133, 133, 0.4)",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 5,
              }}>
                <BaseText weight={700} styles={{ color: "#8f3700" }} size={8}>{"Richesta"}</BaseText>
              </View>
              <BaseText size={13} weight={400} styles={{ textAlign: "center" }}>A breve ricevere una email di conferma del tuo appuntamento.</BaseText>
              <Image style={{ width: "100%", height: 268, resizeMode: "contain" }} source={require('../assets/images/conferma_prenotazione.png')} />
              <BaseText size={8} weight={300} italic color={"#181818"} styles={{ textAlign: "center", marginBottom: 10 }}>
                {"Per eliminare o modificare la prenotazione\nvai alla schermata nella Tab delle Prenotazioni!"}
              </BaseText>
            </View>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

//slots.map(slot => {
//  //const appointmentDateString = moment(daySelected).format(
//  //  "YYYY-DD-MM"
//  //);
//  console.warn(slot, "slot")
//  const time1 = moment()
//    .hour(9)
//    .minute(0)
//    .add(0, "minutes");
//  const time2 = moment()
//    .hour(9)
//    .minute(0)
//    .add(15, "minutes");
//  //const scheduleDisabled = this.state.schedule[appointmentDateString]
//  //  ? this.state.schedule[
//  //      moment(daySelected).format("YYYY-DD-MM")
//  //    ][slot]
//  //  : false;
//  //const meridiemDisabled = this.state.appointmentMeridiem
//  //  ? time1.format("a") === "am"
//  //  : time1.format("a") === "pm";
//  return (
//    <BaseText
//      key={slot}
//      //value={slot}
//      styles={{
//        marginBottom: 15,
//        //display: meridiemDisabled ? "none" : "inherit"
//      }}
//    //disabled={scheduleDisabled || meridiemDisabled}
//    >
//      {time1.format("HH:mm") + " - " + time2.format("HH:mm")}
//    </BaseText>
//  );
//})