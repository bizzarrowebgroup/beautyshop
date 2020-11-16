/**
 * remove this log when all the ScrollView is moved to a renderHeaderComponent of the SectionList !
 */
import React, { useRef } from 'react';

import { LogBox } from "react-native";
LogBox.ignoreLogs([
  'VirtualizedLists should never be nested'
]);

//const { width } = Dimensions.get('window');
import StarsReview from '../components/StarsReview';

import {
  SafeAreaView,
  StyleSheet,
  //Animated,
  //ScrollView,
  Dimensions,
  SectionList,
  View,
  //Image,
  TouchableWithoutFeedback,
  TouchableOpacity
} from 'react-native';
import Animated, {
  //interpolate,
  //concat,
  Extrapolate,
} from 'react-native-reanimated';
import moment from 'moment';
import Loader from '../components/Loader';
import { Ionicons } from '@expo/vector-icons';
import { db } from '../network/Firebase';
//import ShimmerPlaceholder from 'react-native-shimmer-placeholder';

import BaseText from '../components/StyledText';
import Colors from '../constants/Colors';
import { StatusBar } from 'expo-status-bar';

const HEADER_MAX_HEIGHT = 240;
const HEADER_MIN_HEIGHT = 150;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

function Shop({ navigation, route }) {
  const scrollY = useRef(new Animated.Value(0)).current;

  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -HEADER_SCROLL_DISTANCE],
    extrapolate: Extrapolate.CLAMP,
  });

  const imageOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [.76, .3, 0],
    extrapolate: Extrapolate.CLAMP,
  });
  const imageTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 100],
    extrapolate: Extrapolate.CLAMP,
  });
  const dockTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 55],
    extrapolate: Extrapolate.CLAMP,
  });

  const titleScale = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 1, 0.9],
    extrapolate: Extrapolate.CLAMP,
  });

  //const titleSize = scrollY.interpolate({
  //  inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
  //  outputRange: [2, 7, 15],
  //  extrapolate: 'clamp',
  //});

  const titlePadding = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [20, 10, -10],
    extrapolate: Extrapolate.CLAMP,
  });

  const titleTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 0, -45],
    extrapolate: Extrapolate.CLAMP,
  });

  const [indexX, setIndex] = React.useState(0);
  const [data, setData] = React.useState(undefined);

  // TABELLA ORARIO
  const [bool, setBool] = React.useState(false);
  const [day, setDay] = React.useState(0);

  const [lunedi, setLunedi] = React.useState({});
  const [martedi, setMartedi] = React.useState({});
  const [mercoledi, setMercoledi] = React.useState({});
  const [giovedi, setGiovedi] = React.useState({});
  const [venerdi, setVenerdi] = React.useState({});
  const [sabato, setSabato] = React.useState({});
  const [domenica, setDomenica] = React.useState({});
  const [noOrari, setOrari] = React.useState(false);
  const [recensioni, setRecensioni] = React.useState(undefined);
  const [servizi, setServizi] = React.useState(undefined);

  const [indexChosenService, setChosenService] = React.useState(undefined);
  const [durationChosenService, setDurationChosenService] = React.useState(undefined);
  const [costChosenService, setCostChosenService] = React.useState(undefined);
  const [descChosenService, setDescChosenService] = React.useState(undefined);
  const [titleChosenService, setTitleChosenService] = React.useState(undefined);

  const [loading, setLoading] = React.useState(true);
  //const [customerTitle, setCustomerTitle] = React.useState(undefined);

  const heightX = !bool ? 44 : 100;
  const status = true;

  const getCommerciante = async (id) => {
    const commerciantiFirebase = db.collection('commercianti').doc(id);
    const doc = await commerciantiFirebase.get();
    if (!doc.exists) {
      setOrari(true);
    } else {
      let final = { ...doc.data() };
      setData(final);

      const orariRef = db.collection('orari');
      const snapshot = await orariRef.where('commercianti', '==', doc.id).get();
      if (snapshot.empty) {
        setOrari(true)
      }
      let hours = [];
      snapshot.forEach(async (doc) => {
        const orariRefInternal = db.collection('orari').doc(doc.id).collection('orario');
        const snapshotInternal = await orariRefInternal.get();
        if (snapshotInternal.empty) {
          console.log('No matching orario');
        }
        snapshotInternal.forEach(doc => {
          hours.push({ id: doc.id, ...doc.data() });
        })
        hours.forEach(h => {
          switch (h.day) {
            case 1:
              if (h.open === "" || h.close === "") {
                setLunedi({ closed: true })
              } else {
                setLunedi({ start: h.open, end: h.close })
              }
              break;
            case 2:
              if (h.open === "" || h.close === "") {
                setMartedi({ closed: true })
              } else {
                setMartedi({ start: h.open, end: h.close })
              }
              break;
            case 3:
              if (h.open === "" || h.close === "") {
                setMercoledi({ closed: true })
              } else {
                setMercoledi({ start: h.open, end: h.close })
              }
              break;
            case 4:
              if (h.open === "" || h.close === "") {
                setGiovedi({ closed: true })
              } else {
                setGiovedi({ start: h.open, end: h.close })
              }
              break;
            case 5:
              if (h.open === "" || h.close === "") {
                setVenerdi({ closed: true })
              } else {
                setVenerdi({ start: h.open, end: h.close })
              }
              break;
            case 6:
              if (h.open === "" || h.close === "") {
                setSabato({ closed: true })
              } else {
                setSabato({ start: h.open, end: h.close })
              }
              break;
            case 7:
              if (h.open === "" || h.close === "") {
                setDomenica({ closed: true })
              } else {
                setDomenica({ start: h.open, end: h.close })
              }
              break;
          }
        })
      });

      const recensioniFB = await db.collection('recensioni').get();
      if (recensioniFB) {
        let finalRecensioni = [];
        recensioniFB.forEach(rec => {
          let data = rec.data();
          let rid = data.commercianti;
          if (rid.toString() === doc.id) {
            finalRecensioni.push(data);
          }
        });
        setRecensioni(finalRecensioni);
        //setTimeout(() => {
        setLoading(false);
        //}, 500);
      }
    }

  }

  const uniqueArray = (array) => {
    var obj = {};
    array.forEach((v) => {
      obj[v.title] = (obj[v.title] || []).concat(v.data)
    });

    var result = Object.keys(obj).reduce((s, a) => {
      s.push({ title: a, data: obj[a] });
      return s;
    }, []);

    return result;
  }

  const getServizioTitle = async (docId) => {
    return new Promise(async (resolve, reject) => {
      try {
        let servizio = db.collection('servizi').doc(docId);
        let docs = await servizio.get();
        if (docs) {
          const data = docs.data();
          resolve(data.label);
        } else resolve(undefined)
      } catch (error) {
        console.warn(error, "getServizioTitle")
      }
    });
  }

  const iterateFinal = async (finalServizi) => {
    return new Promise(async (resolve, reject) => {
      try {
        let finalServiziEdit = [];
        await Promise.all(finalServizi.map(async doc => {
          let docId, doctitle;
          docId = doc.data['servizi'];
          doctitle = await getServizioTitle(docId).then((res) => {
            return res;
          });
          finalServiziEdit.push({
            title: doctitle !== undefined ? doctitle : 'Categoria non dichiarata',
            data: [doc.data]
          });
        }))
        //console.log(finalServiziEdit, "inside")
        if (finalServiziEdit.length > 0) {
          resolve(finalServiziEdit)
        } else {
          resolve(undefined)
        }
      } catch (error) {
        console.warn(error, "iterateFinal");
      }
    });
  }

  // HHCFptUM91FqhMq2INjE id
  const getServizi = async (idCommerciante) => {
    const serviziFirebase = db.collection('servizicommercianti');
    const doc = await serviziFirebase.where('commerciante', '==', idCommerciante).get();
    if (doc) {
      let finalServizi = [];
      doc.forEach(doc => {
        let data = { ...doc.data(), id: doc.id };
        finalServizi.push({ data, "id": doc.id });
      });
      let finalServiziEdit = await iterateFinal(finalServizi);
      //console.log(finalServiziEdit, "finalServiziEdit")
      if (finalServiziEdit != undefined) setServizi(uniqueArray(finalServiziEdit));
    } else {
      console.log("no-doc");
    }
  }

  //const setPreferito = async (idPreferito) => {
  //  let preferito = {
  //    //idUser: User.
  //    preferito: idPreferito,
  //    //user: 
  //  };
  //  const preferitiFB = db.collection('preferitiApp').add(preferito);
  //}

  React.useEffect(() => {
    if (route.params?.id) {
      getServizi(route.params?.id);
      getCommerciante(route.params?.id);
      const date = moment();
      const day = date.day();
      setDay(day);
    }
  }, [route.params?.id]);


  if (loading) {
    return (
      <Loader color={Colors.light.bianco} size={"large"} animating={true} />
    )
  }

  const serviziHeader = (title) => {
    return (
      <View style={{ marginVertical: 5 }}>
        <BaseText weight={300} styles={{
          fontSize: 13,
          textTransform: "uppercase"
        }}>{title}</BaseText>
      </View>
    );
  }

  const ItemService = ({ item }) => {
    const { cost, desc, enabled, titolo, id, durata } = item;
    const openService = () => {
      if (indexX == id) {
        setIndex(undefined);
      } else {
        setIndex(id);
      }
    };
    const chosenService = () => {
      if (indexChosenService == id) {
        setChosenService(undefined);
        //handleSnapPress(0);
        //bottomSheetRef.current.snapTo(0);
      } else {
        setChosenService(id);
        setDurationChosenService(durata);
        setCostChosenService(cost);
        setDescChosenService(desc);
        setTitleChosenService(titolo)
        //handleSnapPress(1);
        //bottomSheetRef.current.snapTo(1.5);
      }
    }
    if (enabled) {
      return (
        <TouchableWithoutFeedback onPress={openService}>
          <View style={{ marginVertical: 5 }} key={titolo}>
            <View style={{
              minHeight: 40,
              borderTopLeftRadius: 5,
              borderTopRightRadius: 5,
              borderRadius: id != indexX ? 5 : 0,
              backgroundColor: Colors.light.bianco,
            }}>
              <TouchableOpacity onPress={chosenService} style={{
                position: "absolute",
                left: 10,
                top: 10,
              }}>
                {id !== indexChosenService && <View style={{
                  width: 20,
                  height: 20,
                  borderWidth: 1,
                  borderRadius: 4,
                  borderColor: Colors.light.ARANCIO
                }} />}
                {id === indexChosenService && (
                  <Ionicons name={"ios-checkbox-outline"} size={25} color={Colors.light.ARANCIO} style={{ top: -2, borderRadius: 5 }} />
                )}
              </TouchableOpacity>
              <TouchableOpacity onPress={openService}>
                <Ionicons name="ios-arrow-down" size={18} color={Colors.light.nero} style={{
                  position: "absolute",
                  right: 15,
                  top: 10,
                  transform: [{ rotate: indexX === id ? '180deg' : '0deg' }]
                }} />
              </TouchableOpacity>
              <View style={{
                flexDirection: "row",
                flex: 1,
                justifyContent: "space-between",
                alignItems: "center",
                alignContent: "center",
                marginLeft: 40,
                marginRight: 40
              }}>
                <BaseText size={13} styles={{
                  letterSpacing: 0.27
                }}>{titolo}</BaseText>
                <BaseText size={13} weight={700} letterSpacing={0.27}>{cost} €</BaseText>
              </View>
            </View>
            {id === indexX &&
              <View style={{
                backgroundColor: Colors.light.bianco,
                borderBottomRightRadius: 10,
                borderBottomLeftRadius: 10,
                padding: 15,
                top: -5,
                zIndex: -1
              }}>
                <BaseText styles={{
                  color: "#828282",
                  textAlign: "left",
                  fontSize: 13,
                  letterSpacing: 0.27
                }}>{desc}</BaseText>
              </View>
            }
          </View>
        </TouchableWithoutFeedback>
      );
    } else {
      return (
        <></>
      );
    }
  };
  return (
    <SafeAreaView style={styles.saveArea}>
      <StatusBar style="light"></StatusBar>

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: HEADER_MAX_HEIGHT - 50,
          paddingBottom: HEADER_MAX_HEIGHT - 70,
          zIndex: -100,
        }}
        style={{
          marginTop: dockTranslateY
          //transform: [{
          //  translateY: dockTranslateY
          //}]
        }}
        scrollEventThrottle={16}
        onScroll={
          Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true },
          )
        }>
        <View style={styles.card}>
          <BaseText size={12}>{data.desc}</BaseText>
        </View>
        <View style={styles.card}>
          <BaseText size={12}>{data.email}</BaseText>
        </View>
        <View style={styles.card}>
          <BaseText size={12}>{data.phone}</BaseText>
        </View>
        <View style={styles.card}>
          <BaseText size={12}>{data.via.toUpperCase()}</BaseText>
        </View>
        {!noOrari && (
          <View style={styles.card}>
            <BaseText weight={day === 1 ? 700 : 400} size={12}>{"LUN " + (lunedi.closed ? "CHIUSO" : lunedi.start + " - " + lunedi.end)}</BaseText>
            <BaseText weight={day === 2 ? 700 : 400} size={12}>{"MAR " + (martedi.closed ? "CHIUSO" : martedi.start + " - " + martedi.end)}</BaseText>
            <BaseText weight={day === 3 ? 700 : 400} size={12}>{"MER " + (mercoledi.closed ? "CHIUSO" : mercoledi.start + " - " + mercoledi.end)}</BaseText>
            <BaseText weight={day === 4 ? 700 : 400} size={12}>{"GIO " + (giovedi.closed ? "CHIUSO" : giovedi.start + " - " + giovedi.end)}</BaseText>
            <BaseText weight={day === 5 ? 700 : 400} size={12}>{"VEN " + (venerdi.closed ? "CHIUSO" : venerdi.start + " - " + venerdi.end)}</BaseText>
            <BaseText weight={day === 6 ? 700 : 400} size={12}>{"SAB " + (sabato.closed ? "CHIUSO" : sabato.start + " - " + sabato.end)}</BaseText>
            <BaseText weight={day === 7 ? 700 : 400} size={12}>{"DOM " + (domenica.closed ? "CHIUSO" : domenica.start + " - " + domenica.end)}</BaseText>
          </View>
        )}

        {/**
         * Valutazioni e recensioni
         */}
        {recensioni !== undefined && (<View style={{ backgroundColor: "transparent", marginHorizontal: 20 }}>
          {/*<BaseText weight={300} size={13} styles={{
              textTransform: "uppercase"
            }}>{"alutazioni e recensioni"}</BaseText>*/}
          <View style={{
            flexDirection: "row",
            marginTop: 10
          }}>
            <View style={{
              flexDirection: "column",
              justifyContent: 'center',
              alignItems: "center",
              alignContent: "center",
              marginHorizontal: 15
            }}>
              <BaseText styles={{
                fontSize: 40,
                textTransform: "uppercase"
              }}>4,6</BaseText>
              <Ionicons name="ios-star" size={30} color={Colors.light.giallo} />
            </View>
            <TouchableWithoutFeedback onPress={() => navigation.navigate("Review")}>
              <View style={{
                backgroundColor: "#FBFBFB",
                borderRadius: 5,
                flex: 1,
              }}>
                <Ionicons name="ios-arrow-down" size={24} color="black" style={{
                  position: "absolute",
                  right: 10,
                  top: 5,
                  transform: [{ rotate: '-90deg' }]
                }} />
                <View style={{
                  flexDirection: "row",
                  alignContent: "center",
                  alignItems: "center",
                  marginLeft: 15,
                  marginTop: 10,
                }}>
                  <BaseText styles={{
                    fontSize: 15,
                  }}>{recensioni && recensioni.length > 0 ? recensioni[0].user : "Utente d'esempio"}</BaseText>
                  <StarsReview />
                </View>
                <BaseText weight={300} styles={{
                  marginTop: 5,
                  marginHorizontal: 15,
                  fontSize: 15,
                  marginBottom: 15
                }}>{recensioni && recensioni.length > 0 ? recensioni[0].desc : "Descrizione d'esempio"}</BaseText>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>)}
        <SectionList
          sections={servizi}
          style={{
            //marginTop: 20,
            marginHorizontal: 20,
          }}
          //ListHeaderComponent={()=>}
          renderItem={({ item }) => <ItemService item={item} />}
          renderSectionHeader={({ section: { title } }) => serviziHeader(title)}
          keyExtractor={(item, index) => item.id}
        />
      </Animated.ScrollView>
      <Animated.View
        style={[styles.header, {
          zIndex: -100,
          transform: [{
            translateY: headerTranslateY
          }]
        }]}>
        <Animated.Image
          style={[
            styles.headerBackground,
            {
              zIndex: -1,
              opacity: imageOpacity,
              transform: [{
                translateY: imageTranslateY
              }],
            },
          ]}
          source={require('../assets/images/salon.jpeg')}
        />
        <Animated.View
          style={[
            {
              height: HEADER_MAX_HEIGHT,
              backgroundColor: "white",
              borderTopRightRadius: 50,
              borderTopLeftRadius: 50,
              width: "100%",
              top: HEADER_MAX_HEIGHT - 50,
              left: 0,
              right: 0,
              zIndex: 100,
              opacity: 1,
            }
          ]}
        />
      </Animated.View>
      <Animated.View
        style={[
          styles.topBar,
          {
            zIndex: 200,
            margin: titlePadding,
            transform: [
              {
                scale: titleScale
              },
              {
                translateY: titleTranslateY
              },
            ],
          },
        ]}>
        <View style={[{
          width: "100%",
          justifyContent: "space-between",
          alignContent: "center",
          alignItems: "center",
          flexDirection: "row"
        }]}>
          <TouchableOpacity onPress={() => { navigation.goBack() }} style={[styles.iconShadow, { paddingHorizontal: 0, }]}>
            <View style={styles.backButton}>
              <Ionicons name="ios-arrow-back" size={20} color={Colors.light.nero} />
            </View>
          </TouchableOpacity>
          <BaseText weight={700} size={10} color={"white"}>{data.title ? data.title : ""}</BaseText>
          <TouchableOpacity onPress={() => { console.warn("QUI CONDIVIDERAI IL NEGOZIO") }} style={[styles.iconShadow, { paddingHorizontal: 0 }]}>
            <View style={styles.backButton}>
              <Ionicons name="ios-more" size={20} color={Colors.light.nero} style={{ transform: [{ rotate: "90deg" }] }} />
            </View>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  saveArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  card: {
    //flexDirection: 'row',
    //alignItems: 'center',
    backgroundColor: '#ffffff',
    shadowColor: '#402583',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 1,
    //backgroundColor: Colors.light.bianco,
    borderRadius: 10,
    marginHorizontal: 40,
    marginTop: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.light.ARANCIO,
    overflow: 'hidden',
    height: HEADER_MAX_HEIGHT,
  },
  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: HEADER_MAX_HEIGHT,
    resizeMode: 'cover',
  },
  topBar: {
    marginTop: 100,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: Colors.light.bianco,
    shadowColor: Colors.light.bianco,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: .2,
    shadowRadius: 2,
    elevation: 1,
  },
  shadowOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
  },
  iconShadow: {
    shadowColor: Colors.light.nero,
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: .4,
    shadowRadius: 10,
    elevation: 1,
  }
});

