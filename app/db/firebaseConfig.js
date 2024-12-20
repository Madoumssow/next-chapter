import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {getAuth} from "firebase/auth"


const firebaseConfig = {
  apiKey: "AIzaSyDSm_63QC60I7EGSccWMtYxACZUATubjq8",
  authDomain: "next-chapter-18926.firebaseapp.com",
  projectId: "next-chapter-18926",
  storageBucket: "next-chapter-18926.firebasestorage.app",
  messagingSenderId: "509121977017",
  appId: "1:509121977017:web:b1de4797048d955fbd1968"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)