// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-c466c.firebaseapp.com",
  projectId: "mern-estate-c466c",
  storageBucket: "mern-estate-c466c.appspot.com",
  messagingSenderId: "531190559624",
  appId: "1:531190559624:web:a1f7529f0ac41cd318003d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);