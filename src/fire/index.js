import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: 'todoapp-ef980.firebaseapp.com',
  databaseURL: 'https://todoapp-ef980-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'todoapp-ef980',
  storageBucket: 'todoapp-ef980.appspot.com',
  messagingSenderId: '116269103681',
  appId: '1:116269103681:web:12b8fcb9413e43d85264c0',
  measurementId: 'G-J759669CJF',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const authentication = firebase.auth;
export const auth = firebase.auth();
export const database = firebase.database();
