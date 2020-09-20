import React, { useContext, useEffect } from 'react';
import {
  Image,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  ScrollView
} from 'react-native';

// CONTEXT
import { AppContext } from '../context/Appcontext';
import { AuthUserContext } from '../navigation/AuthUserProvider';
// COMPONENTS
import Header from '../components/Header';
import Colors from '../constants/Colors';
import BaseText from '../components/StyledText';
import NoFavorites from '../components/svg/NoFavorites';
import { db } from '../network/Firebase';
import Loader from '../components/Loader';

// import * as firebase from "firebase";
// import "firebase/database";

interface PreferitiProps {
  navigation: any;
}

const Preferiti = (props: PreferitiProps) => {
  const { showToast } = useContext(AppContext);
  const { user, setUser } = React.useContext(AuthUserContext);
  const [commercianti, setCommercianti] = React.useState(undefined);
  const [isLoading, setIsLoading] = React.useState(true);

  const [userDocId, setUserDocId] = React.useState(null);
  const getUserId = async () => {
    //get a unique key
    //console.log("---(PreferitiScreen)getUserId[called]---")
    if (user !== null) {
      //console.log("---(PreferitiScreen)getUserId[user-present]---")
      var databaseRef = await db.collection('utentiApp').where("userId", "==", user.uid).get();
      if (!databaseRef.empty) {
        //console.log("---(PreferitiScreen)getUserId[databaseRef-notEmpty]---")
        databaseRef.forEach(doc => {
          //console.log("---(PreferitiScreen)getUserId[databaseRef-forEach]---", doc.data());
          //console.log("---(PreferitiScreen)getUserId[docID]---", doc.id);
          setUserDocId(doc.id);
        });
      };
    }
  }

  const getFavorites = async () => {
    if (user !== null && userDocId !== null) {
      //console.log("sono dentro getFavorites")
      var databaseRefReal = db.collection('utentiApp').doc(userDocId);
      const doc = await databaseRefReal.get();
      let favoritesToSearch = [];
      if (doc.exists) {
        //console.log('Document data:', doc.data());
        let favorites = doc.data()?.favorites;
        if (favorites && favorites.length > 0) {
          //console.log("---favorites---", favorites);
          favoritesToSearch.push(favorites);
        } else {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
        setCommercianti(undefined);
        return;
      }
      const favoritesDb = db.collection('commercianti');
      const snapshot = await favoritesDb.get();
      let finalFavorites = [];
      favoritesToSearch.forEach((favDoc) => {
        //console.log("---favDoc---", favDoc);
        let sfavDoc = favDoc;
        sfavDoc.forEach(item => {
          let itemId = item.id;
          //console.log("---favDocID---", itemId)
          snapshot.forEach(snapDoc => {
            const snapDocData = snapDoc.data();
            const snapDocID = snapDoc.id;
            //console.log("---snapDocData---", snapDocData)
            //console.log("---snapDocID---", snapDoc.id)
            if (itemId === snapDocID) {
              finalFavorites.push(snapDocData)
            }
          });
        });

      });
      if (finalFavorites.length > 0) {
        setCommercianti(finalFavorites);
      } else {
        setCommercianti(undefined);
      }
      //console.log("---finalFavorites---", finalFavorites);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }
  //const removeFavorites = async () => {

  //}
  useEffect(() => {
    props.navigation.addListener('focus', () => {
      getUserId();
      getFavorites();
      setIsLoading(false);
    });
  });

  useEffect(() => {
    getUserId();
    getFavorites();

    // showToast("we have got", "success dio cane", "success", "bottom")
  }, [userDocId, user]);
  //console.log("---isLoading---", isLoading)
  //console.log("---commercianti---", commercianti)
  if (isLoading) {
    return (
      <Loader color={Colors.light.arancioDes} size={"large"} animating={true} />
    )
  }

  return (
    <View style={styles.container}>
      <Header hasBack={false} title="Preferiti" />
      {
        user && (
          <ScrollView style={{
            marginVertical: 20,
            marginHorizontal: 20,
            flex: 1,
          }}>
            {commercianti == undefined && <View style={{
              marginVertical: 20,
              marginHorizontal: 20,
              flex: 1,
            }}>
              <View style={{
                marginTop: 80,

              }}>
                <BaseText textAlign="center" weight={400} size={15}>{"Non ci sono tuoi preferiti qui 😞.\nPotrai trovare tutti i tuoi preferiti.\n\nPer aggiungere un nuovo preferito premi il (♥︎) del menu."}</BaseText>
              </View>
            </View>}
            {commercianti !== undefined && <View>
              {commercianti.map(({ title, stars, via, desc, mainPhoto, economy, id }, index) => {
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
                if (title.length > 23) {
                  title = title.slice(0, 23) + "";
                }
                return (
                  <TouchableWithoutFeedback key={index} onPress={() => {
                    props.navigation.navigate("Shop", { id: id });
                  }} >
                    <View style={{
                      width: 342,
                      marginHorizontal: 10,
                      borderRadius: 5,
                      marginTop: 20,
                      marginBottom: 20,
                      shadowColor: Colors.light.nero,
                      shadowOpacity: 0.15,
                      shadowOffset: {
                        width: 0,
                        height: 4
                      },
                      shadowRadius: 10,
                      flexDirection: "row",
                      backgroundColor: "white"
                    }}>
                      <Image style={{ width: 122, height: 113, borderRadius: 5, marginVertical: 10, marginHorizontal: 10, alignSelf: "center" }} source={mainPhoto ? { uri: mainPhoto.url } : require('../assets/images/salon.jpeg')} />
                      <View style={{ maxWidth: 180 }}>
                        <View style={{ marginTop: 10 }}>
                          <BaseText size={10} maxHeight={20}>{title}</BaseText>
                        </View>
                        {/*<View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center", alignContent: "center" }}>
                          <Ionicons name="ios-star" size={17} color={Colors.light.giallo} />
                          <Ionicons name="ios-star" size={17} color={Colors.light.giallo} />
                          <Ionicons name="ios-star" size={17} color={Colors.light.giallo} />
                          <Ionicons name="ios-star" size={17} color={Colors.light.giallo} />
                          <Ionicons name="ios-star" size={17} color={Colors.light.giallo} />
                          <BaseText size={9} styles={{ marginLeft: 5 }}>({stars})</BaseText>
                        </View>*/}
                        <View style={{ marginTop: 5 }}>
                          <BaseText size={8} maxHeight={20}>{desc}</BaseText>
                        </View>
                        <View style={{ flexDirection: "row", alignContent: "center", alignItems: "center", justifyContent: "flex-start" }}>
                          {/*<Ionicons name="ios-pin" size={25} color={Colors.light.violaDes} style={{ marginRight: 5 }} />*/}
                          <BaseText size={8} maxWidth={160} color={"#616161"}>{via}</BaseText>
                        </View>
                        <View style={{ position: "absolute", bottom: 10, flexDirection: "row", alignItems: "center" }}>
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
                        right: 10,
                        bottom: 8
                      }}>
                        <BaseText weight={700} color={Colors.light.nero} size={9}>{"DETTAGLI"}</BaseText>
                        {/*<RightIcon width={19} height={19} style={{ marginLeft: 2 }} />*/}
                      </View>
                      {/*{user !== null && <TouchableWithoutFeedback onPress={setFavorite}>
                        <Ionicons name="ios-heart-empty" size={20} color={Colors.light.arancioDes} style={{
                          position: "absolute",
                          right: 15,
                          top: 10
                        }} />
                      </TouchableWithoutFeedback>}*/}
                    </View>
                  </TouchableWithoutFeedback>
                )
              })}
            </View>}
            {commercianti !== undefined && commercianti.length <= 0 &&
              <NoFavorites style={{ bottom: 0 }} />
            }
          </ScrollView>
        )
      }
      {
        !user && (
          <View style={{
            marginVertical: 20,
            marginHorizontal: 20,
            flex: 1,
            flexDirection: "row",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <View style={{
              height: 400,
            }}>
              <BaseText textAlign="center" weight={400} size={15}>
                {"Non ci sono tuoi preferiti qui.\n\nPer aggiungere un nuovo preferito registrati o accedi ora!"}
              </BaseText>
              <NoFavorites />
            </View>
          </View>
        )
      }
    </View>
  );
};
export default Preferiti;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.bg
  }
});
