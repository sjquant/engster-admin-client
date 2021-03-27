<template>
  <q-table
    class="translation-pending-table"
    :data="data"
    :columns="columns"
    :pagination="pagination"
    :expanded.sync="expanded"
    row-key="id"
    flat
    dense
    hide-bottom
    binary-state-sort
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
    <template v-slot:body="props">
      <q-tr
        :props="props"
        @click="expandRow(props)"
        :class="['cursor-pointer', { expanded: props.expand }]"
      >
        <q-td v-for="col in props.cols" :key="col.name">
          <q-btn
            :label="statusLabel(col.value)"
            color="primary"
            unelevated
            v-if="col.name === 'status'"
            @click.stop
          />
          <div v-else>{{ col.value }}</div>
        </q-td>
      </q-tr>
      <q-tr v-if="props.expand" :props="props" no-hover>
        <q-td :colspan="props.cols.length">
          <PendingTableChild
            :translation-id="props.row.id"
            :subtitle-id="props.row.line_id"
          />
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>
<script>
import { translationAPI } from "../../api";
import { translator } from "../../utils";
import PendingTableChild from "./PendingTableChild.vue";

export default {
  components: {
    PendingTableChild,
  },
  data() {
    return {
      columns: [
        {
          name: "subtitle",
          label: "자막",
          align: "left",
          field: "line",
          style: "width: 35%;",
        },
        {
          name: "translation",
          label: "번역",
          align: "left",
          field: "translation",
          style: "width: 35%;",
        },
        {
          name: "translator",
          label: "작성자",
          align: "left",
          field: "user_nickname",
          style: "width: 15%;",
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
          name: "status",
          label: "상태",
          align: "left",
          field: "status",
          style: "width: auto;",
        },
      ],
      pagination: {
        rowsPerPage: 0,
      },
      data: [],
      expanded: [],
    };
  },
  async created() {
    const { data } = await translationAPI.fetchTranslations({
      status: undefined,
    });
    this.data = data;
  },
  methods: {
    statusLabel: translator.reviewStatusLabel,
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
<style lang="scss">
.translation-pending-table {
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

  tbody tr.expanded td:first-child {
    border-left: 4px solid $primary;
  }
}
</style>
