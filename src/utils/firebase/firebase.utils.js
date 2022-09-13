import { initializeApp } from "firebase/app";
import { 
  getAuth,
  signInWithPopup, 
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
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

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  'propmt': 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

const db = getFirestore(firebaseApp);

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInfo = {},
  ) => {
    if (!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt,
          ...additionalInfo,
        });
      } catch(error) {
        console.log('Error creating the user:',error.message);
      }
    }
  return userDocRef;
}

export const createAuthUserFromEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserFromEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);
