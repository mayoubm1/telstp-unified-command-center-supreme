import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyBvOkBwNQI0GrAVsrrlCpXHI4k-IHxHBdE",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "m2-3m-telstp.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "m2-3m-telstp",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "m2-3m-telstp.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:123456789:web:abcdef123456"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const functions = getFunctions(app);