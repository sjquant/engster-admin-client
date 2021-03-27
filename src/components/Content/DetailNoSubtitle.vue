<template>
  <div>
    <div class="text-grey-6 q-mt-xl">
      아직 등록된 자막이 없습니다. 자막을 추가해주세요.
    </div>
    <div class="flex justify-center">
      <input
        type="file"
        ref="input"
        class="hidden"
        accept=".csv"
        @change="uploadSubtitleCSV"
      />
      <q-btn
        unelevated
        label="자막 업로드하기"
        color="primary"
        class="q-my-lg"
        @click="openSubtitleExplorer"
      />
    </div>
  </div>
</template>
<script>
import { subtitleAPI } from "../../api";

export default {
  methods: {
    openSubtitleExplorer() {
      this.$refs.input.click();
    },
    async uploadSubtitleCSV(e) {
      const file = e.target.files[0];
      const contentId = this.$route.params.id;
      try {
        await subtitleAPI.uploadSubtitleCSV({ file, contentId });
      } finally {
        e.target.value = "";
      }
    },
  },
};
</script>
