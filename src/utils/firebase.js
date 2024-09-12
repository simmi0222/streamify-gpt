// Import the functions you need from the SDKs 
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBUibeHo9oG_J-nzpx5VD3XUCh-RWK-RTI",
    authDomain: "netflix-34675.firebaseapp.com",
    projectId: "netflix-34675",
    storageBucket: "netflix-34675.appspot.com",
    messagingSenderId: "622047803653",
    appId: "1:622047803653:web:0b687060d5c18ef9779f6c",
    measurementId: "G-JY39X9PK6J"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();

// ----------------------------------------------------------------------------------------------------------

// 3.Install Firebase CLI ->
// npm install -g firebase-tools

// 4.Deploy to Firebase Hosting ->
// firebase login
// firebase init
// firebase deploy

// Steps 3rd & 4th will give firebase.json & firebaserc files----->

