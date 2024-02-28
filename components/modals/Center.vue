<template>
  <Modal v-show="isShown" :isAutoHeight="isAutoHeight" side="center" :show="isShown" @close="closeModal">
    <component
      :is="modalComponent"
      :action="action"
      :id="id"
      :title="title"
      :placeholder="placeholder"
      :extraInfo="extraInfo"
      :name="name"
      @close="closeModal"
    />
  </Modal>
</template>

<script lang="ts">
import { mapGetters } from 'vuex';
import Vue from 'vue';

import { ModalActions } from '@/types';
import CustomerForm from './modalContents/CustomerForm.vue';

interface Data {
  method: string | null;
  name: string | null;
  placeholder: string | null;
  action: string | null;
  title: string | null;
  id: string | null | undefined;
  extraInfo: null | Record<string, string>;
}

interface Computed {
  modals: Record<string, any>;
  modalComponent: string | null | undefined;
  centerModalType: string;
  isError: boolean;
  modalsExtraInfo: Record<string, string> | null;
  isAutoHeight: boolean;
}

interface Props {
  isShown: boolean;
  closeModal: () => void;
}

export default Vue.extend<Data, unknown, Computed, Props>({
  components: {
    CustomerForm
  },
  props: {
    isShown: Boolean,
    closeModal: Function
  },
  data() {
    return {
      method: null,
      name: null,
      placeholder: null,
      action: null,
      title: null,
      id: null,
      extraInfo: null
    };
  },
  computed: {
    ...mapGetters({ modals: 'modalState', isError: 'isError' }),

    centerModalType() {
      return this.modals?.centerType;
    },
    modalsExtraInfo() {
      return this.modals?.extraInfo;
    },
    isAutoHeight() {
      return true;
    },
    modalComponent() {
      if (this.centerModalType) {
        switch (this.centerModalType) {
          case ModalActions.customer_form:
            this.title = 'Customer form';
            this.placeholder = '';
            this.action = ModalActions.customer_form;
            return 'CustomerForm';
          default:
            return;
        }
      }
      return null;
    }
  },
  watch: {
    modals() {
      this.id = this.modals.id;
    }
  }
});
</script>
