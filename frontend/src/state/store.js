import Vue from "vue";
import Vuex from "vuex";

import bestiary from "./bestiary/store";
import profile from "./profile/store";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: { bestiary, profile },
});
