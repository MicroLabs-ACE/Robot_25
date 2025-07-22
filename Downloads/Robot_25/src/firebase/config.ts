import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAsRInc6VuX8C4y4crfaz4HuFEIfllLwls",
  authDomain: "oakrobotapp.firebaseapp.com",
  databaseURL: "https://oakrobotapp-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "oakrobotapp",
  storageBucket: "oakrobotapp.appspot.com",
  messagingSenderId: "222391980922",
  appId: "1:222391980922:web:751d5764129f593080bcc3" // You'll need to provide the actual App ID
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);