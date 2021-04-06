<template>
  <div>
    <q-table
      class="review-history-table"
      :data="data"
      :columns="columns"
      :pagination="pagination"
      row-key="id"
      flat
      hide-bottom
      binary-state-sort
      virtual-scroll
      :virtual-scroll-item-size="46"
      :virtual-scroll-sticky-size-start="46"
      :rows-per-page-options="[0]"
      @virtual-scroll="onScroll"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td v-for="col in props.cols" :key="col.name">
            <div v-if="col.name === 'status'">{{ statusLabel(col.value) }}</div>
            <div v-else>{{ col.value }}</div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>
<script>
import { translator } from "../../utils";
import { translationReviewAPI } from "../../api";

export default {
  components: {},
  created() {
    this.fetchReviewHistory();
  },
  data() {
    return {
      columns: [
        {
          name: "subtitle",
          label: "자막",
          align: "left",
          field: "line",
          style: "width: 25%;",
        },
        {
          name: "translation",
          label: "번역",
          align: "left",
          field: "translation",
          style: "width: 25%;",
        },
        {
          name: "message",
          label: "메모",
          align: "left",
          field: "message",
          style: "width: 15%;",
        },
        {
          name: "status",
          label: "상태",
          align: "left",
          field: "status",
          style: "width: auto;",
        },
        {
          name: "updated_at",
          label: "일시",
          align: "left",
          sortable: true,
          field: "updated_at",
          style: "width: auto;",
        },
        {
          name: "reviewer_nickname",
          label: "리뷰어",
          align: "left",
          field: "reviewer_nickname",
          style: "width: auto;",
        },
      ],
      data: [],
      limit: 20,
      fetchTimeout: null,
      loading: false,
      pagination: {
        rowsPerPage: 0,
      },
      hasMoreData: true,
    };
  },
  computed: {
    cursor() {
      if (this.data.length === 0) return;
      const lastIndex = this.data.length - 1;
      return this.data[lastIndex].id;
    },
  },
  methods: {
    statusLabel: translator.reviewStatusLabel,
    async fetchReviewHistory() {
      const { data } = await translationReviewAPI.fetchReviews({
        limit: this.limit,
        cursor: this.cursor,
      });
      if (data.length === 0) {
        this.hasMoreData = false;
        return;
      }
      this.data.push(...data);
    },
    onScroll({ index }) {
      if (!this.hasMoreData) {
        return;
      }
      async function fetchMore() {
        const lastIndex = this.data.length - 1;
        if (!this.loading && index >= lastIndex - 5) {
          this.loading = true;
          try {
            clearTimeout(this.fetchTimeout);
            await this.fetchReviewHistory();
          } finally {
            this.loading = false;
          }
        }
      }
      this.fetchTimeout = setTimeout(fetchMore.bind(this), 200);
    },
  },
};
</script>
<style lang="scss">
.review-history-table {
  height: calc(100vh - 184px);
  max-height: 800px;

  td > div {
    width: 100%;
    white-space: normal;
  }

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th {
    height: 48px;
    background-color: $grey-3;
  }

  thead tr th {
    position: sticky;
    z-index: 1;
  }

  thead tr:first-child th {
    top: 0;
  }

  &.q-table--loading thead tr:last-child th {
    top: 48px;
  }
}
</style>
