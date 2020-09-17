 // const [signInWithAppleAvailable, setSignInWithAppleAvailable] = React.useState(false);
  // const [isLogged, setisLogged] = React.useState(false);
  // const [loading, setloading] = React.useState(false);
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