import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCQVqHFGZKChi_2fBHAZCB-XCCsojrF4tg",
    authDomain: "american-technion-society.firebaseapp.com",
    projectId: "american-technion-society",
    storageBucket: "american-technion-society.appspot.com",
    messagingSenderId: "174237356040",
    appId: "1:174237356040:web:59d790e5d7995ad49341bd"
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const storage = getStorage(app);
export const auth = getAuth(app);