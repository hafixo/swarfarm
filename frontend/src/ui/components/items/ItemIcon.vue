<template>
  <div
    class="element-essence"
    data-toggle="tooltip"
    data-placement="top"
    data-container="body"
    :title="item.name"
  >
    <img :src="`/static/herders/images/items/${item.icon}`" />
    <span v-if="count" class="image-plus image-plus-right">{{ count }}</span>
  </div>
</template>

<script>
export default {
  props: {
    item: { type: Object, required: true },
    count: { type: Number, required: false }
  }
};
</script>

<style>
</style>