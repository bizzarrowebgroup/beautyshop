import * as React from 'react';
import {
    Image,
    ActivityIndicator,
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    TouchableHighlight,
    Button
} from 'react-native';
import Header from '../components/Header';
import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
// import { TextInput } from 'react-native-gesture-handler';
import { logout } from '../network/Firebase';

import { StackNavigationProp } from "@react-navigation/stack";
import { ParamListBase } from "@react-navigation/native";
import { AuthUserContext } from '../navigation/AuthUserProvider';
import * as firebase from 'firebase';
import 'firebase/auth';
// import { getDateNow } from "../constants/Utils";

// import * as Localization from "expo-localization";
// import { User } from "../models/User";
// import { Profile } from "../models/Profile";
// import NetworkManager from "../network/NetworkManager";

// import { isAvailableSignInWithApple } from "./AppleLogin";
// import * as firebase from "firebase";
// import "firebase/auth";
// import * as Google from "expo-google-app-auth";
// import * as AppleAuthentication from "expo-apple-authentication";

// import * as Crypto from "expo-crypto";

// import * as Notifications from "expo-notifications";
// import { ProfileColor } from "../models/ProfileColor";
// import Toast from 'react-native-toast-message'

interface ProfiloProps {
    example?: "test" | "amen";
    fontSize?: number;
    onPress?: () => void;
    androidClientId: string;
    iosClientId: string;
    iosStandaloneAppClientId: string;
    androidStandaloneAppClientId: string;
    scopes: string[];
    signedIn: (userUuid: string) => Promise<void>;
    navigation: StackNavigationProp<ParamListBase>;
}

