// firebase.js
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxIMuYf_YOUR_API_KEY",
  authDomain: "your-app.firebaseapp.com",
  projectId: "fintt-f8479",
  storageBucket: "your-app.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdefg12345",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

export { app, auth };
