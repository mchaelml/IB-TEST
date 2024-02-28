<template>
  <div class="header">
    <nuxt-link to="/" class="header__title"><Icon class="header__logo" name="logo" color="black" /></nuxt-link>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Header'
});
</script>

<style lang="scss" scoped>
$dd-width: 90px;
.header {
  padding: get-padding(l) * 2 get-padding(m) * 5;
  display: flex;
  align-items: center;
  top: 0;
  height: $navbar-height;
  justify-content: space-between;
  &__title {
    color: get-color('primary');
    font-size: 30px;
  }
  &__logo {
    width: 180px;
  }
  @media (max-width: $mobile) {
    height: $navbar-heigth-mobile;
    padding: get-padding(m) * 2;
    &__logo {
      width: 113px;
    }
  }
}
</style>
