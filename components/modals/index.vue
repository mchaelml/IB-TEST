<template>
  <div>
    <client-only>
      <Center :isShown="isModalOpen('center')" :closeModal="() => closeModal('center')" />
    </client-only>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';

import Center from './Center.vue';

interface Methods {
  closeModal: (modal: string) => void;
  isModalOpen: (modal: string) => boolean;
}

interface Computed {
  modals: Record<string, any>;
}

export default Vue.extend<unknown, Methods, Computed, unknown>({
  components: {
    Center
  },
  computed: {
    ...mapGetters({ modals: 'modalState', isError: 'isError' })
  },
  methods: {
    isModalOpen(modal) {
      return this.modals[modal];
    },
    closeModal(modal) {
      this.$store.commit('toggleModal', { modal, centerType: null, loading: false, id: null });
    }
  }
});
</script>
