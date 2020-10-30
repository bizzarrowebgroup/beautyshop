import React, { useContext } from 'react';
import {
  TouchableWithoutFeedback,
  Image,
  ImageBackground,
  Dimensions,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  StatusBar,
  RefreshControl
} from 'react-native';

import { AppContext } from '../context/Appcontext';
import { AuthUserContext } from '../navigation/AuthUserProvider';

import { Ionicons } from '@expo/vector-icons';
import Desk from '../components/svg/Desk';
import Intro2 from '../components/svg/Intro2';
import Intro3 from '../components/svg/Intro3';
import Intro4 from '../components/svg/Intro4';
import RightIcon from '../components/svg/RightIcon';

import { Text, View } from '../components/Themed';
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

const { width, height } = Dimensions.get('window');

const wait = timeout => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
};

export default function HomePage({ navigation }: StackScreenProps<RootStackParamList, 'Shop'>) {
  const {
    servizi,
    commercianti,
    foto
  } = useContext(AppContext);
  // const [modalShow, setModal] = React.useState(false);
  const [parrucchieri, setPar] = React.useState(undefined);
  // const colorScheme = useColorScheme();
  // const lottieHert = React.useRef(null);
  const { user, setUser } = React.useContext(AuthUserContext);
  const [userDocId, setUserDocId] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [favoritesFB, setFavorites] = React.useState(undefined);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

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
        });
      };
    }
  }

  const getFavorites = async () => {
    try {
      //console.log("sono dentro getFavorites")
      setIsLoading(true);
      var databaseRefReal = db.collection('utentiApp').doc(userDocId);
      const doc = await databaseRefReal.get();
      let favoritesToSearch = [];
      if (doc.exists) {
        let favorites = doc.data()?.favorites;
        if (favorites && favorites.length > 0) {
          favoritesToSearch.push(favorites);
        } else {
          //setIsLoading(false);
        }
      } else {
        setIsLoading(false);
        setFavorites(undefined);
        return;
      }
      const favoritesDb = db.collection('commercianti');
      const snapshot = await favoritesDb.get();
      let finalFavorites = [];
      favoritesToSearch.forEach((favDoc) => {
        let sfavDoc = favDoc;
        sfavDoc.forEach(item => {
          let itemId = item.id;
          snapshot.forEach(snapDoc => {
            const snapDocData = snapDoc.data();
            const snapDocID = snapDoc.id;
            if (itemId === snapDocID) {
              finalFavorites.push(snapDocID)
            }
          });
        });
      });
      if (finalFavorites.length > 0) {
        setFavorites(finalFavorites);
      } else {
        setFavorites(undefined);
      }
      console.log("---finalFavorites---", finalFavorites);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setFavorites(undefined);
      console.log("---[getFavorites]ERROR---", error)
    }
  }

  React.useEffect(() => {
    // setTimeout(() => {
    //     setModal(!modalShow);
    // }, 5000);
    getUserId();
    let parrucchieri = [];
    if (commercianti && foto) {
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
      // console.log(comFin, "comFin");
      comFin.map((item) => {
        if (item.tipo == 0) {
          parrucchieri.push(item);
        }
      })
      setPar(parrucchieri);
    }
    if (user !== null && userDocId !== null) {
      getFavorites();
    }
  }, [user, userDocId]);

  React.useEffect(() => {
    navigation.addListener('focus', () => {
      if (user !== undefined && userDocId !== null) {
        //getUserId();
        getFavorites();
      }
    });
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
    //if (title.length > 23) {
    //  title = title.slice(0, 23) + "";
    //}
    let isFavorite = false;
    if (favoritesFB !== undefined) {
      isFavorite = favoritesFB.includes(id);
      //console.log(isFavorite, "---isFAV---")
      //console.log(favoritesFB, "---favoritesFB---")
      //console.log(id, "---id---")
    }
    const setFavorite = async () => {
      if (user !== null && userDocId !== null) {
        console.log("---hoPremuto---", id)
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
          getFavorites();
        } catch (error) {
          console.log("---setFavorite[Error]", error);
        }
      } else {
        console.warn("non ho un utente per aggiugnere questo commerciante ai preferiti");
      }
    }
    if (false) {
      return (
        <TouchableWithoutFeedback
          key={index}
          onPress={() => {
            navigation.navigate("Shop", { id: id });
          }}>
          <View style={{
            //width: 342,
            backgroundColor: "white",
            marginHorizontal: 10,
            marginVertical: 10,
            borderRadius: 5,
            //marginTop: 20,
            //marginBottom: 20,
            //shadowColor: Colors.light.nero,
            //shadowOpacity: 0.15,
            //shadowOffset: {
            //  width: 0,
            //  height: 4
            //},
            //shadowRadius: 10,
            //elevation: 1,
            flexDirection: "row",
          }}>
            <Image style={{
              width: 122,
              height: 113,
              borderRadius: 5,
              marginVertical: 10,
              marginHorizontal: 10,
              //alignSelf: "center"
            }} source={mainPhoto ? { uri: mainPhoto.url } : require('../assets/images/salon.jpeg')} />
            <View style={{ maxWidth: 180 }}>
              <View style={{ marginTop: 10 }}>
                <BaseText size={10} maxHeight={20}>{title}</BaseText>
              </View>
              <View style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                alignContent: "center"
              }}>
                <Ionicons name="ios-star" size={17} color={Colors.light.giallo} />
                <Ionicons name="ios-star" size={17} color={Colors.light.giallo} />
                <Ionicons name="ios-star" size={17} color={Colors.light.giallo} />
                <Ionicons name="ios-star" size={17} color={Colors.light.giallo} />
                <Ionicons name="ios-star" size={17} color={Colors.light.giallo} />
                <BaseText size={9} styles={{ marginLeft: 5 }}>({stars})</BaseText>
              </View>
              <View style={{ marginTop: 5 }}>
                <BaseText size={8} maxHeight={20}>{desc}</BaseText>
              </View>
              <View style={{
                flexDirection: "row",
                alignContent: "center",
                alignItems: "center",
                justifyContent: "flex-start"
              }}>
                <Ionicons name="ios-pin" size={25} color={Colors.light.violaDes} style={{ marginRight: 5 }} />
                <BaseText size={8} maxWidth={160} color={"#616161"}>{via}</BaseText>
              </View>
              <View style={{
                position: "absolute",
                bottom: 10,
                flexDirection: "row",
                alignItems: "center"
              }}>
                <View style={{
                  minWidth: 25,
                  minHeight: 14,
                  paddingHorizontal: 5,
                  borderRadius: 5,
                  backgroundColor: economyColor,
                  justifyContent: "center",
                  alignItems: "center"
                }}>
                  <BaseText weight={700} color={economyTColor} size={8}>{economyTitle}</BaseText>
                </View>
                <View style={{
                  width: 65,
                  height: 14,
                  borderRadius: 5,
                  backgroundColor: false ? "rgba(133, 194, 170, 0.4)" : "#C4C4C4",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: 8
                }}>
                  <BaseText weight={700} styles={{
                    color: false ? "#008D56" : "#525252",
                    fontSize: 8,
                    // fontFamily: "Montserrat_700Bold"
                  }}>{false ? "APERTO" : "CHIUSO"}</BaseText>
                </View>
              </View>
            </View>
            <View style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              alignContent: "center",
              position: "absolute",
              right: 15,
              bottom: 10
            }}>
              <BaseText weight={400} color={Colors.light.nero} size={10}>{"Esplora"}</BaseText>
              {/*<RightIcon width={19} height={19} style={{ marginLeft: 2 }} />*/}
            </View>
            {user !== null && <TouchableOpacity onPress={setFavorite} style={{
              position: "absolute",
              right: 15,
              top: 10
            }}>
              <Ionicons name={isFavorite ? "ios-heart" : "ios-heart-empty"} size={20} color={Colors.light.arancioDes} />
            </TouchableOpacity>}
          </View>
        </TouchableWithoutFeedback>
      )
    }
    return (
      <TouchableOpacity
        key={index}
        onPress={() => {
          Vibration.impactTouch("Light");
          navigation.navigate("Shop", { id: id });
        }}>
        {/*<View style={{
          //backgroundColor: "white",
          marginHorizontal: 10,
          marginVertical: 10,
          borderRadius: 5,
          flexDirection: "row",
        }}>*/}
        <View style={{
          //borderBottomColor: "rgba(0,0,0,.041)",
          //borderBottomWidth: 10,
          //opacity: .2
        }}>
          <ImageBackground
            style={{
              flex: 1,
              height: 145,
              //borderRadius: 10,
              //marginHorizontal: 10,
              marginVertical: 10,
              flexDirection: "row",
            }}
            imageStyle={{
              //borderRadius: 10,
              backgroundColor: Colors.light.bianco,
              resizeMode: "cover"
            }}
            source={mainPhoto ? { uri: mainPhoto.url } : require('../assets/images/salon.jpeg')}
          >
            {user !== null && (
              <TouchableOpacity onPress={setFavorite} style={{
                position: "absolute",
                right: 15,
                top: 10,
                zIndex: 10
              }}>
                <Ionicons name={isFavorite ? "ios-heart" : "ios-heart-empty"} size={20} color={Colors.light.bianco} />
              </TouchableOpacity>
            )}
            {/*<View style={{
              alignSelf: "center",
              flex: 1,
              backgroundColor: "transparent",
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
              marginHorizontal: 20,
              zIndex: 2
            }}>
              <BaseText size={19} weight={600} color={Colors.light.bianco} styles={[styles.shadow, {
                letterSpacing: 0.5,
              }]}>{title}</BaseText>
            </View>*/}
            <View style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              width: "100%",
              height: "100%",
              //backgroundColor: Colors.light.newviola,
              backgroundColor: "#8D99AE",
              //backgroundColor: Colors.light.bianco,
              //borderRadius: 10,
              opacity: .15,
              zIndex: 1
            }} />
          </ImageBackground>
          <View style={{ marginHorizontal: 20, marginBottom: 10 }}>
            {/*<View style={{
              flexDirection: "row",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "flex-start"
            }}>
              <Ionicons name="ios-pin" size={25} color={Colors.light.violaDes} style={{ marginRight: 5 }} />
              <BaseText size={8} color={"#616161"}>{via}</BaseText>
            </View>*/}
            <BaseText size={14} weight={400} color={Colors.light.nero} styles={{
              letterSpacing: 0.5,
            }}>{title}</BaseText>
            <View style={{
              //position: "absolute",
              //bottom: 10,
              marginTop: 5,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              alignContent: "center"
            }}>
              {stars > 0 && (
                <View style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  alignContent: "center",
                  marginRight: 10
                }}>
                  <Ionicons name="ios-star" size={17} color={Colors.light.giallo} />
                  <Ionicons name="ios-star" size={17} color={Colors.light.giallo} />
                  <Ionicons name="ios-star" size={17} color={Colors.light.giallo} />
                  <Ionicons name="ios-star" size={17} color={Colors.light.giallo} />
                  <Ionicons name="ios-star" size={17} color={Colors.light.giallo} />
                  <BaseText size={9} styles={{ marginLeft: 5 }}>({stars})</BaseText>
                </View>
              )}
              <View style={{
                minWidth: 25,
                minHeight: 14,
                paddingHorizontal: 5,
                borderRadius: 5,
                backgroundColor: economyColor,
                justifyContent: "center",
                alignItems: "center"
              }}>
                <BaseText weight={700} color={economyTColor} size={8}>{economyTitle}</BaseText>
              </View>
              <View style={{
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
                  // fontFamily: "Montserrat_700Bold"
                }}>{false ? "APERTO" : "CHIUSO"}</BaseText>
              </View>
            </View>
          </View>
        </View>
        {/*
            <View style={{ maxWidth: 180 }}>
              <View style={{ marginTop: 5 }}>
                <BaseText size={8} maxHeight={20}>{desc}</BaseText>
              </View>
              
              
            </View>
          */}
        {/*<View style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            alignContent: "center",
            position: "absolute",
            right: 15,
            bottom: 10
          }}>
          </View>*/}
        {/*<BaseText weight={400} color={Colors.light.nero} size={10}>{"Esplora"}</BaseText>*/}
        {/*<RightIcon width={19} height={19} style={{ marginLeft: 2 }} />*/}
      </TouchableOpacity>
    )
    //return (
    //  <View></View>
    //)
  }

  if (isLoading) {
    return (
      <Loader color={Colors.light.bianco} size={"large"} animating={true} />
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      {/**
             * HEADER
             */}
      <LinearGradient
        // Button Linear Gradient
        //colors={[Colors.light.newviola, Colors.light.bianco]}
        colors={[Colors.light.newviola, Colors.light.newviola]}
        style={styles.header}
      >
        <View style={styles.textHeader}>
          <BaseText styles={styles.headerText}>Esplora</BaseText>
          {/*<BaseText styles={styles.headerSub}>Cerca qui il servizio di cui hai bisogno</BaseText>*/}
        </View>
        <View style={[styles.searchBar, {
          //borderWidth: 1,
          //borderColor: Colors.light.newviola
        }]}>
          <TextInput
            placeholder={"Cosa vuoi fare oggi?"}
            placeholderTextColor={Colors.light.nero}
            style={{
              width: "100%",
              height: "100%",
              marginHorizontal: 20,
              //fontFamily: "WorkSans_600SemiBold",
              fontFamily: "Gilroy_SemiBold",
              letterSpacing: 0.72
            }} />
          <Ionicons name="ios-search" color={Colors.light.nero} size={20} style={styles.iconSearch} />
        </View>
        <Desk style={styles.image} width="262" height="258" color={"white"} />
      </LinearGradient>
      {/**
             * modalIntro
             */}
      <Modal visible={false} presentationStyle="pageSheet" animationType="slide">
        <ScrollView
          horizontal={true}
          snapToInterval={width}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          bounces={false}
          scrollEventThrottle={1}
          scrollEnabled={true}
        >
          <View style={{ width: width, justifyContent: "center", alignItems: "center" }}>
            <Desk width="325" height="320" />
            <Text style={styles.modalh1}>Ciao</Text>
            <Text style={styles.modalSub}>Attivando la localizzazione ci permetterai di consigliarti i saloni ed i centri più vicini alla tua posizione</Text>
          </View>
          <View style={{ width: width, justifyContent: "center", alignItems: "center" }}>
            <Intro2 width="325" height="320" />
            <Text style={styles.modalh1}>Ciao</Text>
            <Text style={styles.modalSub}>Attivando la localizzazione ci permetterai di consigliarti i saloni ed i centri più viicini alla tua posizione</Text>
          </View>
          <View style={{ width: width, justifyContent: "center", alignItems: "center" }}>
            <Intro3 width="325" height="320" />
            <Text style={styles.modalh1}>Ciao</Text>
            <Text style={styles.modalSub}>Attivando la localizzazione ci permetterai di consigliarti i saloni ed i centri più viicini alla tua posizione</Text>
          </View>
          <View style={{ width: width, justifyContent: "center", alignItems: "center" }}>
            <Intro4 width="325" height="320" />
            <Text style={styles.modalh1}>Ciao</Text>
            <Text style={styles.modalSub}>Attivando la localizzazione ci permetterai di consigliarti i saloni ed i centri più viicini alla tua posizione</Text>
          </View>
        </ScrollView>
      </Modal>
      {/**
             * content
             */}
      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[Colors.light.arancio]} />}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ backgroundColor: "transparent", paddingBottom: 100 }}>

        {/**
                 * Servizi
                 */}
        <View style={{ backgroundColor: "transparent", marginTop: 10 }}>
          <BaseText weight={700} styles={{
            fontSize: 13,
            letterSpacing: 0.72,
            textTransform: "uppercase",
            marginLeft: 20,
          }}>{"I NOSTRI SERVIZI"}</BaseText>
          <View style={{ marginTop: 15 }} />
          <ScrollView
            contentContainerStyle={{ paddingLeft: 20 }}
            showsHorizontalScrollIndicator={false}
            bounces={true}
            scrollEventThrottle={1}
            decelerationRate="fast"
            horizontal>
            {servizi.map(({ label, id, enabled, order }, index) => {
              if (enabled) {
                return (
                  <TouchableOpacity key={id} style={{
                    width: 100,
                    marginHorizontal: 3,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "transparent"
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
                      <BaseText color={Colors.light.newviola}>{label.charAt(0)}</BaseText>
                      {/*<Ionicons name="ios-star-outline" size={30} color={Colors.light.arancioDes} />*/}
                    </View>
                    <BaseText styles={{
                      marginTop: 5,
                      fontSize: 13,
                      textAlign: "center"
                    }}>{label}</BaseText>
                  </TouchableOpacity>
                )
              }
            })}
          </ScrollView>
        </View>
        {/**
         * Parrucchieri // old Raccomandati per te
         */}
        <View style={{ backgroundColor: "transparent", marginLeft: 20, marginTop: 20 }}>
          <BaseText weight={700} styles={{
            fontSize: 13,
            letterSpacing: 0.72,
            textTransform: "uppercase",
          }}>{"I nostri Commercianti"}</BaseText>
        </View>
        <View style={{ backgroundColor: "transparent" }} >
          {/*<ScrollView
            showsHorizontalScrollIndicator={false}
            bounces={false}
            snapToInterval={width}
            scrollEventThrottle={1}
            decelerationRate="fast"
            horizontal
            contentContainerStyle={{ paddingLeft: 10 }}
          >
            {RenderCards()}
          </ScrollView>*/}
          {parrucchieri !== undefined && (
            <FlatList
              data={parrucchieri}
              contentContainerStyle={{
                backgroundColor: "transparent"
              }}
              style={{
                backgroundColor: "transparent"
              }}
              keyExtractor={(item) => item.id}
              renderItem={({ item, index }) => renderCards(item, index)}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: Colors.light.bg
    backgroundColor: "white"
  },
  textHeader: {
    height: 50,
    backgroundColor: "transparent",
  },
  iconSearch: {
    position: "absolute",
    right: 15,
  },
  modalh1: {
    fontSize: 18,
    color: Colors.light.nero,
    fontFamily: "Montserrat_700Bold",
    marginBottom: 6
  },
  modalSub: {
    paddingHorizontal: 45,
    textAlign: "center",
    fontSize: 16,
    color: Colors.light.nero,
    fontFamily: "Montserrat_400Regular"
  },
  searchBar: {
    backgroundColor: "white",
    borderRadius: 20,
    //marginHorizontal: 50,
    //borderRadius: 5,
    marginHorizontal: 15,
    marginTop: 20,
    height: 40,
    //bottom: 45,
    justifyContent: "center"
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
    //borderBottomLeftRadius: 55,
    //borderBottomRightRadius: 55
  },
  image: {
    position: "absolute",
    right: -10,
    //top: 20,
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
