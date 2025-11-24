// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBPYYTXH8_Lh0ITbtr4-0MbB2dPSlLzdPc",
  authDomain: "mahanta-e7c57.firebaseapp.com",
  projectId: "mahanta-e7c57",
  storageBucket: "mahanta-e7c57.firebasestorage.app",
  messagingSenderId: "803170334620",
  appId: "1:803170334620:web:7daa97d5ef1d4b48677a59",
  measurementId: "G-6RP5F7J8YR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db, analytics };
export default app;