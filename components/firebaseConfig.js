// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, onMessage, getToken } from 'firebase/messaging';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDao2vh4_Wtkn0QV7zcA-bnQAgcIMBtqj8",
  authDomain: "zetachi-f3200.firebaseapp.com",
  projectId: "zetachi-f3200",
  storageBucket: "zetachi-f3200.appspot.com",
  messagingSenderId: "189216852448",
  appId: "1:189216852448:web:e5de449f21e8070d118385",
  measurementId: "G-6KGEK3SPT5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export { messaging };