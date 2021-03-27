a<template>
  <q-page>
    <div class="q-pa-lg">
      <StatusTabs />
    </div>
  </q-page>
</template>
<script>
import StatusTabs from "../components/TranslationReview/StatusTabs.vue";

export default {
  components: {
    StatusTabs,
  },
};
</script>
<style lang="scss">
.translation-review-table {
  max-height: calc(100vh - 160px);
}
</style>
