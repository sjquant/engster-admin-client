<template>
  <div class="row q-pa-lg q-col-gutter-md">
    <CreateContentItem class="col-xs-12 col-sm-6 col-md-3 col-lg-2" />
    <ContentItem
      class="col-xs-12 col-sm-6 col-md-3 col-lg-2"
      v-for="content in contents"
      :content="content"
      :key="content.id"
    />
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";

import CreateContentItem from "./CreateContentItem.vue";
import ContentItem from "./ContentItem.vue";

export default {
  components: { CreateContentItem, ContentItem },
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
