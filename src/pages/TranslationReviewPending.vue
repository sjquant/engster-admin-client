<template>
  <q-page>
    <div class="q-pa-lg">
      <StatusTabs />
      <PendingTable />
    </div>
  </q-page>
</template>
<script>
import StatusTabs from "../components/TranslationReview/StatusTabs.vue";
import PendingTable from "../components/TranslationReview/PendingTable.vue";

export default {
  components: {
    StatusTabs,
    PendingTable,
  },
};
</script>
<style lang="scss">
.translation-review-table {
  max-height: calc(100vh - 160px);
}
</style>
