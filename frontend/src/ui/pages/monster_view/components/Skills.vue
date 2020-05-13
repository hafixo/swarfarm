<template>
  <div class="row">
    <div v-if="instance.monster.leader_skill" class="col-xs-12">
      <LeaderSkillPanel :skill="instance.monster.leader_skill" />
    </div>
    <div v-for="(skill, idx) in instance.monster.skills" :key="skill.id" :class="columnSize">
      <SkillPanel :skill="skill" :level="levels[idx]" />
    </div>
  </div>
</template>

<script>
import { SkillPanel, LeaderSkillPanel } from "@/ui/components/skills";

export default {
  components: {
    SkillPanel,
    LeaderSkillPanel
  },
  props: {
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