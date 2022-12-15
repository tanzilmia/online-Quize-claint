// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRKiffPYXQJq_tNjIyiI0AX9JsW-_pCJE",
  authDomain: "quize-react-7df23.firebaseapp.com",
  projectId: "quize-react-7df23",
  storageBucket: "quize-react-7df23.appspot.com",
  messagingSenderId: "331285544321",
  appId: "1:331285544321:web:9c72d1dd4a64e1095cfc80"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app