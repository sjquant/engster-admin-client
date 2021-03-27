<template>
  <div class="content-edit-form col-12 q-pa-lg q-mt-xl">
    <q-input label="Title" v-model="newContent.title" />
    <q-input label="Year" v-model="newContent.year" />
    <q-input label="Poster" v-model="newContent.poster" />

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
      <q-btn class="q-mt-md" color="primary" @click="editContent">수정</q-btn>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import TagSelector from "../share/TagSelector.vue";
export default {
  components: {
    TagSelector,
  },
  data() {
    return {
      newContent: {},
      selectedGenreIds: [],
    };
  },
  computed: {
    ...mapState(["content", "allGenres"]),
  },
  async created() {
    const id = this.$route.params.id;
    this.FETCH_ALL_GENRES();
    const { title, year, poster, genres } = await this.GET_CONTENT(id);
    this.newContent = { title, year, poster };
    this.selectedGenreIds = genres.map(x => x.id);
  },
  methods: {
    ...mapActions(["FETCH_ALL_GENRES", "GET_CONTENT", "UPDATE_CONTENT"]),
    async editContent() {
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
        const id = this.$route.params.id;
        await this.UPDATE_CONTENT({ id, content });
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
.content-edit-form {
  max-width: 680px;

  .genre-container {
    min-height: 40px;
  }
}
</style>
