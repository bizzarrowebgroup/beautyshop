import * as React from 'react';
import {
    Image,
    Text,
    TextInput,
    View,
    StyleSheet,
    SafeAreaView,
    TouchableWithoutFeedback, ScrollView
} from 'react-native';
import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
interface BookProps { }
import * as haptics from '../constants/Vibration';

import * as Animate from 'react-native-animatable';
import StepIndicator from 'react-native-step-indicator';

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

const Book = (props: BookProps) => {
    const [selectedType, setselectedType] = React.useState(true);
    const [parte, setParte] = React.useState(1);
    const customStyles = {
        stepIndicatorSize: 14,
        currentStepIndicatorSize: 14,
        separatorStrokeWidth: 3,
        currentStepStrokeWidth: 7,
        stepStrokeCurrentColor: '#DE9182',
        stepStrokeWidth: 0,
        stepStrokeFinishedColor: '#DE9182',
        stepStrokeUnFinishedColor: '#BDBDBD',
        separatorFinishedColor: '#DE9182',
        separatorUnFinishedColor: '#BDBDBD',
        stepIndicatorFinishedColor: '#DE9182',
        stepIndicatorUnFinishedColor: '#BDBDBD',
        stepIndicatorCurrentColor: '#BDBDBD',
    };
    return (
        <SafeAreaView style={styles.container}>
            <View style={{
                flexDirection: "row",
                alignItems: "center"
            }}>
                {parte <= 1 && (<Ionicons name="ios-close" size={30} color={Colors.light.bianco} style={{ left: 20 }} onPress={() => { }} />)}
                {parte > 1 && (<Ionicons name="ios-return-left" size={30} color={Colors.light.bianco} style={{ left: 20 }} onPress={() => setParte(1)} />)}
                <View style={{ width: "70%", marginLeft: 20 }}>
                    <StepIndicator
                        customStyles={customStyles}
                        currentPosition={parte - 1}
                        renderStepIndicator={() => {
                            return (
                                <View />
                            );
                        }}
                    />
                </View>
            </View>
            {parte === 1 && (<View>
                <Text style={[styles.text, styles.first]}>SCEGLI IL SERVIZIO</Text>
                <Animate.View animation="slideInDown" duration={300}
                    style={styles.searchBar}>
                    <TextInput
                        placeholderTextColor={Colors.light.nero}
                        placeholder="Cosa vorresti fare?"
                        style={[styles.text, { fontSize: 15, paddingLeft: 10 }]} />
                    <Ionicons
                        name="ios-search"
                        style={{ fontSize: 20, position: "absolute", right: 10 }} />
                </Animate.View>
                <View style={styles.switchBox}>
                    <TouchableWithoutFeedback onPress={() => setselectedType(!selectedType)}>
                        <View style={{
                            marginLeft: 10,
                            width: "50%",
                            backgroundColor: selectedType ? "#DF7865" : "#E7B3A9",
                            height: 40,
                            alignItems: "center",
                            justifyContent: 'center',
                            borderTopLeftRadius: 5,
                            borderBottomLeftRadius: 5,
                        }}>
                            <Text style={[styles.text, { fontSize: 13, color: selectedType ? "#FBFBFB" : "#6B6B6B" }]}>Parruchiere</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => setselectedType(!selectedType)}>
                        <View style={{
                            marginRight: 10,
                            width: "50%",
                            backgroundColor: selectedType ? "#E7B3A9" : "#DF7865",
                            height: 40,
                            alignItems: "center",
                            justifyContent: 'center',
                            borderTopRightRadius: 5,
                            borderBottomRightRadius: 5,
                        }}>
                            <Text style={[styles.text, { fontSize: 13, color: selectedType ? "#6B6B6B" : "#FBFBFB" }]}>Centro estetico</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <View style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    alignContent: "center",
                    alignItems: "center",
                    marginVertical: 20
                }}>
                    {servizi.map(({ label }, index) => (
                        <View key={index} style={{
                            width: 100,
                            marginHorizontal: 3,
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "transparent",
                            marginBottom: 20
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
                                textAlign: "center",
                                color: Colors.light.grigio
                            }}>{label}</Text>
                        </View>
                    ))}
                </View>
                <TouchableWithoutFeedback onPress={() => { setParte(parte + 1) }}>
                    <View style={styles.btn}>
                        <Text style={{
                            alignSelf: 'center',
                            fontSize: 15,
                            fontFamily: "Montserrat_700Bold",
                            textTransform: "uppercase"
                        }}>Avanti</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>)}
            {parte === 2 && (<View style={{ flex: 1 }}>
                <Text style={[styles.text, styles.first]}>SCEGLI IL SALONE</Text>
                <Animate.View animation="slideInDown" duration={300}
                    style={styles.searchBar}>
                    <TextInput
                        placeholder="In quale salone?"
                        placeholderTextColor={Colors.light.nero}
                        style={[styles.text, { fontSize: 15, paddingLeft: 10 }]} />
                    <Ionicons
                        name="ios-search"
                        style={{ fontSize: 20, position: "absolute", right: 10 }} />
                </Animate.View>
                <ScrollView contentContainerStyle={{
                    flex: 1
                }}>
                    <View style={{
                        backgroundColor: Colors.light.bianco,
                        marginVertical: 10,
                        marginHorizontal: 20,
                        borderRadius: 10,
                        padding: 15,
                    }}>
                        <View style={{ flexDirection: "row" }}>
                            <Image style={{ width: 40, height: 40, borderRadius: 5 }} source={require('../assets/images/salon.jpeg')} />
                            <View style={{
                                marginLeft: 10
                            }}>
                                <Text style={[styles.text, { fontSize: 17 }]}>Salone l'Araba Fenice</Text>
                                <View style={{
                                    flexDirection: "row",
                                    alignContent: "center",
                                    alignItems: "center",
                                }}>
                                    <Ionicons name="ios-star" size={15} color={Colors.light.giallo} />
                                    <Ionicons name="ios-star" size={15} color={Colors.light.giallo} />
                                    <Ionicons name="ios-star" size={15} color={Colors.light.giallo} />
                                    <Ionicons name="ios-star" size={15} color={Colors.light.giallo} />
                                    <Ionicons name="ios-star" size={15} color={Colors.light.giallo} />
                                    <Text style={[styles.text, { fontSize: 10 }]}>(50)</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ paddingBottom: 20, marginTop: 10 }}>
                            {tagli.map(({ title, desc, price }, index) => {
                                const dio = async () => {
                                    haptics.selectionTouch();
                                };
                                return (
                                    <TouchableWithoutFeedback key={index} onPress={dio}>
                                        <View style={{ marginVertical: 5 }}>
                                            <View style={{
                                                minHeight: 40,
                                                borderRadius: 5,
                                                backgroundColor: Colors.light.grigio,
                                            }}>
                                                <Ionicons name="ios-checkbox-outline" size={20} color={"#DE9182"} style={{
                                                    position: "absolute",
                                                    left: 10,
                                                    top: 10,
                                                }} />
                                                <View style={{
                                                    flexDirection: "row",
                                                    flex: 1,
                                                    justifyContent: "space-between",
                                                    alignItems: "center",
                                                    alignContent: "center",
                                                    marginLeft: 40,
                                                    marginRight: 10
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
                                        </View>
                                    </TouchableWithoutFeedback>
                                );
                            })}
                        </View>
                        <View style={{
                            flexDirection: "row",
                            alignItems: "center",
                            position: "absolute",
                            right: 10,
                            bottom: 5
                        }}>
                            <Text style={{
                                color: Colors.light.nero,
                                fontSize: 13,
                                fontFamily: "Montserrat_700Bold",
                                marginRight: 5,
                            }}>DETTAGLI</Text>
                            <Ionicons name="md-return-right" size={20} color={Colors.light.arancioDes} />
                        </View>
                    </View>
                    <View style={{
                        backgroundColor: Colors.light.bianco,
                        marginVertical: 10,
                        marginHorizontal: 20,
                        borderRadius: 10,
                        padding: 15,
                    }}>
                        <View style={{ flexDirection: "row" }}>
                            <Image style={{ width: 40, height: 40, borderRadius: 5 }} source={require('../assets/images/salon.jpeg')} />
                            <View style={{
                                marginLeft: 10
                            }}>
                                <Text style={[styles.text, { fontSize: 17 }]}>Salone Le Noir</Text>
                                <View style={{
                                    flexDirection: "row",
                                    alignContent: "center",
                                    alignItems: "center",
                                }}>
                                    <Ionicons name="ios-star" size={15} color={Colors.light.giallo} />
                                    <Ionicons name="ios-star" size={15} color={Colors.light.giallo} />
                                    <Ionicons name="ios-star" size={15} color={Colors.light.giallo} />
                                    <Ionicons name="ios-star" size={15} color={Colors.light.giallo} />
                                    <Ionicons name="ios-star" size={15} color={Colors.light.giallo} />
                                    <Text style={[styles.text, { fontSize: 10 }]}>(50)</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ paddingBottom: 20, marginTop: 10 }}>
                            {tagli.map(({ title, desc, price }, index) => {
                                const dio = () => {
                                };
                                return (
                                    <TouchableWithoutFeedback key={index} onPress={dio}>
                                        <View style={{ marginVertical: 5 }}>
                                            <View style={{
                                                minHeight: 40,
                                                borderRadius: 5,
                                                backgroundColor: Colors.light.grigio,
                                            }}>
                                                <Ionicons name="ios-checkbox-outline" size={20} color={"#DE9182"} style={{
                                                    position: "absolute",
                                                    left: 10,
                                                    top: 10,
                                                }} />
                                                <View style={{
                                                    flexDirection: "row",
                                                    flex: 1,
                                                    justifyContent: "space-between",
                                                    alignItems: "center",
                                                    alignContent: "center",
                                                    marginLeft: 40,
                                                    marginRight: 10
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
                                        </View>
                                    </TouchableWithoutFeedback>
                                );
                            })}
                        </View>
                        <View style={{
                            flexDirection: "row",
                            alignItems: "center",
                            position: "absolute",
                            right: 10,
                            bottom: 5
                        }}>
                            <Text style={{
                                color: Colors.light.nero,
                                fontSize: 13,
                                fontFamily: "Montserrat_700Bold",
                                marginRight: 5,
                            }}>DETTAGLI</Text>
                            <Ionicons name="md-return-right" size={20} color={Colors.light.arancioDes} />
                        </View>
                    </View>
                </ScrollView>
                {/* <View style={styles.btn}>
                    <Text style={{
                        alignSelf: 'center',
                        fontSize: 15,
                        fontFamily: "Montserrat_700Bold",
                        textTransform: "uppercase"
                    }}>Avanti</Text>
                </View> */}
            </View>)
            }
        </SafeAreaView >
    );
};

export default Book;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.violaDes,
    },
    switchBox: {
        flexDirection: "row",
        alignItems: "center",
        alignContent: "center",
        justifyContent: 'center',
        marginHorizontal: 40,
    },
    searchBar: {
        height: 44,
        marginVertical: 20,
        marginHorizontal: 40,
        borderRadius: 5,
        backgroundColor: '#E0E0E0',
        flexDirection: 'row',
        padding: 5,
        alignItems: 'center',
    },
    first: {
        color: Colors.light.bianco,
        fontSize: 10,
        marginLeft: 15
    },
    text: {
        fontFamily: "Montserrat_400Regular"
    },
    textBold: {
        fontFamily: "Montserrat_700Bold",
    },
    btn: {
        backgroundColor: '#E0E0E0',
        justifyContent: 'center',
        height: 45,
        marginTop: 120,
        marginHorizontal: 50,
        shadowColor: Colors.light.nero,
        shadowOpacity: 0.25,
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowRadius: 4,
        borderRadius: 10,
    }
});
