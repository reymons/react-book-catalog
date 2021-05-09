import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCzhjL5kmDoyu9baGGhnH-dGOgAiNzVxpM",
  authDomain: "react-book-catalog-b3457.firebaseapp.com",
  projectId: "react-book-catalog-b3457",
  storageBucket: "react-book-catalog-b3457.appspot.com",
  messagingSenderId: "552036910915",
  appId: "1:552036910915:web:0e3e78422112d9883b11f6"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

export const firestore = firebase.firestore();

export default firebase;