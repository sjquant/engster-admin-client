<template>
  <q-page>
    <div class="flex justify-center">
      <div>
        <DetailCard />
        <SubtitleList />
      </div>
    </div>
    <div class="q-ma-lg flex justify-center" v-show="isFetching">
      <q-circular-progress indeterminate size="50px" color="primary" />
    </div>
  </q-page>
</template>
<script>
import { mapActions, mapMutations } from "vuex";

import DetailCard from "../components/Content/DetailCard.vue";
import SubtitleList from "../components/Content/DetailSubtitleList.vue";
import { scroll as scrollMixin } from "../mixins";

export default {
  mixins: [scrollMixin],
  components: {
    DetailCard,
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
  },
  mounted() {
    const contentId = this.$route.params.id;
    this.onScroll(() => this.fetchSubtitles({ contentId, append: true }));
  },
  beforeDestroy() {
    this.SET_CONTENT({});
    this.SET_SUBTITLES([]);
  },
  methods: {
    ...mapMutations(["SET_CONTENT", "SET_SUBTITLES"]),
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
