<template>
  <img
    v-if="imageUrl"
    :src="imageUrl"
    class="skill-effect pull-left"
    data-toggle="popover"
    data-trigger="hover"
    data-placement="top"
    data-container="body"
    :title="effect.effect.name"
    :data-content="effect.effect.description"
  />
  <span
    v-else
    :class="{'skill-effect': true, 'skill-effect-buff': effect.effect.is_buff, 'skill-effect-debuff': !effect.effect.is_buff}"
    data-toggle="popover"
    data-trigger="hover"
    data-placement="top"
    data-container="body"
    :title="effect.effect.name"
    :data-content="effect.effect.description"
  >
    <span>{{ effect.effect.name }}</span>
  </span>
</template>

<script>
export default {
  props: {
    effect: { type: Object, required: true }
  },
  computed: {
    imageUrl() {
      return this.effect.effect.icon_filename
        ? `/static/herders/images/buffs/${this.effect.effect.icon_filename}`
        : null;
    }
  }
};
</script>

<style>
</style>