<template>
  <div class="badge-selector">
    <TagSelectorItem
      v-for="(item, i) in items"
      :key="itemId(item, i)"
      :item="item"
      :item-id="itemId(item, i)"
      :val-key="valKey"
      :color="color"
      :selected="value.includes(itemId(item, i))"
      @item-selected="selectItem"
      @item-unselected="unselectItem"
    />
  </div>
</template>

<script>
import TagSelectorItem from "./TagSelectorItem.vue";
export default {
  name: "TagSelector",
  components: { TagSelectorItem },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    color: {
      type: String,
      default: "primary",
    },
    valKey: {
      type: String,
      default: "value",
    },
    value: Array,
  },
  methods: {
    itemId(item, i) {
      return item.id || i;
    },
    selectItem(id) {
      this.$emit("input", [...this.value, id]);
    },
    unselectItem(id) {
      this.$emit(
        "input",
        this.value.filter(x => x !== id)
      );
    },
  },
};
</script>
