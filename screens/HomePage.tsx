import React, { useContext } from 'react';
import {
    TouchableWithoutFeedback,
    Image,
    Dimensions,
    Modal,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity
} from 'react-native';

import { AppContext } from '../context/Appcontext';

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
// import LottieView from 'lottie-react-native';

const { width, height } = Dimensions.get('window');

// const servizi = [
//     { label: 'Taglio donna' },
//     { label: 'Piega' },
//     { label: 'Trattamenti' },
//     { label: 'Colore' },
//     { label: 'Ondulazione' },
//     { label: 'Extension' },
//     { label: 'Acconciature' },
//     { label: 'Permanente' },
//     { label: 'Non lo so' },
// ];

// const raccomandati = [
//     {
//         title: "Salone L'Araba Fenice",
//         stars: "55",
//         via: "Via A.Di Cambio, 26, Gries, Bolzano",
//         desc: "Anni di esperienze ci hanno portato a capire che la cosa giusta da fare è",
//         status: true
//     },
//     {
//         title: "Salone L'Araba Fenice",
//         stars: "55",
//         via: "Via A.Di Cambio, 26, Gries, Bolzano",
//         desc: "Anni di esperienze ci hanno portato a capire che la cosa giusta da fare è",
//         status: false
//     },
//     {
//         title: "Salone L'Araba Fenice",
//         stars: "55",
//         via: "Via A.Di Cambio, 26, Gries, Bolzano",
//         desc: "Anni di esperienze ci hanno portato a capire che la cosa giusta da fare è",
//         status: false
//     },
//     {
//         title: "Salone L'Araba Fenice",
//         stars: "55",
//         via: "Via A.Di Cambio, 26, Gries, Bolzano",
//         desc: "Anni di esperienze ci hanno portato a capire che la cosa giusta da fare è",
//         status: false
//     },

// ]

