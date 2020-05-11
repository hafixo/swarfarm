import { normalize, denormalize } from "normalizr";

import { updateEntities } from "@/state/util";
import { fetchMonster, fetchMonsters, fetchSkills } from "./api";
import schema from "./schema";

const state = {
  entities: {
    monsters: {},
    craftMaterials: {},
    sources: {},
    skills: {},
    effects: {},
  },
};

const mutations = {
  updateEntities,
};

const actions = {
  async getFullMonster({ commit, dispatch }, id) {
    const monster = await dispatch("getMonster", id);

    // Fetch skills
    const { results: skills } = await fetchSkills({
      id__in: monster.skills.join(","),
    });
    commit("updateEntities", normalize(skills, [schema.skill]));

    // Fetch related monsters
    const relatedIds = [
      monster.awakens_to,
      monster.awakens_from,
      monster.transforms_into,
    ].filter(r => Boolean(r));
    await dispatch("getMonsters", relatedIds);
  },

  async getMonster({ commit }, id) {
    // Fetch monster
    const monster = await fetchMonster(id);
    commit("updateEntities", normalize(monster, schema.monster));
    return monster;
  },

  async getMonsters({ commit }, ids) {
    const { results: monsters } = await fetchMonsters({
      id__in: ids.join(","),
    });
    commit("updateEntities", normalize(monsters, [schema.monster]));
    return monsters;
  },
};
const getters = {
  monster: state => id => denormalize(id, schema.monster, state.entities),
};

const store = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};

export default store;
