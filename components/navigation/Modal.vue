<template>
  <div class="modal-container">
    <transition tag="div" name="opacity">
      <div
        v-if="show && !isStatic"
        class="modal-container__backdrop"
        :class="{
          'modal-container__backdrop--center': side === 'center',
          'modal-container__backdrop--left': side === 'left',
          'modal-container__backdrop--right': side === 'right',
          'modal-container__backdrop--static': isStatic,
          'modal-container__backdrop--loading': isLoading
        }"
        @click="$emit('close')"
      ></div>
    </transition>
    <transition tag="div" :name="animation">
      <div
        v-if="show"
        class="modal-container__body"
        :class="{
          'modal-container__body--center': side === 'center',
          'modal-container__body--left': side === 'left',
          'modal-container__body--right': side === 'right',
          'modal-container__body--static': isStatic,
          'modal-container__body--extra-height': isAutoHeight,
          'modal-container__body--loading': isLoading
        }"
      >
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

interface Computed {
  animation: string;
}

interface Props {
  show: boolean;
  side: string;
  isStatic: boolean;
  isAutoHeight: boolean;
  isLoading: boolean;
}

export default Vue.extend<unknown, Computed, unknown, Props>({
  props: {
    show: {
      type: Boolean,
      default: false
    },
    side: {
      type: String,
      required: true
    },
    isStatic: {
      type: Boolean,
      default: false
    },
    isAutoHeight: {
      type: Boolean,
      default: false
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    animation() {
      return this.side !== 'center' ? 'slide' : 'opacity';
    }
  }
});
</script>

<style lang="scss" scoped>
$size: 150px;
%absolute {
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
}
%center {
  height: $size * 2 !important;
  width: $size * 5 !important;
  left: 50%;
  transform: translate(-50%, calc(50vh - #{$size * 2}));
  border-radius: get-border-radius(l) + 1px;
  @extend %absolute;
}
%left {
  left: 0;
}
%right {
  right: 0;
}
%static {
  z-index: 10000;
}
%extra-height {
  height: fit-content !important;
  max-height: $size * 4 !important;
  top: 50% !important;
  left: 50%;
  transform: translate(-50%, -50%);
}

%loading {
  height: 100vh !important;
  max-height: 100vh;
  width: 100vw !important;
  background-color: transparent !important;
  transform: none !important;
  box-shadow: none;
  z-index: 15 !important;
}

.modal-container {
  z-index: 0;
  &__backdrop {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    z-index: 2;
    &--center {
      @extend %absolute;
    }
    &--left {
      @extend %left;
    }
    &--right {
      @extend %right;
    }
    &--static {
      @extend %static;
    }
    &--loading {
      z-index: 10;
      background-color: rgba(0, 0, 0, 0.8);
    }
  }

  &__body {
    height: 100%;
    z-index: 3;
    width: $size * 2 + 6px;
    background-color: get-color('primary');
    position: fixed;
    display: flex;
    flex-direction: column;
    flex: 1;
    top: 0;
    box-sizing: border-box;
    overflow-y: auto;
    overscroll-behavior: contain;
    -webkit-overflow-scrolling: touch;
    &--center {
      @extend %center;
    }
    &--left {
      @extend %left;
    }
    &--right {
      @extend %right;
      width: $size * 3 - 50px !important;
    }
    &--static {
      @extend %static;
    }
    &--extra-height {
      @extend %extra-height;
    }
    &--loading {
      @extend %loading;
    }
  }
  @include media-breakpoint-down(md) {
    z-index: 10;
    &__body {
      position: fixed;
      top: 0;
      bottom: 0;
      z-index: 10;
      width: 100%;
      &--right {
        width: 100% !important;
      }
      &--left {
        width: 100% !important;
      }
      &--center {
        bottom: 0;
        transform: none;
        left: 0;
        height: auto !important;
        width: auto !important;
        border-top-left-radius: get-border-radius(l);
        border-top-right-radius: get-border-radius(l);
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
      }
      &--extra-height {
        transform: inherit;
        max-height: unset !important;
        top: unset !important;
      }
    }
  }
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease-in-out;
}
.slide-enter,
.slide-leave-active {
  transform: translateX(100%);
}
.opacity-enter-active,
.opacity-leave-active {
  transition: opacity 0.3s ease-in-out;
}
.opacity-enter,
.opacity-leave-active {
  opacity: 0;
}
</style>
