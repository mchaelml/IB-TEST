<template>
  <div class="outlined-dropdown">
    <select @change="$emit('change', $event)" :id="id" :value="value">
      <option v-for="(item, index) in data" :key="`${index}-${item}`">
        {{ item }}
      </option>
    </select>
    <label :for="id">{{ label }}</label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

interface Props {
  id: string;
  label: string;
  placeholder?: string;
  value: number;
  data: string[];
}

interface Methods {
  handleChange: (e: any) => void;
}

interface Computed {
  isError: boolean;
}

export default Vue.extend<unknown, Methods, Computed, Props>({
  props: {
    data: {
      type: Array,
      required: true,
      default: () => []
    },
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
    value: {
      type: Number
    }
  }
});
</script>

<style lang="scss" scoped>
.outlined-dropdown {
  position: relative;

  select {
    min-width: 160px;
    @extend %text-medium;
    height: 48px;
    outline: 1px solid get-color('input-border');
    border-radius: 5px;
    border: none;
    background-color: get-color('primary');
    padding: calc((get-padding(m) * 2) - 1px) get-padding(l);
    transition: 0.1s $ease;
    appearance: none;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right get-padding(m) * 2 center;
    background-size: 12px;
    &:not(:placeholder-shown) ~ label,
    &:focus ~ label {
      top: 0px;
      left: 10px;
    }
    &:focus {
      outline: 2px solid get-color('input-border');
    }
    &:hover {
      outline: 1px solid get-color('text');
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
