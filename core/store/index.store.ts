import { MutationTree, GetterTree, ActionTree } from 'vuex';
import { RootState } from './store-types';
import { ModalActions } from '~/types';

export interface State {
  modalState: {
    loading: boolean;
    left: boolean;
    center: boolean;
    centerType: ModalActions | null;
    right: boolean;
    id: null | string;
    extraInfo: {
      period?: number;
      amount?: number;
      first_name?: string;
    } | null;
  };
}

type ModalKey = Pick<State['modalState'], 'left' | 'center' | 'right'>;
type ModalType = keyof ModalKey;

const initialModalsState = {
  loading: false,
  left: false,
  center: false,
  centerType: null,
  right: false,
  id: null,
  extraInfo: null
};

export const state: () => State = () => ({
  modalState: initialModalsState
});

export const getters: GetterTree<State, RootState> = {
  modalState(state) {
    return state.modalState;
  }
};

export const mutations: MutationTree<RootState> = {
  toggleModal(state, { modal, centerType, id, loading = false, center = false, extraInfo = null }) {
    const newModal = {
      ...initialModalsState,
      [modal]: modal && !state.modalState[modal as ModalType],
      centerType: centerType || state.modalState.centerType,
      center: center,
      id: id || state.modalState.id,
      loading,
      extraInfo: extraInfo == null ? state.modalState.extraInfo : { ...state.modalState.extraInfo, ...extraInfo }
    };
    state.modalState = newModal;
  },
  setModalExtraInfo(state, extraInfo) {
    state.modalState.extraInfo = { ...state.modalState.extraInfo, ...extraInfo };
  }
};

export const actions: ActionTree<RootState, Record<string, any>> = {};
