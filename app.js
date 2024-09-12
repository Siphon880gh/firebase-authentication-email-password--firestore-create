// Require the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } = require("firebase/auth");
const { getFirestore, doc, setDoc } = require("firebase/firestore");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Destructure environment variables
const { API_KEY, AUTH_DOMAIN, PROJECT_ID, APP_ID, MASTER_EMAIL, MASTER_PASSWORD } = process.env;

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

// Function to create a user and add their data to Firestore
const createUserAndSaveToFirestore = async (auth, db, email, password) => {
  try {
    // Create a new user with the provided email and password
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    console.log("User created with UID:", user.uid);

    // Add the user document to Firestore using the user's UID
    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      createdAt: new Date().toISOString()
    });

    console.log("User document created in Firestore");
  } catch (error) {
    console.error("Error creating user or saving to Firestore:", error);
  }
};

// Function to log in with email and password
const loginWithEmailAndPassword = async (auth, email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    console.log("User logged in successfully with Firebase Authentication uid:", user.uid);
  
  } catch (error) {
    console.error("Error with logging in or with callback:", error);
  }
};

// Note to toggle the comments on and off for either Logging in or Creating the user:

// Login with email and password
// const email = MASTER_EMAIL;
// const password = MASTER_PASSWORD;
// loginWithEmailAndPassword(auth, email, password);

// Create the user
const email = MASTER_EMAIL;
const password = MASTER_PASSWORD;
createUserAndSaveToFirestore(auth, db, email, password);