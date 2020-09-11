import * as React from 'react';
import {
  Animated,
  ScrollView,
  Dimensions,
  SectionList,
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback
} from 'react-native';
import Header from '../components/Header';
import { RootStackParamList } from '../types';
import { StackScreenProps } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import { db } from '../network/Firebase';

const { width, height } = Dimensions.get('window');

// import { useIsFocused } from '@react-navigation/native';
import moment from 'moment';

import Spinner from '../components/Spinner';
import BaseText from '../components/StyledText';
import StarsReview from '../components/StarsReview';

const DATA = [
  {
    title: "Main dishes",
    data: [
      {}
    ]
  },
  {
    title: "Sides",
    data: ["French Fries", "Onion Rings", "Fried Shrimps"]
  },
  {
    title: "Drinks",
    data: ["Water", "Coke", "Beer"]
  },
  {
    title: "Desserts",
    data: ["Cheese Cake", "Ice Cream"]
  }
];

const pieghe = [
  {
    title: "Piega corta",
    desc: "Spigolature, rotondità e proporzioni possono essere riequilibrate con il giusto taglio e una pettinatura adatta.",
    price: "25"
  },
  {
    title: "Piega veloce",
    desc: "Spigolature, rotondità e proporzioni possono essere riequilibrate con il giusto taglio e una pettinatura adatta.",
    price: "14"
  },
  {
    title: "Piega bigodini",
    desc: "Spigolature, rotondità e proporzioni possono essere riequilibrate con il giusto taglio e una pettinatura adatta.",
    price: "19"
  },
  {
    title: "Piega veloce",
    desc: "Spigolature, rotondità e proporzioni possono essere riequilibrate con il giusto taglio e una pettinatura adatta.",
    price: "14"
  },
];

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

