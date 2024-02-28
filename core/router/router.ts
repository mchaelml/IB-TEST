import Vue from 'vue';
import Router from 'vue-router';
import routerBase from './router.base';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: routerBase,
  scrollBehavior() {
    return { x: 0, y: 0 };
  }
});

export function createRouter() {
  return router;
}
