<template>
  <div class="panel panel-default">
    <div class="panel-heading">
      <p class="panel-title">Monster Info</p>
    </div>

    <div class="panel-body">
      <Portrait
        :monster="monster"
        :stars="instance.stars"
        :level="instance.level"
        :locked="instance.ignore_for_fusion"
        :fodder="instance.fodder"
        :storage="instance.in_storage"
      />

      <div class="bestiary-name">
        <h1 v-if="instance.custom_name">
          {{ instance.custom_name }}
          <small>{{ monster.name }}</small>
        </h1>
        <h1 v-else>{{ monster.name }}</h1>
        <p class="lead">
          <img :src="`/static/herders/images/elements/${monster.element.toLowerCase()}.png`" style="height:1em" />
          {{ monster.archetype }}
        </p>
      </div>
    </div>

    <table class="table table-condensed table-bordered">
      <tbody>
        <tr v-if="instance.created">
          <td>Summoned On:</td>
          <td>{{ instance.created }}</td>
        </tr>

        <tr v-if="awakensTo">
          <td>Awakens to</td>
          <td>
            <a :href="`/bestiary/${awakensTo.bestiary_slug}/`" target="_blank">
              <Portrait small :monster="awakensTo" :stars="awakensTo.base_stars" />
            </a>
            {{ monster.awaken_bonus }}
          </td>
        </tr>
        <tr v-if="monster.can_awaken && monster.awaken_level < 1">
          <td>Awakening Essences:</td>
          <td class="monster-awaken-materials">
            <ItemIcon
              v-for="(item, index) in monster.awaken_cost"
              :key="index"
              :item="item.item"
              :count="item.quantity"
            />
          </td>
        </tr>

        <tr v-if="instance.tags.length">
          <td>Tags</td>
          <td>
            <span v-for="tag in instance.tags" :key="tag.id" class="tag">{{ tag.name }}</span>
          </td>
        </tr>

        <tr v-if="priority">
          <td>Priority</td>
          <td>{{ priority }}</td>
        </tr>

        <!-- TODO: Fusion ingredient for -->
        <!-- TODO: Fusion product of -->

        <tr v-if="skill_ups_remaining">
          <td>Skills to Max:</td>
          <td>
            <template v-if="skill_ups_remaining > 0">
              {{ skill_ups_remaining }}
            </template>
            <template v-else>
              <p class="list-group-item-text">None!</p>
            </template>
          </td>
        </tr>

        <tr v-if="skill_ups_remaining">
          <td>Possible Skill-Ups</td>
          <td></td>
        </tr>

        <!-- TODO: Possible skill-ups -->
      </tbody>
    </table>
  </div>
</template>

<script>
import api from '@/services/api';
import { Portrait } from '@/components/monsters';
import { ItemIcon } from '@/components/items';
import { getFamilyIds } from '@/services/monsters';
import { priorityDisplay } from '@/services/monster_instances';

export default {
  props: {
    owner: { type: String, required: true },
    instance: { type: Object, required: true },
    monster: { type: Object, required: true },
    skill_ups_remaining: { type: Number, required: false },
  },
  data() {
    return {
      awakensTo: null,
      family: null,
    };
  },
  components: {
    Portrait,
    ItemIcon,
  },
  created() {
    this.fetchData();
  },
  computed: {
    priority() {
      if (this.monster.priority) {
        return priorityDisplay[this.monster.priority];
      } else {
        return null;
      }
    },
  },
  methods: {
    fetchData() {
      this.getAwakensTo();
      this.getPossibleSkillUps();
    },
    async getAwakensTo() {
      if (this.monster.awakens_to) {
        this.awakensTo = await api.get(`monsters/${this.monster.awakens_to}/`);
      }
    },
    async getPossibleSkillUps() {
      const family_ids = getFamilyIds(this.monster.family_id).join(',');
      const response = await api.get(`profiles/${this.owner}/monsters/?monster__family_id__in=${family_ids}`);
      this.family = response.results.filter((m) => m.id !== this.instance.id);
    },
  },
};
</script>

<style></style>
