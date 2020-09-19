import * as firebase from "firebase";
import * as AppleAuthentication from "expo-apple-authentication";
import * as Crypto from "expo-crypto";

type Result = {
  success?: boolean;
  cancelled?: boolean;
  error?: any;
};

export const signInApple = async (): Promise<Result> => {
  try {
    //const nonce = getRandomID();
    const csrf = Math.random().toString(36).substring(2, 15);
    const nonce = Math.random().toString(36).substring(2, 10);
    const hashedNonce = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, nonce);
    const { identityToken, email, state } = await AppleAuthentication.signInAsync({
      requestedScopes: [
        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        AppleAuthentication.AppleAuthenticationScope.EMAIL
      ],
      state: csrf,
      nonce: hashedNonce
    });
    if (identityToken) {
      const provider = new firebase.auth.OAuthProvider("apple.com");
      //const credential = provider.credential(identityToken); // TODO: nonce check process
      const credential = provider.credential({
        idToken: identityToken,
        rawNonce: nonce // nonce value from above
      });
  
      firebase
        .auth()
        .signInWithCredential(credential)
        .catch(error => {
          console.log("---errorSingInApple---", error)
          //throw new Error(error);
        });
      return { success: true };
    }

    return { cancelled: true };
  } catch (e) {
    if (e.code === "ERR_CANCELED") {
      console.log("---SingInApple--- login cancellato", e)
      return { cancelled: true };
    }

    console.warn("---SingInApple--- error", e);
    return { error: e };
  }
};

export const isLoginAvailable = async () => await AppleAuthentication.isAvailableAsync();

//const getRandomID = () => {
//  const db = firebase.firestore();
//  return db.collection("randomId").doc().id;
//};

export const isAvailableSignInWithApple = async (): Promise<boolean> => {
  // return false;
  return await AppleAuthentication.isAvailableAsync();
};