import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBJBUErKt56fAf0FRTScnBo-maCwCtvYfg",
    authDomain: "pharmastudy-auth.firebaseapp.com",
    projectId: "pharmastudy-auth",
    storageBucket: "pharmastudy-auth.appspot.com",
    messagingSenderId: "897204747548",
    appId: "1:897204747548:web:5f72bcc733f6d85eb64ed9",
    measurementId: "G-64TR4JNTFZ"
  };

  const app = initializeApp(firebaseConfig);

  export const auth = getAuth(app);