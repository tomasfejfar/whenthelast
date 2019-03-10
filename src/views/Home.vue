<template>
  <div
    class="timers md-layout md-gutter md-alignment-center-space-between"
    v-visibility-change="visibilityChange"
  >
    <Timer
      v-for="(timer, timerKey) in timers"
      v-bind:key="timerKey"
      v-bind:timer="timer"
      v-bind:timerKey="timerKey"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import Timer from '@/components/Timer.vue';
import { mapState } from 'vuex';

export default {
  name: 'home',
  components: {
    Timer
  },
  data: () => ({
    interval: null
  }),
  created: function() {
    this.interval = setInterval(() => this.$forceUpdate(), 60000);
  },
  computed: mapState(['timers']),
  methods: {
    visibilityChange(event) {
      const document = event.target;
      if (document.visibilityState === 'visible') {
        this.interval = setInterval(() => this.$forceUpdate(), 60000);
      } else {
        clearInterval(this.interval);
      }
    }
  }
};
</script>
