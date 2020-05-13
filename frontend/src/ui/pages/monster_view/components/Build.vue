<template>
  <div>
    <Runes :instance="instance" />
    <Stats :instance="instance" />
  </div>
</template>

<script>
import Runes from "./Runes";
import Stats from "./Stats";

export default {
  props: {
    instance: { type: Object, required: true }
  },
  components: {
    Runes,
    Stats
  }
};
</script>

<style>
</style>
