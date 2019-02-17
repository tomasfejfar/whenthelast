const firebase = require('firebase');

var config = {
  apiKey: "AIzaSyBBiyl0p2rEfUmbMbUI9rEf8DLh-CS-FIU",
  authDomain: "when-the-last.firebaseapp.com",
  databaseURL: "https://when-the-last.firebaseio.com",
  projectId: "when-the-last",
  storageBucket: "",
  messagingSenderId: "47917094003"
};
const app = firebase.initializeApp(config);
const firestore = firebase.firestore().enablePersistence()
  .catch(function(err) {
    if (err.code === 'failed-precondition') {
      alert('You have when-the-last opened in multiple tabs. That is not supported')
    } else if (err.code === 'unimplemented') {
      alert('Cannot use persistence');
      // The current browser does not support all of the
      // features required to enable persistence
      // ...
    }
  });
const auth = firebase.auth();

export {
  app,
  firestore,
  auth,
  firebase
};
