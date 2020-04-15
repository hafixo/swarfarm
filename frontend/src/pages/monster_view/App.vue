<template>
  <div v-if="loaded">
    <div class="row">
      <div class="col-lg-6">
        <Info :owner="owner" :instance="instance" :monster="monster" :skill_ups_remaining="skill_ups_remaining" />
      </div>
      <div class="col-lg-6">
        <Runes />
      </div>
    </div>
    <Stats :owner="owner" :instance="instance" :monster="monster" />
    <Skills :owner="owner" :instance="instance" :skills="skills" />
    <p>{{ instance }}</p>
    <p>{{ monster }}</p>
    <p>{{ skills }}</p>
  </div>
</template>

<script>
import api from '@/services/api.js';

import { Info, Runes, Skills, Stats } from './components';

export default {
  name: 'App',
  props: {
    instanceId: String,
    owner: String,
  },
  components: {
    Info,
    Runes,
    Skills,
    Stats,
  },
  data() {
    return {
      instance: null,
      monster: null,
      skills: [],
      loaded: false,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      await this.getMonsterInstance();
      await this.getMonster();
      await this.getSkills();
      this.loaded = true;
    },
    async getMonsterInstance() {
      this.instance = await api.get(`profiles/${this.owner}/monsters/${this.instanceId}/`);
    },
    async getMonster() {
      this.monster = await api.get(`monsters/${this.instance.monster}`);
    },
    async getSkills() {
      const skill_query_list = this.monster.skills.join(',');
      const response = await api.get(`skills/?id__in=${skill_query_list}`);
      this.skills = response.results;
    },
  },
  computed: {
    skill_ups_remaining() {
      if (!this.loaded) {
        return null;
      }
      const skill_levels = [
        this.instance.skill_1_level,
        this.instance.skill_2_level,
        this.instance.skill_3_level,
        this.instance.skill_4_level,
      ];
      return this.skills.reduce((accum, s, index) => accum + s.max_level - skill_levels[index], 0);
    },
  },
};
</script>

<style></style>
