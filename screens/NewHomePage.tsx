import React, { useContext, useState, useEffect } from 'react';
import {
  TouchableWithoutFeedback,
  Image,
  ImageBackground,
  Modal,
  ScrollView,
  TouchableOpacity,
  FlatList,
  // RefreshControl,
  StyleSheet,
  TextInput,
  StatusBar,
  LogBox,
  Animated,
  Easing,
  ActivityIndicator,
} from 'react-native';
import moment from 'moment';
import { LinearGradient } from 'expo-linear-gradient';
import Carousel from 'react-native-snap-carousel';
LogBox.ignoreLogs([
  'VirtualizedLists should never be nested'
]);
import { SafeAreaView, SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppContext } from '../context/Appcontext';
import { AuthUserContext } from '../navigation/AuthUserProvider';
import * as SecureStore from 'expo-secure-store';
import { Ionicons } from '@expo/vector-icons';

import { View } from '../components/Themed';
import Colors from '../constants/Colors';

import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import BaseText from '../components/StyledText';
import { db, dbVal } from '../network/Firebase';
import Loader from '../components/Loader';
import { Vibration } from '../constants';
import PinIcon from '../components/svg/PinIcon';
import BottomIcon from '../components/svg/BottomIcon';
import Layout from '../constants/Layout';

const ENTRIES = [
  {
    illustration: 'https://i.postimg.cc/65NHzk9d/New-Project.png',
    navigationAction: undefined,
    linkUrl: undefined
  },
  {
    illustration: 'https://i.postimg.cc/1z4MfPHZ/New-Project-1.png',
    navigationAction: undefined,
    linkUrl: undefined
  },
  {
    illustration: 'https://firebasestorage.googleapis.com/v0/b/beautyshop-afe23.appspot.com/o/Buonefeste.png?alt=media&token=35d56d63-cb1c-413e-970b-399463578daa',
    navigationAction: undefined,
    linkUrl: undefined
  },
  {
    illustration: 'https://firebasestorage.googleapis.com/v0/b/beautyshop-afe23.appspot.com/o/amico.png?alt=media&token=ec6ff44b-5183-4686-88b3-b1dc5485d45d',
    navigationAction: undefined,
    linkUrl: undefined
  },
  {
    illustration: 'https://firebasestorage.googleapis.com/v0/b/beautyshop-afe23.appspot.com/o/parereconta.png?alt=media&token=2e7c5886-232c-4e40-82e8-2c432e8c5fa3',
    navigationAction: undefined,
    linkUrl: undefined
  },
];

const ENTRIES1 = [
  {
    title: "Capelli",
    bg: "#FD6C38",
    model: "https://content.web-repository.com/s/48771825654323693/uploads/Images/500908947-model-compresso.png"
  },
  {
    title: "Uomo",
    bg: "#9D006D",
    model: "https://i.postimg.cc/1RTnDFZT/best-medium-length-hairstyles-men-slicked-back-undercut-luxe-digital-preview-rev-1.png"
  },
  {
    title: "Unghie",
    bg: "#F9BD01",
    model: "https://i.postimg.cc/MZRMbTKp/ss-min-preview-rev-2.png"
  },
  {
    title: "Depilazione",
    bg: "#FA5057",
    model: "https://i.postimg.cc/qq9NrPL0/icons-wax-sports-cap-navy-model-preview-rev-1.png"
  },
  {
    title: "Viso",
    bg: "#5095FA"
  },
  {
    title: "Massaggi",
    bg: "#FD6C38"
  },
  {
    title: "Corpo",
    bg: "#9D006D"
  },
  {
    title: "Piedi",
    bg: "#F9BD01",
  },
];

