import Vue from "vue"
import Vuex from "vuex"
import {now} from "moment"
import timersModel from "@/models/timers"
import actions from "@/storeActions"
import {v4 as uuid} from "uuid"
import TYPES from '@/components/Types.js';


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    timers: {}
  },
  mutations: {
    setTimer(state, key) {
      let timer = state.timers[key];
      timer.history = timer.history || [];
      timer.history.push(timer.last);
      timer.last = now();
    },
    createTimer(state, timer) {
      const newKey = uuid();
      timer.id = newKey;
      if (timer.type === TYPES.toggle) {
        timer.last = timer.value1;
      }
      state.timers[newKey] = timer;
    }
  },
  actions: {
    setTimer({commit, state}, timerKey) {
      commit(actions.SET_TIMER, timerKey);
      timersModel.saveTimers(state.timers);
    },
    createTimer({commit, state}, timerData) {
      console.log(timerData);
      debugger;
      commit(actions.CREATE_TIMER, timerData);
      timersModel.saveTimers(state.timers);
    },
    loadTimers({state}) {
      state.timers = timersModel.loadTimers();
    }
  }
});
