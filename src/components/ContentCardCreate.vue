<template>
  <div @click="routeToCreatPage">
    <q-card
      class="q-py-sm add-card full-height row justify-center items-center text-grey-5 text-h5 cursor-pointer"
    >
      <q-icon name="add"></q-icon>
      <span>New</span>
    </q-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      lorem:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    };
  },
  methods: {
    routeToCreatPage() {
      this.$router.push({ name: "contentCreate" });
    },
  },
};
</script>
<style lang="scss" scoped>
.add-card {
  &:hover {
    background-color: $grey-1;
  }
}
</style>
