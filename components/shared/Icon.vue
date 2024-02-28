<template functional>
  <i
    :class="data.staticClass || data.class"
    v-on="listeners"
    v-html="require(`!!html-loader!@/assets/svg/${props.name}.svg`)"
    :style="props.color && { stroke: props.color }"
  ></i>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  functional: true,
  props: {
    name: {
      type: String,
      required: true
    },
    color: {
      type: String
    }
  }
});
</script>
