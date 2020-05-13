<template>
  <div v-if="loaded">
    <div class="row">
      <div class="col-lg-6">
        <Info :instance="monsterInstance" />
      </div>
      <div class="col-lg-6">
        <Skills :instance="monsterInstance" />
      </div>
    </div>

    <Build :instance="monsterInstance" />
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";

import { Info, Skills, Build } from "./components";

export default {
  name: "App",
  props: {
    instanceId: String,
    owner: String
  },
  components: {
    Info,
    Skills,
    Build
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
    })
  }
};
</script>

<style></style>
