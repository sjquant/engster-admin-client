<template>
  <div class="flex justify-center q-mt-sm">
    <NoSubtitle v-if="!subtitles.length" />
    <div class="subtitle-item__container" v-else>
      <div class="q-pa-sm">
        <SubtitleBtns />
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
import NoSubtitle from "./DetailNoSubtitle.vue";
import SubtitleItem from "./DetailSubtitleItem.vue";
import SubtitleBtns from "./DetailSubtitleBtns.vue";

export default {
  components: {
    NoSubtitle,
    SubtitleItem,
    SubtitleBtns,
  },
  computed: {
    ...mapState(["subtitles", "content"]),
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
