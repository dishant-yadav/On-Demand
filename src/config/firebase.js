import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBJj75b8cvNUSvmpe4KKnR_6rBjX5h3dZc",
  authDomain: "ondemand-294d6.firebaseapp.com",
  projectId: "ondemand-294d6",
  storageBucket: "ondemand-294d6.appspot.com",
  messagingSenderId: "487048758071",
  appId: "1:487048758071:web:b02926ecaaf5125b3150b2",
  databaseURL: "https://ondemand-294d6-default-rtdb.firebaseio.com/",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export { app, auth, database };
