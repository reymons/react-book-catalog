import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDo1nuXRaE8RxTUZUcVnova46AZsKh20zk",
  authDomain: "react-book-catalog.firebaseapp.com",
  projectId: "react-book-catalog",
  storageBucket: "react-book-catalog.appspot.com",
  messagingSenderId: "855823173113",
  appId: "1:855823173113:web:166ef9939511553abf2928"
};

firebase.initializeApp(firebaseConfig);

export default firebase;