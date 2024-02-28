<template>
  <div class="mini-loan">
    <div class="mini-loan__content">
      <div class="mini-loan__content__action">
        <p class="mini-loan__content__action__title">Mini loan</p>

        <p class="mini-loan__content__action__call-to-action"><em>Take charge</em> of unexpected costs</p>

        <p class="mini-loan__content__action__description">
          Finance unforeseen expenses with Inbank. A quick and easy application process with an instant credit decision.
        </p>
      </div>
      <Button title="Apply now" noBgButton @click.native="scrollToRef" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { Ref } from 'vue';

interface Props {
  getMonthlyPaymentRef: () => Ref<HTMLElement>;
}

interface Data {
  monthlyPaymentRef: null | { $el: HTMLElement };
}

interface Methods {
  scrollToRef: () => void;
}

export default Vue.extend<Data, Methods, unknown, Props>({
  props: {
    getMonthlyPaymentRef: {
      type: Function,
      default: () => null
    }
  },
  data() {
    return {
      monthlyPaymentRef: null
    };
  },
  methods: {
    scrollToRef() {
      if (this.monthlyPaymentRef && '$el' in this.monthlyPaymentRef) {
        this.monthlyPaymentRef.$el.scrollIntoView();
      }
    }
  },
  mounted() {
    // by the time the mounted method is called, screen ref will be available
    this.monthlyPaymentRef = this.$props.getMonthlyPaymentRef();
  }
});
</script>

<style lang="scss" scoped>
.mini-loan {
  display: flex;
  height: 100%;
  width: 100%;
  align-content: center;
  justify-content: center;
  padding: get-padding(m) * 10 get-padding(m) * 5;
  border-radius: 200px;
  background: #d9d4a7;
  &__content {
    display: flex;
    flex-direction: column;
    gap: 24px;
    align-content: center;
    justify-content: center;
    &__action {
      display: flex;
      flex-direction: column;
      gap: 16px;
      &__title {
        @extend %text-medium;
        font-weight: 500;
        text-align: center;
      }
      &__call-to-action {
        @extend %text-big;
        text-align: center;
      }
      &__description {
        @extend %text-medium;
        text-align: center;
      }
    }
  }
  @media (max-width: $mobile) {
    padding: 28px get-padding(xl);
    border-radius: 100px;
    &__content {
      &__action {
        &__call-to-action {
          height: 144px;
          font-size: 32px;
          line-height: 36px;
        }
      }
    }
  }
}
</style>
