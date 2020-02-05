<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog
      :value="open"
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
      @hide="$emit('update:open', false)"
    >
      <q-card class="bg-white">
        <q-bar class="bg-primary">
          <q-space />
          <q-btn dense flat icon="close" class="text-white" @click="$emit('update:open', false)">
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>
        <div class="row justify-center q-mt-lg q-mx-md">
          <div class="col-xs-12 col-sm-8 col-md-6">
            <example-search-input :searchText.sync="searchText" @search-started="searchExample"></example-search-input>
            <example-search-list></example-search-list>
          </div>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import ExampleSearchInput from "./ExampleSearchInput";
import ExampleSearchList from "./ExampleSearchList";
export default {
  components: {
    ExampleSearchInput,
    ExampleSearchList
  },
  props: {
    open: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      maximizedToggle: true,
      searchText: ""
    };
  },
  methods: {
    searchExample() {
      console.log(this.searchText);
    }
  }
};
</script>