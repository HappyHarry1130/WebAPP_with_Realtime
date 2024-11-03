import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/database"

const firebaseConfig = {
  apiKey: "AIzaSyBKuRMMiy8dVve9TRJfYoUa57OX5VeeUgs",
  authDomain: "realtimemvp-a9dca.firebaseapp.com",
  projectId: "realtimemvp-a9dca",
  storageBucket: "realtimemvp-a9dca.firebasestorage.app",
  messagingSenderId: "964655615724",
  appId: "1:964655615724:web:f7202c7d30e66b7ffa5fc9",
  measurementId: "G-CRK7255EQC"
};

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig)
}

export default firebase