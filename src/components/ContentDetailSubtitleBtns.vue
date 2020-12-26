<template>
  <div class="flex justify-end">
    <q-btn
      unelevated
      class="q-mr-sm"
      color="primary"
      label="자막 다운로드"
      @click="downloadAsCSV"
    />
    <input
      type="file"
      ref="input"
      class="hidden"
      accept=".csv"
      @change="addTranslationCSV"
    />
    <q-btn
      unelevated
      color="primary"
      label="번역 추가"
      @click="openTranslationExplorer"
    />
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import { subtitleAPI } from "../api";

export default {
  computed: {
    ...mapState(["subtitles", "content"]),
  },
  methods: {
    ...mapActions(["ADD_TRANSLATION_CSV"]),
    downloadAsCSV() {
      const contentId = this.content.id;
      const filename = `${this.content.title}.csv`;
      return subtitleAPI.downloadAsCSV({ contentId, filename });
    },
    openTranslationExplorer() {
      this.$refs.input.click();
    },
    addTranslationCSV(e) {
      const file = e.target.files[0];
      try {
        this.ADD_TRANSLATION_CSV(file);
      } finally {
        e.target.value = "";
      }
    },
  },
};
</script>
