<template>
  <span>
    <img v-for="i in count" :key="i" :src="imageUrl" :class="`monster-star monster-star-${i}`" alt="star" />
  </span>
</template>

<script>
import { awakenLevel } from '@/services/monsters';

export default {
  props: {
    count: {
      type: Number,
      default: 1,
    },
    awakenLevel: {
      type: Number,
      default: awakenLevel.unawakened,
    },
    canAwaken: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    imageUrl() {
      const baseUrl = '/static/herders/images/stars';

      switch (this.awakenLevel) {
        case awakenLevel.incomplete:
          return `${baseUrl}/star-incomplete.png`;
        case awakenLevel.unawakened:
          return this.canAwaken ? `${baseUrl}/star-unawakened.png` : `${baseUrl}/star-fodder.png`;
        case awakenLevel.awakened:
          return `${baseUrl}/star-awakened.png`;
        case awakenLevel.second:
          return `${baseUrl}/star-awakened2.png`;
        default:
          return `${baseUrl}/star-fodder.png`;
      }
    },
  },
};
</script>

<style></style>
