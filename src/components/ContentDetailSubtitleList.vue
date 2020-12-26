<template>
  <div class="flex justify-center q-mt-sm">
    <NoSubtitle v-if="!subtitles.length" />
    <div class="subtitle-item__container" v-else>
      <div class="q-pa-sm">
        <div class="flex justify-end">
          <q-btn
            unelevated
            class="q-mr-sm"
            color="primary"
            label="자막 다운로드"
          />
          <q-btn unelevated color="primary" label="번역  추가" />
        </div>
        <SubtitleItem
          v-for="subtitle in subtitles"
          :key="subtitle.id"
          :subtitle="subtitle"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import NoSubtitle from "./ContentDetailNoSubtitle";
import SubtitleItem from "./ContentDetailSubtitleItem";

export default {
  components: {
    NoSubtitle,
    SubtitleItem,
  },
  computed: {
    ...mapState(["subtitles"]),
  },
};
</script>

<style lang="scss" scoped>
.subtitle-item__container {
  position: relative;
  width: 100%;
  max-width: 600px;
}
</style>
