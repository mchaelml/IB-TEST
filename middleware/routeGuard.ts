import { Context } from '@nuxt/types';

export default (context: Context) => {
  const { store, redirect, route } = context;
  const extraInfo = store.getters.modalState.extraInfo;
  const checkedRoutes = ['positive-decision', 'negative-decision'];

  if (!extraInfo && checkedRoutes.findIndex((r) => r === route.name) !== -1) redirect('/');
};
