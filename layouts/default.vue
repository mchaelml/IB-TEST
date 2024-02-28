<template>
  <div class="page-wrapper">
    <Modals />
    <Header />
    <Nuxt />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Modals from '~/components/modals/index.vue';
import Header from '~/components/navigation/Header.vue';

export default Vue.extend({
  name: 'default',
  middleware: 'routeGuard',
  components: {
    Header,
    Modals
  }
});
</script>

<style lang="scss" scoped>
.page-wrapper {
  background: get-color('primary');
  @media (min-width: $large-desktop) {
    min-width: unset;
    width: $large-desktop;
    margin: auto;
  }
}
</style>
