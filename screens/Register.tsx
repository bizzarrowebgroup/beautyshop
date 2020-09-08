import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import * as Yup from 'yup';

import Form from '../components/Form/Form';
import FormField from '../components/Form/FormField';
import FormButton from '../components/Form/FormButton';
// import IconButton from '../components/IconButton';
import FormErrorMessage from '../components/Form/FormErrorMessage';
import { registerWithEmail } from '../network/Firebase';
import Colors from '../constants/Colors';

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .required()
        .label('Name'),
    email: Yup.string()
        .required('Per cortesia inserisci una mail valida')
        .email()
        .label('Email'),
    password: Yup.string()
        .required()
        .min(6, 'La password deve avere almene 6 caratteri')
        .label('Password'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Le due password devono combaciare')
        .required('Conferma la tua password!'),
    check: Yup.boolean().oneOf([true], 'Per cortesia conferma i termini ele condizioni')
});

const Register = ({ navigation }) => {
    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [rightIcon, setRightIcon] = useState('eye');
    const [confirmPasswordIcon, setConfirmPasswordIcon] = useState('eye');
    const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState(
        true
    );
    const [registerError, setRegisterError] = useState('');
    function handlePasswordVisibility() {
        if (rightIcon === 'eye') {
            setRightIcon('eye-off');
            setPasswordVisibility(!passwordVisibility);
        } else if (rightIcon === 'eye-off') {
            setRightIcon('eye');
            setPasswordVisibility(!passwordVisibility);
        }
    }

    function handleConfirmPasswordVisibility() {
        if (confirmPasswordIcon === 'eye') {
            setConfirmPasswordIcon('eye-off');
            setConfirmPasswordVisibility(!confirmPasswordVisibility);
        } else if (confirmPasswordIcon === 'eye-off') {
            setConfirmPasswordIcon('eye');
            setConfirmPasswordVisibility(!confirmPasswordVisibility);
        }
    }

    async function handleOnSignUp(values) {
        const { email, password } = values;
        try {
            await registerWithEmail(email, password);
        } catch (error) {
            setRegisterError(error.message);
        }
    }
    const onPressGoogleLogin = async () => {
        console.info("googlestart")
        // try {
        //     const config = getConfig();
        //     const result = await Google.logInAsync(config);
        //     // let result = await AuthSession.startAsync({
        //     //     authUrl:
        //     //       `https://accounts.google.com/o/oauth2/v2/auth?` +
        //     //       `&client_id=${googleWebAppId}` +
        //     //       `&redirect_uri=${encodeURIComponent(redirectUrl)}` +
        //     //       `&response_type=code` +
        //     //       `&access_type=offline` +
        //     //       `&scope=profile`,
        //     //   });
        //     if (result.type === "success" && result.user) {
        //         try {
        //             await firebase
        //                 .auth()
        //                 .signInWithEmailAndPassword(result.user.email, result.user.id);
        //         } catch (e) {
        //             await firebase
        //                 .auth()
        //                 .createUserWithEmailAndPassword(result.user.email, result.user.id);
        //         }
        //         const userUuid = firebase.auth().currentUser.uid;
        //         // const token = await getPushNotificationToken();
        //         const token = "diocan";
        //         const user = new User(
        //             result.user.name,
        //             userUuid,
        //             result.user.givenName,
        //             result.user.familyName,
        //             result.user.email,
        //             token,
        //             "",
        //             getDateNow(),
        //             Localization.locale,
        //             ""
        //         );
        //         let currentUser = await NetworkManager.getUserByUuid(user.userUuid);
        //         if (currentUser) {
        //             // update
        //             currentUser.locale = Localization.locale;
        //             currentUser.pushNotificationToken = token;
        //             await NetworkManager.updateUser(currentUser);
        //         } else {
        //             // create
        //             await NetworkManager.createUser(user);
        //             currentUser = user;
        //         }
        //         const existingProfile = await NetworkManager.getProfileByUuid(
        //             user.userUuid
        //         );
        //         if (existingProfile) {
        //             // update
        //             existingProfile.timezone = Localization.timezone;
        //             await NetworkManager.updateProfile(existingProfile);
        //         } else {
        //             // create
        //             const profile = new Profile(
        //                 user.userUuid,
        //                 result.user.photoUrl,
        //                 Localization.timezone,
        //                 ProfileColor.NONE,
        //                 getDateNow(),
        //                 getDateNow()
        //             );
        //             await NetworkManager.createProfile(profile);
        //         }
        //         signedIn(userUuid);
        //     }
        // } catch (e) {
        //     if (e.message.includes("ERR_APP_AUTH"))
        //         Toast.show({
        //             topOffset: 50,
        //             type: "error", //success | error | info
        //             text1: 'Errore',
        //             text2: 'Hai deciso di annulare il login con Google 👋'
        //         });
        // }
    };
    // admin@bizzarro.org
    return (
        <View style={styles.container}>
            <View style={{ marginTop: 50 }}>
                <Form
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
                </Form>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: Colors.light.viola
    },
    backButton: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10
    }
});

export default Register