import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getDatabase, ref, push } from 'firebase/database';
import 'firebase/compat/database';

const firebaseConfig = {
  apiKey: "AIzaSyBm3CFlSGWEVDyPhdy0ImFaoYpvC9maN3Y",
  authDomain: "fifasts-8ff43.firebaseapp.com",
  projectId: "fifasts-8ff43",
  storageBucket: "fifasts-8ff43.appspot.com",
  messagingSenderId: "741387634142",
  appId: "1:741387634142:web:67f1bd238be8ff86b4494f"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const database = getDatabase();