export default Shop;



//import { useValue } from 'react-native-redash';
//import { useHeaderHeight } from '@react-navigation/stack';
//import Animated, {
//  interpolate,
//  concat,
//  Extrapolate,
//} from 'react-native-reanimated';

////import { AppContext } from '../context/Appcontext';
//import BottomSheet, { useBottomSheet } from '@gorhom/bottom-sheet';
//import Handle from '../components/handle';
//import BaseButton from '../components/BaseButton';
//import { User } from '../models/User';
//import { StatusBar } from 'expo-status-bar';

//const Shop = ({ navigation, route }: StackScreenProps<RootStackParamList, 'Shop'>) => {
//  //  const {
//  //    //servizi,
//  //    //commercianti,
//  //    //foto
//  //  } = React.useContext(AppContext);

//  const bottomSheetRef = React.useRef<BottomSheet>(null);
//  const headerHeight = useHeaderHeight();

//  // variables
//  const snapPoints = React.useMemo(() => [0, 80, 220], []);
//  const position = useValue<number>(0);

//  // styles
//  const shadowOverlayStyle = React.useMemo(
//    () => ({
//      ...styles.shadowOverlay,
//      opacity: interpolate(position, {
//        inputRange: [0, 220, 300],
//        outputRange: [0, 0.4, 1],
//        extrapolate: Extrapolate.CLAMP,
//      }),
//    }),
//    []
//  );

