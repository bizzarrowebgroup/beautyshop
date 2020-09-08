import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';

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

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();

export const loginWithEmail = (email, password) =>
    auth.signInWithEmailAndPassword(email, password);

export const registerWithEmail = (email, password) =>
    auth.createUserWithEmailAndPassword(email, password);

export const logout = () => auth.signOut();

export const passwordReset = email => auth.sendPasswordResetEmail(email);

export const db = firebase.firestore();