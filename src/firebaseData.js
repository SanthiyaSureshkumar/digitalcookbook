import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfig = {
 apiKey: "AIzaSyDHaDted8TrLBpiWQJjumZt3ZO9LwT-LEk",
  authDomain: "digital-cook-book.firebaseapp.com",
  projectId: "digital-cook-book",
  storageBucket: "digital-cook-book.appspot.com",
  messagingSenderId: "326016491123",
  appId: "1:326016491123:web:37cc9faba418d7a2b3d406",
  measurementId: "G-RYJE9HHC3C"
};

firebase.initializeApp(firebaseConfig);
//Checking if firebase has been initialized
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

export const getRecipe = async () => {
  await firestore()
    .collection("recipes")
    .get()
    .then((snap) => {
      let recipe = [];
      snap.docs.forEach((doc) => {
    
        recipe.push(doc.data());
      });
    });
};

export const firestore = firebase.firestore;

export const fireAuth = firebase.auth;
