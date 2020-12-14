<template>
  <div class="flex justify-center q-mt-xl">
    <NoSubtitle v-if="!subtitles.length" />
  </div>
</template>
<script>
import { mapState } from "vuex";
import NoSubtitle from "./ContentDetailNoSubtitle";

export default {
  components: {
    NoSubtitle,
  },
  computed: {
    ...mapState(["subtitles"]),
  },
};
</script>
