import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCeqjXA3FTTH_WGcmCqOqSa3VmDB4nd2AA",
  authDomain: "ichiban-sangu-adoobi.firebaseapp.com",
  projectId: "ichiban-sangu-adoobi",
  storageBucket: "ichiban-sangu-adoobi.firebasestorage.app",
  messagingSenderId: "956261995807",
  appId: "1:956261995807:web:5c9e4ad6bcfc1138c8cc2a"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;