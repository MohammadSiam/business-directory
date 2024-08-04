// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCyHJnzIrUBkTVMiLdfPIO1xFJaTvVLu50",
  authDomain: "simple-firebase-authenti-d0d48.firebaseapp.com",
  projectId: "simple-firebase-authenti-d0d48",
  storageBucket: "simple-firebase-authenti-d0d48.appspot.com",
  messagingSenderId: "193648165108",
  appId: "1:193648165108:web:6070c594b207e1665c1ea1",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