//  // callbacks
//  const handleSheetChanges = React.useCallback((index: number) => {
//    console.log('handleSheetChanges', index);
//  }, []);

//  const handleSnapPress = React.useCallback(index => {
//    bottomSheetRef.current.snapTo(index);
//    console.log(index, "index--")
//  }, []);

//  //const handleClosePress = React.useCallback(() => {
//  //  bottomSheetRef.current?.close();
//  //}, []);


//  //if (data === undefined && loading) {
//  if (loading) {
//    return (
//      <View style={styles.container}>
//        {/*<Header hasBack={true} title={""} onPress={() => { navigation.goBack() }} styles={{ zIndex: -1 }} />*/}
//        <ShimmerPlaceholder
//          width={width}
//          height={250}
//          style={{ marginBottom: 10, }}
//          shimmerColors={["#DEDEDE", "#c5c5c5", "#DEDEDE"]}
//          shimmerStyle={{ borderRadius: 0 }}
//        />
//        <View style={{ backgroundColor: "transparent", marginHorizontal: 20, marginVertical: 20, }}>
//          <BaseText weight={300} styles={{
//            fontSize: 13,
//            textTransform: "uppercase"
//          }}>{"Informazioni"}</BaseText>
//        </View>
//        <ShimmerPlaceholder
//          width={width - 40}
//          height={64}
//          style={{ marginHorizontal: 20, marginBottom: 20 }}
//          shimmerColors={["#DEDEDE", "#c5c5c5", "#DEDEDE"]}
//          shimmerStyle={{ borderRadius: 10 }}
//        ></ShimmerPlaceholder>
//        <View style={{ backgroundColor: "transparent", marginHorizontal: 20, marginVertical: 5 }}>
//          <BaseText weight={300} styles={{
//            fontSize: 13,
//            textTransform: "uppercase"
//          }}>{"Orario"}</BaseText>
//        </View>
//        <ShimmerPlaceholder
//          width={width - 40}
//          height={44}
//          style={{ marginVertical: 5, marginHorizontal: 20 }}
//          shimmerColors={["#DEDEDE", "#c5c5c5", "#DEDEDE"]}
//          shimmerStyle={{ borderRadius: 10 }}
//        >
//        </ShimmerPlaceholder>
//        <View style={{ backgroundColor: "transparent", marginHorizontal: 20, marginVertical: 5 }}>
//          <BaseText weight={300} styles={{
//            fontSize: 13,
//            textTransform: "uppercase"
//          }}>{"Valutazioni e recensioni"}</BaseText>
//        </View>
//        <ShimmerPlaceholder
//          width={width - 40}
//          height={118.5}
//          style={{ marginLeft: 20, marginTop: 5 }}
//          shimmerColors={["#DEDEDE", "#c5c5c5", "#DEDEDE"]}
//          shimmerStyle={{ borderRadius: 10 }}
//        />
//        <View style={{ backgroundColor: "transparent", marginHorizontal: 20, marginVertical: 5 }}>
//          <BaseText weight={300} styles={{
//            fontSize: 13,
//            textTransform: "uppercase"
//          }}>{"Servizi"}</BaseText>
//        </View>
//        <ShimmerPlaceholder
//          width={width - 40}
//          height={44}
//          style={{ marginTop: 5, marginVertical: 20, marginHorizontal: 20, alignSelf: "center" }}
//          shimmerColors={["#DEDEDE", "#c5c5c5", "#DEDEDE"]}
//          shimmerStyle={{ borderRadius: 10 }}
//        />
//        <ShimmerPlaceholder
//          width={width - 40}
//          height={44}
//          style={{ marginTop: 5, marginVertical: 20, marginHorizontal: 20, alignSelf: "center" }}
//          shimmerColors={["#DEDEDE", "#c5c5c5", "#DEDEDE"]}
//          shimmerStyle={{ borderRadius: 10 }}
//        />
//        <ShimmerPlaceholder
//          width={width - 40}
//          height={44}
//          style={{ marginTop: 5, marginVertical: 20, marginHorizontal: 20, alignSelf: "center" }}
//          shimmerColors={["#DEDEDE", "#c5c5c5", "#DEDEDE"]}
//          shimmerStyle={{ borderRadius: 10 }}
//        />
//        <ShimmerPlaceholder
//          width={width - 40}
//          height={44}
//          style={{ marginTop: 5, marginVertical: 20, marginHorizontal: 20, alignSelf: "center" }}
//          shimmerColors={["#DEDEDE", "#c5c5c5", "#DEDEDE"]}
//          shimmerStyle={{ borderRadius: 10 }}
//        />
//      </View>
//    );
//  } else {
//    return (
//      <View style={styles.container}>
//        {/*<Animated.View pointerEvents="none" style={shadowOverlayStyle} />*/}
//        <BottomSheet
//          ref={bottomSheetRef}
//          snapPoints={snapPoints}
//          initialSnapIndex={0}
//          //handleComponent={() => <Handle />}
//          handleComponent={() => <Handle style={{ backgroundColor: Colors.light.ARANCIO }} />}
//          topInset={headerHeight}
//          animatedPosition={position}
//          onChange={handleSheetChanges}
//        >
//          <View style={{
//            backgroundColor: Colors.light.ARANCIO,
//            height: 320,
//            paddingHorizontal: 50,
//            zIndex: 100,
//          }}>
//            <View style={{
//              justifyContent: "space-between",
//              alignContent: "center",
//              alignItems: "center",
//              flexDirection: "row",
//              marginTop: 15,
//            }}>
//              <View>
//                <BaseText size={15} weight={700} styles={{ flexWrap: 'wrap' }}>{titleChosenService}</BaseText>
//                <BaseText size={10} weight={300} styles={{ flexWrap: 'wrap', maxWidth: 200 }}>{descChosenService}</BaseText>
//              </View>
//              <BaseText size={14} weight={700} >{costChosenService} €</BaseText>
//            </View>
//            {/*<View style={{ alignSelf: "center", marginTop: 15 }}>
//              <BaseText size={10} weight={600}>
//                NB:
//              </BaseText>
//              <BaseText size={8} weight={300} italic styles={{ flexWrap: 'wrap' }}>
//                Ricordati che devi ricevere una conferma dal gestore prima di poter avere la prenotazione!
//              </BaseText>
//            </View>*/}
//            <View style={{ marginBottom: 20 }}>
//              <BaseButton title={"Procedi"} onPress={() => {
//                navigation.navigate("NotFound", {
//                  serviceId: indexChosenService,
//                  serviceDuration: durationChosenService,
//                  serviceCost: costChosenService,
//                  serviceDesc: descChosenService,
//                  serviceTitle: titleChosenService,
//                  serviceCustomer: data.title,
//                })
//              }} />
//            </View>
//          </View>
//        </BottomSheet>
//        <Image style={{ width: "100%", height: 250, zIndex: -1 }} source={require('../assets/images/salon.jpeg')} />

