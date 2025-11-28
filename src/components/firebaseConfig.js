// firebaseConfig.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// TODO: GANTI dengan konfigurasi Firebase milik kamu
const firebaseConfig = {
  apiKey: "AIzaSyBDPLgH66OsxpefA7hO1g1gxSi-iQIn8o8",
  authDomain: "nazril-portfolio-chat.firebaseapp.com",
  projectId: "nazril-portfolio-chat",
  storageBucket: "nazril-portfolio-chat.appspot.com", // <-- FIX
  messagingSenderId: "336304134640",
  appId: "1:336304134640:web:2dab0167bdd6cf8cd8e535",
  measurementId: "G-7DLEH0JQPD"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);
