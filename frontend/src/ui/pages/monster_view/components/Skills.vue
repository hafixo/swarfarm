<template>
  <div>
    <div v-if="instance.monster.leader_skill">
      <LeaderSkillPanel :skill="instance.monster.leader_skill" />
    </div>
    <SkillPanel
      v-for="(skill, idx) in instance.monster.skills"
      :key="skill.id"
      :skill="skill"
      :level="levels[idx]"
    />
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