// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyByuN1YSEz7HPKKi4PB7LC7PLsydOiYEF8",
  authDomain: "nextjs-starter-716f2.firebaseapp.com",
  projectId: "nextjs-starter-716f2",
  storageBucket: "nextjs-starter-716f2.appspot.com",
  messagingSenderId: "668108371119",
  appId: "1:668108371119:web:df5a03eeae1f00b42c905a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const firestore = getFirestore();