<template>
  <div class="row q-pa-lg q-col-gutter-md">
    <ContentCardCreate class="col-xs-12 col-sm-6 col-md-3 col-lg-2" />
    <ContentCardItem
      class="col-xs-12 col-sm-6 col-md-3 col-lg-2"
      v-for="content in contents"
      :content="content"
      :key="content.id"
    />
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";

import ContentCardCreate from "../components/ContentCardCreate.vue";
import ContentCardItem from "../components/ContentCardItem.vue";

export default {
  components: { ContentCardCreate, ContentCardItem },
  computed: {
    ...mapState(["contents"]),
  },
  created() {
    this.FETCH_CONTENTS({ cursor: null });
  },
  methods: {
    ...mapActions(["FETCH_CONTENTS"]),
  },
};
</script>
