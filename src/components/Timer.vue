<template>
  <md-card
    class="md-layout-item md-xsmall-size-100 md-elevation-6"
    :key="timerKey"
  >
    <md-card-header>{{ timer.title }}</md-card-header>
    <md-card-content>
      <span v-if="isTimer">{{ timer.last | timeSince }}</span>
      <span v-if="isToggle">{{ timer.value }}</span>
    </md-card-content>
    <md-card-actions>
      <md-button @click="setTimer()" class="md-primary">Set</md-button>

      <md-button @click="showDialog = true" class="md-icon-button"
        ><md-icon>history</md-icon></md-button
      >
      <md-button @click="deleteTimer()" class="md-icon-button"
        ><md-icon>clear</md-icon></md-button
      >
    </md-card-actions>
    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>History</md-dialog-title>

      <ul v-if="isTimer && timer.history && timer.history.length">
        <li v-for="past in timer.history" v-bind:key="past">
          {{ past | humanize }} ({{ past | timeSince }} ago)
        </li>
        <li>{{ timer.last | humanize }} ({{ timer.last | timeSince }} ago)</li>
      </ul>

      <ul v-if="isToggle && timer.history && timer.history.length">
        <li v-for="past in timer.history" v-bind:key="past.last">
          {{ past.value }} ({{ past.last | timeSince }} ago)
        </li>
        <li>{{ timer.value }} ({{ timer.last | timeSince }} ago)</li>
      </ul>

      <md-dialog-actions>
        <md-button class="md-primary" @click="showDialog = false"
          >Close</md-button
        >
      </md-dialog-actions>
    </md-dialog>
  </md-card>
</template>

<script>
import TYPES from '@/components/Types.js';
import actions from '@/storeActions';

export default {
  name: 'Timer',
  props: {
    timer: Object,
    timerKey: String
  },
  data: () => ({
    showDialog: false
  }),
  computed: {
    isTimer() {
      return this.timer.type === TYPES.timer;
    },
    isToggle() {
      return this.timer.type === TYPES.toggle;
    }
  },
  methods: {
    setTimer() {
      this.$store.dispatch(actions.SET_TIMER, this.timerKey);
    },
    deleteTimer() {
      this.$store.dispatch(actions.DELETE_TIMER, this.timerKey);
    }
  },
  mounted: function() {
    let vue = this;
    if (this.timer.type === TYPES.timer) {
      setInterval(function() {
        vue.$forceUpdate();
      }, 10000);
    }
  }
};
</script>

<style scoped lang="scss">
.md-card {
  max-width: 320px;
  margin: 4px;
  /*display: inline-block;
    vertical-align: top;*/
}
</style>
