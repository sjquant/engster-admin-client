<template>
  <q-page>
    <div class="flex full-width q-pa-lg justify-center">
      <SubtitleToCSV />
    </div>
  </q-page>
</template>

<script>
import SubtitleToCSV from "../components/Etcetera/SubtitleToCSV.vue";
export default {
  components: {
    SubtitleToCSV,
  },
};
</script>
