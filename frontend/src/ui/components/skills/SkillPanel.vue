<template>
  <div class="panel panel-default">
    <div class="panel-body">
      <div class="monster-skill-thumb pull-left">
        <img :src="imageUrl" />
        <span v-if="level" class="image-plus image-plus-right">{{ level }}/{{ skill.max_level }}</span>
      </div>

      <h4 class="list-group-item-heading">{{ skill.name }}</h4>
      <div class="list-group-item-text">{{ skill.description }}</div>
    </div>
    <SkillPanelUpgrades :upgrades="skill.upgrades" :level="level" />
    <SkillPanelEffects :effects="skill.effects" />
  </div>
</template>

<script>
import SkillPanelUpgrades from "./SkillPanelUpgrades";
import SkillPanelEffects from "./SkillPanelEffects";

export default {
  components: {
    SkillPanelUpgrades,
    SkillPanelEffects
  },
  props: {
    skill: { type: Object, required: true },
    level: { type: Number, required: false }
  },
  computed: {
    imageUrl() {
      return `/static/herders/images/skills/${this.skill.icon_filename}`;
    }
  },
  filters: {
    pluralize(value) {
      return value > 1 ? "s" : "";
    }
  }
};
</script>

<style>
</style>