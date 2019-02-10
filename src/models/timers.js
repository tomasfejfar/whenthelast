const STORAGE_KEY = 'timers-vuejs-2.0';

const loadTimers = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
};

const saveTimers = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export default {
  saveTimers,
  loadTimers
}
