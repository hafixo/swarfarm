<template>
  <div class="panel panel-default">
    <div class="panel-heading">
      <p class="panel-title">
        <strong>{{ skill.name }}</strong>
      </p>
    </div>
    <ul class="list-group">
      <li class="list-group-item">
        <div class="monster-skill-thumb pull-left">
          <img :src="imageUrl" />
          <span v-if="level" class="image-plus image-plus-right">{{ level }}/{{ skill.max_level }}</span>
        </div>
        <p>
          {{ skill.description }}
          <template
            v-if="skill.cooltime"
          >(Reusable in {{ skill.cooltime }} turn{{ skill.cooltime|pluralize }}).</template>
        </p>
        <div class="clearfix"></div>
      </li>

      <li v-if="skill.upgrades.length" class="list-group-item">
        <p class="list-group-item-heading">
          <strong>Level-up Progress:</strong>
        </p>
        <ul class="list-unstyled">
          <li v-for="(upgrade, idx) in skill.upgrades" :key="idx">
            <span :class="level - 1 > idx ? 'text-success' : 'text-muted'">
              <i v-if="level - 1 > idx" class="glyphicon glyphicon-ok"></i>
              {{ upgrade.effect.replace("{0}", upgrade.amount) }}
            </span>
          </li>
        </ul>
      </li>

      <li v-if="skill.effects.length" class="list-group-item">
        <p class="list-group-item-heading">
          <strong>Skill Effects:</strong>
        </p>
        <p>
          <Effect v-for="(effect, idx) in skill.effects" :key="idx" :effect="effect" />
        </p>
        <div class="clearfix"></div>
      </li>

      <li v-if="skill.multiplier_formula" class="list-group-item">
        <p class="list-group-item-heading">
          <strong>Multiplier Formula:</strong>
        </p>
        <p>
          {{ skill.multiplier_formula }}
          <template v-if="skill.hits">x{{ skill.hits }}</template>
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
import Effect from "./Effect";

export default {
  components: {
    Effect
  },
  props: {
    skill: { type: Object, required: true },
    level: { type: Number, required: false }
  },
  computed: {
    imageUrl() {
      return `/static/herders/images/skills/${this.skill.icon_filename}`;
    }
  },
  filters: {
    pluralize(value) {
      return value > 1 ? "s" : "";
    }
  }
};
</script>

<style>
</style>