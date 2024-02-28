<template>
  <div class="slider">
    <div class="slider__content">
      <div class="slider__content__container">
        <input
          type="range"
          :id="randomId"
          :min="min"
          :max="max"
          :value="value"
          @input="handleChange"
          class="slider__input"
        />
      </div>
      <div class="slider__content__minmax">
        <p>{{ getValue('min') }}</p>
        <p>{{ getValue('max') }}</p>
      </div>
    </div>
    <TextInput
      v-if="inputType === 'textInput'"
      :min="min"
      :max="max"
      :value="value"
      @input="handleChange"
      :placeholder="placeholder"
      type="number"
      :label="label"
      :id="id"
    />
    <Dropdown
      v-if="inputType === 'dropdown'"
      :value="value"
      @change="handleChange"
      :label="label"
      :id="id"
      :data="dropdownData"
    />
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';

interface Props {
  min: number;
  max: number;
  currency?: string;
  value: number;
  placeholder?: string;
  label: string;
  id: string;
  inputType?: 'textInput' | 'dropdown';
}

interface Data {
  sliderValue: number;
  randomId: string;
}

interface Methods {
  getValue: (prop: keyof Data | keyof Props) => string;
  handleChange: (e: any) => void;
}

interface Computed {
  dropdownData: number[];
}

export default Vue.extend<Data, Methods, Computed, Props>({
  props: {
    value: {
      type: Number
    },
    min: {
      type: Number,
      required: true
    },
    max: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      required: false
    },
    placeholder: {
      type: String,
      required: false
    },
    label: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    inputType: {
      type: String as PropType<'textInput' | 'dropdown'>,
      required: false
    }
  },

  watch: {
    value() {
      const sliderEl = document.getElementById(`${this.randomId}`) as HTMLElement;
      const progress = (this.value / this.max) * 100;
      sliderEl.style.background = `linear-gradient(to right, #21093A ${progress}%, #d0beeb ${progress}%)`;
    }
  },
  data() {
    return {
      sliderValue: this.value,
      randomId: Math.round(Math.random() * 10000000).toString(36)
    };
  },
  methods: {
    getValue(prop: keyof Data | keyof Props) {
      return `${this[prop]} ${this.currency ?? ''}`;
    },
    handleChange(e) {
      this.$emit('input', Number(e.target.value));
    }
  },
  computed: {
    dropdownData() {
      if (!this.min && !this.max) return [];
      return new Array(this.max + 1).fill(null).reduce((acc, _, index) => {
        if (index >= this.min && index <= this.max) acc.push(index);
        return acc;
      }, []);
    }
  }
});
</script>

<style lang="scss" scoped>
$height: 4px;
$thumb-height: 36px;
.slider {
  display: flex;
  width: 100%;
  gap: 24px;

  input[type='range'] {
    -webkit-appearance: none;
    appearance: none;
    background: get-color('slider-track');
    cursor: pointer;
    width: 100%;
  }
  /***** Chrome, Safari, Opera, and Edge Chromium *****/
  input[type='range']::-webkit-slider-runnable-track {
    -webkit-appearance: none;
    border-radius: 30px;
    height: $height;
  }

  /******** Firefox ********/
  input[type='range']::-moz-range-track {
    -webkit-appearance: none;
    border-radius: 30px;
    height: $height;
  }

  /***** Thumb Styles *****/
  /***** Chrome, Safari, Opera, and Edge Chromium *****/
  input[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none; /* Override default look */
    appearance: none;
    margin-top: calc(($height / 2) - ($thumb-height / 2)); /* Centers thumb on the track */
    background-color: get-color('dark-secondary');
    height: $thumb-height;
    border-radius: 100px;
    width: 52px;
    background-image: url('assets/svg/slider-arrows.svg?inline');
    background-position: center center;
    background-repeat: no-repeat;
  }

  /***** Thumb Styles *****/
  /***** Firefox *****/
  input[type='range']::-moz-range-thumb {
    border: none; /*Removes extra border that FF applies*/
    border-radius: 0; /*Removes default border-radius that FF applies*/
    background-color: get-color('dark-secondary');
    height: $thumb-height;
    width: 52px;
    background-image: url('assets/svg/slider-arrows.svg?inline');
    background-position: center center;
    background-repeat: no-repeat;
  }

  &__content {
    width: 100%;
    &__container {
      height: $thumb-height;
    }
    &__minmax {
      display: flex;
      justify-content: space-between;
      & > p {
        @extend %text-small;
        color: get-color('slider-text');
      }
    }
  }

  @media (max-width: $tablet) {
    flex-direction: column-reverse;
    gap: 8px;
    & > div:nth-child(2) {
      width: 100%;
      ::v-deep input,
      ::v-deep select {
        width: 100%;
      }
    }
  }
}
</style>
