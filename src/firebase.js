// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCvKM4nWvSXKfb88jPfyM_iLCol1vhh4Y8",
  authDomain: "inksight-ab604.firebaseapp.com",
  projectId: "inksight-ab604",
  storageBucket: "inksight-ab604.firebasestorage.app",
  messagingSenderId: "519543175852",
  appId: "1:519543175852:web:1e96b46b88eac80f423d09",
  measurementId: "G-EQKVEKK83P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
