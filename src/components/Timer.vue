<template>
  <div class="col-md-3 timer" :key="timer.id">
    <div v-bind:style="{ backgroundColor: timer.color }" class="timer-inner">
      <span style="float:right">&times;</span>
      <h4>{{ timer.title }}</h4>
      <span v-if="isTimer">{{ timer.last }}</span>
      <span v-if="isToggle">{{ timer.value }}</span>
    </div>
  </div>
</template>

<script>
import TYPES from "@/components/Types.js";

export default {
  name: "Timer",
  props: {
    timer: Object,
  },
  computed: {
    isTimer() {
      return this.timer.type === TYPES.timer;
    },
    isToggle() {
      return this.timer.type === TYPES.toggle;
    },

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.timer {
  cursor: pointer;
  margin: 0.25em;
}

.timer-inner {
  border-radius: 0.75em;
  padding: 0.5em;
}

h1 {
  color: white;
  background: grey;
}
</style>
