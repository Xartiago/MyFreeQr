import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDyMAqX5TcOs1ff0a1WsQ0GTvdnFAT0LNQ",
  authDomain: "myfreeqr-4a1b8.firebaseapp.com",
  projectId: "myfreeqr-4a1b8",
  storageBucket: "myfreeqr-4a1b8.appspot.com",
  messagingSenderId: "990554032514",
  appId: "1:990554032514:web:35a239a4e5c1165ed5279b",
  measurementId: "G-JNF41TCEGT"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
