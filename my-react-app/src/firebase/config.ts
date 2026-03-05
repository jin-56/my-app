import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyABMZW0zLK0opZvYafFXTysqGI4kA1V1_4",
  authDomain: "internet-66.firebaseapp.com",
  projectId: "internet-66",
  storageBucket: "internet-66.firebasestorage.app",
  messagingSenderId: "1088643736320",
  appId: "1:1088643736320:web:c89097ec783abe3c7f09e5",
  measurementId: "G-RHTT58GPE1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);