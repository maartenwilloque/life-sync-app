import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBSAYm5w0GND0te7s_vxp39TCJKl2m0lek",
  authDomain: "life-sync-willoque.firebaseapp.com",
  projectId: "life-sync-willoque",
  storageBucket: "life-sync-willoque.firebasestorage.app",
  messagingSenderId: "11197182",
  appId: "1:11197182:web:2b5e67fbef4bfc064c23af"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;
