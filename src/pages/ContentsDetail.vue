<template>
  <q-page>
    <div class="row justify-center">
      <ContentDetailCard />
    </div>
  </q-page>
</template>
<script>
import { mapActions } from "vuex";

import ContentDetailCard from "../components/ContentDetailCard";

export default {
  components: {
    ContentDetailCard,
  },
  created() {
    const contentId = this.$route.params.id;
    this.GET_CONTENT(contentId);
  },
  methods: {
    ...mapActions(["GET_CONTENT"]),
  },
};
</script>
