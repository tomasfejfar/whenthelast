import {firestore}from '@/firebase';

const STORAGE_KEY = 'timers-vuejs-2.0';

const loadTimers = () => {
  firestore.collection('timers').get().then((snapshot) => {
    console.log(snapshot);
    //docs = snapshot.docs;
  });
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
};

const saveTimers = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export default {
  saveTimers,
  loadTimers
}
