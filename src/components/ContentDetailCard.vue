<template>
  <q-card class="content-detail-card q-ma-sm q-mt-xl row">
    <img
      class="poster-img col-xs-12 col-sm-6"
      :src="content.poster"
      :alt="content.title"
    />
    <q-card-section class="col-sm-6">
      <div class="text-h6 text-grey-8">{{ content.title }}</div>
      <div class="text-subtitle2 text-grey-6 q-mb-sm">
        {{ content.year }}
      </div>
      <div>
        <q-badge
          class="q-mr-xs"
          outline
          color="primary"
          v-for="each in content.genres"
          :key="each.id"
          >{{ each.name }}
        </q-badge>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["content"]),
  },
};
</script>

<style lang="scss" scoped>
.content-detail-card {
  max-width: 600px;
}

.poster-img {
  max-height: 280px;
  object-fit: cover;
}
</style>
