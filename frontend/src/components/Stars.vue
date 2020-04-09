<template>
  <span>
    <img
      v-for="i in count"
      :key="i"
      :src="imageUrl"
      :class="`monster-star monster-star-${i}`"
      alt="star"
    />
  </span>
</template>

<script>
import Monster from "@/services/monsters";

export default {
  props: {
    count: {
      type: Number,
      default: 1
    },
    awakenLevel: {
      type: Number,
      default: Monster.awakenLevel.unawakened
    },
    canAwaken: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    imageUrl() {
      const baseUrl = "/static/herders/images/stars";

      switch (this.awakenLevel) {
        case Monster.awakenLevel.incomplete:
          return `${baseUrl}/star-incomplete.png`;
        case Monster.awakenLevel.unawakened:
          if (this.canAwaken) {
            return `${baseUrl}/star-unawakened.png`;
          } else {
            return `${baseUrl}/star-fodder.png`;
          }
        case Monster.awakenLevel.awakened:
          return `${baseUrl}/star-awakened.png`;
        case Monster.awakenLevel.second:
          return `${baseUrl}/star-awakened2.png`;
        default:
          return `${baseUrl}/star-fodder.png`;
      }
    }
  }
};
</script>

<style></style>
