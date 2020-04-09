<template>
  <div class="panel panel-default">
    <div class="panel-heading">
      <p class="panel-title">Monster Info</p>
    </div>

    <div class="panel-body">
      <Portrait
        :monster="monster.monster"
        :stars="monster.stars"
        :level="monster.level"
        :locked="monster.ignore_for_fusion"
        :fodder="monster.fodder"
        :storage="monster.in_storage"
      />

      <div class="bestiary-name">
        <h1 v-if="monster.custom_name">
          {{ monster.custom_name }}
          <small>{{ monster.monster.name }}</small>
        </h1>
        <h1 v-else>{{ monster.monster.name }}</h1>
        <p class="lead">
          <img
            :src="`/static/herders/images/elements/${monster.monster.element.toLowerCase()}.png`"
            style="height:1em"
          />
          {{ this.monster.monster.archetype }}
        </p>
      </div>
    </div>

    <table class="table table-condensed table-bordered">
      <tbody>
        <tr v-if="monster.created">
          <td>Summoned On:</td>
          <td>{{ monster.created }}</td>
        </tr>

        <tr v-if="awakensTo">
          <td>Awakens to</td>
          <td>
            <a :href="`/bestiary/${awakensTo.bestiary_slug}/`" target="_blank">
              <Portrait small :monster="awakensTo" :stars="awakensTo.base_stars" />
            </a>
            {{ monster.monster.awaken_bonus }}
          </td>
        </tr>
        <tr v-if="monster.monster.can_awaken && monster.monster.awaken_level < 1">
          <td>Awakening Essences:</td>
          <td class="monster-awaken-materials">
            <ItemIcon
              v-for="(item, index) in monster.monster.awaken_cost"
              :key="index"
              :item="item.item"
              :count="item.quantity"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import api from "@/services/api";
import { Portrait } from "@/components/monsters";
import { ItemIcon } from "@/components/items";

export default {
  props: {
    monster: Object
  },
  data() {
    return {
      awakensTo: null
    };
  },
  components: {
    Portrait,
    ItemIcon
  },
  created() {
    this.getAwakensTo();
  },
  methods: {
    async getAwakensTo() {
      if (this.monster.monster.awakens_to) {
        this.awakensTo = await api.get(
          `monsters/${this.monster.monster.awakens_to}/`
        );
      } else {
        this.awakensTo = null;
      }
    }
  }
};
</script>

<style>
</style>