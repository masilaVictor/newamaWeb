import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getDatabase} from "firebase/database";
import "firebase/auth";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBkhrRq4Q7_73yHA0s5sG9hWsFH5CnOGY4",
  authDomain: "newama.firebaseapp.com",
  databaseURL: "https://newama-default-rtdb.firebaseio.com",
  projectId: "newama",
  storageBucket: "newama.appspot.com",
  messagingSenderId: "502070336801",
  appId: "1:502070336801:web:7989f20449aad56d4cb260",
  measurementId: "G-7417JNWW1K"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const db = getDatabase(app);