export default function HomePage({ navigation }: StackScreenProps<RootStackParamList, 'Shop'>) {
    const {
        servizi,
        commercianti,
        foto
    } = useContext(AppContext);
    // const [modalShow, setModal] = React.useState(false);
    const [parrucchieri, setPar] = React.useState([]);
    // const colorScheme = useColorScheme();
    // const lottieHert = React.useRef(null);

    // let lottieHert = React.useRef([React.createRef(), React.createRef()]);
    React.useEffect(() => {
        // setTimeout(() => {
        //     setModal(!modalShow);
        // }, 5000);
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
    }, []);
    return (
        <View style={styles.container}>
            {/**
             * HEADER
             */}
            <SafeAreaView style={styles.header}>
                <View style={styles.textHeader}>
                    <BaseText styles={styles.headerText}>Esplora</BaseText>
                    <BaseText styles={styles.headerSub}>Cerca qui il servizio di cui hai bisogno</BaseText>
                    <View style={styles.searchBar}>
                        <TextInput style={{ width: "100%", height: "100%", marginHorizontal: 20, fontFamily: "Montserrat_300Light" }} />
                        <Ionicons name="ios-search" color="black" size={20} style={styles.iconSearch} />
                    </View>
                </View>
                <Desk style={styles.image} width="262" height="258" />
            </SafeAreaView>
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
            <ScrollView contentContainerStyle={{ backgroundColor: "transparent", }}>
                {/**
                 * Servizi
                 */}
                <View style={{ backgroundColor: "transparent", marginTop: 10 }}>
                    <BaseText weight={300} styles={{
                        fontSize: 13,
                        textTransform: "uppercase",
                        marginLeft: 20,
                    }}>Servizi</BaseText>
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
                                            <Ionicons name="ios-star-outline" size={30} color={Colors.light.arancioDes} />
                                        </View>
                                        <BaseText styles={{
                                            marginTop: 5,
                                            fontSize: 15,
                                            // fontFamily: "Montserrat_300Light",
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
                    <BaseText weight={300} styles={{
                        fontSize: 13,
                        textTransform: "uppercase"
                    }}>Parrucchieri</BaseText>
                </View>
                <View style={{ backgroundColor: "transparent" }} >
                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        bounces={false}
                        snapToInterval={width}
                        scrollEventThrottle={1}
                        decelerationRate="fast"
                        horizontal
                        contentContainerStyle={{ paddingLeft: 10 }}
                    >
                        {/**
                        id: string,
                        title: string,
                        via: string,
                        tipo: number,
                        economy: number,
                        stars: number,
                        phone: string,
                        email: string,
                        desc: string
                        */}
                        {parrucchieri.map(({ title, stars, via, desc, mainPhoto, economy, id }, index) => {
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
                            if (desc.length > 50) {
                                desc = desc.slice(0, 50) + " ...";
                            }
                            if (title.length > 23) {
                                title = title.slice(0, 23) + "";
                            }
                            return (
                                <TouchableWithoutFeedback key={index} onPress={() => {
                                    navigation.navigate("Shop", { id: id });
                                }} >
                                    <View style={{
                                        // width: width - 20,
                                        width: 342,
                                        marginHorizontal: 10,
                                        borderRadius: 5,
                                        marginTop: 20,
                                        marginBottom: 20,
                                        // backgroundColor: "white",
                                        shadowColor: Colors.light.nero,
                                        shadowOpacity: 0.15,
                                        shadowOffset: {
                                            width: 0,
                                            height: 4
                                        },
                                        shadowRadius: 10,
                                        flexDirection: "row",
                                    }}>
                                        <Image style={{ width: 122, height: 113, borderRadius: 5, marginVertical: 10, marginHorizontal: 10, alignSelf: "center" }} source={mainPhoto ? { uri: mainPhoto.url } : require('../assets/images/salon.jpeg')} />
                                        <View style={{/* marginVertical: 3.6 */ maxWidth: 180 }}>
                                            <View style={{ marginTop: 11 }}>
                                                <BaseText size={12} maxHeight={20}>{title}</BaseText>
                                            </View>
                                            <View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                                                <Ionicons name="ios-star" size={20} color={Colors.light.giallo} />
                                                <Ionicons name="ios-star" size={20} color={Colors.light.giallo} />
                                                <Ionicons name="ios-star" size={20} color={Colors.light.giallo} />
                                                <Ionicons name="ios-star" size={20} color={Colors.light.giallo} />
                                                <Ionicons name="ios-star" size={20} color={Colors.light.giallo} />
                                                <Text style={{ marginLeft: 5, fontSize: 10, fontFamily: "Montserrat_400Regular" }}>({stars})</Text>
                                            </View>
                                            <View style={{ marginTop: 5, flexDirection: "row", alignItems: "center", justifyContent: "flex-start" }}>
                                                <Ionicons name="ios-pin" size={25} color={Colors.light.viola} style={{ marginRight: 5 }} />
                                                <BaseText size={10} maxWidth={180} color={"#616161"}>{via}</BaseText>
                                            </View>
                                            {/* <BaseText size={9} maxWidth={220}>{desc}</BaseText> */}
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
                                            <RightIcon width={19} height={19} style={{ marginLeft: 2 }} />
                                        </View>
                                        {/* <Ionicons name="ios-heart-empty" size={30} color={Colors.light.arancioDes} style={{
                                                position: "absolute",
                                                right: 15,
                                                top: 10
                                            }} /> */}
                                    </View>
                                </TouchableWithoutFeedback>
                            )
                        })}
                    </ScrollView>
                </View>
                {/**
                 * Nella tua zona

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
                </View>*/}
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
        marginHorizontal: 15,
        height: 45,
        bottom: 55,
        justifyContent: "center"
    },
    headerText: {
        fontSize: 25,
        color: "#181818",
        marginTop: 13,
        marginBottom: 10,
        marginLeft: 35,
        // fontFamily: 'Montserrat_700Bold'
    },
    headerSub: {
        width: 183,
        height: 106,
        fontSize: 16,
        // fontFamily: 'Montserrat_400Regular',
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
