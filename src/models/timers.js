import { auth, firestore } from '@/firebase_config.js';

const STORAGE_KEY = 'timers-vuejs-3.0';

const loadTimers = cb => {
  firestore
    .collection('timers')
    .where('uid', '==', auth.currentUser.uid)
    .orderBy('created')
    .get()
    .then(snapshot => {
      let result = {};
      snapshot.docs.forEach(doc => {
        result[doc.id] = doc.data();
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(result));
      cb(JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'));
    });
};

const createTimer = () => {
  return firestore
    .collection('timers')
    .add({ uid: auth.currentUser.uid })
    .then(docRef => docRef.id);
};

const updateTimer = (timerId, timerData) => {
  const docRef = firestore.collection('timers').doc(timerId);
  return docRef.update(timerData);
};

const deleteTimer = timerId => {
  const docRef = firestore.collection('timers').doc(timerId);
  return docRef.delete();
};

export default {
  createTimer,
  updateTimer,
  deleteTimer,
  loadTimers
};
