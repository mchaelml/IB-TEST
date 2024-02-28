<template>
  <div class="positive-decision">
    <div class="positive-decision__container">
      <div class="positive-decision__container__box">
        <Icon name="small-loan" class="positive-decision__container__box__logo" />
      </div>
      <div class="positive-decision__container__box">
        <div>
          <span
            ><h1 class="positive-decision__container__box__title1">Good</h1>
            <h1 class="positive-decision__container__box__title2">&nbsp;news!</h1></span
          >
          <p class="positive-decision__container__box__description">Your loan has been approved.</p>
        </div>
        <div>
          <div class="positive-decision__container__box__block">
            <p class="positive-decision__container__box__block__title">Loan amount</p>
            <p class="positive-decision__container__box__block__value">{{ loanAmount }}</p>
          </div>
          <div class="positive-decision__container__box__block">
            <p class="positive-decision__container__box__block__title">Loan period</p>
            <p class="positive-decision__container__box__block__value">{{ loanPeriod }}</p>
          </div>
          <div class="positive-decision__container__box__block">
            <p class="positive-decision__container__box__block__title">Monthly payment</p>
            <p class="positive-decision__container__box__block__value">{{ monthlyPayment }}</p>
          </div>
        </div>
        <Button
          @click.native="returnToIndexPage"
          class="positive-decision__container__box__button"
          fullWidth
          title="Back to home page"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import { State } from '~/core/store/index.store';
import calculateMonthlyTotal from '~/core/utils/calculateMonthlyTotal';

interface Computed {
  modalState: State['modalState'];
  monthlyPayment: string;
  loanPeriod: string;
  loanAmount: string;
  extraInfo: State['modalState']['extraInfo'];
}

interface Methods {
  returnToIndexPage: () => void;
}

export default Vue.extend<unknown, Methods, Computed, unknown>({
  layout: 'default',
  computed: {
    ...mapGetters(['modalState']),
    extraInfo() {
      return this.modalState.extraInfo;
    },
    loanPeriod() {
      return `${this.extraInfo?.period} months`;
    },
    loanAmount() {
      return `${this.extraInfo?.amount} €`;
    },
    monthlyPayment() {
      return calculateMonthlyTotal({
        loan_amount: this.extraInfo?.amount ?? 0,
        loan_period: this.extraInfo?.period ?? 0
      });
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
.positive-decision {
  display: flex;
  flex: 1;
  margin: get-margin(m) * 5 get-margin(xl) * 7 get-margin(m) * 16;
  &__container {
    display: flex;
    flex: 1;
    border: 4px solid get-color('white');
    border-radius: get-border-radius(xl);
    overflow: hidden;
    &__box {
      gap: 40px;
      & > div {
        width: 100%;
        &:first-child {
          text-align: center;
        }
      }
      &__title1 {
        @extend %text-decision-large;
        margin-bottom: get-margin(m);
        display: inline;
        font-family: 'Sebenta-Italic';
      }
      &__title2 {
        @extend %text-decision-large;
        font-family: Inter;
        display: inline;
      }
      &__description {
        margin-top: get-margin(m);
        @extend %text-medium;
      }
      &__block {
        &:first-of-type {
          border-top: 1px solid get-color('separator');
        }
        border-bottom: 1px solid get-color('separator');
        display: flex;
        padding: get-padding(l) 0;
        width: 100%;
        align-items: center;
        justify-content: flex-start;
        &__title {
          flex: 0.5;
          @extend %text-medium;
          font-weight: 500;
          margin-right: get-margin(m);
        }
        &__value {
          flex: 0.5;
          @extend %text-medium;
        }
      }
      justify-content: center;
      align-items: center;
      &__logo {
        position: absolute;
        left: 20%;
        z-index: 2;
        width: 35vw;
      }
      span {
        height: 100%;
        text-align: center;
      }
      padding: 0 8vw;
      flex: 0.5;
      @include flex-column;
      background-color: get-color('white');
      &:first-child {
        background-color: get-color('no-bg-button');
      }
    }
  }
  @media (max-width: $desktop) {
    margin: get-margin(m) * 5 get-margin(l) * 7 get-margin(m) * 16;
    &__container {
      &__box {
        padding: 0 4vw;
        &__logo {
          width: 25vw;
        }
      }
    }
  }
  @media (max-width: $tablet) {
    margin: 0;
    background-color: get-color('white');
    &__container {
      margin: get-margin(m) get-margin(m) * 2 get-margin(m) * 10;
      flex-direction: column;
      border: none;
      &__box {
        padding: 0;
        &__logo {
          width: 40vw;
          left: 50%;
          margin-left: -20vw;
        }
        flex: 1;
        &:first-child {
          border-radius: get-border-radius(xxxl);
          flex: 0.5;
          margin: auto 44px;
        }
        &__description {
          @extend %text-medium;
        }
      }
    }
  }
}
</style>
