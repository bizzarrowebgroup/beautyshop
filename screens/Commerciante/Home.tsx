import React, { useRef, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Animated from "react-native-reanimated";
import { onScrollEvent, useValue } from "react-native-redash";
import moment from 'moment';
import { db } from '../../network/Firebase';

import HeaderImage from "./HeaderImage";
//import Content, { defaultTabs } from "./Content";
import Content from "./Content";
import Header from "./Header";
import Loader from "../../components/Loader";
import BaseText from "../../components/StyledText";
import Colors from "../../constants/Colors";
//import { StatusBar } from "expo-status-bar";
import { somma } from "../../constants/Utils";
import { AuthUserContext } from '../../navigation/AuthUserProvider';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
});

export default ({ route, navigation }) => {
  const scrollView = useRef<Animated.ScrollView>(null);
  const y = useValue(0);
  const onScroll = onScrollEvent({ y });

  const [data, setData] = React.useState(undefined);

  React.useEffect(() => {
    console.log("SCHERMATA AVVIATA")
  }, [])

  const { user, setUser } = React.useContext(AuthUserContext);

  // TABELLA ORARIO
  const [day, setDay] = React.useState(0);
  const [lunedi, setLunedi] = React.useState({});
  const [martedi, setMartedi] = React.useState({});
  const [mercoledi, setMercoledi] = React.useState({});
  const [giovedi, setGiovedi] = React.useState({});
  const [venerdi, setVenerdi] = React.useState({});
  const [sabato, setSabato] = React.useState({});
  const [domenica, setDomenica] = React.useState({});
  const [noOrari, setOrari] = React.useState(false);
  const [commerciante, setCommerciante] = React.useState(undefined);

  const [recensioni, setRecensioni] = React.useState(undefined);
  const [servizi, setServizi] = React.useState(undefined);
  const [tabs, setTabs] = React.useState(undefined);

  const [indexChosenService, setChosenService] = React.useState(undefined);
  const [durationChosenService, setDurationChosenService] = React.useState(undefined);
  const [costChosenService, setCostChosenService] = React.useState(undefined);
  const [descChosenService, setDescChosenService] = React.useState(undefined);
  const [titleChosenService, setTitleChosenService] = React.useState(undefined);
  const [banner, setBanner] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  //const [barStyle, setBar] = React.useState("light");

  const getServizi = async (idCommerciante) => {
    const serviziFirebase = db.collection('servizicommercianti');
    const doc = await serviziFirebase.where('commerciante', '==', idCommerciante).get();
    if (doc) {
      let finalServizi = [];
      doc.forEach(d => {
        //console.log("--d.id--", d.id)
        let data = { ...d.data(), id: d.id };
        //console.log("--data--", data)
        finalServizi.push({ data, "id": d.id });
      });
      //console.log(finalServizi, "finalServizi")
      let finalServiziEdit = await iterateFinal(finalServizi);
      //console.log(finalServiziEdit, "finalServiziEdit")
      if (finalServiziEdit != undefined) setServizi(uniqueArray(finalServiziEdit));
    } else {
      console.log("no-doc");
    }
  }

  const getCommerciante = async (id) => {
    const commerciantiFirebase = db.collection('commercianti').doc(id);
    const doc = await commerciantiFirebase.get();
    if (!doc.exists) {
      setOrari(true);
    } else {
      let final = { ...doc.data(), id: doc.id };
      //console.log(final, "--final")
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

  const loadPage = async (id) => {
    if (id) {
      await getServizi(id);
      await getCommerciante(id);
      setCommerciante(id);
      const date = moment();
      const day = date.day();
      setDay(day);
      setLoading(false)
    } else navigation.goBack();
  }

  const [carrello, setCart] = React.useState([]);

  React.useEffect(() => {
    loadPage(route.params?.id);
    console.log("---FOTOURL---", route.params?.foto)
  }, [route.params?.id]);

  React.useEffect(() => {
    if (servizi) {
      //console.log("--servizi--", servizi)
      setTabs(servizi.map(({ name }) => ({ name, anchor: 0 })))
    }
    //if (servizi == undefined && data == undefined) navigation.goBack()
    //if (data) console.log("--data--", data)
  }, [servizi, data]);

  if (loading) {
    return (
      <Loader color={"#fff"} size={"large"} animating={true} />
    )
  }

  const setCarrello = (item) => {
    //console.log("--item---", item)
    if (carrello.length > 0) {
      const existingItem = carrello.findIndex(i => (i.title === item.title && i.cost === item.cost && i.category === item.category))
      if (existingItem > -1) {
        var newListRemove = carrello.filter(a => (a.title !== item.title || a.cost !== item.cost || a.category !== item.category));
        setCart(newListRemove)
        if (newListRemove.length <= 0) {
          setBanner(false)
        } else setBanner(true)
      } else {
        setCart((currentCart) => [...currentCart, item])
      }
    } else {
      setCart((currentCart) => [...currentCart, item])
      setBanner(true);
    }
  };

  const goToPrenotazione = () => {
    if (user !== null) {
      navigation.navigate("Prenotazione", { carrello, commerciante, title: data.title });
    } else {
      navigation.navigate("Auth");
    }
  }
  return (
    <View style={styles.container}>
      <HeaderImage {...{ y, image: route.params?.foto }} />
      <Animated.ScrollView
        ref={scrollView}
        style={StyleSheet.absoluteFill}
        scrollEventThrottle={8}
        showsVerticalScrollIndicator={false}
        {...{ onScroll }}
      >
        <Content
          data={data}
          servizi={servizi}
          setCarrello={setCarrello}
          carrello={carrello}
          onMeasurement={(index, tab) => {
            tabs[index] = tab;
            setTabs([...tabs]);
          }}
          {...{ y }}
        />
      </Animated.ScrollView>
      {banner && (
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
          //alignItems: "center"
        }}>
          <TouchableOpacity onPress={() => goToPrenotazione()} style={{
            marginHorizontal: 20,
            marginTop: 10,
            borderRadius: 10,
            backgroundColor: "#FB6E3B",
            height: 45,
            alignContent: "center",
            justifyContent: "space-between",
            paddingHorizontal: 10,
            alignItems: "center",
            flexDirection: "row"
          }}>
            <View style={{ backgroundColor: "white", width: 30, height: 30, borderRadius: 5, alignContent: "center", justifyContent: "center" }}>
              <BaseText styles={{ alignSelf: "center" }} weight={900} size={17} color={Colors.light.ARANCIO}>{carrello ? carrello.length : 0}</BaseText>
            </View>
            <BaseText weight={900} size={14} color={Colors.light.bianco}>Scegli quando</BaseText>
            <View style={{ backgroundColor: "white", width: 80, height: 30, borderRadius: 5, alignContent: "center", justifyContent: "center" }}>
              <BaseText styles={{ alignSelf: "center" }} weight={900} size={13} color={Colors.light.ARANCIO}>{carrello ? somma(carrello, "cost") : 0}</BaseText>
            </View>
            {/*<BaseText styles={{ marginRight: 20 }} weight={900} size={15} color={Colors.light.bianco}></BaseText>*/}
          </TouchableOpacity>
        </View>
      )}
      {tabs !== undefined && <Header {...{ y, tabs, scrollView, title: data.title }} />}
      {/* <Header {...{ y, tabs, scrollView, title: data.title }} /> */}
    </View>
  );
};