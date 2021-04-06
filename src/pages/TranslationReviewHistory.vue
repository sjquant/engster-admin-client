a<template>
  <q-page>
    <div class="q-pa-lg">
      <StatusTabs />
      <ReviewHistoryTable />
    </div>
  </q-page>
</template>
<script>
import StatusTabs from "../components/TranslationReview/StatusTabs.vue";
import ReviewHistoryTable from "../components/TranslationReview/ReviewHistoryTable";

export default {
  components: {
    StatusTabs,
    ReviewHistoryTable,
  },
};
</script>
<style lang="scss">
.translation-review-table {
  max-height: calc(100vh - 160px);
}
</style>
