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
          <img
            :src="`/static/herders/images/elements/${monster.element.toLowerCase()}.png`"
            style="height:1em"
          />
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
              <SmallPortrait :monster="awakensTo" />
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
            <Tag v-for="tag in instance.tags" :key="tag.id">{{ tag.name }}</Tag>
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
            <template v-if="skill_ups_remaining > 0">{{ skill_ups_remaining }}</template>
            <template v-else>
              <p class="list-group-item-text">None!</p>
            </template>
          </td>
        </tr>

        <tr v-if="skill_ups_remaining">
          <td>Possible Skill-Ups</td>
          <td>
            <SmallPortrait
              v-for="fam in family"
              :key="fam.id"
              :monster="fam.monster"
              :stars="fam.stars"
              :level="fam.level"
              :locked="fam.ignore_for_fusion"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapActions } from "vuex";

import Tag from "@/ui/components/Tag";
import { Portrait, SmallPortrait } from "@/ui/components/monsters";
import { ItemIcon } from "@/ui/components/items";
import { priorityDisplay } from "@/services/monster_instances";

export default {
  props: {
    owner: { type: String, required: true },
    instance: { type: Object, required: true },
    skill_ups_remaining: { type: Number, required: false }
  },
  components: {
    Portrait,
    SmallPortrait,
    ItemIcon,
    Tag
  },
  created() {
    this.fetchData();
  },
  computed: {
    priority() {
      if (this.instance.priority) {
        return priorityDisplay[this.monster.priority];
      } else {
        return null;
      }
    },
    monster() {
      return this.instance.monster;
    },
    awakensTo() {
      return this.$store.getters["bestiary/monster"](this.monster.awakens_to);
    },
    family() {
      return this.$store.getters["profile/family"];
    }
  },
  methods: {
    ...mapActions("profile", ["fetchFamily"]),
    ...mapActions("bestiary", ["getMonster"]),
    async fetchData() {
      await this.fetchFamily({ id: this.instance.id });
    }
  }
};
</script>

<style></style>
