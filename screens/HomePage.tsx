import * as React from 'react';
import {
    TouchableWithoutFeedback,
    Image,
    Dimensions,
    Modal,
    SafeAreaView,
    ScrollView,
    StyleSheet, TextInput
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import Desk from '../components/svg/Desk';
import Intro2 from '../components/svg/Intro2';
import Intro3 from '../components/svg/Intro3';
import Intro4 from '../components/svg/Intro4';

import { Text, View } from '../components/Themed';
import Colors from '../constants/Colors';

import { StackScreenProps } from '@react-navigation/stack';
import useColorScheme from '../hooks/useColorScheme';
import { RootStackParamList } from '../types';

const { width, height } = Dimensions.get('window');

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

const raccomandati = [
    {
        title: "Salone L'Araba Fenice",
        stars: "55",
        via: "Via A.Di Cambio, 26, Gries, Bolzano",
        desc: "Anni di esperienze ci hanno portato a capire che la cosa giusta da fare è",
        status: true
    },
    {
        title: "Salone L'Araba Fenice",
        stars: "55",
        via: "Via A.Di Cambio, 26, Gries, Bolzano",
        desc: "Anni di esperienze ci hanno portato a capire che la cosa giusta da fare è",
        status: false
    },
    {
        title: "Salone L'Araba Fenice",
        stars: "55",
        via: "Via A.Di Cambio, 26, Gries, Bolzano",
        desc: "Anni di esperienze ci hanno portato a capire che la cosa giusta da fare è",
        status: false
    },
    {
        title: "Salone L'Araba Fenice",
        stars: "55",
        via: "Via A.Di Cambio, 26, Gries, Bolzano",
        desc: "Anni di esperienze ci hanno portato a capire che la cosa giusta da fare è",
        status: false
    },

]

export default function HomePage({ navigation }: StackScreenProps<RootStackParamList, 'Shop'>) {
    const [modalShow, setModal] = React.useState(false);
    const colorScheme = useColorScheme();
    // React.useEffect(() => {
    //     setTimeout(() => {
    //         setModal(!modalShow);
    //     }, 5000);
    // }, []);
    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.header}>
                <View style={styles.textHeader}>
                    <Text style={styles.headerText}>Esplora</Text>
                    <Text style={styles.headerSub}>Cerca qui il servizio di cui hai bisogno</Text>
                    <View style={styles.searchBar}>
                        <TextInput style={{ width: "100%", height: "100%", marginHorizontal: 20, fontFamily: "Montserrat_300Light" }} />
                        <Ionicons name="ios-search" color="black" size={20} style={styles.iconSearch} />
                    </View>
                </View>
                <Desk style={styles.image} width="262" height="258" />
            </SafeAreaView>
            <Modal visible={modalShow} presentationStyle="pageSheet" animationType="slide">
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
            <ScrollView>
                <View style={{ backgroundColor: "transparent", marginTop: 10 }}>
                    <Text style={{
                        fontSize: 13,
                        fontFamily: "Montserrat_300Light",
                        textTransform: "uppercase",
                        marginLeft: 20,
                    }}>Servizi</Text>
                    <View style={{ marginTop: 15 }} />
                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        bounces={true}
                        scrollEventThrottle={1}
                        decelerationRate="fast"
                        horizontal>
                        {servizi.map(({ label }, index) => (
                            <View key={index} style={{
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
                                    <Ionicons name="ios-star-outline" size={30} color={Colors.light.arancioDes} />
                                </View>
                                <Text style={{
                                    marginTop: 5,
                                    fontSize: 15,
                                    fontFamily: "Montserrat_300Light",
                                    textAlign: "center"
                                }}>{label}</Text>
                            </View>
                        ))}
                    </ScrollView>
                </View>
                <View style={{ backgroundColor: "transparent", marginLeft: 20, marginTop: 20 }}>
                    <Text style={{
                        fontSize: 13,
                        fontFamily: "Montserrat_300Light",
                        textTransform: "uppercase"
                    }}>Raccomandati per te</Text>
                </View>
                <View style={{ marginTop: 10, backgroundColor: "transparent" }} >
                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        bounces={false}
                        snapToInterval={width}
                        scrollEventThrottle={1}
                        decelerationRate="fast"
                        horizontal>
                        {raccomandati.map(({ title, stars, via, desc, status }, index) => (
                            <TouchableWithoutFeedback key={index} onPress={() => { navigation.navigate("Shop") }}>
                                <View style={{
                                    width: width - 20,
                                    marginHorizontal: 10,
                                    borderRadius: 5,
                                    backgroundColor: "white",
                                    shadowColor: Colors.light.nero,
                                    shadowOpacity: 0.05,
                                    shadowOffset: {
                                        width: 0,
                                        height: 4
                                    },
                                    shadowRadius: 10,
                                    flexDirection: "row",
                                }}>
                                    <Image style={{ width: 122, height: 130, borderRadius: 5, marginVertical: 10, marginHorizontal: 10, alignSelf: "center" }} source={require('../assets/images/salon.jpeg')} />
                                    <View style={{ marginVertical: 3.6 }}>
                                        <Text style={{
                                            marginTop: 5,
                                            fontSize: 15,
                                            fontFamily: "Montserrat_400Regular",
                                        }}>{title}</Text>
                                        <View style={{ flexDirection: "row", marginTop: 5, justifyContent: "flex-start", alignItems: "center" }}>
                                            <Ionicons name="ios-star" size={20} color={Colors.light.giallo} />
                                            <Ionicons name="ios-star" size={20} color={Colors.light.giallo} />
                                            <Ionicons name="ios-star" size={20} color={Colors.light.giallo} />
                                            <Ionicons name="ios-star" size={20} color={Colors.light.giallo} />
                                            <Ionicons name="ios-star" size={20} color={Colors.light.giallo} />
                                            <Text style={{ marginLeft: 5, fontSize: 10, fontFamily: "Montserrat_400Regular" }}>({stars})</Text>
                                        </View>
                                        <View style={{ marginTop: 5, flexDirection: "row", alignItems: "center", justifyContent: "flex-start" }}>
                                            <Ionicons name="ios-pin" size={25} color={Colors.light.viola} />
                                            <Text style={{ marginLeft: 5, fontSize: 11, fontFamily: "Montserrat_400Regular" }}>{via}</Text>
                                        </View>
                                        <Text style={{
                                            width: 220,
                                            fontSize: 11,
                                            fontFamily: "Montserrat_400Regular"
                                        }}>{desc}</Text>
                                        <View style={{ marginTop: 10, flexDirection: "row", alignItems: "center" }}>
                                            <View style={{
                                                width: 25,
                                                height: 14,
                                                borderRadius: 5,
                                                backgroundColor: "rgba(244, 195, 108, 0.4)",
                                                justifyContent: "center",
                                                alignItems: "center"
                                            }}>
                                                <Text style={{ color: "#CB860B", fontSize: 8, fontFamily: "Montserrat_700Bold" }}>€€</Text>
                                            </View>
                                            <View style={{
                                                width: 65,
                                                height: 14,
                                                borderRadius: 5,
                                                backgroundColor: status ? "rgba(133, 194, 170, 0.4)" : "#C4C4C4",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                marginLeft: 8
                                            }}>
                                                <Text style={{ color: status ? "#008D56" : "#525252", fontSize: 8, fontFamily: "Montserrat_700Bold" }}>{status ? "APERTO" : "CHIUSO"}</Text>
                                            </View>
                                            <View style={{ marginLeft: 35, height: 14, width: 100, flexDirection: "row", justifyContent: 'center', }}>
                                                <Text style={{ color: Colors.light.nero, fontSize: 10, fontFamily: "Montserrat_700Bold", marginRight: 5 }}>DETTAGLI</Text>
                                                <Ionicons name="md-return-right" size={12} color={Colors.light.arancioDes} />
                                            </View>
                                        </View>
                                    </View>
                                    <Ionicons name="ios-heart-empty" size={30} color={Colors.light.arancioDes} style={{ position: "absolute", right: 15, top: 10 }} />
                                </View>
                            </TouchableWithoutFeedback>
                        ))}
                    </ScrollView>
                </View>
                <View style={{ backgroundColor: "transparent", marginLeft: 20, marginTop: 20 }}>
                    <Text style={{
                        fontSize: 13,
                        fontFamily: "Montserrat_300Light",
                        textTransform: "uppercase"
                    }}>Nella tua zona</Text>
                </View>
                <View style={{ marginTop: 10, backgroundColor: "transparent" }} >
                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        bounces={false}
                        snapToInterval={width}
                        scrollEventThrottle={1}
                        decelerationRate="fast"
                        horizontal>
                        {raccomandati.map(({ title, stars, via, desc, status }, index) => (
                            <View key={index} style={{
                                width: width - 20,
                                marginHorizontal: 10,
                                borderRadius: 5,
                                backgroundColor: "white",
                                shadowColor: Colors.light.nero,
                                shadowOpacity: 0.05,
                                shadowOffset: {
                                    width: 0,
                                    height: 4
                                },
                                shadowRadius: 10,
                                flexDirection: "row",
                            }}>
                                <Image style={{ width: 122, height: 130, borderRadius: 5, marginVertical: 10, marginHorizontal: 10, alignSelf: "center" }} source={require('../assets/images/salon.jpeg')} />
                                <View style={{ marginVertical: 3.6 }}>
                                    <Text style={{
                                        marginTop: 5,
                                        fontSize: 15,
                                        fontFamily: "Montserrat_400Regular",
                                    }}>{title}</Text>
                                    <View style={{ flexDirection: "row", marginTop: 5, justifyContent: "flex-start", alignItems: "center" }}>
                                        <Ionicons name="ios-star" size={20} color={Colors.light.giallo} />
                                        <Ionicons name="ios-star" size={20} color={Colors.light.giallo} />
                                        <Ionicons name="ios-star" size={20} color={Colors.light.giallo} />
                                        <Ionicons name="ios-star" size={20} color={Colors.light.giallo} />
                                        <Ionicons name="ios-star" size={20} color={Colors.light.giallo} />
                                        <Text style={{ marginLeft: 5, fontSize: 10, fontFamily: "Montserrat_400Regular" }}>({stars})</Text>
                                    </View>
                                    <View style={{ marginTop: 5, flexDirection: "row", alignItems: "center", justifyContent: "flex-start" }}>
                                        <Ionicons name="ios-pin" size={25} color={Colors.light.viola} />
                                        <Text style={{ marginLeft: 5, fontSize: 11, fontFamily: "Montserrat_400Regular" }}>{via}</Text>
                                    </View>
                                    <Text style={{
                                        width: 220,
                                        fontSize: 11,
                                        fontFamily: "Montserrat_400Regular"
                                    }}>{desc}</Text>
                                    <View style={{ marginTop: 10, flexDirection: "row", alignItems: "center" }}>
                                        <View style={{
                                            width: 25,
                                            height: 14,
                                            borderRadius: 5,
                                            backgroundColor: "rgba(244, 195, 108, 0.4)",
                                            justifyContent: "center",
                                            alignItems: "center"
                                        }}>
                                            <Text style={{ color: "#CB860B", fontSize: 8, fontFamily: "Montserrat_700Bold" }}>€€</Text>
                                        </View>
                                        <View style={{
                                            width: 65,
                                            height: 14,
                                            borderRadius: 5,
                                            backgroundColor: status ? "rgba(133, 194, 170, 0.4)" : "#C4C4C4",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            marginLeft: 8
                                        }}>
                                            <Text style={{ color: status ? "#008D56" : "#525252", fontSize: 8, fontFamily: "Montserrat_700Bold" }}>{status ? "APERTO" : "CHIUSO"}</Text>
                                        </View>
                                        <View style={{ marginLeft: 70, height: 14, flexDirection: "row", justifyContent: 'center', }}>
                                            <Text style={{ color: Colors.light.nero, fontSize: 10, fontFamily: "Montserrat_700Bold", marginRight: 5 }}>DETTAGLI</Text>
                                            <Ionicons name="md-return-right" size={12} color={Colors.light.arancioDes} />
                                        </View>
                                    </View>
                                </View>
                                <Ionicons name="ios-heart-empty" size={30} color={Colors.light.arancioDes} style={{ position: "absolute", right: 15, top: 10 }} />
                            </View>
                        ))}
                    </ScrollView>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.bg
    },
    textHeader: {
        height: 56,
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
        borderRadius: 5,
        // width: 230,
        marginHorizontal: 15,
        height: 45,
        bottom: 55,
        // left: 35,
        justifyContent: "center"
    },
    headerText: {
        fontSize: 25,
        color: "#181818",
        marginTop: 13,
        marginBottom: 10,
        marginLeft: 35,
        fontFamily: 'Montserrat_700Bold'
    },
    headerSub: {
        width: 183,
        height: 106,
        fontSize: 16,
        fontFamily: 'Montserrat_400Regular',
        color: "#181818",
        marginLeft: 35,
    },
    header: {
        backgroundColor: Colors.light.arancioDes,
        width: "100%",
        height: 215,
        borderBottomLeftRadius: 15
    },
    image: {
        position: "absolute",
        right: -40,
        top: 20,
        zIndex: -1
    }
});
