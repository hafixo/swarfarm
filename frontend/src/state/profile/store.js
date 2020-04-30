import { normalize, denormalize } from "normalizr";

import api from "@/services/api";
import { updateEntities } from "@/state/util";
import { getFamilyIds } from "@/services/monsters";

import schema from "./schema";

const state = {
  entities: {
    monsterInstances: {},
    runes: {},
    runeBuilds: {},
  },

  // Currently viewing
  profileName: null,
  monsterInstanceId: null,
};

const mutations = {
  updateEntities,
  setProfile(state, value) {
    state.profileName = value;
  },
  setMonsterInstanceViewing(state, value) {
    state.monsterInstanceId = value;
  },
};

const actions = {
  async fetchMonsterInstanceDetail({ state, dispatch }) {
    // Fetch the monster instance
    const mInstance = await dispatch("getMonsterInstance", {
      id: state.monsterInstanceId,
    });

    // Bestiary fetches base monster with all related objects
    await dispatch("bestiary/getFullMonster", mInstance.monster, {
      root: true,
    });

    // Get the related monsters that can be used as skillups
    await dispatch("fetchFamily");
  },

  async getMonsterInstance({ state, commit }, { id, profileName } = {}) {
    profileName = profileName || state.profileName;
    id = id || state.monsterInstanceId;

    const mInstance = await api.get(`profiles/${profileName}/monsters/${id}/`);
    commit("updateEntities", normalize(mInstance, schema.monsterInstance));

    return mInstance;
  },

  async fetchFamily(
    { state, getters, commit, dispatch },
    { id, profileName } = {}
  ) {
    profileName = profileName || state.profileName;
    id = id || state.monsterInstanceId;

    const monster_instance = getters.monsterInstance(id);
    console.log(id, monster_instance);
    const { results: family_results } = await api.get(
      `profiles/${profileName}/monsters/`,
      {
        monster__family_id__in: getFamilyIds(
          monster_instance.monster.family_id
        ).join(","),
      }
    );

    commit(
      "updateEntities",
      normalize(family_results, [schema.monsterInstance])
    );

    const family_monster_ids = family_results
      .filter(mInstance => mInstance.id !== id)
      .map(mInstance => mInstance.monster);

    await Promise.all(
      family_monster_ids.map(fam_id =>
        dispatch("bestiary/getMonster", fam_id, {
          root: true,
        })
      )
    );
  },
};

const getters = {
  viewedMonsterInstance: (state, getters) =>
    getters.monsterInstance(state.monsterInstanceId),

  monsterInstance: (state, getters, rootState) => id =>
    denormalize(id, schema.monsterInstance, {
      ...state.entities,
      ...rootState.bestiary.entities,
    }),

  ownedInstances: (state, getters) =>
    Object.values(state.entities.monsterInstances)
      .filter(m => m.owner === state.profileName)
      .map(m => getters.monsterInstance(m.id)),

  family: (state, { viewedMonsterInstance, ownedInstances }) =>
    ownedInstances.filter(
      mInstance =>
        getFamilyIds(viewedMonsterInstance.monster.family_id).includes(
          mInstance.monster.family_id
        ) && mInstance.id !== state.monsterInstanceId
    ),
};

const store = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};

export default store;
