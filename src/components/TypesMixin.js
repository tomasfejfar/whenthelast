const TYPES = {
  timer: 1,
  toggle: 2
};

export default {
  computed: {
    isTimer() {
      return this.timer.type === TYPES.timer;
    },
    isToggle() {
      return this.timer.type === TYPES.toggle;
    },

  }
};