const Profilo = ({
    example,
    fontSize,
    onPress,
    androidClientId,
    iosClientId,
    iosStandaloneAppClientId,
    androidStandaloneAppClientId,
    scopes,
    signedIn,
    navigation
}: ProfiloProps) => {
    // const [signInWithAppleAvailable, setSignInWithAppleAvailable] = React.useState(false);
    // const [isLogged, setisLogged] = React.useState(false);
    // const [loading, setloading] = React.useState(false);
    const [isOn, setIson] = React.useState(false);
    const { user, setUser } = React.useContext(AuthUserContext);

    // const [secureText, setSecure] = React.useState(true);

    // const [registerEmail, SetRegEmail] = React.useState("");
    // const [registerPass, SetRegPass] = React.useState("");

    // const logIn = () => {
    //     setloading(true);
    //     setTimeout(() => {
    //         setloading(false);
    //         setisLogged(!isLogged);
    //     }, 500);
    // }
    const toggleHandle = () => {
        setIson(!isOn);
    }
    // const chiamami = async () => {
    //     const state = await isAvailableSignInWithApple();
    //     return state;
    // }
    // const getConfig = () => {
    //     return {
    //         expoClientId: `52308442540-krmqno89g2dhf6iq04469u507ac8u7cs.apps.googleusercontent.com`,
    //         iosClientId: "470013044742-69pbts2tm4280vunsoekk4ebkf5l3t8s.apps.googleusercontent.com",
    //         // iosClientId: `52308442540-krmqno89g2dhf6iq04469u507ac8u7cs.apps.googleusercontent.com`,
    //         androidClientId: "470013044742-528res25tr9bibi8f89lh2vsot4rpk2s.apps.googleusercontent.com",
    //         scopes: ["profile", "email"],
    //     };
    // }
    // const getPushNotificationToken = async (): Promise<string> => {
    //     let token = "";
    //     try {
    //         token = await Notifications.getExpoPushTokenAsync();
    //     } catch (e) {
    //         token = "";
    //         console.error("error getPushNotificationToken = " + e);
    //     }
    //     return token;
    // };
    // const onPressRegister = async () => {
    //     try {

    //     } catch (e) {
    //         console.log(e, "errore-onPressRegister")
    //     }
    // }
    // const onPressGoogleLogin = async () => {
    //     console.info("googlestart")
    //     try {
    //         const config = getConfig();
    //         const result = await Google.logInAsync(config);
    //         // let result = await AuthSession.startAsync({
    //         //     authUrl:
    //         //       `https://accounts.google.com/o/oauth2/v2/auth?` +
    //         //       `&client_id=${googleWebAppId}` +
    //         //       `&redirect_uri=${encodeURIComponent(redirectUrl)}` +
    //         //       `&response_type=code` +
    //         //       `&access_type=offline` +
    //         //       `&scope=profile`,
    //         //   });
    //         if (result.type === "success" && result.user) {
    //             try {
    //                 await firebase
    //                     .auth()
    //                     .signInWithEmailAndPassword(result.user.email, result.user.id);
    //             } catch (e) {
    //                 await firebase
    //                     .auth()
    //                     .createUserWithEmailAndPassword(result.user.email, result.user.id);
    //             }
    //             const userUuid = firebase.auth().currentUser.uid;
    //             // const token = await getPushNotificationToken();
    //             const token = "diocan";
    //             const user = new User(
    //                 result.user.name,
    //                 userUuid,
    //                 result.user.givenName,
    //                 result.user.familyName,
    //                 result.user.email,
    //                 token,
    //                 "",
    //                 getDateNow(),
    //                 Localization.locale,
    //                 ""
    //             );
    //             let currentUser = await NetworkManager.getUserByUuid(user.userUuid);
    //             if (currentUser) {
    //                 // update
    //                 currentUser.locale = Localization.locale;
    //                 currentUser.pushNotificationToken = token;
    //                 await NetworkManager.updateUser(currentUser);
    //             } else {
    //                 // create
    //                 await NetworkManager.createUser(user);
    //                 currentUser = user;
    //             }
    //             const existingProfile = await NetworkManager.getProfileByUuid(
    //                 user.userUuid
    //             );
    //             if (existingProfile) {
    //                 // update
    //                 existingProfile.timezone = Localization.timezone;
    //                 await NetworkManager.updateProfile(existingProfile);
    //             } else {
    //                 // create
    //                 const profile = new Profile(
    //                     user.userUuid,
    //                     result.user.photoUrl,
    //                     Localization.timezone,
    //                     ProfileColor.NONE,
    //                     getDateNow(),
    //                     getDateNow()
    //                 );
    //                 await NetworkManager.createProfile(profile);
    //             }
    //             signedIn(userUuid);
    //         }
    //     } catch (e) {
    //         if (e.message.includes("ERR_APP_AUTH"))
    //             Toast.show({
    //                 topOffset: 50,
    //                 type: "error", //success | error | info
    //                 text1: 'Errore',
    //                 text2: 'Hai deciso di annulare il login con Google 👋'
    //             });
    //     }
    // };
    // const onPressAppleLogin = async () => {
    //     console.info("applestart");
    //     const csrf = Math.random().toString(36).substring(2, 15);
    //     const nonce = Math.random().toString(36).substring(2, 10);
    //     const hashedNonce = await Crypto.digestStringAsync(
    //         Crypto.CryptoDigestAlgorithm.SHA256,
    //         nonce
    //     );
    //     try {
    //         const appleCredential = await AppleAuthentication.signInAsync({
    //             requestedScopes: [
    //                 AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
    //                 AppleAuthentication.AppleAuthenticationScope.EMAIL,
    //             ],
    //             // state: csrf,
    //             // nonce: hashedNonce,
    //         })
    //         const { identityToken, email, fullName } = appleCredential;
    //         console.info(appleCredential, "appleCredential")
    //         if (identityToken) {
    //             const provider = new firebase.auth.OAuthProvider("apple.com");
    //             const credential = provider.credential({
    //                 idToken: identityToken,
    //                 rawNonce: nonce,
    //             });
    //             console.log(credential, "credentials ok")
    //             await firebase.auth().signInWithCredential(credential).catch(function (error) {
    //                 // Handle Errors here.
    //                 var errorCode = error.code;
    //                 var errorMessage = error.message;
    //                 // The email of the user's account used.
    //                 var email = error.email;
    //                 // The firebase.auth.AuthCredential type that was used.
    //                 var credential = error.credential;
    //                 if (errorCode === 'auth/account-exists-with-different-credential') {
    //                     console.log('Email already associated with another account.');
    //                     let data = [
    //                         { "errorCode": errorCode },
    //                         { "errorMessage": errorMessage },
    //                         { "email": email },
    //                         { "credential": credential }
    //                     ]
    //                     console.log(data, "datiLogin");
    //                     // Handle account linking here, if using.
    //                 } else {
    //                     console.error(error);
    //                 }
    //             });;
    //             const userUuid = firebase.auth().currentUser.uid;
    //             console.log(userUuid, "userUuid ok")
    //             // const token = await getPushNotificationToken();
    //             const token = "diocan";
    //             const user = new User(
    //                 fullName.givenName + " " + fullName.familyName,
    //                 userUuid,
    //                 fullName.givenName,
    //                 fullName.familyName,
    //                 email,
    //                 token,
    //                 "",
    //                 getDateNow(),
    //                 Localization.locale,
    //                 ""
    //             );
    //             console.log(user, "user ok")
    //             let currentUser = await NetworkManager.getUserByUuid(user.userUuid);
    //             if (currentUser) {
    //                 // update
    //                 currentUser.locale = Localization.locale;
    //                 currentUser.pushNotificationToken = token;
    //                 console.log(currentUser, "currentUser GOT")
    //                 await NetworkManager.updateUser(currentUser);
    //             } else {
    //                 // create
    //                 await NetworkManager.createUser(user);
    //                 currentUser = user;
    //                 console.log(currentUser, "currentUser NOT")
    //             }
    //             console.log("done user db", currentUser)
    //             const existingProfile = await NetworkManager.getProfileByUuid(
    //                 user.userUuid
    //             );
    //             console.log(existingProfile, "existingProfile")
    //             if (existingProfile !== undefined) {
    //                 // update
    //                 existingProfile.timezone = Localization.timezone;
    //                 await NetworkManager.updateProfile(existingProfile);
    //                 console.log(existingProfile, "existingProfile ok")
    //             } else {
    //                 // create
    //                 const profile = new Profile(
    //                     user.userUuid,
    //                     "https://www.zooniverse.org/assets/simple-avatar.png",
    //                     Localization.timezone,
    //                     ProfileColor.NONE,
    //                     getDateNow(),
    //                     getDateNow()
    //                 );
    //                 await NetworkManager.createProfile(profile);
    //                 console.log(profile, "profile NEW")
    //             }
    //             console.log("done sign In Apple")
    //             signedIn(userUuid);
    //         }
    //     } catch (e) {
    //         switch (e.code) {
    //             case "ERR_APPLE_AUTHENTICATION_UNAVAILABLE":
    //                 console.log("The request to get credential state failed. See the error message for additional specific information.");
    //                 // Sentry.captureException(e);
    //                 // Sentry.captureException(new Error('The request to get credential state failed.!'));
    //                 break;
    //             case "ERR_APPLE_AUTHENTICATION_REQUEST_FAILED":
    //                 console.log("An invalid AppleAuthenticationScope was passed in.");
    //                 // Sentry.captureException(new Error('An invalid AppleAuthenticationScope was passed in.'));
    //                 break;
    //             case "ERR_APPLE_AUTHENTICATION_INVALID_SCOPE":
    //                 console.log("The authentication request failed. See the error message for additional specific information.");
    //                 // Sentry.captureException(new Error('The authentication request failed. See the error message for additional specific information.'));
    //                 break;
    //             case "ERR_APPLE_AUTHENTICATION_CREDENTIAL":
    //                 console.log("Apple authentication is unavailable on the device.");
    //                 // Sentry.captureException(new Error('Apple authentication is unavailable on the device.'));
    //                 break;
    //             case "ERR_CANCELED":
    //                 console.log("The user canceled the sign-in request from the system modal.");
    //                 // Sentry.captureException(new Error('The user canceled the sign-in request from the system modal.'));
    //                 break;

    //             default:
    //                 console.log(e.code, "undefined error");
    //                 break;
    //         }
    //     }
    // };
    // React.useEffect(() => {
    //     setSignInWithAppleAvailable(chiamami());
    // }, [])
    // if (loading) {
    //     return (
    //         <View style={styles.container}>
    //             <ActivityIndicator size="large" color={Colors.light.arancioDes} style={{ alignSelf: "center", flex: 1 }} />
    //         </View>
    //     );
    // } else {
    React.useEffect(() => {
        // if (user) {
        // var user = firebase.auth().currentUser;
        var name, email, photoUrl, uid, emailVerified;

        if (user != null) {
            name = user.displayName;
            email = user.email;
            photoUrl = user.photoURL;
            emailVerified = user.emailVerified;
            uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
            // this value to authenticate with your backend server, if
            // you have one. Use User.getToken() instead.
        }
        // console.log({
        //     name,
        //     email,
        //     photoUrl,
        //     uid,
        //     emailVerified,
        // }, "userDatils")
        // }
    }, [])
    async function handleSignOut() {
        try {
            await logout();
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <View style={styles.container}>
            <Header
                profile={true}
                loggedIn={true}
                image={"https://i.pravatar.cc/100"}
                username="Ilaria Berghi"
                email="ilaria.berghi@gmail.com"
                phonenumber="3939024085"
            />
            <View style={{
                zIndex: -2,
                height: 0
            }}>
                <View style={{ backgroundColor: Colors.light.arancioDes, height: 50, width: "10%" }} />
                <View style={{ backgroundColor: Colors.light.bg, height: 50, width: "20%", borderTopLeftRadius: 30, top: -50 }} />
            </View>
            <View style={{
                zIndex: 1,
                top: 20,
            }}>
                <View>
                    <View style={{ marginLeft: 20 }}>
                        <Text style={[styles.text, { fontSize: 13, textTransform: "uppercase" }]}>Tessera fedeltà</Text>
                        <View style={{
                            backgroundColor: Colors.light.giallo,
                            height: 191,
                            borderRadius: 10,
                            marginLeft: 10,
                            marginRight: 40,
                            marginTop: 10,
                            marginBottom: 20
                        }}>
                            <View style={{ marginHorizontal: 40, marginTop: 10 }}>
                                <Image source={{ uri: "http://barcodes4.me/barcode/c128b/AnyValueYouWish.png?resolution=1&margin=5&height=70&IsReverseColor=1" }} style={{
                                    width: "100%",
                                    height: 70,
                                    backgroundColor: 'transparent',
                                    borderRadius: 10
                                }} />
                                <Text style={[styles.text, { marginTop: 5, fontSize: 12, color: Colors.light.nero, textAlign: "center" }]}>Scade il 15/07/2021</Text>
                            </View>
                            <View style={{
                                flexDirection: "row",
                                alignContent: "center",
                                alignItems: "center",
                                justifyContent: "space-around",
                                marginHorizontal: 40
                            }}>
                                <Image source={require('../assets/images/logoBS.png')} style={{
                                    width: 102,
                                    height: 92,
                                }} />
                                <Text style={[styles.text, { textAlign: "right" }]}>{"Punti\n"}<Text style={[styles.bold, { fontSize: 20 }]}>150</Text></Text>
                            </View>
                        </View>
                        <Text style={[styles.text, { fontSize: 12, color: "#333333", marginRight: 20, textAlign: "center" }]}>{"Spiegazione tessere, come accumulare punti etc.\nAmet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet."}</Text>
                    </View>
                    <View style={{ marginHorizontal: 40, marginVertical: 20, height: 1, backgroundColor: "#A6A6A6" }} />

                    <View style={{
                        backgroundColor: Colors.light.bianco,
                        height: 45,
                        alignItems: "center",
                        justifyContent: "space-between",
                        alignContent: "center",
                        flexDirection: "row"
                    }}>
                        <Text style={[styles.text, { fontSize: 16, marginLeft: 20 }]}>Notifiche</Text>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            style={{
                                width: 64,
                                height: 32,
                                borderRadius: 32,
                                padding: 4,
                                backgroundColor: isOn
                                    ? Colors.light.arancioDes
                                    : Colors.light.grigio,
                                marginRight: 20
                            }}
                            onPress={toggleHandle}
                        >
                            <View style={{
                                width: 24,
                                height: 24,
                                borderRadius: 32,
                                backgroundColor: Colors.light.bianco,
                                left: isOn ? 32 : 0,
                            }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginTop: 5, marginHorizontal: 20, marginBottom: 10 }}>
                        <Text style={[styles.text, { color: "#696969", fontSize: 12 }]}>Le notifiche sono relative alle prenotazioni ed eventuali promozioni specifiche</Text>
                    </View>
                    <TouchableOpacity style={{
                        backgroundColor: Colors.light.bianco,
                        height: 45,
                        alignItems: "center",
                        justifyContent: "space-between",
                        alignContent: "center",
                        flexDirection: "row"
                    }} >
                        <Text style={[styles.text, { fontSize: 16, marginLeft: 20 }]}>Le tue recensioni</Text>
                        <Ionicons name="ios-return-right" size={30} color={Colors.light.arancioDes} style={{
                            marginRight: 20
                        }} />
                    </TouchableOpacity>
                    <View style={{ backgroundColor: Colors.light.arancio, borderRadius: 50, margin: 20 }}>
                        <Button accessibilityLabel="Esci" title="Esci" onPress={handleSignOut} color="red" />
                    </View>
                </View>
                {/* {!isLogged && (
                        <>
                            <View>
                                <Text style={[styles.text, { marginLeft: 20 }]}>Email</Text>
                                <View style={styles.input}>
                                    <TextInput
                                        value={registerEmail}
                                        onChangeText={e => {
                                            SetRegEmail(e)
                                        }}
                                        style={{ width: "100%", height: "100%", marginLeft: 10, fontFamily: "Montserrat_300Light" }} />
                                    <Ionicons name="ios-mail" size={24} color="black" style={{
                                        position: "absolute",
                                        right: 15,
                                    }} />
                                </View>
                                <Text style={[styles.text, { marginLeft: 20 }]}>Password</Text>
                                <View style={styles.input}>
                                    <TextInput
                                        secureTextEntry={secureText}
                                        value={registerPass}
                                        onChangeText={e => {
                                            SetRegPass(e)
                                        }}
                                        style={{ width: "100%", height: "100%", marginLeft: 10, fontFamily: "Montserrat_300Light" }} />
                                    <Ionicons onPress={() => {
                                        setSecure(!secureText)
                                    }} name="ios-lock" size={24} color="black" style={{
                                        position: "absolute",
                                        right: 15,
                                    }} />
                                </View>
                            </View>
                            <View style={{ marginTop: 20 }}>
                                <TouchableOpacity style={styles.btn} onPress={logIn}>
                                    <Text style={[styles.bold, { color: Colors.light.nero, fontSize: 15, marginLeft: 20 }]}>Accedi</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.btn, {
                                    backgroundColor: Colors.light.bianco
                                }]}>
                                    <Text style={[styles.bold, { color: Colors.light.arancioDes, fontSize: 15, marginLeft: 20 }]}>Registrati con tua Email</Text>
                                </TouchableOpacity>
                                <View style={{ marginHorizontal: 40, marginVertical: 10, height: 1, backgroundColor: Colors.light.arancioDes }} />
                                <View style={{ marginVertical: 10, marginHorizontal: 20 }}>
                                    <Ionicons.Button
                                        borderRadius={10}
                                        name="logo-google"
                                        backgroundColor="white"
                                        color={Colors.light.arancioDes}
                                        onPress={() => { onPressGoogleLogin() }}>
                                        <Text style={[styles.bold, { position: "absolute", right: 10, color: Colors.light.arancioDes, fontSize: 15, }]}>Accedi con Google</Text>
                                    </Ionicons.Button>
                                </View>
                                {signInWithAppleAvailable && <View style={{ marginVertical: 10, marginHorizontal: 20 }}>
                                    <Ionicons.Button
                                        borderRadius={10}
                                        name="logo-apple"
                                        backgroundColor="black"
                                        onPress={() => { onPressAppleLogin() }}>
                                        <Text style={[styles.bold, { position: "absolute", right: 10, color: Colors.light.bianco, fontSize: 15 }]}>Accedi con Apple</Text>
                                    </Ionicons.Button>
                                </View>}
                                <View style={{ marginVertical: 10, marginHorizontal: 20 }}>
                                    <Ionicons.Button
                                        borderRadius={10}
                                        name="logo-facebook"
                                        backgroundColor="#3b5998"
                                        onPress={() => { console.warn("diocan") }}>
                                        <Text style={[styles.bold, { position: "absolute", right: 10, color: Colors.light.bianco, fontSize: 15 }]}>Accedi con Facebook</Text>
                                    </Ionicons.Button>
                                </View>
                            </View>
                        </>
                    )} */}
            </View>
        </View>
    );
    // }
};

export default Profilo;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.bg
    },
    input: {
        height: 40,
        marginHorizontal: 20,
        marginVertical: 10,
        backgroundColor: "white",
        borderRadius: 10,
        justifyContent: 'center',
    },
    text: {
        fontFamily: "Montserrat_400Regular"
    },
    bold: {
        fontFamily: "Montserrat_700Bold"
    },
    btn: {
        backgroundColor: "#DE9182",
        height: 40,
        marginHorizontal: 20,
        marginVertical: 10,
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
        borderRadius: 10,
        // shadowColor: Colors.light.nero,
        // shadowOpacity: 0.25,
        // shadowOffset: {
        //     width: 0,
        //     height: 4
        // },
        // shadowRadius: 4,
    },
});
