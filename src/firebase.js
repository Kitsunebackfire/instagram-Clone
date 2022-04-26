// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBdopcrb_ZAHLxlFzQrzWKEVLSc4cL0FdQ",
  authDomain: "instagram-clone-6438d.firebaseapp.com",
  projectId: "instagram-clone-6438d",
  storageBucket: "instagram-clone-6438d.appspot.com",
  messagingSenderId: "975854496667",
  appId: "1:975854496667:web:bbbdc4bb9eec69d5794f3e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const postsColRef = collection(db, "posts");
const auth = getAuth();
const storage = getStorage(app);

export { postsColRef, db, auth, storage };
