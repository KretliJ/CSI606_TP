// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwDtfKoZlojTPwVMTtkQBbv5rdiCGngVM",
  authDomain: "sistemavoto-f272f.firebaseapp.com",
  projectId: "sistemavoto-f272f",
  storageBucket: "sistemavoto-f272f.firebasestorage.app",
  messagingSenderId: "394206872538",
  appId: "1:394206872538:web:7321f1bd66f1c161a176e3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export default app;
