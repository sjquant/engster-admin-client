<template>
  <div>
    <q-card class="cursor-pointer">
      <img
        class="poster-img"
        src="https://images-na.ssl-images-amazon.com/images/I/51ihDXYQARL._AC_.jpg"
      />

      <q-card-section class="card-section">
        <div class="text-h6 text-grey-8">The Maze Runner</div>
        <div class="text-subtitle2 text-grey-6">by John Paesano</div>
      </q-card-section>
    </q-card>
  </div>
</template>


<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.poster-img {
  max-height: 16rem;
  object-fit: cover;
}
</style>