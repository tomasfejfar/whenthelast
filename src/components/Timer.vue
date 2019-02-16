<template>
  <md-card class="md-layout-item md-xsmall-size-100 md-elevation-6" :key="timerKey">

    <md-card-header>{{ timer.title }}</md-card-header>
    <md-card-content>
      <span v-if="isTimer">{{ timer.last | timeSince }}</span>
      <span v-if="isToggle">{{ timer.value }}</span>
    </md-card-content>
    <md-card-actions>
      <md-button @click="setTimer()" class="md-primary">Set</md-button>
      <md-button>Delete</md-button>
    </md-card-actions>
  </md-card>
</template>

<script>
  import TYPES from "@/components/Types.js";
  import actions from "@/storeActions";

  export default {
    name: "Timer",
    props: {
      timer: Object,
      timerKey: String,
    },
    computed: {
      isTimer() {
        return this.timer.type === TYPES.timer;
      },
      isToggle() {
        return this.timer.type === TYPES.toggle;
      },
    },
    methods: {
      setTimer() {
        console.log('in timer', this.timer, this.timerKey);
        this.$store.dispatch(actions.SET_TIMER, this.timerKey)
      }
    },
    mounted: function () {
      let vue = this;
      if (this.timer.type === TYPES.timer) {
        setInterval(function () {
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
