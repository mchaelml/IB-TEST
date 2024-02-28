import { RootState } from './store-types';
import { mutations, state, getters, actions } from './index.store';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store<RootState>({
  state,
  mutations,
  getters,
  actions
});

export default store;
