// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDi6GKlH6jUjrhu6mIP_e0E4MzL2q5SLJ4",
    authDomain: "surf-f05b4.firebaseapp.com",
    databaseURL: "https://surf-f05b4-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "surf-f05b4",
    storageBucket: "surf-f05b4.appspot.com",
    messagingSenderId: "42644834293",
    appId: "1:42644834293:web:7ecee028d6c7582a4a82bc",
    measurementId: "G-ED7BV4HRW9"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);