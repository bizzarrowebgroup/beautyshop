import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, View, Image } from 'react-native';
import * as Yup from 'yup';
import Colors from '../constants/Colors';
import Form from '../components/Form/Form';
import FormField from '../components/Form/FormField';
import FormButton from '../components/Form/FormButton';
// import IconButton from '../components/IconButton';
import { loginWithEmail } from '../network/Firebase';
import FormErrorMessage from '../components/Form/FormErrorMessage';
import Loader from '../components/Loader';
import BaseText from '../components/StyledText';
import IconFooterSocial from '../components/svg/IconFooterSocial';
// import useStatusBar from '../hooks/useStatusBar';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Il campo è richiesto')
    .email('Questo campo deve avere una mail valida')
    .label('Email'),
  password: Yup.string()
    .required('Il campo è richiesto')
    .min(6, 'La tua password deve avere 6 caratteri minimi')
    .label('Password')
});
const Login = ({ navigation }) => {
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye');
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);
  function handlePasswordVisibility() {
    if (rightIcon === 'eye') {
      setRightIcon('eye-off');
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === 'eye-off') {
      setRightIcon('eye');
      setPasswordVisibility(!passwordVisibility);
    }
  }

  async function handleOnLogin(values) {
    const { email, password } = values;

    setLoading(true);
    try {
      await loginWithEmail(email, password).then(() => {
        setLoading(false);
      });
    } catch (error) {
      setLoading(false);
      setLoginError(error.message);
      console.log(error, "error")
    }
  }
  if (loading) {
    return (
      <Loader color={Colors.light.bianco} size={"large"} animating={true} />
    )
  }
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={[{
          marginTop: 80,
          //marginHorizontal: 30,
        },]}>
          <View style={{
            paddingHorizontal: 25,
          }}>
            <Image source={require('../assets/images/logoBS.png')} style={{
              width: 50,
              height: 50,
              tintColor: Colors.light.newviola,
              alignSelf: "center",
            }} />
            {/*<BaseText size={24} lineHeight={29} color="black">{"Gestisci\nil tuo profilo"}</BaseText>*/}
          </View>
          <View style={{
            //backgroundColor: "white",
            //borderRadius: 5,
            marginTop: 20,
            padding: 10,
            paddingHorizontal: 25,
          }}>
            <Form
              initialValues={{ email: '', password: '' }}
              validationSchema={validationSchema}
              onSubmit={values => handleOnLogin(values)}
            >
              <BaseText size={10} color={Colors.light.violaDes}>Indirizzo Email</BaseText>
              <FormField
                name="email"
                leftIcon="email"
                placeholder="mario.rossi@beautyshop.it"
                autoCapitalize="none"
                keyboardType="email-address"
                textContentType="emailAddress"
                autoFocus={false}
              />
              <BaseText size={10} color={Colors.light.violaDes}>Password</BaseText>
              <FormField
                name="password"
                leftIcon="lock"
                placeholder="********"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={passwordVisibility}
                textContentType="password"
                rightIcon={rightIcon}
                handlePasswordVisibility={handlePasswordVisibility}
              />
              <FormButton
                title={'Accedi'}
                color={Colors.light.bianco}
                textColor={Colors.light.newviola}
                hasBorder={true}
              />
              {<FormErrorMessage error={loginError} visible={true} />}
            </Form>
            <TouchableOpacity onPress={() => navigation.navigate('Register')} style={styles.btn}>
              <BaseText color={Colors.light.bianco} size={13} weight={400}>{"Registrati"}</BaseText>
            </TouchableOpacity>
            {/*<View style={{
              marginTop: 20,
              width: 145,
              height: 2,
              backgroundColor: Colors.light.nero,
              alignSelf: "center"
            }} />*/}
            <BaseText size={14} weight={400} styles={{ alignSelf: "center", marginVertical: 20 }}>{"oppure accedi con"}</BaseText>
            <View style={{ flexDirection: "row", alignItems: "center", alignContent: "center", justifyContent: "center" }}>
              <TouchableOpacity style={[styles.shadowBtn, { width: 87, height: 58, backgroundColor: "white", borderRadius: 5, justifyContent: "center", }]}>
                <IconFooterSocial type="google" width={24} height={24} style={{ alignSelf: "center", }} />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.shadowBtn, { width: 87, height: 58, backgroundColor: "white", borderRadius: 5, marginHorizontal: 12, justifyContent: "center" }]}>
                <IconFooterSocial type="facebook" width={24} height={24} style={{ alignSelf: "center", }} />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.shadowBtn, { width: 87, height: 58, backgroundColor: "white", borderRadius: 5, justifyContent: "center" }]}>
                <IconFooterSocial type="apple" width={24} height={24} style={{ alignSelf: "center", }} />
              </TouchableOpacity>
            </View>
            <View style={styles.footerButtonContainer}>
              {/* <View style={{ flexDirection: "row", alignItems: "center", alignContent: "center", marginBottom: 5 }}>
                  <BaseText color={Colors.light.nero} size={14} weight={400}>
                      Hai già un account?
                  </BaseText>
                  <BaseText size={14} weight={700} color={Colors.light.arancioDes} styles={{ textDecorationLine: "underline", marginLeft: 10 }}>Accedi</BaseText>
              </View> */}
              <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                <BaseText color={Colors.light.nero} size={14} weight={300} styles={{ textDecorationLine: "underline" }}>
                  {" Password dimenticata?"}
                </BaseText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.bianco,
  },
  btn: {
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: '100%',
    backgroundColor: Colors.light.newviola,
    marginTop: 20
  },
  footerButtonContainer: {
    marginBottom: 15,
    marginTop: 35,
  },
  forgotPasswordButtonText: {
    color: Colors.light.nero,
  },
  backButton: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  shadowBtn: {
    shadowColor: Colors.light.nero,
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 10
    },
    shadowRadius: 10,
  }
});

export default Login;

{/* <View>
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
    </View> */}