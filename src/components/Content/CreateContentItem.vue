<template>
  <router-link :to="{ name: 'contentCreate' }">
    <q-card
      class="q-py-sm add-card full-height row justify-center items-center text-grey-5 text-h5 cursor-pointer"
    >
      <q-icon name="add"></q-icon>
      <span>New</span>
    </q-card>
  </router-link>
</template>
<script>
export default {
  methods: {
    routeToCreatPage() {
      this.$router.push();
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
