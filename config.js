import firebase from 'firebase/app'
require('@firebase/firestore')

var firebaseConfig = {
    apiKey: "AIzaSyAuHaxku4WrVlAchHl2XnPsi0dV4OI2BP0",
    authDomain: "willy-app-e2021.firebaseapp.com",
    databaseURL:"https://willy-app-e2021.firebaseio.com",
    projectId: "willy-app-e2021",
    storageBucket: "willy-app-e2021.appspot.com",
    messagingSenderId: "801561086402",
    appId: "1:801561086402:web:a05737ae3b466bbf586e5b"
  };
 // Initialize Firebase
 firebase.initializeApp(firebaseConfig);

 export default firebase.firestore();