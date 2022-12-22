// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCHQLJvwXny-rd5r43VlajXdo1awfJq9SE",
  authDomain: "finalquize.firebaseapp.com",
  projectId: "finalquize",
  storageBucket: "finalquize.appspot.com",
  messagingSenderId: "143722641321",
  appId: "1:143722641321:web:f7165237764c43b26e36b8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app