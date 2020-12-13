import React, { useContext, useState, useEffect } from 'react';
import {
  TouchableWithoutFeedback,
  Image,
  ImageBackground,
  Dimensions,
  Modal,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  StyleSheet,
  TextInput,
  StatusBar,
  Text,
  UIManager,
  LogBox
} from 'react-native';
import MaskedView from '@react-native-community/masked-view';
import Constants from 'expo-constants';
import LottieView from 'lottie-react-native';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
LogBox.ignoreLogs([
  'VirtualizedLists should never be nested'
]);

import { AppContext } from '../context/Appcontext';
import { AuthUserContext } from '../navigation/AuthUserProvider';

import { Ionicons } from '@expo/vector-icons';
import Desk from '../components/svg/Desk';
//import Intro2 from '../components/svg/Intro2';
//import Intro3 from '../components/svg/Intro3';
//import Intro4 from '../components/svg/Intro4';
//import RightIcon from '../components/svg/RightIcon';

import { View } from '../components/Themed';
import Colors from '../constants/Colors';

import { StackScreenProps } from '@react-navigation/stack';
// import useColorScheme from '../hooks/useColorScheme';
import { RootStackParamList } from '../types';
import BaseText from '../components/StyledText';
import { db, dbVal } from '../network/Firebase';
import Loader from '../components/Loader';
import { Vibration } from '../constants';
// import LottieView from 'lottie-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import HeartIcon from '../components/svg/HeartIcon';
import PinIcon from '../components/svg/PinIcon';
import BottomIcon from '../components/svg/BottomIcon';
import Layout from '../constants/Layout';

//const { width, height } = Dimensions.get('window');

const wait = timeout => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
};

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

