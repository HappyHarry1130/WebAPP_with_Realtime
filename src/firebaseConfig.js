import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBKuRMMiy8dVve9TRJfYoUa57OX5VeeUgs",
  authDomain: "realtimemvp-a9dca.firebaseapp.com",
  projectId: "realtimemvp-a9dca",
  storageBucket: "realtimemvp-a9dca.firebasestorage.app",
  messagingSenderId: "964655615724",
  appId: "1:964655615724:web:f7202c7d30e66b7ffa5fc9",
  measurementId: "G-CRK7255EQC"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const functions = getFunctions(app);