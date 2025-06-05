
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA6uUpfDuyBZ_0eT98QdjpbnAW4KrWuSEE",
  authDomain: "groceries-80c90.firebaseapp.com",
  projectId: "groceries-80c90",
  storageBucket: "groceries-80c90.firebasestorage.app",
  messagingSenderId: "808525799767",
  appId: "1:808525799767:web:ce4147e1c03d28d9c41e12",
  measurementId: "G-LPQMCJSWPV"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
