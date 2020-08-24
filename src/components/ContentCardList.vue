<template>
  <div class="row q-pa-lg q-col-gutter-md">
    <ContentCardAdd class="col-xs-12 col-sm-6 col-md-3 col-lg-2" />
    <ContentCardItem
      class="col-xs-12 col-sm-6 col-md-3 col-lg-2"
      v-for="content in contents"
      :content="content"
      :key="content.id"
    />
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex";

import ContentCardAdd from "../components/ContentCardAdd.vue";
import ContentCardItem from "../components/ContentCardItem.vue";

export default {
  components: { ContentCardAdd, ContentCardItem },
  created() {
    this.FETCH_CONTENTS({ cursor: this.contentCursor });
  },
  computed: {
    ...mapState(["contents"]),
    ...mapGetters(["contentCursor"]),
  },
  methods: {
    ...mapActions(["FETCH_CONTENTS"]),
  },
};
</script>
