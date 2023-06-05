import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC7D30N6YIqGUYbr_EEwL0KG5bp_0uHhkQ",
  authDomain: "login-75f3a.firebaseapp.com",
  projectId: "login-75f3a",
  storageBucket: "login-75f3a.appspot.com",
  messagingSenderId: "557771513975",
  appId: "1:557771513975:web:77448d87edaa682933a672",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
export { app, auth };
