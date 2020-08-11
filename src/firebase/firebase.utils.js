import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth'

const config = {
  apiKey: "AIzaSyCzufhrmvqBacBDfLJ0HlfL9ayM2wvIRgE",
  authDomain: "crwn-db-577a0.firebaseapp.com",
  databaseURL: "https://crwn-db-577a0.firebaseio.com",
  projectId: "crwn-db-577a0",
  storageBucket: "crwn-db-577a0.appspot.com",
  messagingSenderId: "1035195338180",
  appId: "1:1035195338180:web:3cc9885878a8dfc9f76891"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if(!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
