<template>
  <q-page>
    <div class="flex justify-center">
      <div>
        <ContentDetailCard />
        <SubtitleList />
      </div>
    </div>
    <div class="q-ma-lg flex justify-center" v-show="isFetching">
      <q-circular-progress indeterminate size="50px" color="primary" />
    </div>
  </q-page>
</template>
<script>
import { mapActions } from "vuex";

import ContentDetailCard from "../components/ContentDetailCard";
import SubtitleList from "../components/ContentDetailSubtitleList";
import { scroll as scrollMixin } from "../mixins";

export default {
  mixins: [scrollMixin],
  components: {
    ContentDetailCard,
    SubtitleList,
  },
  data() {
    return {
      isFetching: false,
      hasMoreSubtitles: true,
    };
  },
  created() {
    const contentId = this.$route.params.id;
    this.GET_CONTENT(contentId);
    this.fetchSubtitles({ contentId });
    this.onScroll(() => this.fetchSubtitles({ contentId, append: true }));
  },
  methods: {
    ...mapActions(["GET_CONTENT", "FETCH_SUBTITLES"]),
    async fetchSubtitles({ contentId, append }) {
      if (!this.isFetching && this.hasMoreSubtitles) {
        try {
          this.isFetching = true;
          const data = await this.FETCH_SUBTITLES({ contentId, append });
          if (data.length === 0) this.hasMoreSubtitles = false;
        } finally {
          this.isFetching = false;
        }
      }
    },
  },
};
</script>
