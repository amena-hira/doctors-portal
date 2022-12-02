// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBS6QgDl_OArHUclGCTGdoxSmDA2Ch9RoE",
  authDomain: "doctors-portal-20586.firebaseapp.com",
  projectId: "doctors-portal-20586",
  storageBucket: "doctors-portal-20586.appspot.com",
  messagingSenderId: "350553045285",
  appId: "1:350553045285:web:1fa9379ebef8a4d3e2c2cc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;