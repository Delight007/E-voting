import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBHjbCf_mXiogdl1XIjvsQMpOkZQa3rda4",
  authDomain: "evoting-b307a.firebaseapp.com",
  projectId: "evoting-b307a",
  storageBucket: "evoting-b307a.firebasestorage.app",
  messagingSenderId: "91533739055",
  appId: "1:91533739055:web:09230d0f0e0987925472da",
  measurementId: "G-LY69LG40M0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
