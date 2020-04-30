import { normalize, denormalize } from "normalizr";

import api from "@/services/api";
import schema from "./schema";
import { updateEntities } from "@/state/util";

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
    const { results: skills } = await api.get(`skills/`, {
      id__in: monster.skills,
    });
    commit("updateEntities", normalize(skills, [schema.skill]));

    // Fetch related monsters
    const relatedIds = [
      monster.awakens_to,
      monster.awakens_from,
      monster.transforms_into,
    ].filter(r => Boolean(r));
    console.log(relatedIds);
    const { results: relatedMonsters } = await api.get(`monsters/`, {
      id__in: relatedIds.join(","),
    });
    commit("updateEntities", normalize(relatedMonsters, [schema.monster]));
  },
  async getMonster({ commit }, id) {
    // Fetch monster
    const monster = await api.get(`monsters/${id}/`);
    commit("updateEntities", normalize(monster, schema.monster));
    return monster;
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
