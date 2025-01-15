import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIza...YOUR_API_KEY",
  authDomain: "fintt-f8479.firebaseapp.com",
  projectId: "fintt-f8479",
  storageBucket: "fintt-f8479.appspot.com",
  messagingSenderId: "113725028417258551792",
  appId: "1:113725028417258:web:abcd1234",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
