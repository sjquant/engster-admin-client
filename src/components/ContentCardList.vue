<template>
  <div class="row q-pa-lg q-col-gutter-md">
    <ContentCardAdd class="col-xs-12 col-sm-6 col-md-3 col-lg-2" />
    <ContentCard class="col-xs-12 col-sm-6 col-md-3 col-lg-2" v-for="i in 30" :key="i" />
  </div>
</template>
<script>
import ContentCardAdd from "../components/ContentCardAdd.vue";
import ContentCard from "../components/ContentCardItem.vue";

export default {
  components: { ContentCardAdd, ContentCard },
};
</script>