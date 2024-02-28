<template>
  <client-only>
    <div class="customer-form">
      <div class="customer-form__header">
        <p class="customer-form__header__title">Personal details</p>
        <Icon @click="closeModal" class="customer-form__header__close" name="close" />
      </div>
      <div class="customer-form__content">
        <TextInput
          :error="errors.first_name"
          showErrorOnErrorOnly
          fullWidth
          type="text"
          label="First Name"
          placeholder="First name"
          @input="handleChange"
          :value="form.first_name"
          id="first_name"
        />
        <TextInput
          :error="errors.last_name"
          showErrorOnErrorOnly
          @input="handleChange"
          fullWidth
          type="text"
          label="Last Name"
          placeholder="Last name"
          :value="form.last_name"
          id="last_name"
        />
        <TextInput
          :error="errors.mobile"
          showErrorOnErrorOnly
          fullWidth
          type="text"
          label="Mobile number"
          placeholder="Mobile number"
          :value="form.mobile"
          @input="handleChange"
          id="mobile"
        />
        <TextInput
          :error="errors.email"
          showErrorOnErrorOnly
          fullWidth
          type="text"
          label="E-mail"
          placeholder="E-mail"
          :value="form.email"
          id="email"
          @input="handleChange"
        />
        <TextInput
          :error="errors.monthly_income"
          showErrorOnErrorOnly
          fullWidth
          type="number"
          label="Monthly income"
          @input="handleChange"
          placeholder="Monthly income"
          :value="form.monthly_income"
          id="monthly_income"
        />
      </div>
      <Button fullWidth title="Submit" @click.native="submit" />
      <div v-if="error">{{ error }}</div>
    </div>
  </client-only>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import { State } from '~/core/store/index.store';

interface Data {
  error: string | null | undefined;
  isLoading: boolean;
  form: {
    first_name: string;
    last_name: string;
    mobile: string;
    email: string;
    monthly_income: string | null;
  };
  errors: {
    first_name: string | null;
    last_name: string | null;
    mobile: string | null;
    email: string | null;
    monthly_income: string | null;
  };
}

interface Methods {
  closeModal: () => void;
  submit: () => void;
  validateForm: () => boolean;
  handleChange: (e: any) => void;
}

interface Computed {
  modalState: State['modalState'];
}

export default Vue.extend<Data, Methods, Computed, unknown>({
  data() {
    return {
      error: null,
      isLoading: false,
      form: {
        first_name: '',
        last_name: '',
        mobile: '',
        email: '',
        monthly_income: null
      },
      errors: {
        first_name: null,
        last_name: null,
        mobile: null,
        email: null,
        monthly_income: null
      }
    };
  },
  computed: {
    ...mapGetters(['modalState'])
  },
  methods: {
    handleChange(e) {
      const { value, id } = e.target as { value: string; id: keyof Data['form'] };
      if (id in this.form) this.form[id] = value;
    },
    validateForm() {
      const cleanError = (prop: keyof Data['errors']) => (this.errors[prop] = null);

      const validateFirstName = () => {
        if (this.form.first_name) {
          cleanError('first_name');
          return true;
        } else {
          this.errors.first_name = 'Must not be empty';
          return false;
        }
      };
      const validateLastName = () => {
        if (this.form.last_name) {
          cleanError('last_name');
          return true;
        } else {
          this.errors.last_name = 'Must not be empty';
          return false;
        }
      };
      const validateMobile = () => {
        if (this.form.mobile) {
          if (this.form.mobile.slice(0, 2) !== '55') {
            this.errors.mobile = 'Must start with 55';
            return false;
          }
          if (this.form.mobile.length < 7 || this.form.mobile.length > 8) {
            this.errors.mobile = 'Must be 7 or 8 digits long';
            return false;
          }
          if (Number.isNaN(Number(this.form.mobile))) {
            this.errors.mobile = 'Must be a valid number';
            return false;
          }
          cleanError('mobile');
          return true;
        } else {
          this.errors.mobile = 'Must not be empty';
          return false;
        }
      };
      const validateEmail = () => {
        const isValid = this.form.email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
        if (isValid) {
          cleanError('email');
          return true;
        } else {
          this.errors.email = 'Invalid e-mail';
          return false;
        }
      };
      const validateMonthlyIncome = () => {
        if (!Number.isNaN(Number(this.form.monthly_income))) {
          const isValid = Number(this.form.monthly_income) > 100;
          if (isValid) {
            cleanError('monthly_income');
            return isValid;
          }
          this.errors.monthly_income = 'Must be bigger than 100';
          return isValid;
        } else {
          this.errors.monthly_income = 'Must be bigger than 100';
          return false;
        }
      };

      const emailValid = validateEmail();
      const firstNameValid = validateFirstName();
      const lastNameValid = validateLastName();
      const mobileValid = validateMobile();
      const monthlyIncomeValid = validateMonthlyIncome();
      return emailValid && firstNameValid && lastNameValid && mobileValid && monthlyIncomeValid;
    },
    submit() {
      const isValid = this.validateForm();
      if (isValid) {
        this.$store.commit('setModalExtraInfo', this.form);
        this.closeModal();
        this.$router.push(Number(this.form.monthly_income) > 1000 ? 'positive-decision' : 'negative-decision');
      }
    },
    closeModal() {
      this.$store.commit('toggleModal', {
        modal: 'center',
        loading: false,
        centerType: null,
        id: null
      });
    }
  }
});
</script>
<style scoped lang="scss">
.customer-form {
  background: get-color('primary');
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 24px;
  padding: get-padding(s) * 8;
  border-radius: get-border-radius(xxl);
  align-self: center;
  &__content {
    display: flex;
    flex-direction: column;
    gap: 16px;
    &__wrapper {
      width: 100%;
    }
  }
  &__header {
    &__title {
      @extend %text-header;
    }
    &__close {
      cursor: pointer;
      width: 12px;
    }
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  @media (max-width: $tablet) {
    padding: get-padding(xl);
  }
}
</style>
