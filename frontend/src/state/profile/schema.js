import { schema } from "normalizr";

import bestiary_schema from "@/state/bestiary/schema";

const rune = new schema.Entity("runes");

const runeBuild = new schema.Entity("runeBuilds", {
  runes: [rune],
});

const monsterInstance = new schema.Entity("monsterInstances", {
  monster: bestiary_schema.monster,
  default_build: runeBuild,
  rta_build: runeBuild,
});

// Extend schemas with circular/backwards references
runeBuild.define({
  monster: monsterInstance,
});

export default {
  monsterInstance,
  runeBuild,
  rune,
};
