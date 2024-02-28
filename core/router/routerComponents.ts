export const Main = () =>
  import(/* webpackChunkName: "page/index" */ '../../pages/index.vue').then((m) => m.default || m);
export const PositiveDecision = () =>
  import(/* webpackChunkName: "page/positive-decision" */ '../../pages/positive-decision.vue').then(
    (m) => m.default || m
  );
export const NegativeDecision = () =>
  import(/* webpackChunkName: "page/negative-decision" */ '../../pages/negative-decision.vue').then(
    (m) => m.default || m
  );
export const NotFound = () =>
  import(/* webpackChunkName: "page/not-found" */ '../../pages/not-found.vue').then((m) => m.default || m);

export const routerComponents = {
  Main,
  PositiveDecision,
  NegativeDecision,
  NotFound
};
