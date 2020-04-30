<template>
  <div v-if="loaded">
    <div class="row">
      <div class="col-lg-6">
        <Info
          :owner="owner"
          :instance="monsterInstance"
          :skill_ups_remaining="skill_ups_remaining"
        />
      </div>
      <div class="col-lg-6">
        <Runes />
      </div>
    </div>
    <Stats :owner="owner" :instance="monsterInstance" />
    <Skills :owner="owner" :instance="monsterInstance" />
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";

import { Info, Runes, Skills, Stats } from "./components";

export default {
  name: "App",
  props: {
    instanceId: String,
    owner: String
  },
  components: {
    Info,
    Runes,
    Skills,
    Stats
  },
  data() {
    return {
      loaded: false
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    ...mapMutations("profile", ["setProfile", "setMonsterInstanceViewing"]),
    ...mapActions("profile", ["fetchMonsterInstanceDetail"]),
    async fetchData() {
      await this.setProfile(this.owner);
      await this.setMonsterInstanceViewing(this.instanceId);
      await this.fetchMonsterInstanceDetail();
      this.loaded = true;
    }
  },
  computed: {
    ...mapGetters("profile", {
      monsterInstance: "viewedMonsterInstance"
    }),
    skills() {
      return this.loaded ? this.monsterInstance.monster.skills : null;
    },
    skill_ups_remaining() {
      if (!this.loaded) {
        return null;
      }

      const skill_levels = [
        this.monsterInstance.skill_1_level,
        this.monsterInstance.skill_2_level,
        this.monsterInstance.skill_3_level,
        this.monsterInstance.skill_4_level
      ];

      return this.skills.reduce(
        (accum, s, index) => accum + s.max_level - skill_levels[index],
        0
      );
    }
  }
};
</script>

<style></style>
