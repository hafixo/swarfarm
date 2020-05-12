<template>
  <div class="panel panel-default">
    <div class="panel-body">
      <div class="monster-skill-thumb pull-left">
        <img :src="imageUrl" />
      </div>
      <h4 class="list-group-item-heading">Leader Skill</h4>
      <div class="list-group-item-text">{{ description }}</div>
      <div class="clearfix"></div>
    </div>
  </div>
</template>

<script>
import { leaderSkillImageUrl, leaderSkillDescription } from "@/services/skills";

export default {
  props: {
    skill: { type: Object, required: true }
  },
  computed: {
    imageUrl() {
      return leaderSkillImageUrl(this.skill);
    },
    description() {
      return leaderSkillDescription(this.skill);
    }
  }
};
</script>

<style>
</style>