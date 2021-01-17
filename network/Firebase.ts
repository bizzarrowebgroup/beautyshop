import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import * as Facebook from 'expo-facebook';
import * as GoogleSignIn from 'expo-google-sign-in';
import Constants from 'expo-constants';

//import * as Google from 'expo-google-app-auth';

//import * as AppAuth from 'expo-app-auth';
//import * as Application from 'expo-application';

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

const getPushNotificationPermissions = async (result) => {
  //const { status: existingStatus } = await Permissions.getAsync(
  //  Permissions.NOTIFICATIONS
  //);
  //let finalStatus = existingStatus;

  //// only ask if permissions have not already been determined, because
  //// iOS won't necessarily prompt the user a second time.
  //if (existingStatus !== "granted") {
  //  // Android remote notification permissions are granted during the app
  //  // install, so this will only ask on iOS
  //  const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  //  finalStatus = status;
  //}

  // Stop here if the user did not grant permissions
  //if (finalStatus !== "granted") {
  //  return;
  //}
  //console.log(finalStatus);
  //this.currentUser = await firebase.auth.currentUser;
  //return await Notifications.getExpoPushTokenAsync();
};
// let pushToken = await getPushNotificationPermissions();
// console.log(push_token: pushToken)

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

//export const signInWithFacebook = async () => {
//  try {
//    await Facebook.initializeAsync('3483388645055624');
//    //});
//    const {
//      type,
//      token,
//      expirationDate,
//      permissions,
//      declinedPermissions,
//    } = await Facebook.logInWithReadPermissionsAsync({
//      permissions: ['public_profile'],
//    });
//    if (type === 'success') {
//      // Get the user's name using Facebook's Graph API
//      const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,birthday,picture.type(large)`);
//      let fbData = await response.json();
//      if (fbData) {
//        const { picture, name, birthday } = fbData;
//        //console.log("---picture---", picture.data.url)
//        //console.log("---fbData---", fbData)
//        await auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
//        const credential = firebase.auth.FacebookAuthProvider.credential(token);
//        try {
//          let userId = await auth.signInWithCredential(credential);
//          await auth.currentUser.updateProfile({
//            displayName: name,
//            photoURL: picture.data.url
//          }).then((result) => {
//            console.log(result, "---logInWithFB-updateProfile---");
//          }).catch((error) => {
//            console.log("---logInWithFB-updateProfile-error---", error);
//          });
//          //console.log("---token---", token)
//          //console.log("---credential---", credential)
//          //console.log("---signInWithCredential---", userId)
//          let { user } = userId;
//          if (user.uid !== '') {
//            let userToDB = {
//              //birthday: birthday,
//              userId: user.uid,
//              phone: '',
//              pwd: '',
//              loyalitypoints: 150, // when we register a new user we give him 150 points :D
//              notificationToken: '',
//              notificationsEnabled: false,
//            }
//            const res = await db.collection('utentiApp').add(userToDB);
//            console.log("---utentiAppID-AGGIUNTO---", res.id);
//            return user.uid;
//          } else {
//            return {
//              type: "error",

//            }
//            //return alert("ERRORE REGISTRAZIONE FB SOCIAL 003-30-2")
//          }
//        } catch (error) {
//          var errorCode = error.code;
//          // var errorMessage = error.message;
//          // The email of the user's account used.
//          // var email = error.email;
//          // The firebase.auth.AuthCredential type that was used.
//          // var credentialError = error.credential;
//          if (errorCode === 'auth/account-exists-with-different-credential') {
//            alert('Email già associata con un altro provider social.');
//          } else {
//            console.error(error);
//          }
//        }

//      }
//      console.info('Logged in!', `Ciao ${fbData.name}!`);
//    } else {
//      // type === 'cancel'
//      if (type === 'cancel') alert(`Hai deciso di annullare il login con Facebook`)
//    }
//  } catch ({ message }) {
//    alert(`Facebook Register Error: ${message}`);
//  }
//}

