import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Importa Firestore
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth'; // Importa Auth

import AsyncStorage from "@react-native-async-storage/async-storage"; 

const firebaseConfig = {
  apiKey: "AIzaSyAuqkz_IIR3h_CsA5ka1NxhCyw7Ql6byb4",
  authDomain: "chasquillapp-96988.firebaseapp.com",
  projectId: "chasquillapp-96988",
  storageBucket: "chasquillapp-96988.appspot.com",
  messagingSenderId: "966767300370",
  appId: "1:966767300370:web:f5705703f79208e65e6dcb",
  measurementId: "G-TTKEWJYS59"
};

export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {   persistence: getReactNativePersistence(AsyncStorage) })

export const db = getFirestore(app);