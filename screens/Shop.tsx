import * as React from 'react';
import { Animated, ScrollView, Dimensions, Text, View, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';
import Header from '../components/Header';
import { RootStackParamList } from '../types';
import { StackScreenProps } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
const { width, height } = Dimensions.get('window');

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

const Shop = ({ navigation }: StackScreenProps<RootStackParamList, 'Shop'>) => {
    const [bool, setBool] = React.useState(false);
    const [isShown, diocan] = React.useState(false);
    const [isShownTagli, diocanTagli] = React.useState(false);
    const [indexX, setIndex] = React.useState(1);
    const [indexTagli, setIndexTagli] = React.useState(1);
    // const current = pieghe[index];

    const heightX = !bool ? 44 : 100;
    const status = true;
    return (
        <View style={styles.container}>
            <Header hasBack={true} title="Salone l'araba Fenice" onPress={() => { navigation.pop() }} />
            <ScrollView
                contentContainerStyle={{
                    paddingBottom: 100
                }}
                showsVerticalScrollIndicator={false}
                decelerationRate="fast"
                scrollEventThrottle={1}
            >
                <View style={{ marginHorizontal: 30, marginVertical: 20 }}>
                    <View style={{ flexDirection: "row", marginBottom: 10 }}>
                        <Image style={{ width: 122, height: 113, borderRadius: 5 }} source={require('../assets/images/salon.jpeg')} />
                        <View style={{ marginLeft: 10 }}>
                            <Text style={[styles.textBold, { fontSize: 15 }]}>Salone l'araba Fenice</Text>
                            <View style={{
                                width: 65,
                                height: 14,
                                borderRadius: 5,
                                backgroundColor: status ? "rgba(133, 194, 170, 0.4)" : "#C4C4C4",
                                justifyContent: "center",
                                alignItems: "center",
                                marginBottom: 10,
                                marginTop: 5,
                            }}>
                                <Text style={{ color: status ? "#008D56" : "#525252", fontSize: 8, fontFamily: "Montserrat_700Bold" }}>{status ? "APERTO" : "CHIUSO"}</Text>
                            </View>
                            <View style={styles.row}>
                                <Ionicons name="ios-phone-portrait" size={20} color="#6D6E95" style={{ width: 20 }} />
                                <Text style={[styles.text, { marginLeft: 5, fontSize: 10 }]}>045 8886868</Text>
                            </View>
                            <View style={styles.row}>
                                <Ionicons name="ios-mail" size={20} color="#6D6E95" style={{ width: 20 }} />
                                <Text style={[styles.text, { marginLeft: 5, fontSize: 10 }]}>larabafenice@gmail.com</Text>
                            </View>
                            <View style={styles.row}>
                                <Ionicons name="ios-pin" size={20} color="#6D6E95" style={{ width: 20 }} />
                                <Text style={[styles.text, { marginLeft: 5, fontSize: 10 }]}>Via A.Di Cambio, 26, Gries, Bolzano</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ flexDirection: "row", }}>
                        <Image style={{ width: 76, height: 61, borderRadius: 5 }} source={require('../assets/images/salon.jpeg')} />
                        <Image style={{ width: 76, height: 61, borderRadius: 5, marginHorizontal: 9 }} source={require('../assets/images/salon.jpeg')} />
                        <Image style={{ width: 76, height: 61, borderRadius: 5 }} source={require('../assets/images/salon.jpeg')} />
                        <Image style={{ width: 76, height: 61, borderRadius: 5, marginHorizontal: 9 }} source={require('../assets/images/salon.jpeg')} />
                    </View>
                    <View style={styles.btn}>
                        <Text style={{ fontSize: 15, fontFamily: "Montserrat_700Bold", textTransform: "uppercase" }}>Prenota</Text>
                    </View>
                </View>
                <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
                    <Text style={[styles.text, { fontSize: 13 }]}>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.</Text>
                </View>
                <View style={{ backgroundColor: "transparent", marginHorizontal: 20, marginVertical: 5 }}>
                    <Text style={{
                        fontSize: 13,
                        fontFamily: "Montserrat_300Light",
                        textTransform: "uppercase"
                    }}>Orario</Text>
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
                            {bool && (<Text style={{
                                marginLeft: !bool ? 20 : 0,
                                fontSize: 13,
                                fontFamily: "Montserrat_400Regular",
                                color: "#181818"
                            }}>Lunedì 7:30 - 20</Text>)}
                            <Text style={{
                                marginLeft: !bool ? 20 : 0,
                                fontSize: 13,
                                fontFamily: bool ? "Montserrat_700Bold" : "Montserrat_400Regular",
                                color: "#181818"
                            }}>Martedì 7:30 - 20</Text>
                            {bool && (<Text style={{
                                marginLeft: !bool ? 20 : 0,
                                fontSize: 13,
                                fontFamily: "Montserrat_400Regular",
                                color: "#181818"
                            }}>Mercoledì 7:30 - 20</Text>)}
                            {bool && (<Text style={{
                                marginLeft: !bool ? 20 : 0,
                                fontSize: 13,
                                fontFamily: "Montserrat_400Regular",
                                color: "#181818"
                            }}>Giovedì 7:30 - 20</Text>)}
                        </View>
                        {bool && (<View style={{ height: "80%", width: 1, backgroundColor: "#181818", marginHorizontal: 20 }} />)}
                        <View style={{
                            alignItems: "flex-end"
                        }}>
                            {bool && (<Text style={{
                                marginLeft: !bool ? 20 : 0,
                                fontSize: 13,
                                fontFamily: "Montserrat_400Regular",
                                color: "#181818"
                            }}>Venerdì 7:30 - 20</Text>)}
                            {bool && (<Text style={{
                                marginLeft: !bool ? 20 : 0,
                                fontSize: 13,
                                fontFamily: "Montserrat_400Regular",
                                color: "#181818"
                            }}>Sabato Chiuso</Text>)}
                            {bool && (<Text style={{
                                marginLeft: !bool ? 20 : 0,
                                fontSize: 13,
                                fontFamily: "Montserrat_400Regular",
                                color: "#181818"
                            }}>Domenica Chiuso</Text>)}
                        </View>
                        <Ionicons name="ios-arrow-down" size={24} color="#181818" style={{
                            position: "absolute",
                            right: 20,
                            top: 10,
                            transform: [{ rotate: bool ? '180deg' : '0deg' }]
                        }} />
                    </Animated.View>
                </TouchableWithoutFeedback>
                <View style={{ backgroundColor: "transparent", marginHorizontal: 20, marginTop: 10 }}>
                    <Text style={{
                        fontSize: 13,
                        fontFamily: "Montserrat_300Light",
                        textTransform: "uppercase"
                    }}>Valutazioni e recensioni</Text>
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
                            <Text style={{
                                fontSize: 40,
                                fontFamily: "Montserrat_400Regular",
                                textTransform: "uppercase"
                            }}>4,6</Text>
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
                                    <Text style={{
                                        fontSize: 15,
                                        fontFamily: "Montserrat_400Regular",
                                    }}>Michela</Text>
                                    <Ionicons name="ios-star" size={15} color={Colors.light.giallo} style={{ marginLeft: 10 }} />
                                    <Ionicons name="ios-star" size={15} color={Colors.light.giallo} />
                                    <Ionicons name="ios-star" size={15} color={Colors.light.giallo} />
                                    <Ionicons name="ios-star" size={15} color={Colors.light.giallo} />
                                    <Ionicons name="ios-star" size={15} color={Colors.light.giallo} />
                                </View>
                                <Text style={{
                                    marginTop: 5,
                                    marginHorizontal: 15,
                                    fontSize: 15,
                                    fontFamily: "Montserrat_300Light",
                                    marginBottom: 15
                                }}>"Sed ut perspiciatis unde omnis iste natus error sit hg voluptatem accusantium”</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
                <View style={{ backgroundColor: "transparent", marginHorizontal: 20, marginVertical: 10, }}>
                    <Text style={{
                        fontSize: 13,
                        fontFamily: "Montserrat_300Light",
                        textTransform: "uppercase"
                    }}>Pieghe</Text>
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
                                            <Text style={{
                                                color: "black",
                                                fontFamily: "Montserrat_400Regular",
                                            }}>{title}</Text>
                                            <Text style={{
                                                color: "black",
                                                fontFamily: "Montserrat_700Bold",
                                            }}>{price} €</Text>
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
                                        <Text style={{
                                            color: "#828282",
                                            textAlign: "center",
                                            fontSize: 10,
                                            fontFamily: "Montserrat_400Regular",
                                        }}>{desc}</Text>
                                    </View>}
                                </View>
                            </TouchableWithoutFeedback>
                        );
                    })}
                </View>
                <View style={{ backgroundColor: "transparent", marginHorizontal: 20, }}>
                    <Text style={{
                        fontSize: 13,
                        fontFamily: "Montserrat_300Light",
                        textTransform: "uppercase"
                    }}>Tagli</Text>
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
                                            <Text style={{
                                                color: "black",
                                                fontFamily: "Montserrat_400Regular",
                                            }}>{title}</Text>
                                            <Text style={{
                                                color: "black",
                                                fontFamily: "Montserrat_700Bold",
                                            }}>{price} €</Text>
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
                                        <Text style={{
                                            color: "#828282",
                                            textAlign: "center",
                                            fontSize: 10,
                                            fontFamily: "Montserrat_400Regular",
                                        }}>{desc}</Text>
                                    </View>}
                                </View>
                            </TouchableWithoutFeedback>
                        );
                    })}
                </View>
            </ScrollView>
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
        fontFamily: "Montserrat_400Regular"
    },
    textBold: {
        fontFamily: "Montserrat_700Bold",
    },
    btn: {
        backgroundColor: "#DE9182",
        top: 13,
        height: 32,
        width: width - 60,
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        shadowColor: Colors.light.nero,
        shadowOpacity: 0.25,
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowRadius: 4,
        borderRadius: 10
    }
});
