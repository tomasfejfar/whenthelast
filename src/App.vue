<template>
  <div id="app">
    <md-app>
        <md-app-toolbar class="md-primary">
          <span class="md-title" style="flex: 1;">When the last</span>
          <md-button @click="$router.push('/add')">Add timer</md-button>
          <md-button @click="$router.push('/')" class="md-primary">Home</md-button>
        </md-app-toolbar>

      <md-app-content>
        <router-view/>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data: () => ({
    })
  }
</script>

<style lang="scss">
</style>
