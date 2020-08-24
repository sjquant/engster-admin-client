<template>
  <div>
    <q-card class="full-height cursor-pointer">
      <img class="poster-img" :src="content.poster" :alt="content.title" />
      <q-card-section class="card-section">
        <div class="text-h6 text-grey-8">{{ content.title }}</div>
        <div class="text-subtitle2 text-grey-6 q-mb-sm">
          {{ content.year }}
        </div>
        <div class="q-mb-sm">
          <q-badge
            class="q-mr-xs"
            outline
            color="primary"
            v-for="each in content.genres"
            :key="each.id"
            >{{ each.name }}</q-badge
          >
        </div>
        <div>
          <q-badge>{{ content.category_name }}</q-badge>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.poster-img {
  max-height: 16rem;
  object-fit: cover;
}
</style>
