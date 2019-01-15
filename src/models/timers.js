const STORAGE_KEY = 'timers-vuejs-2.0';

const loadTimers = () => {
  const timers = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  timers.forEach(function (timer, index) {
    timer.id = index
  });
  return timers;
};

const saveTimers = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export default {
  saveTimers,
  loadTimers
}
