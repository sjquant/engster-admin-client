<template>
  <q-page class="row justify-center q-mt-lg q-mx-md">
    <div class="col-xs-12 col-sm-8 col-md-6">
      <q-btn unelevated color="primary" class="q-mb-lg" @click="routeNewPost">
        <div class="row items-center no-wrap">
          <q-icon name="add" size="20px"></q-icon>
          <div>새글 작성하기</div>
        </div>
      </q-btn>
      <post-list></post-list>
    </div>
  </q-page>
</template>

<script>
import PostList from "../components/posts/PostList.vue";
export default {
  name: "Posts",
  components: {
    PostList
  },
  methods: {
    routeNewPost() {
      this.$router.push("/posts/new");
    }
  }
};
</script>
<style lang="scss" scoped>
.new-post-btn {
  cursor: pointer;
  &:hover {
    background-color: $blue-1;
  }
}
</style>
