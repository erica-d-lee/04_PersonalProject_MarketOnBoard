import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDX2Dn4zUpkCWBtKltF6mDij48MaGQJJ6s",
  authDomain: "react-market-onboard.firebaseapp.com",
  projectId: "react-market-onboard",
  storageBucket: "react-market-onboard.appspot.com",
  messagingSenderId: "172041952515",
  appId: "1:172041952515:web:957858b78df4c2b0609d36",
  measurementId: "G-ZHNNXLYV89"
};

firebase.initializeApp(firebaseConfig);

const apiKey = firebaseConfig.apiKey;
const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();
const realtime = firebase.database();

export {auth, apiKey, firestore, storage, realtime};