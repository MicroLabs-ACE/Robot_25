import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBXtncUrWk4PyudK33I4Y9meivKL07APBU",
  authDomain: "robotwaiter-ddf9f.firebaseapp.com",
  databaseURL: "https://robotwaiter-ddf9f-default-rtdb.firebaseio.com",
  projectId: "robotwaiter-ddf9f",
  storageBucket: "robotwaiter-ddf9f.firebasestorage.app",
  messagingSenderId: "273414692008",
  appId: "1:273414692008:web:30c634ea2d8d23886af69d" // You'll need to provide the actual App ID
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);