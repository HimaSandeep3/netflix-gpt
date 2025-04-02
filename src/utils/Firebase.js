// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBDLanNqJ8KV9mb8cLEjHPfYMtVbyXD5Ro",
  authDomain: "netflixgpt-71d6a.firebaseapp.com",
  projectId: "netflixgpt-71d6a",
  storageBucket: "netflixgpt-71d6a.firebasestorage.app",
  messagingSenderId: "807168027794",
  appId: "1:807168027794:web:ad7875fa4cc7d2b532ca4b",
  measurementId: "G-C0VYT3PV53"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();