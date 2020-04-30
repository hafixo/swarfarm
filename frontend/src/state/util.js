import Vue from "vue";

export const updateEntities = (state, { entities }) => {
  // Iterate through payload entities and update state using vue.set to ensure reactivity
  Object.keys(entities).forEach(entityType => {
    Object.values(entities[entityType]).forEach(entity => {
      Vue.set(state.entities[entityType], entity.id, entity);
    });
  });
};
