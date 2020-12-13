<template>
  <q-page>
    <div class="flex justify-center">
      <div>
        <ContentDetailCard />
        <SubtitleList />
      </div>
    </div>
  </q-page>
</template>
<script>
import { mapActions } from "vuex";

import ContentDetailCard from "../components/ContentDetailCard";
import SubtitleList from "../components/ContentDetailSubtitleList";

export default {
  components: {
    ContentDetailCard,
    SubtitleList,
  },
  created() {
    const contentId = this.$route.params.id;
    this.GET_CONTENT(contentId);
    this.FETCH_SUBTITLES({ contentId });
  },
  methods: {
    ...mapActions(["GET_CONTENT", "FETCH_SUBTITLES"]),
  },
};
</script>
