import Vue from "vue"
import Vuex from "vuex"
import {now} from "moment"
import timersModel from "@/models/timers"
import actions from "@/storeActions"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    timers: []
  },
  mutations: {
    setTimer(state, key) {
      let timer = state.timers[key];
      timer.history = timer.history || [];
      timer.history.push(timer.last);
      timer.last = now();
    }
  },
  actions: {
    setTimer({commit, state}, timerKey) {
      commit(actions.SET_TIMER, timerKey);
      timersModel.saveTimers(state.timers);
    },
    loadTimers({state}) {
      state.timers = timersModel.loadTimers();
    }
  }
});