export const logInWithFacebook = async () => {
  try {
    await Facebook.initializeAsync({
      //appId: "3483388645055624",
      appId: Constants.manifest.facebookAppId.toString(),
      autoLogAppEvents: true,
      version: 'v9.0',
    });
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
        let { additionalUserInfo, operationType, user } = userId;
        //return console.log("---userGOT---", userId)
        //console.log("----additionalUserInfo----", additionalUserInfo)
        //console.log("----operationType----", operationType)
        //console.log("----user----", user)
        let isRegistered = await db.collection('utentiApp').doc(user.uid).get();
        if (isRegistered.exists) {
          // the user is already registered
          let data = isRegistered.data();
          let toBecompleted = data.toBecompleted;
          const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,picture`);
          let fbData = await response.json();
          if (fbData && toBecompleted === true) {
            const { name, picture } = fbData;
            await auth.currentUser.updateProfile({
              photoURL: picture.data.url
            });
            return { type: "login_facebook", userid: user.uid, toBecompleted, nomecognome: name };
          } else if (fbData) {
            const { name, picture } = fbData;
            await auth.currentUser.updateProfile({
              photoURL: picture.data.url
            });
            return { type: "login_facebook", userid: user.uid };
          } else {
            let error = "fbData error fetching from graph.facebook";
            console.log(error, token)
            return { type: "error", message: error }
          }
        } else {
          // the user is not registered yet
          const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,birthday,picture.type(large)`);
          let fbData = await response.json();
          if (fbData) {
            const { picture, name } = fbData;
            try {
              await auth.currentUser.updateProfile({
                displayName: name,
                photoURL: picture.data.url
              });
              let userToDB = {
                userId: user.uid,
                phone: '',
                pwd: '',
                loyalitypoints: 150, // when we register a new user we give him 150 points :D
                notificationToken: '',
                notificationsEnabled: false,
                displayName: name,
                toBecompleted: true,
                photoURL: picture.data.url,
                regTime: Date.now()
              }
              await db.collection('utentiApp').doc(user.uid).set(userToDB);
              return {
                type: "register_facebook",
                userid: user.uid,
                nomecognome: name,
              };
            } catch (error) {
              var errorCode = error.code;
              console.log(error, token)
              return { type: "error", message: error }
            }
          } else {
            let error = "fbData error fetching from graph.facebook";
            console.log(error, token)
            return { type: "error", message: error }
          }
        }
      } catch (error) {
        var errorCode = error.code;
        if (errorCode === 'auth/account-exists-with-different-credential') {
          return { type: "error", message: 'Email già associata con un altro provider social.' }
        } else if (errorCode === 'auth/user-not-found') {
          return { type: "error", message: error }
        } else {
          return { type: "error", message: error }
        }
      }
    } else {
      if (type === 'cancel') {
        console.log("login FB annullato")
      }
    }
  } catch ({ message }) {
    console.log("login FB annullato", message)
  }
}
//latest_login: Date.now(),
export const loginWithGoogle = async () => {
  try {
    //const result = await Google.logInAsync({
    //  iosClientId: "470013044742-nfbf3icicc1ro6udt1l1tnhh8m70ofa8.apps.googleusercontent.com",
    //  iosStandaloneAppClientId: "470013044742-69pbts2tm4280vunsoekk4ebkf5l3t8s.apps.googleusercontent.com",
    //  scopes: ['openid', 'profile', 'email'],
    //});
    //if (result.type === "success") {
    //  await auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    //  const credential = firebase.auth.GoogleAuthProvider.credential(result.idToken);
    //}
    await GoogleSignIn.askForPlayServicesAsync();
    const { type, user } = await GoogleSignIn.signInAsync();
    if (type === "success") {
      await auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
      const credential = firebase.auth.GoogleAuthProvider.credential(
        user.auth.idToken,
        user.auth.accessToken
      );
      let accessToken = user.auth.accessToken;
      try {
        /*
            "user": Object {
            "email": "jon.canevese@gmail.com",
            "familyName": "Derewith",
            "givenName": "Jonathan",
            "id": "115015219048164220061",
            "name": "Jonathan Derewith",
            "photoUrl": "https://lh4.googleusercontent.com/-W6BG8FgkGlM/AAAAAAAAAAI/AAAAAAAAAqk/AMZuucn4KK5Z_DlDAfDOBhcRjx9_kpfR8A/s96-c/photo.jpg",
          }, 
        */
        let userId = await auth.signInWithCredential(credential);
        let { user } = userId;
        let isRegistered = await db.collection('utentiApp').doc(user.uid).get();
        if (isRegistered.exists) {
          // the user is already registered
          let data = isRegistered.data();
          let toBecompleted = data.toBecompleted;
          if (toBecompleted) {
            let userInfoResponse = await fetch('https://www.googleapis.com/userinfo/v2/me', {
              headers: { Authorization: `Bearer ${accessToken}` },
            });
            //const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name`);
            let gData = await userInfoResponse.json();
            if (gData) {
              //alert(JSON.stringify(gData))
              //console.log("--fbData--", gData)
              const { name, email } = gData;
              return { type: "login_google", userid: user.uid, toBecompleted, nomecognome: name, email: email };
            } {
              let error = "gData error fetching from graph.facebook";
              //console.log(error, user.auth.accessToken)
              return { type: "error", message: error }
            }
          } else {
            return { type: "login_google", userid: user.uid };
          }
        } else {
          // the user is not registered yet
          let userInfoResponse = await fetch('https://www.googleapis.com/userinfo/v2/me', {
            headers: { Authorization: `Bearer ${accessToken}` },
          });

          //const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,birthday,picture.type(large)`);
          let fbData = await userInfoResponse.json();
          if (fbData) {
            //console.log("---gData--", fbData);
            //alert(JSON.stringify(fbData))
            const { picture, name, email } = fbData;
            try {
              await auth.currentUser.updateProfile({
                displayName: name,
                photoURL: picture
              });
              let userToDB = {
                userId: user.uid,
                email: email,
                phone: '',
                pwd: '',
                loyalitypoints: 150, // when we register a new user we give him 150 points :D
                notificationToken: '',
                notificationsEnabled: false,
                displayName: name,
                toBecompleted: true,
                photoURL: picture
              }
              await db.collection('utentiApp').doc(user.uid).set(userToDB);
              return {
                type: "register_google",
                userid: user.uid,
                nomecognome: name,
                email: email,
              };
            } catch (error) {
              var errorCode = error.code;
              console.log(error)
              return { type: "error", message: error }
            }
          } else {
            let error = "fbData error fetching from graph.facebook";
            console.log(error)
            return { type: "error", message: error }
          }
        }
      } catch (error) {
        console.error(error);
        var errorCode = error.code;
        if (errorCode === 'auth/account-exists-with-different-credential') {
          return { type: "error", message: 'Email già associata con un altro provider social.' }
        } else if (errorCode === 'auth/user-not-found') {
          return { type: "error", message: error }
        } else {
          return { type: "error", message: error }
        }
      }
    } else {
      //console.log("login G annullato -- result", result)
      return { type: "error", message: "login con Google annullato" }
    }
  } catch ({ message }) {
    console.log("login G annullato", message)
    return { type: "error", message: "login con Google annullato" + message }
  }
}

export const completeSocialProfile = async ({ email, phone, name, userId, newsletter, privacy, cookie }) => {
  try {
    await auth.currentUser.updateProfile({
      displayName: name,
    });
    let userToUpdate = {
      phone,
      email,
      newsletter,
      privacy,
      cookie,
      displayName: name,
      toBecompleted: false,
    }
    await db.collection('utentiApp').doc(userId).update(userToUpdate);
    return {
      type: "complete_social",
      userId,
    };
  } catch (error) {
    return {
      type: "error",
      userId,
      error
    };
  }
}

export const registerWithEmail = (email, password) =>
  auth.createUserWithEmailAndPassword(email, password);

export const logout = () => auth.signOut();

export const passwordReset = email => auth.sendPasswordResetEmail(email);

export const db = firebase.firestore();
export const dbVal = firebase.firestore;