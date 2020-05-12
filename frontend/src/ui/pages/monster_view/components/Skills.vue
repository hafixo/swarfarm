<template>
  <div class="row">
    <div v-for="(skill, idx) in instance.monster.skills" :key="skill.id" :class="columnSize">
      <SkillPanel :skill="skill" :level="levels[idx]" />
    </div>
  </div>
</template>

<script>
import { SkillPanel } from "@/ui/components/skills";

export default {
  components: {
    SkillPanel
  },
  props: {
    owner: { type: String, required: true },
    instance: { type: Object, required: true }
  },
  computed: {
    columnSize() {
      return this.instance.monster.skills.length < 4 ? "col-lg-4" : "col-lg-3";
    },
    levels() {
      return [
        this.instance.skill_1_level,
        this.instance.skill_2_level,
        this.instance.skill_3_level,
        this.instance.skill_4_level
      ];
    }
  }
};
</script>

<style>
</style>