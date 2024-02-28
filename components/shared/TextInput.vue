<template>
  <div :class="{ 'outlined-input': true, 'outlined-input__full_width': fullWidth }">
    <input
      :min="min"
      :max="max"
      :type="type"
      :id="id"
      :value="value"
      :placeholder="placeholder"
      @input="$emit('input', $event)"
      :class="{ 'outlined-input__input-error': showErrorOnErrorOnly ? showErrorOnErrorOnly && error : isError }"
    />
    <label
      :for="id"
      :class="{ 'outlined-input__label-error': showErrorOnErrorOnly ? showErrorOnErrorOnly && error : isError }"
      >{{ label }}</label
    >
    <p v-if="error" class="outlined-input__error">{{ error }}</p>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';

interface Props {
  id: string;
  label: string;
  placeholder?: string;
  type: 'text' | 'number';
  value:  string | number;
  min?: number;
  max?: number;
  fullWidth?: boolean;
  showErrorOnErrorOnly?: boolean;
  error?: string;
}

interface Methods {
  handleChange: (e: any) => void;
}

interface Computed {
  isError: boolean;
}

export default Vue.extend<unknown, Methods, Computed, Props>({
  props: {
    id: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      required: false
    },
    type: {
      type: String as PropType<'text' | 'number'>,
      required: true
    },
    value: {
      type: [Number, String]
    },
    min: {
      type: Number,
      required: false
    },
    max: {
      type: Number,
      required: false
    },
    fullWidth: Boolean,
    showErrorOnErrorOnly: {
      type: Boolean,
      default: false,
      required: false
    },
    error: {
      type: String
    }
  },
  computed: {
    isError() {
      if (this.value == null || String(this.value) === '') return true;
      if (this.type === 'number') {
        if (this.min && Number(this.value) < this.min) return true;
        if (this.max && Number(this.value) > this.max) return true;
      }
      return typeof this.value !== this.type;
    }
  }
});
</script>

<style lang="scss" scoped>
.outlined-input {
  position: relative;
  &__full_width {
    input {
      width: 100%;
    }
  }
  &__input-error {
    outline: 2px solid get-color('red') !important;
    &:not(:focus) {
      color: get-color('red') !important;
    }
  }
  &__label-error {
    color: get-color('red') !important;
  }

  &__error {
    padding: get-padding(s) 0;
    color: get-color('red') !important;
    @extend %text-error;
  }

  input {
    min-width: 160px;
    @extend %text-medium;
    height: 48px;
    outline: 1px solid get-color('input-border');
    border-radius: 5px;
    border: none;
    background-color: get-color('primary');
    padding: get-padding(m) * 2 get-padding(l);
    transition: 0.1s $ease;
    &:placeholder-shown {
      outline: 2px solid get-color('disabled');
    }
    &:not(:placeholder-shown) ~ label,
    &:focus ~ label {
      top: 0px;
      left: 10px;
    }
    &:focus {
      outline: 2px solid get-color('input-border');
    }
    &:focus ~ label,
    &:not(:placeholder-shown) ~ label {
      color: get-color('input-border');
      opacity: 1;
    }
    &::placeholder {
      color: get-color('disabled-text');
    }
  }

  label {
    @extend %text-tiny;
    font-weight: 500;
    line-height: 18px;
    position: absolute;
    top: 50%;
    left: 5%;
    transform: translateY(-50%);
    background-color: get-color('primary');
    border-radius: get-border-radius(xxxl);
    color: get-color('primary');
    text-align: center;
    transition: 0.2s $ease;
    pointer-events: none;
    padding: 0 get-padding(m);
    opacity: 0;
  }
}
</style>
