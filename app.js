// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth"

import dotenv from "dotenv/config"
// console.log(process.env)
const {API_KEY, AUTH_DOMAIN, PROJECT_ID, APP_ID, MASTER_EMAIL, MASTER_PASSWORD} = process.env

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey:API_KEY,
  authDomain:AUTH_DOMAIN,
  projectId:PROJECT_ID,
  appId:APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Initialize Firebase Auth
const db = getFirestore(app); // Initialize Firestore