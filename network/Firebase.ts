import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import * as Facebook from 'expo-facebook';

//import { resolvePlugin } from '@babel/core';

// import firebaseConfig from './firebaseConfig';

// Initialize Firebase App
const firebaseConfig = {
  apiKey: "AIzaSyDTRi3LQzoW4dMkbfPOpZVayYyMkYyp0ac",
  authDomain: "beautyshop-afe23.firebaseapp.com",
  databaseURL: "https://beautyshop-afe23.firebaseio.com",
  projectId: "beautyshop-afe23",
  storageBucket: "beautyshop-afe23.appspot.com",
  messagingSenderId: "470013044742",
  appId: "1:470013044742:web:c5cabae0efe0f2da96bb87"
}

function generatePassword() {
  var length = 8,
    charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    retVal = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();

export const loginWithEmail = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

export const registerFromNotFound = async (user, email, phone) => {
  let password = generatePassword();
  let profileUrl = "https://eu.ui-avatars.com/api/?size=200&rounded=true&name=" + user + "&background=DF7865&color=FFF";

  //console.log("---Newaccount---");
  //console.log("---user---", user);
  //console.log("---phone---", phone);
  //console.log("---email---", email);
  //console.log("---pass---", password);
  //console.log("---photoURL---", profileUrl);
  try {
    let userId = await auth.createUserWithEmailAndPassword(email, password).then(result => {
      var user = result.user;
      if (user) {
        return user.uid;
      } else {
        return undefined;
      }
      //console.log(user, "---userCreated---");
    });
    if (userId !== undefined) {
      await auth.currentUser.updateProfile({
        displayName: user,
        photoURL: profileUrl
      }).then((result) => {
        console.log(result, "updatedProfile");
      }).catch((error) => {
        console.log("---updatedProfile-error---", error);
      });
      let userToDB = {
        userId,
        phone: phone,
        pwd: password,
        loyalitypoints: 150, // when we register a new user we give him 150 points :D
        notificationToken: "",
        notificationsEnabled: false,
      }
      const res = await db.collection('utentiApp').add(userToDB);
      console.log("---utentiAppID---", res.id);
      return userId;
    } else {
      console.log("---noUserId---")
    }
  } catch (error) {
    console.warn("---cannotRegisterCurrentUser---", error);
    return null;
  }
}

export const signInWithFacebook = async () => {
  try {
    await Facebook.initializeAsync('3483388645055624');
    //});
    const {
      type,
      token,
      expirationDate,
      permissions,
      declinedPermissions,
    } = await Facebook.logInWithReadPermissionsAsync({
      permissions: ['public_profile'],
    });
    if (type === 'success') {
      // Get the user's name using Facebook's Graph API
      const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,birthday,picture.type(large)`);
      let fbData = await response.json();
      if (fbData) {
        const { picture, name, birthday } = fbData;
        //console.log("---picture---", picture.data.url)
        //console.log("---fbData---", fbData)
        await auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
        const credential = firebase.auth.FacebookAuthProvider.credential(token);
        try {
          let userId = await auth.signInWithCredential(credential);
          await auth.currentUser.updateProfile({
            displayName: name,
            photoURL: picture.data.url
          }).then((result) => {
            console.log(result, "---logInWithFB-updateProfile---");
          }).catch((error) => {
            console.log("---logInWithFB-updateProfile-error---", error);
          });
          //console.log("---token---", token)
          //console.log("---credential---", credential)
          //console.log("---signInWithCredential---", userId)
          let { user } = userId;
          if (user.uid !== '') {
            let userToDB = {
              //birthday: birthday,
              userId: user.uid,
              phone: '',
              pwd: '',
              loyalitypoints: 150, // when we register a new user we give him 150 points :D
              notificationToken: '',
              notificationsEnabled: false,
            }
            const res = await db.collection('utentiApp').add(userToDB);
            console.log("---utentiAppID-AGGIUNTO---", res.id);
            return user.uid;
          } else {
            return alert("ERRORE REGISTRAZIONE FB SOCIAL 003-30-2")
          }
        } catch (error) {
          var errorCode = error.code;
          // var errorMessage = error.message;
          // The email of the user's account used.
          // var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          // var credentialError = error.credential;
          if (errorCode === 'auth/account-exists-with-different-credential') {
            alert('Email già associata con un altro provider social.');
          } else {
            console.error(error);
          }
        }

      }
      console.info('Logged in!', `Ciao ${fbData.name}!`);
    } else {
      // type === 'cancel'
      if (type === 'cancel') alert(`Hai deciso di annullare il login con Facebook`)
    }
  } catch ({ message }) {
    alert(`Facebook Register Error: ${message}`);
  }
}

export const logInWithFacebook = async () => {
  try {
    await Facebook.initializeAsync('3483388645055624');
    //});
    const {
      type,
      token,
    } = await Facebook.logInWithReadPermissionsAsync({
      permissions: ['public_profile'],
    });
    if (type === 'success') {
      await auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
      const credential = firebase.auth.FacebookAuthProvider.credential(token);
      try {
        let userId = await auth.signInWithCredential(credential);
        let { additionalUserInfo, operationType, user, } = userId;
        return console.log("---userGOT---", userId)
        if (user.uid !== '') {
          return user.uid;
        } else {
          return alert("ERRORE LOGIN FB SOCIAL 003-30-1")
        }
      } catch (error) {
        var errorCode = error.code;
        if (errorCode === 'auth/account-exists-with-different-credential') {
          alert('Email già associata con un altro provider social.');
        } else if (errorCode === 'auth/user-not-found') {
          const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,birthday,picture.type(large)`);
          let fbData = await response.json();
          if (fbData) {
            const { picture, name, birthday } = fbData;
            //console.log("---picture---", picture.data.url)
            //console.log("---fbData---", fbData)
            try {
              let userId = await auth.signInWithCredential(credential);
              await auth.currentUser.updateProfile({
                displayName: name,
                photoURL: picture.data.url
              }).then((result) => {
                console.log(result, "---logInWithFB-updateProfile---");
              }).catch((error) => {
                console.log("---logInWithFB-updateProfile-error---", error);
              });
              //console.log("---token---", token)
              //console.log("---credential---", credential)
              //console.log("---signInWithCredential---", userId)
              let { user } = userId;
              if (user.uid !== '') {
                let userToDB = {
                  //birthday: birthday,
                  userId: user.uid,
                  phone: '',
                  pwd: '',
                  loyalitypoints: 150, // when we register a new user we give him 150 points :D
                  notificationToken: '',
                  notificationsEnabled: false,
                }
                const res = await db.collection('utentiApp').add(userToDB);
                console.log("---utentiAppID-AGGIUNTO---", res.id);
                return user.uid;
              } else {
                return alert("ERRORE Registrazione post login FB SOCIAL")
              }
            } catch (error) {
              var errorCode = error.code;
              // var errorMessage = error.message;
              // The email of the user's account used.
              // var email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              // var credentialError = error.credential;
              //if (errorCode === 'auth/account-exists-with-different-credential') {
              //alert('Email già associata con un altro provider social.');
              //} else {
              console.error(error);
              //}
            }

          }
          console.info('Registrato post login in!', `Benvenuto ${fbData.name}!`);
        } else {
          console.error(error);
        }
      }
    } else {
      // type === 'cancel'
      if (type === 'cancel') alert(`Hai deciso di annullare il login con Facebook`)
    }
  } catch ({ message }) {
    alert(`Facebook Register Error: ${message}`);
  }
}

export const registerWithEmail = (email, password) =>
  auth.createUserWithEmailAndPassword(email, password);

export const logout = () => auth.signOut();

export const passwordReset = email => auth.sendPasswordResetEmail(email);

export const db = firebase.firestore();
export const dbVal = firebase.firestore;