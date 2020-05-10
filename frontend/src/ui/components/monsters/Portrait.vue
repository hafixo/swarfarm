<template>
  <div class="monster-box">
    <img :src="imageUrl" :alt="monster.name" />
    <Stars :count="stars" :awaken-level="monster.awaken_level" :can-awaken="monster.can_awaken" />

    <span v-if="level" class="image-plus image-plus-right">{{ maxLevel }}{{ level }}</span>

    <div class="image-plus-icon">
      <img v-if="!locked && monster.fusion_food" src="/static/herders/images/icons/fusion.png" />
      <img
        v-else-if="locked && monster.fusion_food"
        src="/static/herders/images/icons/fusion_ignored.png"
      />
      <span v-if="locked" class="fa-stack">
        <span class="fa fa-square fa-stack-2x"></span>
        <span class="fa fa-lock fa-stack-1x fa-inverse"></span>
      </span>

      <span v-if="fodder" class="fa-stack">
        <span class="fa fa-square fa-stack-2x"></span>
        <span class="fa fa-birthday-cake fa-stack-1x fa-inverse"></span>
      </span>

      <span v-if="storage" class="fa-stack">
        <span class="fa fa-square fa-stack-2x"></span>
        <span class="fa fa-bed fa-stack-1x fa-inverse"></span>
      </span>
    </div>
  </div>
</template>

<script>
import Stars from "@/ui/components/Stars";
import { isMaxLevel } from "@/services/monsters";

export default {
  props: {
    monster: Object,
    level: { type: Number, required: false },
    stars: { type: Number, default: 1 },
    locked: { type: Boolean, default: false },
    fodder: { type: Boolean, default: false },
    storage: { type: Boolean, default: false }
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