const Shop = ({ navigation, route }: StackScreenProps<RootStackParamList, 'Shop'>) => {
  const [isShownTagli, diocanTagli] = React.useState(false);
  const [indexX, setIndex] = React.useState(1);
  const [indexTagli, setIndexTagli] = React.useState(1);
  const [data, setData] = React.useState(undefined);

  // TABELLA ORARIO
  const [bool, setBool] = React.useState(false);
  const [day, setDay] = React.useState(0);
  const [isShown, diocan] = React.useState(false);

  const [hours, setHours] = React.useState([]);
  const [lunedi, setLunedi] = React.useState({});
  const [martedi, setMartedi] = React.useState({});
  const [mercoledi, setMercoledi] = React.useState({});
  const [giovedi, setGiovedi] = React.useState({});
  const [venerdi, setVenerdi] = React.useState({});
  const [sabato, setSabato] = React.useState({});
  const [domenica, setDomenica] = React.useState({});
  const [noOrari, setOrari] = React.useState(false);
  const [recensioni, setRecensioni] = React.useState(null);
  // const isFocused = useIsFocused();
  // const current = pieghe[index];
  const [servizi, setServizi] = React.useState(undefined);

  const heightX = !bool ? 44 : 100;
  const status = true;

  const getCommerciante = async (id) => {
    const commerciantiFirebase = db.collection('commercianti').doc(id);
    const doc = await commerciantiFirebase.get();
    if (!doc.exists) {
      // console.log('No such document!');
      setOrari(true);
    } else {
      let final = { ...doc.data() };
      setData(final);

      const orariRef = db.collection('orari');
      const snapshot = await orariRef.where('commercianti', '==', doc.id).get();
      if (snapshot.empty) {
        setOrari(true)
        // console.log('No matching orari with commercianti.');
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
            case 0:
              if (h.open === "" || h.close === "") {
                setLunedi({ closed: true })
              } else {
                setLunedi({ start: h.open, end: h.close })
              }
              break;
            case 1:
              if (h.open === "" || h.close === "") {
                setMartedi({ closed: true })
              } else {
                setMartedi({ start: h.open, end: h.close })
              }
              break;
            case 2:
              if (h.open === "" || h.close === "") {
                setMercoledi({ closed: true })
              } else {
                setMercoledi({ start: h.open, end: h.close })
              }
              break;
            case 3:
              if (h.open === "" || h.close === "") {
                setGiovedi({ closed: true })
              } else {
                setGiovedi({ start: h.open, end: h.close })
              }
              break;
            case 4:
              if (h.open === "" || h.close === "") {
                setVenerdi({ closed: true })
              } else {
                setVenerdi({ start: h.open, end: h.close })
              }
              break;
            case 5:
              if (h.open === "" || h.close === "") {
                setSabato({ closed: true })
              } else {
                setSabato({ start: h.open, end: h.close })
              }
              break;
            case 6:
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
        // console.log(finalRecensioni,"finalRecensioni");
        setRecensioni(finalRecensioni)
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

  const getServizioTitle = (docId) => {
    return db.collection('servizi').doc(docId)
      .get({ source: "default" })
      .then((docRef) => {
        var jona = docRef.data();
        return jona.label;
      })
      .catch((e) => {
        console.log("error", e)
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
      let finalServiziEdit = [];
      finalServizi.forEach((doc) => {
        let docId = doc.data['servizi'];
        let doctitle = getServizioTitle(docId);
        console.log(doctitle, "doctit");
        finalServiziEdit.push({
          title: doctitle,
          data: [doc.data]
        });
      });
      setServizi(uniqueArray(finalServiziEdit));
    } else {
      console.log("no-doc");
    }
  }

  React.useEffect(() => {
    if (route.params?.id) {
      getServizi(route.params?.id);
      getCommerciante(route.params?.id);
      const date = moment();
      const day = date.day();
      setDay(day);
    }
  }, [route.params?.id]);

  if (data === undefined) {
    return (
      <Spinner />
    )
  }

  const serviziHeader = (servizi) => {
    console.log(servizi, "headerGot");
    return (
      <View>
      </View>
    );
  }

  const ItemService = ({ item }) => {
    // "commerciante": "HHCFptUM91FqhMq2INjE",
    // "cost": "14",
    // "desc": "Spigolature, rotondità e proporzioni possono essere riequilibrate con il giusto taglio e una pettinatura adatta.",
    // "enabled": true,
    // "servizi": "wbHdoy9exAayRWitea5m",
    // "titolo": "Taglio donna"
    const { cost, desc, enabled, titolo, id } = item;
    const dio = () => {
      console.log(id, "itemIndexDio")
      setIndex(id);
    };
    if (enabled) {
      return (
        <TouchableWithoutFeedback key={titolo} onPress={dio}>
          <View style={{ marginVertical: 5 }}>
            <View style={{
              minHeight: 40,
              borderTopLeftRadius: 5,
              borderTopRightRadius: 5,
              backgroundColor: Colors.light.grigio,
            }}>
              <Ionicons name={id === indexX ? "ios-checkbox" : "ios-checkbox-outline"} size={20} color={"#DE9182"} style={{
                position: "absolute",
                left: 10,
                top: 10,
                // width: 40,
                // height: 40
              }} />
              <Ionicons name="ios-arrow-down" size={18} color="#6D6E95" style={{
                position: "absolute",
                right: 15,
                top: 10,
                // transform: [{ rotate: indexX === index ? '180deg' : '0deg' }]
              }} />
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
                  color: "black",
                }}>{titolo}</BaseText>
                <BaseText size={13} weight={800} styles={{
                  color: "black",
                }}>{cost} €</BaseText>
              </View>
            </View>
            {/* {indexX === index && <View style={{ */}
            {id === indexX &&
              <View style={{
                backgroundColor: "white",
                borderBottomRightRadius: 10,
                borderBottomLeftRadius: 10,
                padding: 15,
                top: -5,
                zIndex: -1
              }}>
                <BaseText styles={{
                  color: "#828282",
                  textAlign: "center",
                  fontSize: 10,
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
    <View style={styles.container}>
      <Header hasBack={true} title={data.title} onPress={() => { navigation.pop() }} />
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 200
        }}
        showsVerticalScrollIndicator={false}
        decelerationRate="fast"
        scrollEventThrottle={1}
      >
        {/**
                 * mainINFO
                 */}
        <View style={{ marginBottom: 20, marginHorizontal: 30, }}>
          <View style={{
            alignContent: "center",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
            marginTop: 20
          }}>
            <Image style={{ width: 120, height: 115, borderRadius: 5 }} source={require('../assets/images/salon.jpeg')} />
            <View style={{ marginLeft: 10, maxWidth: 180, maxHeight: 115, marginRight: 20 }}>
              <View style={{
                width: 65,
                height: 14,
                borderRadius: 5,
                backgroundColor: status ? "rgba(133, 194, 170, 0.4)" : "#C4C4C4",
                justifyContent: "center",
                alignItems: "center",
              }}>
                <BaseText weight={700} styles={{ color: status ? "#008D56" : "#525252" }} size={8}>{status ? "APERTO" : "CHIUSO"}</BaseText>
              </View>
              <View style={[styles.row, { borderColor: 'grey', borderBottomWidth: 0, padding: 3 }]}>
                <Ionicons name="ios-phone-portrait" size={20} color="#6D6E95" style={{ width: 20, textAlign: "center" }} />
                <BaseText size={10} styles={[styles.text, { marginLeft: 5 }]}>{data.phone}</BaseText>
              </View>
              <View style={[styles.row, { borderColor: 'grey', borderBottomWidth: 0, padding: 3 }]}>
                <Ionicons name="ios-mail" size={20} color="#6D6E95" style={{ width: 20, textAlign: "center" }} />
                <BaseText size={10} styles={[styles.text, { marginLeft: 5 }]}>{data.email}</BaseText>
              </View>
              <View style={[styles.row, { borderColor: 'grey', borderBottomWidth: 0, padding: 3 }]}>
                <Ionicons name="ios-pin" size={20} color="#6D6E95" style={{ width: 20, textAlign: "center" }} />
                <BaseText size={10} styles={[styles.text, { marginLeft: 5, maxWidth: 160, }]}>{data.via}</BaseText>
              </View>
            </View>
          </View>
          {/* <View style={{ flexDirection: "row", }}>
                        <Image style={{ width: 76, height: 61, borderRadius: 5 }} source={require('../assets/images/salon.jpeg')} />
                        <Image style={{ width: 76, height: 61, borderRadius: 5, marginHorizontal: 9 }} source={require('../assets/images/salon.jpeg')} />
                        <Image style={{ width: 76, height: 61, borderRadius: 5 }} source={require('../assets/images/salon.jpeg')} />
                        <Image style={{ width: 76, height: 61, borderRadius: 5, marginHorizontal: 9 }} source={require('../assets/images/salon.jpeg')} />
                    </View> */}
          {!noOrari && <View style={styles.btn}>
            <BaseText weight={400} styles={{ fontSize: 15, textTransform: "uppercase" }}>Prenota</BaseText>
          </View>}
        </View>
        {/**
                 * DESCRIZIONE
                 */}
        <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
          <BaseText styles={[styles.text, { fontSize: 13 }]}>{data.desc}</BaseText>
        </View>
        {/**
                 * orario
                 */}
        {!noOrari && (
          <>
            <View style={{ backgroundColor: "transparent", marginHorizontal: 20, marginVertical: 5 }}>
              <BaseText weight={300} styles={{
                fontSize: 13,
                textTransform: "uppercase"
              }}>Orario</BaseText>
            </View>
            <TouchableWithoutFeedback onPress={() => setBool(!bool)} style={{}}>
              <Animated.View style={{
                width: width - 40,
                height: heightX,
                borderRadius: 5,
                backgroundColor: "white",
                alignSelf: "center",
                justifyContent: bool ? "center" : "flex-start",
                alignItems: "center",
                flexDirection: "row"
              }}>
                <View style={{
                  justifyContent: "space-between",
                  alignContent: "space-between",
                  alignItems: "flex-end"
                }}>
                  {day === 1 && !bool && (<BaseText weight={day === 1 ? 700 : 400} styles={{
                    marginLeft: !bool ? 20 : 0,
                    fontSize: 13,
                    color: "#181818"
                  }}>Lunedì {lunedi.closed ? "CHIUSO" : lunedi.start + " - " + lunedi.end}</BaseText>)}
                  {bool && (<BaseText weight={day === 1 ? 700 : 400} styles={{
                    marginLeft: !bool ? 20 : 0,
                    fontSize: 13,
                    color: "#181818"
                  }}>Lunedì {lunedi.closed ? "CHIUSO" : lunedi.start + " - " + lunedi.end}</BaseText>)}
                  {day === 2 && !bool && (<BaseText weight={day === 2 ? 700 : 400} styles={{
                    marginLeft: !bool ? 20 : 0,
                    fontSize: 13,
                    color: "#181818"
                  }}>Martedì {martedi.closed ? "CHIUSO" : martedi.start + " - " + martedi.end}</BaseText>)}
                  {bool && (<BaseText weight={day === 2 ? 700 : 400} styles={{
                    marginLeft: !bool ? 20 : 0,
                    fontSize: 13,
                    color: "#181818"
                  }}>Martedì {martedi.closed ? "CHIUSO" : martedi.start + " - " + martedi.end}</BaseText>)}
                  {day === 3 && !bool && (<BaseText weight={day === 3 ? 700 : 400} styles={{
                    marginLeft: !bool ? 20 : 0,
                    fontSize: 13,
                    color: "#181818"
                  }}>Mercoledì {mercoledi.closed ? "CHIUSO" : mercoledi.start + " - " + mercoledi.end}</BaseText>)}
                  {bool && (<BaseText weight={day === 3 ? 700 : 400} styles={{
                    marginLeft: !bool ? 20 : 0,
                    fontSize: 13,
                    color: "#181818"
                  }}>Mercoledì {mercoledi.closed ? "CHIUSO" : mercoledi.start + " - " + mercoledi.end}</BaseText>)}
                  {day === 4 && !bool && (<BaseText weight={day === 4 ? 700 : 400} styles={{
                    marginLeft: !bool ? 20 : 0,
                    fontSize: 13,
                    color: "#181818"
                  }}>Giovedì {giovedi.closed ? "CHIUSO" : giovedi.start + " - " + giovedi.end}</BaseText>)}
                  {bool && (<BaseText weight={day === 4 ? 700 : 400} styles={{
                    marginLeft: !bool ? 20 : 0,
                    fontSize: 13,
                    color: "#181818"
                  }}>Giovedì {giovedi.closed ? "CHIUSO" : giovedi.start + " - " + giovedi.end}</BaseText>)}
                </View>
                {bool && (<View style={{ height: "80%", width: 1, backgroundColor: "#181818", marginHorizontal: 20 }} />)}
                <View style={{
                  alignItems: "flex-end",
                  marginTop: !bool ? 0 : 20 //0
                }}>
                  {day === 5 && !bool && (<BaseText weight={day === 5 ? 700 : 400} styles={{
                    marginLeft: !bool ? 20 : 0,
                    fontSize: 13,
                    color: "#181818"
                  }}>Venerdì {venerdi.closed ? "CHIUSO" : venerdi.start + " - " + venerdi.end}</BaseText>)}
                  {day === 6 && !bool && (<BaseText weight={day === 6 ? 700 : 400} styles={{
                    marginLeft: !bool ? 20 : 0,
                    fontSize: 13,
                    color: "#181818"
                  }}>Sabato {sabato.closed ? "CHIUSO" : sabato.start + " - " + sabato.end}</BaseText>)}
                  {day === 0 && !bool && (<BaseText weight={day === 0 ? 700 : 400} styles={{
                    marginLeft: !bool ? 20 : 0,
                    fontSize: 13,
                    color: "#181818"
                  }}>Domenica {domenica.closed ? "CHIUSO" : domenica.start + " - " + domenica.end}</BaseText>)}
                  {bool && (<BaseText weight={day === 5 ? 700 : 400} styles={{
                    marginLeft: !bool ? 20 : 0,
                    fontSize: 13,
                    color: "#181818"
                  }}>Venerdì {venerdi.closed ? "CHIUSO" : venerdi.start + " - " + venerdi.end}</BaseText>)}
                  {bool && (<BaseText weight={day === 6 ? 700 : 400} styles={{
                    marginLeft: !bool ? 20 : 0,
                    fontSize: 13,
                    color: "#181818"
                  }}>Sabato {sabato.closed ? "CHIUSO" : sabato.start + " - " + sabato.end}</BaseText>)}
                  {bool && (<BaseText weight={day === 0 ? 700 : 400} styles={{
                    marginLeft: !bool ? 20 : 0,
                    fontSize: 13,
                    color: "#181818"
                  }}>Domenica {domenica.closed ? "CHIUSO" : domenica.start + " - " + domenica.end}</BaseText>)}
                </View>
                <Ionicons name="ios-arrow-down" size={24} color="#181818" style={{
                  position: "absolute",
                  right: 20,
                  top: 10,
                  transform: [{ rotate: bool ? '180deg' : '0deg' }]
                }} />
              </Animated.View>
            </TouchableWithoutFeedback>
          </>
        )}
        {/**
       * Valutazioni e recensioni
       */}
        {recensioni !== null && recensioni.length > 0 && (
          <View style={{ backgroundColor: "transparent", marginHorizontal: 20, marginTop: 10 }}>
            <BaseText weight={300} styles={{
              fontSize: 13,
              textTransform: "uppercase"
            }}>Valutazioni e recensioni</BaseText>
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
                  // height: 92,
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
                    }}>{recensioni[0].user ? "NomeUtenteRecensione" : "Michela"}</BaseText>
                    <StarsReview />
                  </View>
                  <BaseText weight={300} styles={{
                    marginTop: 5,
                    marginHorizontal: 15,
                    fontSize: 15,
                    marginBottom: 15
                  }}>{recensioni[0].desc}</BaseText>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
        )}
        {servizi !== undefined && <SectionList
          sections={servizi}
          style={{
            marginTop: 20,
            marginHorizontal: 20,
            marginVertical: 10,
          }}
          renderItem={({ item }) => <ItemService item={item} />}
          renderSectionHeader={({ section: { title } }) => (
            <View>
              <BaseText weight={300} styles={{
                fontSize: 13,
                textTransform: "uppercase"
              }}>{title}</BaseText>
            </View>
          )}
          keyExtractor={(item, index) => item.id}
        />}
      </ScrollView>
      {/**
       * Servizi
      */}
      {/* <View style={{ backgroundColor: "transparent", marginHorizontal: 20, marginVertical: 10, }}>
                    <BaseText weight={300} styles={{
                        fontSize: 13,
                        // fontFamily: "Montserrat_300Light",
                        textTransform: "uppercase"
                    }}>Pieghe</BaseText>
                    {pieghe.map(({ title, desc, price }, index) => {
                        const dio = () => {
                            setIndex(index)
                            diocan(!isShown)
                        };
                        return (
                            <TouchableWithoutFeedback key={index} onPress={dio}>
                                <View style={{ marginVertical: 5 }}>
                                    <View style={{
                                        minHeight: 40,
                                        borderTopLeftRadius: 5,
                                        borderTopRightRadius: 5,
                                        backgroundColor: Colors.light.grigio,
                                    }}>
                                        <Ionicons name={index === 0 ? "ios-checkbox" : "ios-checkbox-outline"} size={20} color={"#DE9182"} style={{
                                            position: "absolute",
                                            left: 10,
                                            top: 10,
                                        }} />
                                        <Ionicons name="ios-arrow-down" size={18} color="#6D6E95" style={{
                                            position: "absolute",
                                            right: 15,
                                            top: 10,
                                            transform: [{ rotate: indexX === index && isShown ? '180deg' : '0deg' }]
                                        }} />
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
                                                color: "black",
                                            }}>{title}</BaseText>
                                            <BaseText size={13} weight={700} styles={{
                                                color: "black",
                                            }}>{price} €</BaseText>
                                        </View>
                                    </View>
                                    {indexX === index && isShown && <View style={{
                                        backgroundColor: "white",
                                        borderBottomRightRadius: 10,
                                        borderBottomLeftRadius: 10,
                                        padding: 15,
                                        top: -5,
                                        zIndex: -1
                                    }}>
                                        <BaseText styles={{
                                            color: "#828282",
                                            textAlign: "center",
                                            fontSize: 10,
                                        }}>{desc}</BaseText>
                                    </View>}
                                </View>
                            </TouchableWithoutFeedback>
                        );
                    })}
                </View>
                <View style={{ backgroundColor: "transparent", marginHorizontal: 20, }}>
                    <BaseText weight={300} styles={{
                        fontSize: 13,
                        // fontFamily: "Montserrat_300Light",
                        textTransform: "uppercase"
                    }}>Tagli</BaseText>
                    {tagli.map(({ title, desc, price }, index) => {
                        const dio = () => {
                            setIndexTagli(index)
                            diocanTagli(!isShownTagli)
                        };
                        return (
                            <TouchableWithoutFeedback key={index} onPress={dio}>
                                <View style={{ marginVertical: 5 }}>
                                    <View style={{
                                        minHeight: 40,
                                        borderTopLeftRadius: 10,
                                        borderTopRightRadius: 10,
                                        backgroundColor: Colors.light.grigio,
                                    }}>
                                        <Ionicons name="ios-checkbox-outline" size={20} color={"#DE9182"} style={{
                                            position: "absolute",
                                            left: 10,
                                            top: 10,
                                        }} />
                                        <Ionicons name="ios-arrow-down" size={18} color="#6D6E95" style={{
                                            position: "absolute",
                                            right: 15,
                                            top: 10,
                                            transform: [{ rotate: indexTagli === index && isShownTagli ? '180deg' : '0deg' }]
                                        }} />
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
                                                color: "black",
                                            }}>{title}</BaseText>
                                            <BaseText size={13} weight={700} styles={{
                                                color: "black",
                                            }}>{price} €</BaseText>
                                        </View>
                                    </View>
                                    {indexTagli === index && isShownTagli && <View style={{
                                        backgroundColor: "white",
                                        borderBottomRightRadius: 10,
                                        borderBottomLeftRadius: 10,
                                        padding: 15,
                                        top: -5,
                                        zIndex: -1
                                    }}>
                                        <BaseText styles={{
                                            color: "#828282",
                                            textAlign: "center",
                                            fontSize: 10,
                                            // fontFamily: "Montserrat_400Regular",
                                        }}>{desc}</BaseText>
                                    </View>}
                                </View>
                            </TouchableWithoutFeedback>
                        );
                    })}
                </View> */}
    </View>
  );
};

export default Shop;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.bg
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  text: {
    // fontFamily: "Montserrat_400Regular"
  },
  textBold: {
    // fontFamily: "Montserrat_700Bold",
  },
  btn: {
    backgroundColor: "#DE9182",
    marginTop: 15,
    height: 32,
    width: "100%",
    // width: width - 40,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    // shadowColor: Colors.light.nero,
    // shadowOpacity: 0.25,
    // shadowOffset: {
    //     width: 0,
    //     height: 4
    // },
    // shadowRadius: 4,
    borderRadius: 5
  }
});
