<template>
  <div>
    <q-table
      class="pending-other-trans-table q-mb-md"
      :data="data"
      :columns="columns"
      :pagination.sync="pagination"
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
    </q-table>
    <div class="row justify-center q-mt-md">
      <q-pagination
        v-model="pagination.page"
        unelevated
        direction-links
        size="sm"
        :max="maxPage"
      />
    </div>
  </div>
</template>
<script>
import { subtitleAPI } from "../../api";
export default {
  async created() {
    const { data, count, limit } = await subtitleAPI.fetchTranslations(
      this.subtitleId,
      {
        limit: 5,
      }
    );
    this.data = data;
    this.maxPage = Math.ceil(count / limit);
  },
  props: {
    subtitleId: Number,
  },
  data() {
    return {
      columns: [
        {
          name: "translation",
          label: "번역",
          align: "left",
          field: "translation",
          style: "width: 80%;",
        },
        {
          name: "translator",
          label: "작성자",
          align: "left",
          field: "user",
          style: "auto",
        },
        {
          name: "updated_at",
          label: "일시",
          align: "left",
          field: "updated_at",
          style: "width: auto",
        },
      ],
      data: [],
      pagination: {
        page: 1,
        rowsPerPage: 5,
      },
      maxPage: 0,
    };
  },
};
</script>
<style lang="scss">
.pending-other-trans-table {
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

  tbody tr.expanded td:first-child {
    border-left: 4px solid $primary;
  }
}
</style>
