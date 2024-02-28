<template>
  <main class="main">
    <section class="main__section-1">
      <div class="main__section-1__mini-load">
        <MiniLoan :getMonthlyPaymentRef="() => $refs['monthly-payment']" />
      </div>
      <div class="main__section-1__img" />
    </section>
    <section class="main__section-2">
      <MonthlyPayment ref="monthly-payment" />
    </section>
  </main>
</template>

<script lang="ts">
import Vue from 'vue';
import MiniLoan from '~/components/navigation/index/MiniLoan.vue';
import MonthlyPayment from '~/components/navigation/index/MonthlyPayment.vue';

export default Vue.extend({
  components: { MiniLoan, MonthlyPayment },
  layout: 'default'
});
</script>

<style lang="scss" scoped>
$img-size: 839px;
.main {
  display: flex;
  width: 100%;
  flex-direction: column;
  flex: 1;
  &__section-1 {
    height: $img-size;
    margin: get-margin(m) * 2 get-margin(m) * 5 get-margin(m) * 10;
    gap: 24px;
    display: flex;
    &__mini-load {
      display: flex;
      flex: 0.4;
    }
    &__img {
      flex: 0.6;
      height: 100%;
      background-image: url('assets/images/index.png');
      background-repeat: no-repeat;
      background-size: cover;
      border-radius: 200px;
    }
  }
  @media (max-width: $small_desktop) {
    &__section-1 {
      flex-direction: column-reverse;
      margin: get-margin(m) * 2 get-margin(m) * 2 get-margin(m) * 5;
      height: auto;
      &__mini-load {
        flex: unset;
      }
      &__img {
        flex: unset;
        border-radius: 100px;
        height: 100vw;
        width: 100%;
        min-width: unset;
      }
    }
  }
}
</style>