//        <ScrollView
//          contentContainerStyle={{
//            paddingBottom: 200,
//          }}
//          style={{
//            flex: 1,
//            //height: "100%",
//            //top: -160,
//            backgroundColor: "red",
//            zIndex: -1
//          }}
//          showsVerticalScrollIndicator={false}
//          decelerationRate="fast"
//          scrollEventThrottle={1}
//        >

//          {/**
//                   * mainINFO
//                   */}

//          {/*<View style={{ flexDirection: "row", alignContent: "center", alignItems: "flex-start", justifyContent: "space-between", marginTop: 15 }}>
//              <Image style={{ width: 76, height: 61, borderRadius: 5, marginRight: 4 }} source={require('../assets/images/salon.jpeg')} />
//              <Image style={{ width: 76, height: 61, borderRadius: 5, marginHorizontal: 4 }} source={require('../assets/images/salon.jpeg')} />
//              <Image style={{ width: 76, height: 61, borderRadius: 5, marginHorizontal: 4 }} source={require('../assets/images/salon.jpeg')} />
//              <Image style={{ width: 76, height: 61, borderRadius: 5, marginHorizontal: 4 }} source={require('../assets/images/salon.jpeg')} />
//            </View>*/}
//          {/*{!noOrari && <View style={[styles.btn, { backgroundColor: Colors.light.arancioDes, }]}>
//              <BaseText weight={400} styles={{ fontSize: 15, textTransform: "uppercase" }}>Prenota</BaseText>
//            </View>}*/}
//          {/**
//         * DESCRIZIONE
//           */}
//          {/*<View style={{ backgroundColor: "transparent", marginHorizontal: 20, marginTop: 20, }}>
//            <BaseText weight={300} styles={{
//              fontSize: 30,
//              //textTransform: "uppercase"
//            }}>{"Informazioni"}</BaseText>
//          </View>*/}
//          {/*<View style={{
//            width: 65,
//            height: 15,
//            borderRadius: 5,
//            backgroundColor: status ? "rgba(133, 194, 170, 0.4)" : "#C4C4C4",
//            justifyContent: "center",
//            alignItems: "center",
//            alignContent: "center",
//            marginLeft: 20,
//            marginTop: 10,
//          }}>
//            <BaseText weight={700} styles={{ color: status ? "#008D56" : "#525252" }} size={8}>{status ? "APERTO" : "CHIUSO"}</BaseText>
//          </View>*/}


//        </ScrollView>
//      </View>
//    );
//  }
//};

//export default Shop;

//const styles = StyleSheet.create({
//  container: {
//    flex: 1,
//    //backgroundColor: Colors.light.bg
//    //backgroundColor: Colors.light.bianco
//    backgroundColor: "white"
//  },
//  row: {
//    flexDirection: "row",
//    alignItems: "center",
//    alignContent: "center",
//    justifyContent: "flex-start",
//  },
//  text: {
//  },
//  textBold: {
//  },
//  btn: {
//    marginTop: 15,
//    height: 35,
//    width: "100%",
//    justifyContent: "center",
//    alignItems: "center",
//    alignContent: "center",
//    // shadowColor: Colors.light.nero,
//    // shadowOpacity: 0.25,
//    // shadowOffset: {
//    //     width: 0,
//    //     height: 4
//    // },
//    // shadowRadius: 4,
//    borderRadius: 5
//  },

//});