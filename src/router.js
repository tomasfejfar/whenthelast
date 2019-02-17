import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
//import {auth} from '@/firebase_config.js'

Vue.use(Router);

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/add',
      name: 'add',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Add.vue')
    },
    {
      path: '/logout',
      name: 'logout',
      component: () =>
        import(/* webpackChunkName: "logout" */ './views/Logout.vue'),
      meta: {
        public: true
      }
    },
    {
      path: '/auth',
      name: 'auth',
      component: () =>
        import(/* webpackChunkName: "auth" */ './views/Auth.vue'),
      meta: {
        public: true
      }
    }
  ]
});

/*router.beforeEach((to, from, next) => {
  if (to.matched.some(record => !record.meta.public)) {
    if (auth.currentUser === null) {
      next({
        path: '/auth',
        params: { nextUrl: to.fullPath }
      })
    } else {
      next();
    }
  } else {
    next();
  }

});*/
export default router;
