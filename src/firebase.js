import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBoyRe_U_-3anTG3DBEVjl5omKlEMTKztY",
  authDomain: "popn-data.firebaseapp.com",
  databaseURL: "https://popn-data-default-rtdb.firebaseio.com",
  projectId: "popn-data",
  storageBucket: "popn-data.firebasestorage.app",
  messagingSenderId: "812509996870",
  appId: "1:812509996870:web:34823b18b6e36dd4e5a747",
  measurementId: "G-125CCG15YR"
};

const app = initializeApp(firebaseConfig)
const db = getFirestore(app);

export { db };
