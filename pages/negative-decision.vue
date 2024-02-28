<template>
  <div class="negative-decision">
    <div class="negative-decision__container">
      <div class="negative-decision__container__header">
        <h1 class="negative-decision__container__header__title">Dear {{ name }}</h1>
        <p class="negative-decision__container__header__description">Unfortunately, your loan was denied.</p>
      </div>
      <div class="negative-decision__container__info">
        <p>In addition to your income and expenses, a number of other factors play a role in loan decisions.</p>
      </div>
      <Button title="Exit" fullWidth @click.native="returnToIndexPage" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import { State } from '~/core/store/index.store';

interface Computed {
  name: string;
  modalState: State['modalState'];
}

interface Methods {
  returnToIndexPage: () => void;
}

export default Vue.extend<unknown, Methods, Computed, unknown>({
  layout: 'default',
  computed: {
    ...mapGetters(['modalState']),
    name() {
      return this.modalState?.extraInfo?.first_name ?? '';
    }
  },
  methods: {
    returnToIndexPage() {
      this.$router.replace('/');
    }
  }
});
</script>

<style lang="scss" scoped>
.negative-decision {
  display: flex;
  margin: 0 24vw;
  &__container {
    @include flex-column;
    margin: get-margin(m) * 5 auto;
    gap: 40px;
    background-color: get-color('white');
    border-radius: get-border-radius(xl);
    align-items: center;
    justify-content: center;
    padding: get-padding(m) * 10 200px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.04);
    &__header {
      &__title {
        @extend %text-decision-large;
        font-family: 'Sebenta-Italic';
        text-align: center;
      }
      &__description {
        @extend %text-medium;
        margin-top: get-margin(m);
        text-align: center;
      }
    }
    &__info {
      border-top: 1px solid get-color('separator');
      border-bottom: 1px solid get-color('separator');
      padding: get-padding(m) * 2;
      & > p {
        @extend %text-small;
        text-align: center;
      }
    }
  }
  @media (max-width: $small-desktop) {
    margin: 0 10vw;
  }
  @media (max-width: $tablet) {
    margin: 0 auto;
    flex: 1;
    &__container {
      justify-content: flex-start;
      padding: get-padding(m) * 5 get-padding(m) * 2;
      margin: 0;
      border-radius: 0;
    }
  }
}
</style>
