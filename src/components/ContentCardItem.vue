<template>
  <router-link
    :to="{
      name: 'contentDetail',
      params: { id: content.id },
    }"
  >
    <q-card class="full-height cursor-pointer">
      <img class="poster-img" :src="content.poster" :alt="content.title" />
      <q-card-section class="card-section">
        <div class="text-h6 text-grey-8">{{ content.title }}</div>
        <div class="text-subtitle2 text-grey-6 q-mb-sm">
          {{ content.year }}
        </div>
        <div class="q-mb-sm">
          <q-badge
            class="q-mr-xs text-capitalize"
            outline
            color="primary"
            v-for="each in content.genres"
            :key="each.id"
            >{{ each.name }}</q-badge
          >
        </div>
      </q-card-section>
    </q-card>
  </router-link>
</template>

<script>
export default {
  props: {
    content: Object,
  },
};
</script>

<style lang="scss" scoped>
.poster-img {
  max-height: 280px;
  object-fit: cover;
}
</style>
