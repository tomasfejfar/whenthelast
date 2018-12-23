<template>
  <div class="timers">
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

export default {
  name: "home",
  components: {
    Timer
  },
  computed: {
    timers () {
      return this.$store.state.timers;
    }
  }
};
</script>
