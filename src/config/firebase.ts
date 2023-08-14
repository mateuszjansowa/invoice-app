import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "faktursowa.firebaseapp.com",
  projectId: "faktursowa",
  storageBucket: "faktursowa.appspot.com",
  messagingSenderId: "812642928373",
  appId: "1:812642928373:web:af2abb4fb2ec56d222e7bc",
  measurementId: "G-MG6XE2C687",
};

const app = initializeApp(firebaseConfig);

// * auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// * firestore db
export const db = getFirestore(app);

// * firestore files bucket
export const storage = getStorage(app);
