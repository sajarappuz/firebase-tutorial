// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider, signOut} from "firebase/auth";
import { Firestore, getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAYWSDC_GRIFujBLbqsl4vpf5chdTaenn0",
  authDomain: "fir-tutorial-fca8c.firebaseapp.com",
  projectId: "fir-tutorial-fca8c",
  storageBucket: "fir-tutorial-fca8c.appspot.com",
  messagingSenderId: "955098715745",
  appId: "1:955098715745:web:7e8c6cd783cba730fa3c20",
  measurementId: "G-CCSG6ECB3T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);