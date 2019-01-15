import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";

Vue.config.productionTip = false;
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import moment from 'moment'

Vue.use(VueMaterial );



Vue.filter('timeSince', function(time) {
  if (time) {
    let duration = moment.duration(moment().diff(moment(time)));
    if (duration.asHours() < 24) {
      return moment().hours(duration.hours()).minutes(duration.minutes()).format('HH:mm');
    }
    return duration.humanize();
  }
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount("#app");

store.dispatch('loadTimers');
