<template>
  <div class="content-create-form col-12 q-pa-lg q-mt-xl">
    <q-input label="Title" v-model="content.title" />
    <q-input label="Year" v-model="content.year" />
    <q-input label="Poster" v-model="content.poster" />

    <div class="q-gutter-sm q-mt-sm genre-container">
      <div class="text-grey-7">Genres</div>
      <TagSelector
        :items="allGenres"
        val-key="genre"
        v-model="selectedGenreIds"
      />
    </div>
    <q-separator class="q-my-sm" color="grey-5" />
    <div class="flex justify-end">
      <q-btn class="q-mt-md" color="primary" @click="createContent">제출</q-btn>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import TagSelector from "./share/TagSelector.vue";
export default {
  components: {
    TagSelector,
  },
  data() {
    return {
      content: {
        title: "",
        year: "",
        poster: "",
      },
      selectedGenreIds: [],
    };
  },
  computed: {
    ...mapState(["allGenres"]),
  },
  created() {
    this.FETCH_ALL_GENRES();
  },
  methods: {
    ...mapActions(["FETCH_ALL_GENRES", "CREATE_CONTENT"]),
    async createContent() {
      if (
        this.content.title === "" ||
        this.content.year === "" ||
        this.content.poster === ""
      ) {
        alert("누락된 부분이 있습니다. 컨텐츠 정보를 입력해주세요.");
        return;
      }

      const content = {
        ...this.content,
        genre_ids: this.selectedGenreIds,
      };
      try {
        await this.CREATE_CONTENT(content);
        this.$router.push({ name: "contentList" });
      } catch (e) {
        alert(e.message);
        return;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.content-create-form {
  max-width: 680px;

  .genre-container {
    min-height: 40px;
  }
}
</style>
