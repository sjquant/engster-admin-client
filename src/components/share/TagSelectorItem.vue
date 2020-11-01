<template>
  <span>
    <q-chip
      size="md"
      square
      clickable
      :ripple="false"
      :outline="!selected"
      :color="color"
      :class="[{ 'text-white': selected }, 'text-capitalize']"
      @click="updateSelected"
      >{{ itemVal }}</q-chip
    >
  </span>
</template>
<script>
export default {
  name: "TagSelectorItem",
  props: {
    item: [Object, String, Number],
    itemId: [String, Number],
    valKey: String,
    color: String,
    selected: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    itemVal() {
      if (typeof this.item === "object") {
        return this.item[this.valKey];
      } else {
        return this.item;
      }
    },
  },
  methods: {
    updateSelected() {
      if (this.selected) {
        this.$emit("item-unselected", this.itemId);
      } else {
        this.$emit("item-selected", this.itemId);
      }
    },
  },
};
</script>
