import Vue from "vue"
import Vuex from "vuex"
import {now} from "moment"
import timersModel from "@/models/timers"
import actions from "@/storeActions"
import TYPES from '@/components/Types.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    timers: {}
  },
  mutations: {
    setTimer(state, key) {
      let timer = state.timers[key];
      timer.history = timer.history || [];
      if (timer.last) {
        timer.history.push(timer.last);
      }
      timer.last = now();
    },
    createTimer(state, {timerId, timerData}) {
      console.log('mutation', timerId, timerData);
      if (timerData.type === TYPES.toggle) {
        timerData.last = timerData.value1;
      }
      state.timers[timerId] = timerData;
    }
  },
  actions: {
    setTimer({commit, state}, timerId) {
      console.log(timerId);
      commit(actions.SET_TIMER, timerId);
      timersModel.updateTimer(timerId, state.timers[timerId]);
    },
    async createTimer({commit, state}, timerData) {
      console.log('action', timerData);
      const timerId = await timersModel.createTimer();
      commit(actions.CREATE_TIMER, {timerId, timerData});
      timersModel.updateTimer(timerId, state.timers[timerId]);
    },
    loadTimers({state}) {
      timersModel.loadTimers((timers) => state.timers = timers);
    },
    updateUser (state, { user }) {
      Vue.set(state, 'user', user)
    },
  }
});
