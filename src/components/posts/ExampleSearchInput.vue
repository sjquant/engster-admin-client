<template>
  <q-input
    outlined
    dense
    :value="searchText"
    @input="value => $emit('update:searchText', value)"
    @keyup.enter="search"
    class="q-mb-lg"
  >
    <template v-slot:append>
      <q-btn dense round flat :ripple="false" icon="search" @click="search" class="text-primary" />
    </template>
  </q-input>
</template>
<script>
export default {
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  methods: {
    search($event) {
      this.$emit("search-started");
    }
  }
};
</script>