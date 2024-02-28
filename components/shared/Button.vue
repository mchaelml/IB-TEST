<template>
  <button
    class="btn"
    :disabled="disabled"
    :class="{
      'btn--full_width': fullWidth,
      'btn--active': active,
      'btn--disabled': disabled,
      'btn--no-bg-button': noBgButton
    }"
  >
    {{ title }}
  </button>
</template>

<script lang="ts">
interface Props {
  title: string;
  active: boolean;
  disabled: boolean;
  noBgButton: boolean;
  fullWidth?: boolean;
}

import Vue from 'vue';
export default Vue.extend<unknown, unknown, unknown, Props>({
  props: {
    title: {
      type: String,
      default: ''
    },
    active: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    noBgButton: {
      type: Boolean
    },
    fullWidth: Boolean
  }
});
</script>

<style lang="scss" scoped>
.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: get-padding(l) get-padding(xl);
  border-radius: get-border-radius(xxxl);
  margin-right: auto;
  margin-left: auto;
  text-align: center;
  border: none;
  outline: none;
  @extend %text-medium;
  background-color: get-color('dark-secondary');
  &--full_width {
    width: 100%;
  }
  &--active {
    background-color: get-color('dark-secondary');
    color: get-color('text');
  }
  &--disabled {
    background-color: get-color('disabled');
    color: get-color('disabled-text');
  }

  &--no-bg-button {
    background-color: get-color('no-bg-button');
  }

  @media (hover: hover) {
    &:hover {
      cursor: pointer;
      background-color: get-color('hovered');
    }
    &--disabled {
      cursor: disabled;
      background-color: get-color('disabled');
    }
    &:focus {
      background-color: get-color('pressed');
    }
  }
}
</style>
