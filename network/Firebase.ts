import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import { resolvePlugin } from '@babel/core';

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

  console.log("---Newaccount---");
  console.log("---user---", user);
  console.log("---phone---", phone);
  console.log("---email---", email);
  console.log("---pass---", password);
  console.log("---photoURL---", profileUrl);
  try {
    let userId = await auth.createUserWithEmailAndPassword(email, password).then(result => {
      var user = result.user;
      console.log(user, "---userCreated---");
      return user.uid;
    });
    await auth.currentUser.updateProfile({
      displayName: user,
      photoURL: profileUrl
    }).then((result) => {
      console.log(result, "updatedProfile");
    }).catch((error) => {
      console.log(error, "updatedProfile-error");
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
    console.log('Added user with doc ID: ', res.id);
    return userId;
  } catch (error) {
    console.warn("cannotRegisterCurrentUser");
    return null;
  }
}

export const registerWithEmail = (email, password) =>
  auth.createUserWithEmailAndPassword(email, password);

export const logout = () => auth.signOut();

export const passwordReset = email => auth.sendPasswordResetEmail(email);

export const db = firebase.firestore();