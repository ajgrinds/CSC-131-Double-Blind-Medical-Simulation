import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBNBwEbptYEO3AGqhrLuH9IyCohbp_evfQ",
  authDomain: "pharmastudy-auth-5df81.firebaseapp.com",
  projectId: "pharmastudy-auth-5df81",
  storageBucket: "pharmastudy-auth-5df81.appspot.com",
  messagingSenderId: "509017548513",
  appId: "1:509017548513:web:ed157ec768a54376fbf9a0",
  measurementId: "G-K80M4T79N2"
};

  const app = initializeApp(firebaseConfig);

  export const auth = getAuth(app);
  