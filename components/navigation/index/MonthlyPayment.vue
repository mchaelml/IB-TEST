<template>
  <div class="monthly-payment">
    <div class="monthly-payment__action">
      <span
        ><h1 class="monthly-payment__action__title1">Calculate your&nbsp;</h1>
        <h1 class="monthly-payment__action__title2">monthly payment</h1>
      </span>
      <p class="monthly-payment__action__description">
        Estimate your monthly payments based on the chosen loan amount and time period.
      </p>
    </div>
    <div class="monthly-payment__divider" />
    <div class="monthly-payment__content">
      <div class="monthly-payment__content__slider-container">
        <div class="monthly-payment__content__slider-container__slider">
          <Slider
            id="amount"
            :min="minAmount"
            :max="maxAmount"
            currency="€"
            v-model="amount"
            label="Amount"
            placeholder="Amount"
            inputType="textInput"
          />
        </div>
        <div class="monthly-payment__content__slider-container__slider">
          <Slider
            id="period"
            :min="minPeriod"
            :max="maxPeriod"
            currency="months"
            v-model="period"
            label="Period"
            placeholder="Period"
            inputType="dropdown"
          />
        </div>
      </div>
      <div class="monthly-payment__content__data-container">
        <div class="monthly-payment__content__data-container__data">
          <p class="monthly-payment__content__data-container__data__monthly">Monthly payment</p>
          <p class="monthly-payment__content__data-container__data__total">{{ total }}</p>
        </div>
        <Button title="Apply now" @click.native="openModal" />
        <p class="monthly-payment__content__data-container__info">
          The calculation is approximate and may differ from the conditions offered to you. Please submit a loan
          application to receive a personal offer. Financial services are provided by AS Inbank Finance.
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import calculateMonthlyTotal from '~/core/utils/calculateMonthlyTotal';
import { ModalActions } from '~/types';

interface Data {
  amount: number;
  period: number;
  maxPeriod: number;
  minPeriod: number;
  maxAmount: number;
  minAmount: number;
}

interface Computed {
  total: string;
}

interface Methods {
  openModal: () => void;
}

export default Vue.extend<Data, Methods, Computed, unknown>({
  data() {
    return {
      maxPeriod: 72,
      minPeriod: 2,
      maxAmount: 7200,
      minAmount: 300,
      amount: 300,
      period: 2
    };
  },
  computed: {
    total() {
      return calculateMonthlyTotal({
        loan_amount: this.amount,
        loan_period: this.period,
        minAmount: this.minAmount,
        maxAmount: this.maxAmount,
        minPeriod: this.minPeriod,
        maxPeriod: this.maxPeriod
      });
    }
  },
  methods: {
    openModal() {
      this.$store.commit('toggleModal', {
        modal: 'center',
        centerType: ModalActions.customer_form,
        center: true,
        extraInfo: {
          period: this.period,
          amount: this.amount
        }
      });
    }
  }
});
</script>

<style lang="scss" scoped>
.monthly-payment {
  display: flex;
  background-color: get-color('secondary');
  padding: get-padding(m) * 10 get-padding(m) * 5;
  gap: 40px;
  justify-content: space-between;
  & > div:not(&__divider):not(&__content) {
    padding: get-padding(l) * 6 get-padding(m) * 5;
  }
  &__divider {
    border: 1px solid get-color('divider');
  }
  &__action {
    flex: 0.5;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    & > span {
      text-align: center;
      height: 100%;
    }
    &__title1 {
      @extend %text-big;
      text-align: center;
      display: inline;
    }

    &__title2 {
      @extend %text-big;
      text-align: center;
      display: inline;
      font-family: 'Sebenta-Italic';
    }
    &__description {
      @extend %text-medium;
    }
  }
  &__content {
    flex: 0.5;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    &__slider-container {
      @include flex-column;
      gap: 40px;
    }
    &__data-container {
      margin-top: get-margin(m) * 5;
      @include flex-column;
      gap: 24px;
      &__data {
        &__monthly {
          @extend %text-medium;
          text-align: center;
          margin-bottom: 8px;
        }
        &__total {
          @extend %text-big;
          text-align: center;
        }
      }
      &__info {
        @extend %text-tiny;
        opacity: 0.6;
      }
    }
  }
  @media (max-width: $small_desktop) {
    flex-direction: column;
  }
  @media (max-width: $tablet) {
    padding: get-padding(m) * 5 get-padding(m) * 2;
    & > div:not(&__divider):not(&__content) {
      padding: 0;
    }
    &__divider {
      display: none;
    }
    &__action {
      & > span {
        text-align: left;
        height: 100%;
      }
    }
  }
}
</style>
