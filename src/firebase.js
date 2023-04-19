import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyABxuwVz5o95k5thfRg2qEuaGm2GvYk3XI",
  authDomain: "react-practica-final.firebaseapp.com",
  projectId: "react-practica-final",
  storageBucket: "react-practica-final.appspot.com",
  messagingSenderId: "321312458850",
  appId: "1:321312458850:web:cbd21da0db0fa3a421293b",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
