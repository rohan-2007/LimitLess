import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database"

const firebaseConfig = {
    // apiKey: "AIzaSyAjjYWXJC2MdczhTK-4Eo0mjtz3M2-whUY",
    // authDomain: "calculus-app-447a8.firebaseapp.com",
    projectId: "calculus-app-447a8",
    // storageBucket: "calculus-app-447a8.appspot.com",
    // messagingSenderId: "620609044009",
    // appId: "1:620609044009:web:f1cfa64ae9cd983e936638",
    // measurementId: "G-VBJTMVYVFT",
    databaseURL: "https://calculus-app-447a8-default-rtdb.firebaseio.com/"
};
  
const _app = initializeApp(firebaseConfig);
const db = getDatabase(_app)
// const firestore = getFirestore(app);
export { db };