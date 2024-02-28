import { routerComponents } from './routerComponents';

const routes = [
  {
    name: 'main',
    path: '/',
    component: routerComponents.Main
  },
  {
    name: 'positive-decision',
    path: '/positive-decision',
    component: routerComponents.PositiveDecision
  },
  {
    name: 'negative-decision',
    path: '/negative-decision',
    component: routerComponents.NegativeDecision
  },

  {
    name: 'notFound',
    path: '/not-found',
    component: routerComponents.NotFound
  },
  {
    path: '*',
    redirect: 'not-found'
  }
];

export default routes;
