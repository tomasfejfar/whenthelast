import Vue from 'vue';
import Vuex from 'vuex';
import { now } from 'moment';
import timersModel from '@/models/timers';
import actions from '@/storeActions';
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

      if (timer.type === TYPES.toggle) {
        timer.history.push({ value: timer.value, last: timer.last });
        timer.value === timer.value1
          ? (timer.value = timer.value2)
          : (timer.value = timer.value1);
      } else {
        if (timer.last) {
          timer.history.push(timer.last);
        }
      }
      timer.last = now();
    },
    createTimer(state, { timerId, timerData }) {
      timerData.last = now();
      Vue.set(state.timers, timerId, timerData);
    },
    deleteTimer(state, timerId) {
      Vue.delete(state.timers, timerId);
    }
  },
  actions: {
    async setTimer({ commit, state }, timerId) {
      commit(actions.SET_TIMER, timerId);
      await timersModel.updateTimer(timerId, state.timers[timerId]);
    },
    async createTimer({ commit, state }, timerData) {
      const timerId = await timersModel.createTimer();
      commit(actions.CREATE_TIMER, { timerId, timerData });
      timersModel.updateTimer(timerId, state.timers[timerId]);
    },
    loadTimers({ state }) {
      timersModel.loadTimers(timers => (state.timers = timers));
    },
    updateUser(state, { user }) {
      Vue.set(state, 'user', user);
    },
    deleteTimer({ commit }, timerId) {
      timersModel
        .deleteTimer(timerId)
        .then(commit(actions.DELETE_TIMER, timerId));
    }
  }
});
