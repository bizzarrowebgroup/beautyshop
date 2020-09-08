import * as React from 'react';
import {
    Animated,
    ScrollView,
    Dimensions,
    Text,
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
const { width, height } = Dimensions.get('window');

const Review = ({ navigation }: StackScreenProps<RootStackParamList, 'Review'>) => {
    return (
        <View style={styles.container}>
            <Header review={true} hasBack={true} title="Salone l'araba Fenice" onPress={() => { navigation.pop() }} />
            <ScrollView
                contentContainerStyle={{
                    paddingBottom: 100
                }}
                showsVerticalScrollIndicator={false}
                decelerationRate="fast"
                scrollEventThrottle={1}
            >
                <View style={{
                    backgroundColor: "white",
                    borderRadius: 10,
                    width: "90%",
                    alignSelf: "center",
                    marginTop: 20,
                    padding: 20,
                }}>
                    <View style={{
                        flexDirection: "row",
                        alignContent: "center",
                        alignItems: "center"
                    }}>
                        <Image source={require('../assets/images/salon.jpeg')} style={{
                            width: 36,
                            height: 36,
                            borderRadius: 16
                        }} />
                        <View style={{
                            flexDirection: "column",
                            marginLeft: 10
                        }}>
                            <Text style={[styles.text, { fontSize: 15 }]}>Michela</Text>
                            <View style={{
                                flexDirection: "row"
                            }}>
                                <Ionicons name="ios-star" size={15} color={Colors.light.giallo} />
                                <Ionicons name="ios-star" size={15} color={Colors.light.giallo} />
                                <Ionicons name="ios-star" size={15} color={Colors.light.giallo} />
                                <Ionicons name="ios-star" size={15} color={Colors.light.giallo} />
                                <Ionicons name="ios-star" size={15} color={Colors.light.giallo} />
                            </View>
                        </View>
                    </View>
                    <Text style={[styles.text, { marginTop: 10 }]}>
                        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo...
                    </Text>
                </View>
                <View style={{
                    backgroundColor: "white",
                    borderRadius: 10,
                    width: "90%",
                    alignSelf: "center",
                    marginTop: 20,
                    padding: 20,
                }}>
                    <View style={{
                        flexDirection: "row",
                        alignContent: "center",
                        alignItems: "center"
                    }}>
                        <Image source={require('../assets/images/salon.jpeg')} style={{
                            width: 36,
                            height: 36,
                            borderRadius: 16
                        }} />
                        <View style={{
                            flexDirection: "column",
                            marginLeft: 10
                        }}>
                            <Text style={[styles.text, { fontSize: 15 }]}>Michela</Text>
                            <View style={{
                                flexDirection: "row"
                            }}>
                                <Ionicons name="ios-star" size={15} color={Colors.light.giallo} />
                                <Ionicons name="ios-star" size={15} color={Colors.light.giallo} />
                                <Ionicons name="ios-star" size={15} color={Colors.light.giallo} />
                                <Ionicons name="ios-star" size={15} color={Colors.light.giallo} />
                                <Ionicons name="ios-star" size={15} color={Colors.light.giallo} />
                            </View>
                        </View>
                    </View>
                    <Text style={[styles.text, { marginTop: 10 }]}>
                        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo...
                    </Text>
                </View>
                <View style={{
                    backgroundColor: "white",
                    borderRadius: 10,
                    width: "90%",
                    alignSelf: "center",
                    marginTop: 20,
                    padding: 20,
                }}>
                    <View style={{
                        flexDirection: "row",
                        alignContent: "center",
                        alignItems: "center"
                    }}>
                        <Image source={require('../assets/images/salon.jpeg')} style={{
                            width: 36,
                            height: 36,
                            borderRadius: 16
                        }} />
                        <View style={{
                            flexDirection: "column",
                            marginLeft: 10
                        }}>
                            <Text style={[styles.text, { fontSize: 15 }]}>Michela</Text>
                            <View style={{
                                flexDirection: "row"
                            }}>
                                <Ionicons name="ios-star" size={15} color={Colors.light.giallo} />
                                <Ionicons name="ios-star" size={15} color={Colors.light.giallo} />
                                <Ionicons name="ios-star" size={15} color={Colors.light.giallo} />
                                <Ionicons name="ios-star" size={15} color={Colors.light.giallo} />
                                <Ionicons name="ios-star" size={15} color={Colors.light.giallo} />
                            </View>
                        </View>
                    </View>
                    <Text style={[styles.text, { marginTop: 10 }]}>
                        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo...
                    </Text>
                </View>
                <View style={{
                    backgroundColor: "white",
                    borderRadius: 10,
                    width: "90%",
                    alignSelf: "center",
                    marginTop: 20,
                    padding: 20,
                }}>
                    <View style={{
                        flexDirection: "row",
                        alignContent: "center",
                        alignItems: "center"
                    }}>
                        <Image source={require('../assets/images/salon.jpeg')} style={{
                            width: 36,
                            height: 36,
                            borderRadius: 16
                        }} />
                        <View style={{
                            flexDirection: "column",
                            marginLeft: 10
                        }}>
                            <Text style={[styles.text, { fontSize: 15 }]}>Michela</Text>
                            <View style={{
                                flexDirection: "row"
                            }}>
                                <Ionicons name="ios-star" size={15} color={Colors.light.giallo} />
                                <Ionicons name="ios-star" size={15} color={Colors.light.giallo} />
                                <Ionicons name="ios-star" size={15} color={Colors.light.giallo} />
                                <Ionicons name="ios-star" size={15} color={Colors.light.giallo} />
                                <Ionicons name="ios-star" size={15} color={Colors.light.giallo} />
                            </View>
                        </View>
                    </View>
                    <Text style={[styles.text, { marginTop: 10 }]}>
                        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo...
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
};

export default Review;

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
});