export default function HomePage({ navigation }: StackScreenProps<RootStackParamList, 'Shop'>) {
  const {
    servizi,
    commercianti,
    foto,
    currentUser,
    setCurrentUser
  } = useContext(AppContext);
  const { user, setUser } = useContext(AuthUserContext);
  //let profileRef = null;
  const profileRefanimation = React.useRef(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setCategory] = useState(0);
  const [parrucchieri, setPar] = React.useState(undefined);
  const [userDocId, setUserDocId] = React.useState(null);
  const [userData, setUserData] = React.useState(undefined);
  //const [favoritesFB, setFavorites] = React.useState(undefined);
  const [searchModal, setSearchModal] = React.useState(false);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    loading();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const getUserId = async () => {
    //get a unique key
    //console.log("---getUserId[called]---")
    if (user !== null) {
      //console.log("---getUserId[user-present]---")
      var databaseRef = await db.collection('utentiApp').where("userId", "==", user.uid).get();
      if (!databaseRef.empty) {
        //console.log("---getUserId[databaseRef-notEmpty]---")
        databaseRef.forEach(doc => {
          //console.log("---getUserId[databaseRef-forEach]---", doc.data());
          //console.log("---getUserId[docID]---", doc.id);
          setUserDocId(doc.id);
          setUserData(doc.data())
        });
      };
    }
  }

  //const getFavorites = async () => {
  //  try {
  //    //console.log("sono dentro getFavorites")
  //    setIsLoading(true);
  //    var databaseRefReal = db.collection('utentiApp').doc(userDocId);
  //    const doc = await databaseRefReal.get();
  //    let favoritesToSearch = [];
  //    if (doc.exists) {
  //      let favorites = doc.data()?.favorites;
  //      if (favorites && favorites.length > 0) {
  //        favoritesToSearch.push(favorites);
  //      } else {
  //        //setIsLoading(false);
  //      }
  //    } else {
  //      setIsLoading(false);
  //      setFavorites(undefined);
  //      return;
  //    }
  //    const favoritesDb = db.collection('commercianti');
  //    const snapshot = await favoritesDb.get();
  //    let finalFavorites = [];
  //    favoritesToSearch.forEach((favDoc) => {
  //      let sfavDoc = favDoc;
  //      sfavDoc.forEach(item => {
  //        let itemId = item.id;
  //        snapshot.forEach(snapDoc => {
  //          const snapDocData = snapDoc.data();
  //          const snapDocID = snapDoc.id;
  //          if (itemId === snapDocID) {
  //            finalFavorites.push(snapDocID)
  //          }
  //        });
  //      });
  //    });
  //    if (finalFavorites.length > 0) {
  //      setFavorites(finalFavorites);
  //    } else {
  //      setFavorites(undefined);
  //    }
  //    console.log("---finalFavorites---", finalFavorites);
  //    setIsLoading(false);
  //  } catch (error) {
  //    setIsLoading(false);
  //    setFavorites(undefined);
  //    console.log("---[getFavorites]ERROR---", error)
  //  }
  //}
  const loading = async () => {
    await getUserId();
    let parrucchieri = [];
    if (commercianti && foto) {
      //console.log("---commercianti---",commercianti)
      //console.log("---foto---",foto)
      const comFin = commercianti.map(com => ({
        ...com,
        mainPhoto: foto.find(fot => fot.commercianti === com.id && fot.isMain == true),
        photos:
          foto.map(item => {
            // .find(fot => fot.commercianti === com.id)
            if (item.commercianti == com.id) {
              return item;
            }
          })

      }))
      //console.log(comFin, "comFin");
      comFin.map((item) => {
        // SE PARRUCCHIERE
        //if (item.tipo == 0) {
          parrucchieri.push(item);
        //}
      })
      setPar(parrucchieri);
    }
    if (user !== null && userDocId !== null) {
      //getFavorites();
    }
  }

  React.useEffect(() => {
    // setTimeout(() => {
    //     setModal(!modalShow);
    // }, 5000);
    loading()
  }, [user, userDocId]);

  React.useEffect(() => {
    navigation.addListener('focus', () => {
      if (user !== undefined && userDocId !== null) {
        getUserId();
        //getFavorites();
      }
    });
    //UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    //if (profileRefanimation) profileRefanimation.current.play();
  }, []);

  const renderCards = (item, index) => {
    //console.log("item", item)
    //console.log("index", index)
    //console.log("\n")
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
    let isFavorite = false;
    //if (favoritesFB !== undefined) {
    //  isFavorite = favoritesFB.includes(id);
    //}
    const setFavorite = async () => {
      if (user !== null && userDocId !== null) {
        //console.log("---hoPremuto---", id)
        try {
          var databaseRefReal = await db.collection('utentiApp').doc(userDocId);
          await db.runTransaction(async (t) => {
            const doc = await t.get(databaseRefReal);
            console.log("---favoritesOnDB---", doc.data()?.favorites)
            let favorites = doc.data().favorites;
            // DOC: se ho preferiti entro per capire come rimuoverlo
            if (favorites && favorites !== undefined) {
              favorites.forEach((element) => {
                if (element.id === id) {
                  // DOC SE HO GIA LO STESSO PREFERITO PREMUTO LO RIMUOVO
                  var deletedList = favorites.filter(x => {
                    return x.id != id;
                  })
                  console.log("---deletedList[FAVORITES]---", deletedList);
                  if (deletedList.length <= 0) {
                    // rimuovo la lista completa
                    //isFavorite = false;
                    t.update(databaseRefReal, { favorites: dbVal.FieldValue.delete() });
                  } else {
                    // rimuovo il commerciante
                    //isFavorite = false;
                    t.update(databaseRefReal, { favorites: deletedList });
                  }
                } else {
                  // aggiungo il commerciante
                  let newFavorites = [...favorites, { id }];
                  var list = newFavorites.filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i);
                  //isFavorite = true;
                  t.update(databaseRefReal, {
                    favorites: list
                  });
                }
              });
            } else {
              // aggiungo il commerciante per la prima volta
              //isFavorite = true;
              t.update(databaseRefReal, {
                favorites: [
                  { id }
                ]
              });
            }
          });
          //getFavorites();
        } catch (error) {
          console.log("---setFavorite[Error]", error);
        }
      } else {
        navigation.navigate("Auth");
        //console.warn("non ho un utente per aggiugnere questo commerciante ai preferiti");
      }
    }
    return (
      <TouchableOpacity
        key={index}
        onPress={() => {
          Vibration.impactTouch("Light");
          navigation.navigate("Shop", { id: id });
        }}>
        <View style={{
          width: Layout.window.width,
          paddingLeft: 20,
          paddingRight: 20,
          backgroundColor: "white"
          //marginRight: 20,
        }}>
          <ImageBackground
            style={{
              height: 185,
              //marginVertical: 10,
              flexDirection: "row",
              borderRadius: 5,
            }}
            imageStyle={{
              backgroundColor: Colors.light.background,
              resizeMode: "cover",
              borderRadius: 5,
            }}
            source={mainPhoto ? { uri: mainPhoto.url } : { uri: "https://images.unsplash.com/photo-1582582450303-48cc2cfa2c43?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80" }}
          >
            {user !== null && (
              <TouchableOpacity onPress={setFavorite} style={{
                position: "absolute",
                top: 0,
                right: 0,
                //backgroundColor: "rgba(255, 255, 255, .7)",
                height: 40,
                width: 48,
                borderBottomLeftRadius: 5,
                alignContent: "center",
                justifyContent: "center",
                alignItems: "center"
                //zIndex: 10
              }}>
                <BottomIcon type={"ios-heart-empty"} color={Colors.light.bianco} size={25} />
                {/*<Ionicons name={isFavorite ? "ios-heart" : "ios-heart-empty"} size={20} color={Colors.light.bianco} />*/}
              </TouchableOpacity>
            )}
            {/*<View style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "#8D99AE",
              opacity: .15,
              zIndex: 1
            }} />*/}
          </ImageBackground>
          <View style={{ marginTop: 10, marginBottom: 10, marginRight: 20, backgroundColor: "white" }}>
            <BaseText size={14} weight={700} color={Colors.light.nero} styles={{
              letterSpacing: 0.5,
            }}>{title}</BaseText>
            <View style={{
              //marginTop: 5,
              backgroundColor: "white",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              alignContent: "center"
            }}>
              {stars > 0 && (
                <View style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  alignContent: "center",
                  marginRight: 10,
                  backgroundColor: "white"
                }}>
                  <Ionicons name="ios-star" size={20} color={Colors.light.ARANCIO} />
                  {/*<Ionicons name="ios-star" size={17} color={Colors.light.giallo} />
                  <Ionicons name="ios-star" size={17} color={Colors.light.giallo} />
                  <Ionicons name="ios-star" size={17} color={Colors.light.giallo} />
                  <Ionicons name="ios-star" size={17} color={Colors.light.giallo} />*/}
                  <BaseText size={10} weight={700} styles={{ marginLeft: 5, marginTop: 5 }}>{stars}</BaseText>
                </View>
              )}
              {/*<View style={{
                minWidth: 25,
                minHeight: 14,
                paddingHorizontal: 5,
                borderRadius: 5,
                backgroundColor: economyColor,
                justifyContent: "center",
                alignItems: "center"
              }}>*/}
              {/*<BaseText weight={700} color={economyTColor} size={8}>{economyTitle}</BaseText>*/}
              {/*</View>*/}
              <BaseText weight={300} color={Colors.light.nero} styles={{ marginTop: 5 }} size={8}>{via}</BaseText>
              <BaseText weight={700} color={Colors.light.nero} styles={{ marginLeft: 5, marginTop: 5 }} size={8}>·  {economyTitle}</BaseText>
              {/*<View style={{
                width: 65,
                height: 14,
                borderRadius: 5,
                backgroundColor: false ? "rgba(133, 194, 170, 0.4)" : "#C4C4C4",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 10
              }}>
                <BaseText weight={700} styles={{
                  color: false ? "#008D56" : "#525252",
                  fontSize: 8,
                }}>{false ? "APERTO" : "CHIUSO"}</BaseText>
              </View>*/}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  //useEffect(() => {
  //  navigation.navigate('IntroScreen');
  //}, [])

  const cateogryPressed = (index) => {
    setCategory(index);
  }

  const presseProfile = () => {
    //console.log("--userData--", userData)
    if (user && userData) {
      const { toBecompleted, userId, displayName } = userData;
      if (toBecompleted === true) {
        navigation.navigate('Auth', { screen: 'CompleteSocial', params: { userid: userId, nomecognome: displayName } })
      } else {
        setCurrentUser(userData);
        navigation.navigate('Profilo');
      }
    } else navigation.navigate('Auth')
  }

  //const renderTitle = () => {
  //  return (
  //    <MaskedView
  //      style={{ height: 50, marginTop: 60, marginVertical: 20 }}
  //      maskElement={
  //        <View
  //          style={{
  //            backgroundColor: 'transparent',
  //            flex: 1,
  //            justifyContent: 'center',
  //            alignItems: 'center'
  //          }}
  //        >
  //          <BaseText
  //            weight={700}
  //            size={30}
  //          >
  //            {"BeautyShop"}
  //          </BaseText>
  //        </View>
  //      }
  //    >
  //      <LinearGradient
  //        style={{ flex: 1 }}
  //        colors={["#FB6E3B", "#FB6E3B", "#FF9B76", "#FF9B76"]}
  //        //colors={[Colors.light.ARANCIO, Colors.light.ARANCIO, Colors.light.ARANCIO, Colors.light.ARANCIO]}
  //        //colors={[Colors.light.text, Colors.light.text, Colors.light.nero, Colors.light.nero]}
  //        start={{ x: 0, y: 0 }}
  //        end={{ x: 0, y: 1 }}
  //        locations={[.3, .4, .8, .9]}
  //      //locations={[.1, 0.5, 0.8, 0]}
  //      >
  //      </LinearGradient>
  //    </MaskedView>
  //  )
  //}

  const renderItem1 = ({ item, index }) => {
    const { title, bg, model } = item;
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={{
          width: 90,
          height: 90,
          marginRight: 10,
          //borderWidth: 1,
          //borderColor: "black",
          borderRadius: 8,
          overflow: "hidden"
        }}
        onPress={() => { alert(`You've clicked '${index}'`); }}
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
          //borderWidth: 1,
          //borderColor: "black",
          //borderRadius: 8
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
          //backgroundColor: "white",
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
          {/*
            <View style={[{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: 8,
              backgroundColor: "white"
            }]} />
          */}
        </View>
      </TouchableOpacity>
    );
  }

  if (isLoading) {
    return (
      <Loader color={Colors.light.bianco} size={"large"} animating={true} />
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {/*{renderTitle()}*/}
      <View style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignContent: "center",
        alignItems: "center",
        marginHorizontal: 20,
        backgroundColor: "transparent",
        marginTop: Constants.statusBarHeight
      }}>
        <TouchableOpacity onPress={presseProfile}>
          <BottomIcon type={"ios-people"} color={Colors.light.nero} size={30} />
        </TouchableOpacity>
        {/*<TouchableWithoutFeedback onPress={presseProfile}>
          <LottieView
            ref={profileRefanimation}
            style={{
              width: 35,
              height: 34,
            }}
            loop
            speed={0.3}
            source={require('../assets/animations/profile.json')}
          />
        </TouchableWithoutFeedback>*/}
        <TouchableWithoutFeedback onPress={() => setSearchModal(true)}>
          <View style={styles.searchBar}>
            <BaseText size={12} letterSpacing={.3} weight={600}>{"Cosa vuoi fare oggi?"}</BaseText>
          </View>
          {/*<TextInput
            placeholder={"Cosa vuoi fare oggi?"}
            placeholderTextColor={Colors.light.nero}
            onFocus={() => setSearchModal(true)}
            onBlur={() => setSearchModal(false)}
            style={{
              width: "90%",
              height: "50%",
              textAlign: "center",
              fontFamily: "Gilroy_SemiBold",
              fontSize: 15
            }}
          />*/}
        </TouchableWithoutFeedback>
        <TouchableOpacity>
          {/** onPress={() => navigation.navigate(''}*/}
          <PinIcon type="normal" size={25} color={Colors.light.nero} />
        </TouchableOpacity>
      </View>
      <View style={{ backgroundColor: "transparent", marginTop: 10, paddingBottom: 10, }}>
        {/*<BaseText weight={700} size={25} styles={{ paddingLeft: 25 }}>{"Le nostre Categorie"}</BaseText>*/}
        <View style={{ marginTop: 15 }} />
        {/*<ScrollView
          contentContainerStyle={{ paddingLeft: 10 }}
          showsHorizontalScrollIndicator={false}
          bounces={true}
          scrollEventThrottle={1}
          decelerationRate="fast"
          horizontal>
          {servizi.map(({ label, id, enabled, icon }, index) => {
            if (enabled) {
              return (
                <TouchableOpacity onPress={() => cateogryPressed(index)} key={id} style={{
                  paddingBottom: 10,
                  marginHorizontal: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "transparent"
                }}>
                  <View style={{
                    width: 70,
                    height: 110,
                    borderRadius: 50,
                    backgroundColor: selectedCategory == index ? Colors.light.ARANCIO : "white",
                    shadowColor: Colors.light.nero,
                    shadowOpacity: 0.25,
                    shadowOffset: {
                      width: 0,
                      height: 4
                    },
                    justifyContent: "space-between",
                    alignItems: "center",
                    alignContent: "center"
                  }}>
                    <View style={{
                      backgroundColor: selectedCategory == index ? "white" : Colors.light.GRIGIO,
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      marginTop: 10,
                      alignItems: "center",
                      alignContent: "center",
                      justifyContent: "center"
                    }}>
                      <Text style={{ fontSize: 25 }}>{icon ? icon : "🤫"}</Text>
                    </View>
                    <View style={{ marginTop: 15, marginBottom: 20, backgroundColor: "transparent", marginHorizontal: 10 }}>
                      <BaseText color={selectedCategory !== index ? Colors.light.nero : Colors.light.bianco} weight={700} size={9.4} styles={{ textAlign: "center" }}>{label}</BaseText>
                    </View>
                  </View>
                </TouchableOpacity>
              )
            }
          })}
        </ScrollView>*/}
      </View>
      {/*<Desk style={styles.image} width="262" height="258" color={"white"} />*/}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ backgroundColor: "white" }}>
          <FlatList
            data={ENTRIES1}
            renderItem={renderItem1}
            horizontal
            pagingEnabled
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
              //marginTop: 15,
              overflow: 'visible',
            }}
            contentContainerCustomStyle={{
              paddingVertical: 20 // for custom animation
            }}
            activeAnimationType={'spring'}
            activeAnimationOptions={{
              friction: 4,
              tension: 40
            }}
          />
        </View>
        <View style={{ flex: 1, backgroundColor: "transparent" }} >
          {parrucchieri !== undefined && (
            <FlatList
              //refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[Colors.light.arancio]} />}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              //contentContainerStyle={{
              //  backgroundColor: "white",
              //}}
              //horizontal
              //pagingEnabled
              decelerationRate={0}
              //snapToInterval={Layout.window.width - 60}
              //snapToAlignment={"center"}
              data={parrucchieri}
              //style={{
              //  backgroundColor: "white"
              //}}
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
          onRequestClose={() => setSearchModal(false)}
        >
          <View style={styles.closeOverlay} />
          <Modal
            animationType="slide"
            transparent
            visible={searchModal}
            onRequestClose={() => setSearchModal(false)}
          >
            <TouchableWithoutFeedback onPress={() => setSearchModal(false)}>
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
                  <TouchableOpacity onPress={() => setSearchModal(false)} style={{ paddingHorizontal: 10, paddingVertical: 5 }}>
                    <Ionicons name="ios-arrow-back" size={30} color={Colors.light.nero} />
                  </TouchableOpacity>
                  <View style={[styles.searchBar]}>
                    <TextInput
                      autoFocus
                      placeholder={"Cosa vuoi fare oggi?"}
                      placeholderTextColor={Colors.light.nero}
                      //onFocus={() => setSearchModal(true)}
                      //onBlur={() => setSearchModal(false)}
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
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        </Modal>
      </React.Fragment>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background
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
    //opacity: .5,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
  },
  dialogModalWrapper: {
    //flex: 1,
    //top: 115,
    top: Layout.window.height / 20,
    //height: Layout.window.height - 115,
    height: Layout.window.height - 30,
    backgroundColor: "white",
    borderRadius: 40,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
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
