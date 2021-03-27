<template>
  <div>
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
            class="q-mr-xs text-capitalize"
            outline
            color="primary"
            v-for="each in content.genres"
            :key="each.id"
            >{{ each.name }}
          </q-badge>
        </div>
      </q-card-section>
      <div class="absolute-bottom-right">
        <q-btn
          round
          icon="edit"
          color="primary"
          size="sm"
          class="q-ma-sm"
          @click="routeContentEdit"
        />
        <q-btn
          round
          icon="delete"
          color="primary"
          size="sm"
          class="q-ma-sm"
          @click="showDeleteModal = true"
        />
      </div>
    </q-card>
    <q-dialog v-model="showDeleteModal">
      <q-card style="width: 300px">
        <q-card-section>
          <div>정말 삭제하시겠습니까?</div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="확인" color="primary" @click="deleteContent" />
          <q-btn flat label="취소" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      showDeleteModal: false,
    };
  },
  computed: {
    ...mapState(["content"]),
  },
  methods: {
    ...mapActions(["DELETE_CONTENT"]),
    routeContentEdit() {
      const id = this.$route.params.id;
      this.$router.push({ name: "contentEdit", params: { id } });
    },
    async deleteContent() {
      const id = this.$route.params.id;
      await this.DELETE_CONTENT(id);
      this.$router.push({ name: "contentList" });
    },
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
