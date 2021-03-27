<template>
  <div class="full-width">
    <PendingChildStatusTabs :tab.sync="tab" />
    <PendingChildHistoryTable
      v-if="tab === 'history'"
      :translation-id="translationId"
    />
    <PendingChildOtherTransTable
      :subtitle-id="subtitleId"
      v-if="tab === 'otherTranslations'"
    />
  </div>
</template>
<script>
import PendingChildStatusTabs from "./PendingChildStatusTabs.vue";
import PendingChildHistoryTable from "./PendingChildHistoryTable.vue";
import PendingChildOtherTransTable from "./PendingChildOtherTransTable.vue";

export default {
  components: {
    PendingChildStatusTabs,
    PendingChildHistoryTable,
    PendingChildOtherTransTable,
  },
  props: {
    translationId: Number,
    subtitleId: Number,
  },
  data() {
    return {
      tab: "history",
    };
  },
};
</script>
