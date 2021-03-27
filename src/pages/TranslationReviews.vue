<template>
  <q-page>
    <div class="q-pa-lg">
      <div class="q-pb-lg full-width flex justify-end">
        <StatusTabs />
      </div>
      <PendingTable />
    </div>
  </q-page>
</template>
<script>
import StatusTabs from "../components/TranslationReviewStatusTabs.vue";
import PendingTable from "../components/TranslationReviewPendingTable.vue";

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
