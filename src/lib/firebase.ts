// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBbpsxhcsjnBN1f_cSXRyygBvXGMk6vfEw",
  authDomain: "alt-acad-proj.firebaseapp.com",
  projectId: "alt-acad-proj",
  storageBucket: "alt-acad-proj.firebasestorage.app",
  messagingSenderId: "593162688057",
  appId: "1:593162688057:web:66ca4062c2d2ec1a279fe8",
  measurementId: "G-N9QHM04DCS"
};

// Initialize Firebase
// We add a check to see if the app is already initialized to prevent errors in the Next.js environment.
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
