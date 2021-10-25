import firebase from 'firebase/app';
import 'firebase/firestore'

let firebaseConfig = {
    apiKey: "AIzaSyC8t5j75htkEG4o0ogHj5565Bgmn_SoAH8",
    authDomain: "infinityreact-80aef.firebaseapp.com",
    projectId: "infinityreact-80aef",
    storageBucket: "infinityreact-80aef.appspot.com",
    messagingSenderId: "207684008287",
    appId: "1:207684008287:web:09338694823815a29b1eea",
    measurementId: "G-D6PXJJM457"
  };

  // Initialize Firebase
  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
  }

export default firebase;