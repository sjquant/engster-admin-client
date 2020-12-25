<template>
  <div class="flex justify-center q-mt-lg">
    <NoSubtitle v-if="!subtitles.length" />
    <div class="subtitle-item__container full-width q-pa-sm">
      <SubtitleItem
        v-for="subtitle in subtitles"
        :key="subtitle.id"
        :subtitle="subtitle"
      />
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
