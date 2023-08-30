import { getAuth } from "@firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyC7g-2Yj21D1aM0q7-UZgIapY7dTSL-fCQ",
    authDomain: "feedzin-1201f.firebaseapp.com",
    projectId: "feedzin-1201f",
    storageBucket: "feedzin-1201f.appspot.com",
    messagingSenderId: "1024844111996",
    appId: "1:1024844111996:web:d39c308ad18eaf5a0fa9f9",
    measurementId: "G-D5KJSSB68V"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const firebaseApp = initializeApp(firebaseConfig);
export const storage = getStorage(app);