<template>
  <div class="timers md-layout md-gutter md-alignment-center-space-between">
    <Timer
      v-for="timer in timers"
      v-bind:key="timer.id"
      v-bind:timer="timer"
    />

  </div>
</template>

<script>
  // @ is an alias to /src
  import Timer from "@/components/Timer.vue";
  import { mapState } from 'vuex'

  export default {
    name: "home",
    components: {
      Timer
    },
    computed: mapState([
      'timers'
    ])
  };
</script>
