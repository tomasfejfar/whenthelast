import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    timers: [{
      "title": "Test",
      "type": 1,
      "color": "#ffffff",
      "last": "2018-12-17T20:39:16.828Z",
      "id": 0
    }, {"title": "Test", "type": 2, "color": "#ffffff", "values": ["odd", "even"], "value": "even", "id": 1}]
  },
  mutations: {},
  actions: {}
});
