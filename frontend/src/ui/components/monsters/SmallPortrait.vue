<template>
  <span class="monster-image">
    <img :src="imageUrl" :alt="monster.name" class="monster-thumb" />
    <Stars
      v-if="stars"
      :count="stars"
      :awaken-level="monster.awaken_level"
      :can-awaken="monster.can_awaken"
    />

    <span v-if="level" class="image-plus image-plus-right">{{ maxLevel }}{{ level }}</span>

    <span v-if="locked" class="image-plus image-plus-main">
      <span class="fa fa-lock fa-stack-1x fa-inverse"></span>
    </span>
  </span>
</template>

<script>
import Stars from "@/ui/components/Stars";
import { isMaxLevel } from "@/services/monsters";

export default {
  props: {
    monster: Object,
    level: { type: Number, required: false },
    stars: { type: Number, required: false },
    locked: { type: Boolean, default: false }
  },
  components: {
    Stars
  },
  computed: {
    imageUrl() {
      return `/static/herders/images/monsters/${this.monster.image_filename}`;
    },
    maxLevel() {
      return isMaxLevel(this.stars, this.level) ? "MAX" : "";
    }
  }
};
</script>

<style></style>
