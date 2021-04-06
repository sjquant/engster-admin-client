<template>
  <div>
    <q-table
      class="pending-history-table q-mb-md"
      :data="data"
      :columns="columns"
      :pagination="pagination"
      no-data-label="해당 데이터가 없습니다."
      row-key="id"
      flat
      binary-state-sort
      hide-pagination
    >
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
            :style="col.style"
          >
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>
      <template v-slot:body-cell-status="props">
        <q-td :props="props">
          {{ statusLabel(props.value) }}
        </q-td>
      </template>
    </q-table>
    <div class="row justify-center q-mt-md">
      <q-pagination
        v-model="page"
        unelevated
        size="sm"
        :direction-links="!!maxPage"
        :max="maxPage"
        @input="fetchReviews"
      />
    </div>
  </div>
</template>
<script>
import { translationAPI } from "../../api";
import { translator } from "../../utils";

export default {
  created() {
    this.fetchReviews(this.page);
  },
  props: {
    translationId: Number,
  },
  data() {
    return {
      columns: [
        {
          name: "translation",
          label: "번역",
          align: "left",
          field: "translation",
          style: "width: 50%;",
        },

        {
          name: "message",
          label: "메모",
          align: "left",
          field: "message",
          style: "width: 30%;",
        },
        {
          name: "status",
          label: "상태",
          align: "left",
          field: "status",
          style: "min-width: 56px;",
        },
        {
          name: "reviewer_nickname",
          label: "리뷰어",
          align: "left",
          field: "reviewer_nickname",
          style: "width: auto;",
        },
        {
          name: "updated_at",
          label: "일시",
          align: "left",
          field: "updated_at",
          style: "width: auto;",
        },
      ],
      data: [],
      limit: 5,
      page: 1,
      maxPage: 0,
    };
  },
  computed: {
    pagination() {
      return {
        page: this.page,
        rowsPerPage: this.limit,
      };
    },
  },
  methods: {
    statusLabel: translator.reviewStatusLabel,
    async fetchReviews(page) {
      const offset = (page - 1) * this.limit;
      const { data, count } = await translationAPI.fetchReveiws(
        this.translationId,
        {
          limit: this.limit,
          offset: offset,
        }
      );
      this.data = data;
      if (page === 1) this.maxPage = Math.ceil(count / this.limit);
    },
  },
};
</script>
<style lang="scss">
.pending-history-table {
  td {
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
