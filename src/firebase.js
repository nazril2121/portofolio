// src/firebase.js
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBDPLgH66OsxpefA7hO1g1gxSi-iQIn8o8",
  authDomain: "nazril-portfolio-chat.firebaseapp.com",
  projectId: "nazril-portfolio-chat",
  storageBucket: "nazril-portfolio-chat.appspot.com",
  messagingSenderId: "336304134640",
  appId: "1:336304134640:web:2dab0167bdd6cf8cd8e535",
  measurementId: "G-7DLEH0JQPD"
};

// Init Firebase
const app = initializeApp(firebaseConfig);

// Auth
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export const loginWithGoogle = () => signInWithPopup(auth, provider);
export const logout = () => signOut(auth);

// Firestore
export const db = getFirestore(app);
