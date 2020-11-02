import React, { useState } from 'react';
import {
  SafeAreaView,
  Keyboard,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  View
} from 'react-native';
//import * as Yup from 'yup';

//import Form from '../components/Form/Form';
//import FormField from '../components/Form/FormField';
//import FormButton from '../components/Form/FormButton';
// import IconButton from '../components/IconButton';
//import FormErrorMessage from '../components/Form/FormErrorMessage';
import { registerWithEmail } from '../network/Firebase';
import Colors from '../constants/Colors';
import BaseText from '../components/StyledText';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AppTextInput from '../components/TextInput';

//const validationSchema = Yup.object().shape({
//  name: Yup.string()
//    .required()
//    .label('Name'),
//  email: Yup.string()
//    .required('Per cortesia inserisci una mail valida')
//    .email()
//    .label('Email'),
//  password: Yup.string()
//    .required()
//    .min(6, 'La password deve avere almene 6 caratteri')
//    .label('Password'),
//  confirmPassword: Yup.string()
//    .oneOf([Yup.ref('password')], 'Le due password devono combaciare')
//    .required('Conferma la tua password!'),
//  check: Yup.boolean().oneOf([true], 'Per cortesia conferma i termini ele condizioni')
//});

const Register = ({ navigation }) => {
  const [schermata, setSchermata] = useState(1)
  const [nomecognome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [validatore1, setValidatore1] = useState(false); // validatore1, setValidatore1
  const [validatore2, setValidatore2] = useState(false); // validatore1, setValidatore1

  const checkNome = () => { if (!nomecognome.trim()) setValidatore1(false); }
  const checkEmail = () => { if (!email.trim()) setValidatore2(false); }
  function changeNome(value) {
    if (!nomecognome.trim()) setValidatore1(false);
    setValidatore1(true);
    setNome(value);
  }
  function changeEmail(value) {
    if (!email.trim()) setValidatore2(false);
    setValidatore2(true);
    setEmail(value);
  }

  function checkAndGoOn(parte) {
    switch (parte) {
      case 1:
        setSchermata(2)
        break;
      case 2:
        setSchermata(3)
        break;
      case "-":
        setSchermata(schermata - 1)
        break;
      case "+":
        setSchermata(schermata + 1)
        break;
    }
  }

  //function handlePasswordVisibility() {
  //  if (rightIcon === 'eye') {
  //    setRightIcon('eye-off');
  //    setPasswordVisibility(!passwordVisibility);
  //  } else if (rightIcon === 'eye-off') {
  //    setRightIcon('eye');
  //    setPasswordVisibility(!passwordVisibility);
  //  }
  //}

  //function handleConfirmPasswordVisibility() {
  //  if (confirmPasswordIcon === 'eye') {
  //    setConfirmPasswordIcon('eye-off');
  //    setConfirmPasswordVisibility(!confirmPasswordVisibility);
  //  } else if (confirmPasswordIcon === 'eye-off') {
  //    setConfirmPasswordIcon('eye');
  //    setConfirmPasswordVisibility(!confirmPasswordVisibility);
  //  }
  //}

  //async function handleOnSignUp(values) {
  //  const { email, password } = values;
  //  try {
  //    await registerWithEmail(email, password);
  //  } catch (error) {
  //    setRegisterError(error.message);
  //  }
  //}
  //const onPressGoogleLogin = async () => {
  //  console.info("googlestart")
  //  // try {
  //  //     const config = getConfig();
  //  //     const result = await Google.logInAsync(config);
  //  //     // let result = await AuthSession.startAsync({
  //  //     //     authUrl:
  //  //     //       `https://accounts.google.com/o/oauth2/v2/auth?` +
  //  //     //       `&client_id=${googleWebAppId}` +
  //  //     //       `&redirect_uri=${encodeURIComponent(redirectUrl)}` +
  //  //     //       `&response_type=code` +
  //  //     //       `&access_type=offline` +
  //  //     //       `&scope=profile`,
  //  //     //   });
  //  //     if (result.type === "success" && result.user) {
  //  //         try {
  //  //             await firebase
  //  //                 .auth()
  //  //                 .signInWithEmailAndPassword(result.user.email, result.user.id);
  //  //         } catch (e) {
  //  //             await firebase
  //  //                 .auth()
  //  //                 .createUserWithEmailAndPassword(result.user.email, result.user.id);
  //  //         }
  //  //         const userUuid = firebase.auth().currentUser.uid;
  //  //         // const token = await getPushNotificationToken();
  //  //         const token = "diocan";
  //  //         const user = new User(
  //  //             result.user.name,
  //  //             userUuid,
  //  //             result.user.givenName,
  //  //             result.user.familyName,
  //  //             result.user.email,
  //  //             token,
  //  //             "",
  //  //             getDateNow(),
  //  //             Localization.locale,
  //  //             ""
  //  //         );
  //  //         let currentUser = await NetworkManager.getUserByUuid(user.userUuid);
  //  //         if (currentUser) {
  //  //             // update
  //  //             currentUser.locale = Localization.locale;
  //  //             currentUser.pushNotificationToken = token;
  //  //             await NetworkManager.updateUser(currentUser);
  //  //         } else {
  //  //             // create
  //  //             await NetworkManager.createUser(user);
  //  //             currentUser = user;
  //  //         }
  //  //         const existingProfile = await NetworkManager.getProfileByUuid(
  //  //             user.userUuid
  //  //         );
  //  //         if (existingProfile) {
  //  //             // update
  //  //             existingProfile.timezone = Localization.timezone;
  //  //             await NetworkManager.updateProfile(existingProfile);
  //  //         } else {
  //  //             // create
  //  //             const profile = new Profile(
  //  //                 user.userUuid,
  //  //                 result.user.photoUrl,
  //  //                 Localization.timezone,
  //  //                 ProfileColor.NONE,
  //  //                 getDateNow(),
  //  //                 getDateNow()
  //  //             );
  //  //             await NetworkManager.createProfile(profile);
  //  //         }
  //  //         signedIn(userUuid);
  //  //     }
  //  // } catch (e) {
  //  //     if (e.message.includes("ERR_APP_AUTH"))
  //  //         Toast.show({
  //  //             topOffset: 50,
  //  //             type: "error", //success | error | info
  //  //             text1: 'Errore',
  //  //             text2: 'Hai deciso di annulare il login con Google 👋'
  //  //         });
  //  // }
  //};

  const goBack = () => {
    if (schermata !== 1) return setSchermata(schermata - 1);
    navigation.goBack();
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss}>
          <View style={{ flex: 1 }}>
            <TouchableOpacity onPress={goBack} style={{ paddingHorizontal: 20, paddingVertical: 5 }}>
              <View style={styles.backButton}>
                <Ionicons name="ios-arrow-back" size={30} color={Colors.light.nero} />
              </View>
            </TouchableOpacity>
            {schermata === 1 && (
              <>
                <View style={{ paddingLeft: 20 }}>
                  <BaseText size={30} weight={600} fontSpacing={0.77}>{"Inserisci il tuo \nNome e Cognome"}</BaseText>
                  <BaseText fontSpacing={0.77} color={"#8E8E8E"} styles={{ marginTop: 30 }}>{"Per iniziare incominciamo dalle basi"}</BaseText>
                  <AppTextInput
                    name="name"
                    leftIcon="account"
                    placeholder="Paolo Rossi"
                    autoFocus={true}
                    value={nomecognome}
                    onChangeText={value => changeNome(value)}
                    onEndEditing={() => checkNome()}
                  />
                </View>
                <View style={{ position: "absolute", bottom: 40, left: 0, right: 0 }}>
                  <TouchableOpacity disabled={validatore1 ? false : true} onPress={() => checkAndGoOn(1)} activeOpacity={0.4} style={{
                    backgroundColor: validatore1 ? "#FB6F3B" : "#e0e0e0",
                    height: 70,
                    marginHorizontal: 20,
                    borderRadius: 30,
                    flex: 1,
                    justifyContent: "center",
                    alignContent: "center",
                    alignItems: "center"
                  }}>
                    <BaseText color={validatore1 ? Colors.light.bianco : "#888888"} weight={700} letterSpacing={0.77} size={13}>{"Prossimo"}</BaseText>
                  </TouchableOpacity>
                </View>
              </>
            )}
            {schermata === 2 && (
              <>
                <View style={{ paddingLeft: 20 }}>
                  <BaseText size={30} weight={600} fontSpacing={0.77}>{"Inserisci la tua \nEmail"}</BaseText>
                  <BaseText fontSpacing={0.77} color={"#8E8E8E"} styles={{ marginTop: 30 }}>{"Per invarti comunicazioni riguardanti le tue prenotazioni"}</BaseText>
                  <AppTextInput
                    name="Email"
                    placeholder="paolo@libero.it"
                    autoFocus={true}
                    value={email}
                    onChangeText={value => changeEmail(value)}
                    onEndEditing={() => checkEmail()}
                  />
                </View>
                <View style={{ position: "absolute", bottom: 40, left: 0, right: 0 }}>
                  <TouchableOpacity disabled={validatore2 ? false : true} onPress={() => checkAndGoOn(2)} activeOpacity={0.4} style={{
                    backgroundColor: validatore2 ? "#FB6F3B" : "#e0e0e0",
                    height: 70,
                    marginHorizontal: 20,
                    borderRadius: 30,
                    flex: 1,
                    justifyContent: "center",
                    alignContent: "center",
                    alignItems: "center"
                  }}>
                    <BaseText color={validatore2 ? Colors.light.bianco : "#888888"} weight={700} letterSpacing={0.77} size={13}>{"Prossimo"}</BaseText>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.bianco
  },
  backButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.light.bianco,
    shadowColor: Colors.light.nero,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: .2,
    shadowRadius: 2,
    elevation: 1,
  }, 
});
//backButton: {
//  justifyContent: 'center',
//  alignItems: 'center',
//  marginVertical: 10
//},
{/*<Form
                    initialValues={{
                        name: '',
                        email: '',
                        password: '',
                        confirmPassword: ''
                    }}
                    validationSchema={validationSchema}
                    onSubmit={values => handleOnSignUp(values)}
                >
                    <FormField
                        name="name"
                        leftIcon="account"
                        placeholder="Nome e Cognome"
                        autoFocus={true}
                    />
                    <FormField
                        name="email"
                        leftIcon="email"
                        placeholder="Indirizzo email"
                        autoCapitalize="none"
                        keyboardType="email-address"
                        textContentType="emailAddress"
                    />
                    <FormField
                        name="password"
                        leftIcon="lock"
                        placeholder="Inserisci password"
                        autoCapitalize="none"
                        autoCorrect={false}
                        secureTextEntry={passwordVisibility}
                        textContentType="password"
                        rightIcon={rightIcon}
                        handlePasswordVisibility={handlePasswordVisibility}
                    />
                    <FormField
                        name="confirmPassword"
                        leftIcon="lock"
                        placeholder="Conferma password"
                        autoCapitalize="none"
                        autoCorrect={false}
                        secureTextEntry={confirmPasswordVisibility}
                        textContentType="password"
                        rightIcon={confirmPasswordIcon}
                        handlePasswordVisibility={handleConfirmPasswordVisibility}
                    />
                    <FormButton title={'REGISTRATI'} color={Colors.light.arancio} />
                    {<FormErrorMessage error={registerError} visible={true} />}
                </Form>*/}
export default Register