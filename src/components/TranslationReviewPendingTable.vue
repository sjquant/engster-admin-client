<template>
  <q-table
    class="translation-review-table"
    :data="translations"
    :columns="columns"
    :pagination="pagination"
    row-key="id"
    flat
    dense
    hide-bottom
    binary-state-sort
    :expanded.sync="expanded"
  >
    <template v-slot:body="props">
      <q-tr
        :props="props"
        @click="expandRow(props)"
        :class="['cursor-pointer', { expanded: props.expand }]"
      >
        <q-td v-for="col in props.cols" :key="col.name" :props="props">
          <q-btn
            :label="statusLabel(col.value)"
            color="primary"
            unelevated
            v-if="col.name === 'status'"
          />
          <span v-else> {{ col.value }} </span>
        </q-td>
      </q-tr>
      <q-tr v-show="props.expand" :props="props">
        <q-td colspan="100%">
          <div class="text-left">
            This is expand slot for row above: {{ props.row.id }}.
          </div>
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>
<script>
import { translationAPI } from "../api";

export default {
  data() {
    return {
      columns: [
        {
          name: "subtitle",
          label: "자막",
          align: "left",
          field: "line",
        },
        {
          name: "translation",
          label: "번역",
          align: "left",
          field: "translation",
        },
        {
          name: "translator",
          label: "작성자",
          align: "left",
          field: "user_nickname",
        },
        {
          name: "updated_at",
          label: "일시",
          align: "left",
          sortable: true,
          field: "updated_at",
        },
        {
          name: "status",
          label: "상태",
          align: "left",
          field: "status",
        },
      ],
      pagination: {
        rowsPerPage: 0,
      },
      translations: [],
      expanded: [],
    };
  },
  async created() {
    const { data } = await translationAPI.fetchTranslations({
      status: "APPROVED",
    });
    this.translations = data;
  },
  methods: {
    statusLabel(value) {
      switch (value) {
        case "APPROVED":
          return "승인";
        case "PENDING":
          return "대기중";
        case "CHANGE_REQUESTED":
          return "변경요청";
        case "REJECTED":
          return "거부";
        default:
          break;
      }
    },
    expandRow(props) {
      const { row, expand } = props;
      if (expand) {
        const index = this.expanded.findIndex(x => x === row.id);
        this.expanded.splice(index, 1);
      } else {
        this.expanded.push(row.id);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.translation-review-table {
  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th {
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
