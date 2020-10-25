<template>
  <div class="badge-selector">
    <TagSelectorItem
      v-for="(item, i) in items"
      :key="item.id || i"
      :item="item"
      :item-id="item.id || i"
      :val-key="valKey"
      :color="color"
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
  data() {
    return {
      selected: [],
    };
  },
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
  watch: {
    selected(v) {
      this.$emit("input", v);
    },
  },
  methods: {
    selectItem(id) {
      this.selected.push(id);
    },
    unselectItem(id) {
      this.selected = this.selected.filter(x => x != id);
    },
  },
};
</script>
