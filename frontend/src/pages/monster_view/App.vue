<template>
  <div v-if="loaded">
    <div class="row">
      <div class="col-lg-6">
        <Info :monster="monster" />
      </div>
      <div class="col-lg-6">
        <Runes :runes="monster.runes" />
      </div>
    </div>
    <Stats :monster="monster" />
    <Skills :monster="monster" />
    {{ monster }}
  </div>
</template>

<script>
import api from "@/services/api.js";

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
      monster: {},
      loaded: false
    };
  },
  created() {
    this.getMonster();
  },
  methods: {
    async getMonster() {
      this.monster = await api.get(
        `profiles/${this.owner}/monsters/${this.instanceId}/`
      );
      this.loaded = true;
    }
  }
};
</script>

<style>
</style>
