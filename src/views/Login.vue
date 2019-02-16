<template>
  <div id="firebaseui-auth-container"></div>
</template>

<script>
  var firebaseui = require('firebaseui');
  var firebase = require('firebase');

  firebaseui.auth.AuthUI.start('#firebaseui-auth-container', {
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    // Other config options...
  });

  export default {
    name: 'Login'
  };
</script>
