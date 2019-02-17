<template>
  <div id="app">
    <md-app>
        <md-app-toolbar class="md-primary">
          <span class="md-title" style="flex: 1;">When the last</span>
          <md-button @click="$router.push('/')" class="md-primary">Home</md-button>
          <md-button @click="$router.push('/add')">Add timer</md-button>
          <md-button v-if="isLoggedIn" @click="$router.push('/auth')">Login</md-button>
          <md-button v-if="!isLoggedIn" @click="$router.push('/logout')">Logout</md-button>
        </md-app-toolbar>

      <md-app-content>
        <router-view/>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
  import {auth} from '@/firebase_config.js'

  export default {
    name: 'App',
    data: () => ({
    }),
    computed: {
      isLoggedIn: () => auth.currentUser !== null
    }
  }
</script>

<style lang="scss">
</style>
