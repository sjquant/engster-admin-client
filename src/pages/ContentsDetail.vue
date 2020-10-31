<template>
  <div>{{ content }}</div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState(["content"]),
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
