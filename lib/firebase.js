// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB81f9ERyJj68pB9Z_Q1CcDLjTJiIJZo7E",
  authDomain: "smoothrecipes.firebaseapp.com",
  projectId: "smoothrecipes",
  storageBucket: "smoothrecipes.appspot.com",
  messagingSenderId: "697065636720",
  appId: "1:697065636720:web:b743c4e82e21f3631245b5",
  measurementId: "G-5B9MN64YTB",
};

// Initialize Firebase

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
