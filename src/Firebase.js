// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // ✅ add this

const firebaseConfig = {
  apiKey: "AIzaSyBUWB4zTXqbjiqbBrSEEFFc9BFdVWtiAtY",
  authDomain: "mileesha-automobile.firebaseapp.com",
  projectId: "mileesha-automobile",
  storageBucket: "mileesha-automobile.firebasestorage.app",
  messagingSenderId: "1015722689002",
  appId: "1:1015722689002:web:48b8f18547e7fe968ff293",
  measurementId: "G-P9GBBQ2LHC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

// Providers
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

// ✅ Initialize Firestore
const db = getFirestore(app);

// ✅ Export everything
export { auth, googleProvider, facebookProvider, db };
