<template>
  <q-card class="subtitle-to-csv-card">
    <q-card-section>
      <div class="text-h6">🔀 자막 → CSV 변환</div>
    </q-card-section>
    <q-separator />
    <q-card-section>
      <div class="q-mb-md">
        <input
          type="file"
          ref="subInput"
          class="hidden"
          accept=".smi,.srt"
          @change="getSubtitle"
        />
        <div class="file-container full-width" v-show="subtitle">
          <span>
            <q-icon name="attach_file" />
            {{ subtitleName }}
          </span>
          <span class="absolute-right q-pr-sm flex items-center">
            <q-btn
              size="xs"
              round
              color="primary"
              icon="clear"
              @click="removeSubtitle"
            />
          </span>
        </div>
        <q-btn
          outline
          class="full-width"
          color="primary"
          v-show="!subtitle"
          @click="uploadSubtitle"
          label="영어 자막 업로드"
        />
      </div>
      <div class="q-mb-md">
        <input
          type="file"
          ref="transInput"
          class="hidden"
          accept=".smi,.srt"
          @change="getTranslation"
        />
        <div class="file-container full-width" v-show="translation">
          <span>
            <q-icon name="attach_file" />
            {{ translationName }}
          </span>
          <span class="absolute-right q-pr-sm flex items-center">
            <q-btn
              size="xs"
              round
              color="primary"
              icon="clear"
              @click="removeTranslation"
            />
          </span>
        </div>
        <q-btn
          outline
          class="full-width"
          color="primary"
          v-show="!translation"
          @click="uploadTranslation"
          label="한글 자막 업로드"
        />
      </div>
      <q-card-actions align="right" class="q-pa-none">
        <div>
          <q-btn
            unelevated
            color="primary q-px-lg"
            label="CSV 변환"
            @click="downloadCSV"
          />
        </div>
      </q-card-actions>
    </q-card-section>
  </q-card>
</template>

<script>
import { subtitleAPI } from "../api";
export default {
  data() {
    return {
      subtitle: null,
      translation: null,
    };
  },
  computed: {
    subtitleName() {
      return this.subtitle?.name;
    },
    translationName() {
      return this.translation?.name;
    },
  },
  methods: {
    uploadSubtitle() {
      this.$refs.subInput.click();
    },
    uploadTranslation() {
      this.$refs.transInput.click();
    },
    getSubtitle(e) {
      this.subtitle = e.target.files[0];
    },
    getTranslation(e) {
      this.translation = e.target.files[0];
    },
    removeSubtitle() {
      this.$refs.subInput.value = "";
      this.subtitle = null;
    },
    removeTranslation() {
      this.$refs.transInput.value = "";
      this.translation = null;
    },
    downloadCSV() {
      if (!this.subtitle) {
        alert("영어 자막을 업로드해주세요.");
        return;
      }
      const filename = this.subtitle.name.split(".")[0] + ".csv";
      subtitleAPI.downloadCSV({
        subtitle: this.subtitle,
        translation: this.translation,
        filename,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.subtitle-to-csv-card {
  width: 768px;
  max-width: 768px;

  .file-container {
    position: relative;
    background-color: $blue-1;
    height: 36px;
    line-height: 36px;
    text-align: center;
    color: $primary;
    user-select: none;
  }
}
</style>