export default function HomePage({ route, navigation }: StackScreenProps<RootStackParamList, 'Shop'>) {
  const {
    // servizi,
    commercianti,
    foto,
    // currentUser,
    setCurrentUser,
    prenotazione
  } = useContext(AppContext);
  const { user } = useContext(AuthUserContext);
  const profileRefanimation = React.useRef(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setCategory] = useState(0);
  const [parrucchieri, setPar] = React.useState(undefined);
  const [userDocId, setUserDocId] = React.useState(null);
  const [userData, setUserData] = React.useState(undefined);
  //const [favoritesFB, setFavorites] = React.useState(undefined);
  const [searchModal, setSearchModal] = React.useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [prenotazioni, setPrenotazioni] = useState(undefined);
  const [searchText, setSearchText] = useState("");
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  const firstSearch = async () => {
    setLoadingSearch(true);
    var sT = searchText.toString();
    if (sT == "") {
      setLoadingSearch(false);
    } else {
      const snapshot = await db.collection("commercianti")
        .orderBy("title", "asc")
        .startAt(sT)
        // .endAt(sT)
        .get();
      // const secondCheck = await db.collection("commercianti")
      //   .orderBy("title", "asc")
      //   .startAt(sT)
      //   .get();
      if (snapshot) {
        const tempDoc = snapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() }
        })
        setDataSource(tempDoc);
      }
      // else if (secondCheck) {
      //   const tempDoc2 = secondCheck.docs.map((doc) => {
      //     return { id: doc.id, ...doc.data() }
      //   })
      //   setDataSource(tempDoc2);
      // } 
      else {
        setLoadingSearch(false);
      }
    }
    setLoadingSearch(false);
  }
  // const onRefresh = React.useCallback(() => {
  //   setRefreshing(true);
  //   loading();
  //   wait(2000).then(() => setRefreshing(false));
  // }, []);
  const getUserId = async () => {
    if (user !== null) {
      var databaseRef = await db.collection('utentiApp').where("userId", "==", user.uid).get();
      if (!databaseRef.empty) {
        databaseRef.forEach(doc => {
          setUserDocId(doc.id);
          setUserData(doc.data())
        });
      };
    }
  }
  const loading = async () => {
    await getUserId();
    let parrucchieri = [];
    if (commercianti && foto) {
      const comFin = commercianti.map(com => ({
        ...com,
        mainPhoto: foto.find(fot => fot.commercianti === com.id && fot.isMain == true),
        photos:
          foto.map(item => {
            if (item.commercianti == com.id) {
              return item;
            }
          })

      }))
      comFin.map((item) => {
        // SE PARRUCCHIERE
        //if (item.tipo == 0) {
        parrucchieri.push(item);
        //}
      })
      setPar(parrucchieri);
    }
    if (user !== null && userDocId !== null) {
    }
  }
  React.useEffect(() => {
    loading()
  }, [user]);

  const checkPrenotazioni = async () => {
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
          // console.log("---finalpreno---", finalpreno.length);
          while (finalpreno.length > 3) { finalpreno.pop() }
          setPrenotazioni(finalpreno)
        }
      } else {
        console.log("non ci sono PRENOTAZIONI");
      }
    }
  }
  React.useEffect(() => {
    navigation.addListener('focus', () => {
      if (user !== undefined && userDocId !== null) {
        getUserId();
      }
      checkPrenotazioni()
    });
    if (prenotazione) {
      console.log("--home pren--", JSON.stringify(prenotazione, null, 2))
    }
    checkPrenotazioni()
  }, []);

  const checkNewPrenotazioni = async (observer) => {
    if (user) {
      return observer = db.collection('prenotazioni').where('userId', '==', user.uid)
        .onSnapshot(querySnapshot => {
          querySnapshot.docChanges().forEach(change => {
            if (change.type === 'modified') {
              checkPrenotazioni()
            }
            if (change.type === 'removed') {
              checkPrenotazioni()
            }
          });
        });
    } else {
      setPrenotazioni(undefined);
    }
  }
  useEffect(() => {
    let observer = undefined;
    checkNewPrenotazioni(observer);
    return () => {
      // Clean up the subscription
      if (observer !== undefined) observer();
    };
  }, [user])

  const renderCards = (item, index) => {
    let { title, stars, via, desc, mainPhoto, economy, id } = item;
    let economyColor = "rgba(133, 194, 170, 0.4)", economyTitle = "€", economyTColor = "#008D56";
    if (economy) {
      switch (economy) {
        case 1:
          economyColor = "rgba(244, 195, 108, 0.4)";
          economyTitle = "€€";
          economyTColor = "#CB860B";
          break;
        case 2:
          economyColor = "rgba(244, 195, 108, 0.4)";
          economyTitle = "€€€";
          economyTColor = "#CB860B";
          break;
      }
    }
    if (desc.length > 25) {
      desc = desc.slice(0, 25) + " ...";
    }
    // let isFavorite = false;
    //if (favoritesFB !== undefined) {
    //  isFavorite = favoritesFB.includes(id);
    //}
    // const setFavorite = async () => {
    //   if (user !== null && userDocId !== null) {
    //     //console.log("---hoPremuto---", id)
    //     try {
    //       var databaseRefReal = await db.collection('utentiApp').doc(userDocId);
    //       await db.runTransaction(async (t) => {
    //         const doc = await t.get(databaseRefReal);
    //         console.log("---favoritesOnDB---", doc.data()?.favorites)
    //         let favorites = doc.data().favorites;
    //         // DOC: se ho preferiti entro per capire come rimuoverlo
    //         if (favorites && favorites !== undefined) {
    //           favorites.forEach((element) => {
    //             if (element.id === id) {
    //               // DOC SE HO GIA LO STESSO PREFERITO PREMUTO LO RIMUOVO
    //               var deletedList = favorites.filter(x => {
    //                 return x.id != id;
    //               })
    //               console.log("---deletedList[FAVORITES]---", deletedList);
    //               if (deletedList.length <= 0) {
    //                 // rimuovo la lista completa
    //                 //isFavorite = false;
    //                 t.update(databaseRefReal, { favorites: dbVal.FieldValue.delete() });
    //               } else {
    //                 // rimuovo il commerciante
    //                 //isFavorite = false;
    //                 t.update(databaseRefReal, { favorites: deletedList });
    //               }
    //             } else {
    //               // aggiungo il commerciante
    //               let newFavorites = [...favorites, { id }];
    //               var list = newFavorites.filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i);
    //               //isFavorite = true;
    //               t.update(databaseRefReal, {
    //                 favorites: list
    //               });
    //             }
    //           });
    //         } else {
    //           // aggiungo il commerciante per la prima volta
    //           //isFavorite = true;
    //           t.update(databaseRefReal, {
    //             favorites: [
    //               { id }
    //             ]
    //           });
    //         }
    //       });
    //       //getFavorites();
    //     } catch (error) {
    //       console.log("---setFavorite[Error]", error);
    //     }
    //   } else {
    //     navigation.navigate("Auth");
    //     //console.warn("non ho un utente per aggiugnere questo commerciante ai preferiti");
    //   }
    // }
    return (
      <TouchableOpacity
        key={index}
        onPress={() => {
          Vibration.impactTouch("Light");
          navigation.navigate("Shop", { id: id });
        }}>
        <View style={{
          paddingLeft: 20,
          paddingRight: 20,
          backgroundColor: "white"
        }}>
          <ImageBackground
            style={{
              height: 185,
              flexDirection: "row",
              borderRadius: 5,
              marginVertical: 10,
            }}
            imageStyle={{
              backgroundColor: Colors.light.background,
              resizeMode: "cover",
              borderRadius: 5,
            }}
            source={mainPhoto ? { uri: mainPhoto.url } : { uri: "https://images.unsplash.com/photo-1582582450303-48cc2cfa2c43?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80" }}
          >
          </ImageBackground>
          <View style={{
            backgroundColor: "transparent",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            alignContent: "center"
          }}>
            <BaseText size={14} weight={700} color={Colors.light.nero} styles={{
              letterSpacing: 0.5,
            }}>{title ? title.toLowerCase() : ""}</BaseText>
            {stars > 0 && (
              <View style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center",
                backgroundColor: "transparent"
              }}>
                <Ionicons name="ios-star" size={20} color={Colors.light.ARANCIO} />
                <BaseText size={10} weight={700} styles={{ marginLeft: 5, marginTop: 5 }}>{stars}</BaseText>
              </View>
            )}
          </View>
          <View style={{
            backgroundColor: "transparent",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            alignContent: "center"
          }}>
            <BaseText weight={300} color={Colors.light.nero} styles={{ marginTop: 5 }} size={8}>{via}</BaseText>
            <BaseText weight={700} color={Colors.light.nero} styles={{ marginLeft: 5, marginTop: 5 }} size={8}>·  {economyTitle}</BaseText>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
  const setToken = (token) => {
    return SecureStore.setItemAsync('secure_token', token);
  };

  const getToken = () => {
    return SecureStore.getItemAsync('secure_token');
  };

  const getStoredValue = async () => {
    try {
      getToken().then(token => {
        // console.log("---token----", token)
        if (token === null) {
          setToken('true');
          // if (__DEV__ === false) 
          navigation.navigate('IntroScreen');
        } else if (token === "true") {
          // console.log("--everythingOk")
        }
      });
    } catch (ex) {
      console.log("---exIntro----", ex)
    }
  }
  useEffect(() => {
    getStoredValue()
  }, [])

  const presseProfile = () => {
    if (user && userData) {
      const { toBecompleted, userId, displayName, email, phoneNumber } = userData;
      if (toBecompleted === true) {
        navigation.navigate('Auth', { screen: 'CompleteSocial', params: { userid: userId, nomecognome: displayName, email: email, phone: phoneNumber ? phoneNumber : "" } })
      } else {
        setCurrentUser(userData);
        navigation.navigate('Profilo');
      }
    } else navigation.navigate('Auth')
  }

  const renderItem1 = ({ item, index }) => {
    const { title, bg, model } = item;
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={{
          width: 90,
          height: 90,
          marginRight: 10,
          borderRadius: 8,
          overflow: "hidden"
        }}
        onPress={() => { alert(`Hai premuto la cat. n.'${index}'`); }}
      >
        <View style={{
          backgroundColor: bg ? bg : "black",
          ...StyleSheet.absoluteFillObject,
        }}>
          {model && (
            <View style={{ flex: 1, backgroundColor: "transparent", left: 40, top: 10 }}>
              <Image source={{ uri: model }} style={{ ...StyleSheet.absoluteFillObject, resizeMode: "contain" }} />
            </View>
          )}
          <View style={{ backgroundColor: "transparent", position: "absolute", bottom: 10, left: 10 }}>
            <BaseText size={10.5} weight={800} letterSpacing={.4} color={"white"}>{title.length > 7 ? `${title.substring(0, 7)}...` : title}</BaseText>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  const _renderItem = ({ item, index }) => {
    const { illustration } = item;
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={{
          width: Layout.wp(90) + Layout.wp(2) * 2,
          height: 200,
          paddingHorizontal: Layout.wp(2),
          paddingBottom: 18,
        }}
      //onPress={() => { alert(`You've clicked '${index}'`); }}
      >
        <View
          style={{
            position: "absolute",
            top: 0,
            left: Layout.wp(2),
            right: Layout.wp(2),
            bottom: 18,
            shadowColor: "black",
            shadowOpacity: 0.1,
            shadowOffset: { width: 0, height: 10 },
            shadowRadius: 10,
            borderRadius: 8
          }}
        />
        <View style={[{
          flex: 1,
          //marginBottom: true ? 0 : -1, // Prevent a random Android rendering issue
          borderRadius: 8
        }]}>
          <Image
            source={{ uri: illustration }}
            style={{
              ...StyleSheet.absoluteFillObject,
              resizeMode: "stretch",
              borderRadius: 8,
            }}
          />
        </View>
      </TouchableOpacity>
    );
  }

  const _renderItemSearchSeparator = () => {
    return (
      <View style={{ backgroundColor: "#A5A5A5", width: "100%", height: 1 }} />
    )
  }

  const _renderItemSearchHeader = () => {
    return (
      <View style={{ marginTop: 10 }}>
        <BaseText color={"#898A8D"} weight={700}>{"Saloni"}</BaseText>
      </View>
    )
  }

  const _renderItemSearch = ({ item, index }) => {
    let { title, stars, via, desc, mainPhoto, economy, id } = item;
    let economyColor = "rgba(133, 194, 170, 0.4)", economyTitle = "€", economyTColor = "#008D56";
    if (economy) {
      switch (economy) {
        case 1:
          economyColor = "rgba(244, 195, 108, 0.4)";
          economyTitle = "€€";
          economyTColor = "#CB860B";
          break;
        case 2:
          economyColor = "rgba(244, 195, 108, 0.4)";
          economyTitle = "€€€";
          economyTColor = "#CB860B";
          break;
      }
    }
    return (
      <TouchableOpacity style={{
        backgroundColor: "rgba(0,0,0,0)",
        paddingVertical: 15,
      }} onPress={() => {
        Vibration.impactTouch("Light");
        setDataSource([]);
        setSearchModal(false);
        navigation.navigate("Shop", { id });
      }}>
        <BaseText>{title}</BaseText>
        {stars > 0 && (
          <View style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            alignContent: "center",
            backgroundColor: "transparent"
          }}>
            <Ionicons name="ios-star" size={20} color={Colors.light.ARANCIO} />
            <BaseText size={10} weight={700} styles={{ marginLeft: 5, marginRight: 10, marginTop: 5 }}>{stars}</BaseText>
            <BaseText weight={300} color={Colors.light.nero} styles={{ marginTop: 5 }} size={8}>{via}</BaseText>
            <BaseText weight={700} color={Colors.light.nero} styles={{ marginLeft: 5, marginTop: 5 }} size={8}>·  {economyTitle}</BaseText>
          </View>
        )}
      </TouchableOpacity>
    )
  }

  if (isLoading) {
    return (
      <Loader color={Colors.light.bianco} size={"large"} animating={true} />
    )
  }

  const offset = React.useRef(new Animated.Value(0)).current;
  const rotateValue = React.useRef(new Animated.Value(0)).current;

  const HEADER_HEIGHT = 200;

  // const StartImageRotate = () => {
  //   rotateValue.setValue(0);
  //   Animated.timing(rotateValue, {
  //     toValue: 1,
  //     duration: 1000,
  //     easing: Easing.linear,
  //     useNativeDriver: true,
  //   }).start();
  // }
  const AnimatedHeader = () => {
    const insets = useSafeAreaInsets();

    const isShadow = offset.interpolate({
      inputRange: [0, HEADER_HEIGHT + insets.top],
      outputRange: [0, .5],
      extrapolate: 'clamp'
    });

    const opacity = offset.interpolate({
      inputRange: [0, HEADER_HEIGHT + insets.top],
      outputRange: [50, 0],
      extrapolate: 'clamp'
    });

    const rotateInterpolate = rotateValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    });

    return (
      <Animated.View style={{
        paddingHorizontal: 20,
        backgroundColor: "white",
        paddingTop: insets.top,
        paddingBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: isShadow,
        borderRadius: 20,
        shadowRadius: 10,
        elevation: 5,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
      }}>
        <Animated.View style={{ alignSelf: "center", marginBottom: 5, height: opacity, transform: [{ rotate: rotateInterpolate }] }}>
          {/* <TouchableOpacity onPress={() => StartImageRotate()}> */}
          <Image source={require("../assets/images/logoBS.png")} style={{ width: 50, height: 50, resizeMode: "contain" }} />
          {/* </TouchableOpacity> */}
        </Animated.View>
        <View style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignContent: "center",
          alignItems: "center",
        }}>
          <TouchableOpacity onPress={presseProfile}>
            <BottomIcon type={"ios-people"} color={Colors.light.nero} size={30} />
          </TouchableOpacity>
          <TouchableWithoutFeedback onPress={() => setSearchModal(true)}>
            <View style={styles.searchBar}>
              <BaseText size={12} letterSpacing={.3} weight={600}>{"Cosa vuoi fare oggi?"}</BaseText>
            </View>
          </TouchableWithoutFeedback>
          <TouchableOpacity>
            <PinIcon type="normal" size={25} color={Colors.light.nero} style={{ opacity: 1 }} />
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  };

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container} forceInset={{ top: 'always' }}>
        <AnimatedHeader />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop: 80 + 50,
          }}
          scrollEventThrottle={8}
          onScroll={
            Animated.event(
              [{ nativeEvent: { contentOffset: { y: offset } } }],
              { useNativeDriver: false }
            )
          }
        >
          <View style={{ backgroundColor: "transparent" }}>
            <FlatList
              data={ENTRIES1}
              renderItem={renderItem1}
              horizontal
              // pagingEnabled
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingLeft: 20,
                paddingRight: 20
              }}
            />
            <Carousel
              data={ENTRIES}
              renderItem={_renderItem}
              sliderWidth={Layout.window.width}
              itemWidth={Layout.wp(90) + Layout.wp(2) * 2}
              loop={true}
              loopClonesPerSide={1}
              itemHeight={200}
              inactiveSlideScale={1}
              inactiveSlideOpacity={1}
              enableMomentum={false}
              activeSlideAlignment={"center"}
              containerCustomStyle={{
                overflow: 'visible',
              }}
              contentContainerCustomStyle={{
                paddingTop: 20
              }}
              activeAnimationType={'spring'}
            //activeAnimationOptions={{
            //  friction: 4,
            //  tension: 40
            //}}
            />
            {prenotazioni !== undefined && (
              <View style={{ marginBottom: 20 }}>
                <BaseText weight={700} styles={{ marginHorizontal: 20, marginVertical: 10 }} size={15}>{"Ultime prenotazioni"}</BaseText>
                <ScrollView horizontal contentContainerStyle={{ marginHorizontal: 20, paddingRight: 30 }} showsHorizontalScrollIndicator={false}>
                  {prenotazioni.map((item) => {
                    // 0 DEFAULT CONFERMATA
                    let color = ['#CB860B', '#daaa54'];
                    switch (item.state) {
                      case 1:
                        // ACCETTATA
                        color = ['#00C537', '#32d05e'];
                        break;
                      case 2:
                        // FINITA
                        color = [Colors.light.ARANCIO, '#FC9975'];
                        break;
                      case 3:
                        // ANNULATA
                        color = ['#CA1E13', '#d96159'];
                        break;
                    }
                    return (
                      <LinearGradient
                        colors={color}
                        start={{ x: 0, y: 0 }}
                        style={{ marginRight: 20, borderRadius: 5, paddingVertical: 15, paddingHorizontal: 20, }}
                        key={item.id}
                      >
                        <TouchableOpacity
                          key={item.id}
                          // style={{ backgroundColor: Colors.light.ARANCIO }}
                          onPress={() => { navigation.navigate("InfoPren", { prenotazione: item }) }}>
                          <View style={{ backgroundColor: "transparent", flexDirection: "row", alignContent: "center", alignItems: "center", justifyContent: "flex-start", }}>
                            <BaseText weight={500} color={Colors.light.bianco} styles={{ textTransform: "capitalize" }}>{moment(item.slot_date).format("dddd DD MMMM")} | </BaseText>
                            <BaseText weight={500} color={Colors.light.bianco}>{item.slot_time}  - </BaseText>
                            <BaseText weight={500} color={Colors.light.bianco}>{item.slot_end_time}</BaseText>
                          </View>
                          <BaseText weight={600} color={Colors.light.bianco} styles={{ marginVertical: 5 }}>{item.title}</BaseText>
                          <BaseText weight={400} color={Colors.light.bianco}>{item.totale + " €"}</BaseText>
                        </TouchableOpacity>
                      </LinearGradient>
                    )
                  })
                  }
                </ScrollView>
              </View>
            )}
          </View>
          <View style={{ flex: 1, backgroundColor: "transparent" }} >
            {parrucchieri !== undefined && (
              <FlatList
                //refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[Colors.light.arancio]} />}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                decelerationRate={0}
                data={parrucchieri}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => renderCards(item, index)}
              />
            )}
          </View>
        </ScrollView>
        <React.Fragment>
          <Modal
            animationType="fade"
            transparent
            visible={searchModal}
            onRequestClose={() => {
              setSearchModal(false)
              setDataSource([]);
            }}
          >
            <View style={styles.closeOverlay} />
            <Modal
              animationType="slide"
              transparent
              visible={searchModal}
              onRequestClose={() => {
                setDataSource([]);
                setSearchModal(false)
              }}
            >
              {/* <TouchableWithoutFeedback onPress={() => setSearchModal(false)}> */}
              <View style={styles.dialogModalWrapper}>
                <View style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignContent: "center",
                  alignItems: "center",
                  marginHorizontal: 20,
                  backgroundColor: "transparent",
                  marginTop: 20
                }}>
                  <TouchableOpacity
                    onPress={() => {
                      setSearchModal(false)
                      setDataSource([]);
                    }}
                    style={{ paddingHorizontal: 10, paddingVertical: 5 }}
                  >
                    <Ionicons name="ios-arrow-back" size={30} color={Colors.light.nero} />
                  </TouchableOpacity>
                  <View style={[styles.searchBar]}>
                    <TextInput
                      autoFocus
                      onChangeText={(text) => setSearchText(text)}
                      onSubmitEditing={() => firstSearch()}
                      placeholder={"Cosa vuoi fare oggi?"}
                      placeholderTextColor={Colors.light.nero}
                      style={{
                        width: "90%",
                        height: "50%",
                        textAlign: "left",
                        fontFamily: "Gilroy_SemiBold",
                        fontSize: 16,
                        letterSpacing: .4
                      }}
                    />
                  </View>
                </View>
                <View style={{ flex: 1, backgroundColor: "white" }}>
                  {
                    loadingSearch &&
                    <View style={{
                      flex: 1
                    }}>
                      <ActivityIndicator
                        size="large"
                        color="#3498db"
                      />
                    </View>
                  }
                  {!loadingSearch && dataSource.length > 0 && (
                    <FlatList
                      data={dataSource}
                      renderItem={_renderItemSearch}
                      ListHeaderComponent={_renderItemSearchHeader}
                      ItemSeparatorComponent={_renderItemSearchSeparator}
                      contentContainerStyle={{ marginHorizontal: 20 }}
                    />
                  )}
                </View>
              </View>
              {/* </TouchableWithoutFeedback> */}
            </Modal>
          </Modal>
        </React.Fragment>
      </SafeAreaView>
    </SafeAreaProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  textHeader: {
    height: 50,
    backgroundColor: "transparent",
  },
  iconSearch: {
    position: "absolute",
    right: 15,
  },
  closeOverlay: {
    height: '100%',
    width: '100%',
    backgroundColor: Colors.light.ARANCIO,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
  },
  dialogModalWrapper: {
    top: Layout.window.height / 20,
    flex: 1,
    // height: Layout.window.height - 30,
    backgroundColor: "white",
    borderRadius: 40,
    // flexDirection: 'row',
    // justifyContent: 'flex-start',
    // alignItems: 'flex-start',
    zIndex: 999,
  },
  modalh1: {
    fontSize: 18,
    color: Colors.light.nero,
    marginBottom: 6
  },
  modalSub: {
    paddingHorizontal: 45,
    textAlign: "center",
    fontSize: 16,
    color: Colors.light.nero,
  },
  searchBar: {
    backgroundColor: Colors.light.GRIGIO,
    borderRadius: 30,
    marginHorizontal: 20,
    width: "100%",
    flex: 1,
    height: 40,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center"
  },
  headerText: {
    fontSize: 25,
    color: Colors.light.bianco,
    marginTop: 15,
    marginBottom: 10,
    marginLeft: 35,
  },
  headerSub: {
    width: 183,
    height: 106,
    fontSize: 16,
    color: Colors.light.bianco,
    marginLeft: 35,
  },
  header: {
    height: 175,
    paddingTop: 50,
    borderRadius: 20,
  },
  image: {
    position: "absolute",
    right: -10,
    zIndex: -1
  },
  shadow: {
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 1,
  }
});
