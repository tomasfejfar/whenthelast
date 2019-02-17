<template lang="html">
  <div id="firebaseui-auth-container"></div>
</template>
<script>
import { auth, firebase } from '@/firebase_config';
import firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';

export default {
  name: 'auth',
  mounted() {
    const uiConfig = {
      signInSuccessUrl: this.$route.params.nextUrl || '/',
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ]
    };
    const ui = new firebaseui.auth.AuthUI(auth);
    ui.start('#firebaseui-auth-container', uiConfig);
  }
};
</script>
