<template>
  <div class="error">
    <img :src="imageSrc" class="error__img" />
    <Button title="home" whiteText class="bg-gradient account__actions__btn error__btn" @click.native="backToMain" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

interface Computed {
  imageSrc: string;
}

interface Methods {
  backToMain: () => void;
}

export default Vue.extend<unknown, Methods, Computed, unknown>({
  computed: {
    imageSrc() {
      return require('~/assets/images/not-found.png');
    }
  },
  methods: {
    backToMain() {
      this.$router.push('/');
    }
  }
});
</script>

<style lang="scss" scoped>
.error {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: get-padding(xxxl) get-padding(l);
  justify-content: center;
  align-items: center;
  align-content: center;
  gap: 50px;
  &__img {
    margin: get-margin(xxxl) auto;
    width: 290.4px;
  }
  &__btn {
    border: 1px solid get-color('primary');
  }
}
</style>
