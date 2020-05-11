import { normalize, denormalize } from "normalizr";

import { updateEntities } from "@/state/util";
import { getFamilyIds } from "@/services/monsters";

import { fetchMonsterInstance, fetchMonsterInstances } from "./api";
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

    const mInstance = await fetchMonsterInstance(profileName, id);
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
    const family_ids = getFamilyIds(monster_instance.monster.family_id);

    const response = await fetchMonsterInstances(profileName, {
      monster__family_id__in: family_ids.join(","),
    });

    commit(
      "updateEntities",
      normalize(response.results, [schema.monsterInstance])
    );

    const family_monster_ids = [
      ...new Set(
        response.results
          .filter(mInstance => mInstance.id !== id)
          .map(mInstance => mInstance.monster)
      ),
    ];

    await dispatch("bestiary/getMonsters", family_monster_ids, {
      root: true,
    });
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
