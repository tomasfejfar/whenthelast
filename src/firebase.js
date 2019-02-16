import firebase from "firebase";

var config = {
  apiKey: "AIzaSyBBiyl0p2rEfUmbMbUI9rEf8DLh-CS-FIU",
  authDomain: "when-the-last.firebaseapp.com",
  databaseURL: "https://when-the-last.firebaseio.com",
  projectId: "when-the-last",
  storageBucket: "",
  messagingSenderId: "47917094003"
};
const app = firebase.initializeApp(config);
const firestore = firebase.firestore();
firestore.settings({timestampsInSnapshots: true});

export {
  app,
  firestore,
};
