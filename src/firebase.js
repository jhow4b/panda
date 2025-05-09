import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC3tqH3iWWjFMxBR3BMciardyfqndElQ5E",
  authDomain: "harry-potter-1a151.firebaseapp.com",
  projectId: "harry-potter-1a151",
  storageBucket: "harry-potter-1a151.firebasestorage.app",
  messagingSenderId: "1017593523516",
  appId: "1:1017593523516:web:7998e8b5db27775d128239",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
