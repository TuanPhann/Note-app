// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD3GsL3e5OYCI3cHGBijlxnjDFr5x6Eo7s",
  authDomain: "note-app-5ddde.firebaseapp.com",
  projectId: "note-app-5ddde",
  storageBucket: "note-app-5ddde.appspot.com",
  messagingSenderId: "1046465754945",
  appId: "1:1046465754945:web:ddf52157a3b39aa9f893c0",
  measurementId: "G-NT40M29KNQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// eslint-disable-next-line no-unused-vars
const analytics = getAnalytics(app);
