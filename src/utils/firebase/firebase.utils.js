import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  signInWithRedirect, 
  signInWithPopup, 
  GoogleAuthProvider 
} from "firebase/auth";
import {
  doc,
  getDoc,
  setDoc,
  getFirestore,
} from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAFBO1p2nFLqDS1d4IeLktzlyK_Ep_aAe8",
  authDomain: "crwn-clothing-db-2cdd3.firebaseapp.com",
  projectId: "crwn-clothing-db-2cdd3",
  storageBucket: "crwn-clothing-db-2cdd3.appspot.com",
  messagingSenderId: "78055133777",
  appId: "1:78055133777:web:464416fa578729580e5e70"
};

const firebaseApp = initializeApp(firebaseConfig);


const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  'propmt': 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

const db = getFirestore(firebaseApp);

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if(!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      });
    } catch(error) {
      console.log('Error creating the user:',error.message);
    }
  }

  return userDocRef;
}
