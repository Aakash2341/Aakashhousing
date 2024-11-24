// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-app2341.firebaseapp.com",
  projectId: "mern-app2341",
  storageBucket: "mern-app2341.appspot.com",
  messagingSenderId: "1037064813450",
  appId: "1:1037064813450:web:88c6ac02f4e086d053a673",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
