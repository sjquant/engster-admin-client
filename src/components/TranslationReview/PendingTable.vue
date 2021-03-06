<template>
  <div>
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
      virtual-scroll
      :virtual-scroll-item-size="46"
      :virtual-scroll-sticky-size-start="46"
      :rows-per-page-options="[0]"
      @virtual-scroll="onScroll"
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
              @click.stop="onStatusBtnClicked(props.row)"
            />
            <div v-else-if="col.name === 'updated_at'">
              {{ formatDate(col.value) }}
            </div>
            <div v-else>{{ col.value }}</div>
          </q-td>
        </q-tr>
        <q-tr
          class="q-virtual-scroll--with-prev child-tr"
          no-hover
          :props="props"
          v-if="props.expand"
        >
          <q-td :colspan="props.cols.length">
            <PendingTableChild
              :translation-id="props.row.id"
              :subtitle-id="props.row.line_id"
            />
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <ReviewDialog
      v-model="dialogOn"
      :id="currentTranslationId"
      :original-status="currentStatus"
      @status-changed="changeStatus"
    />
  </div>
</template>
<script>
import moment from "moment";
import { translationAPI } from "../../api";
import { translator } from "../../utils";
import ReviewDialog from "./ReviewDialog.vue";
import PendingTableChild from "./PendingTableChild.vue";

export default {
  components: {
    ReviewDialog,
    PendingTableChild,
  },
  created() {
    this.fetchPendingTranslations();
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
      limit: 20,
      data: [],
      expanded: [],
      loading: false,
      fetchTimeout: null,
      hasMoreData: true,
      // For dialog
      dialogOn: false,
      currentTranslationId: null,
      currentStatus: null,
    };
  },
  computed: {
    offset() {
      return this.data.length;
    },
  },
  methods: {
    statusLabel: translator.reviewStatusLabel,
    async fetchPendingTranslations() {
      const { data } = await translationAPI.fetchTranslations({
        status: "PENDING",
        limit: this.limit,
        offset: this.offset,
      });
      if (data.length === 0) {
        this.hasMoreData = false;
      }
      this.data.push(...data);
    },
    formatDate(dt) {
      return moment(dt).format("YY.MM.DD HH:mm:ss");
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
    onScroll({ index, to }) {
      if (!index || !this.hasMoreData) {
        return;
      }
      async function fetchMore() {
        const lastIndex = this.data.length - 1;
        if (
          !this.loading &&
          lastIndex - index < this.limit &&
          to == lastIndex
        ) {
          this.loading = true;
          try {
            clearTimeout(this.fetchTimeout);
            await this.fetchPendingTranslations();
          } finally {
            this.loading = false;
          }
        }
      }
      this.fetchTimeout = setTimeout(fetchMore.bind(this), 500);
    },
    onStatusBtnClicked(data) {
      this.dialogOn = true;
      this.currentTranslationId = data.id;
      this.currentStatus = data.status;
    },
    changeStatus({ id, status }) {
      const idx = this.data.findIndex(x => x.id === id);
      if (idx >= 0) {
        this.$set(this.data[idx], "status", status);
      }
    },
  },
};
</script>
<style lang="scss">
.translation-pending-table {
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

  tbody tr.expanded td:first-child {
    border-left: 4px solid $primary;
  }

  tbody tr.child-tr > td {
    border-bottom: 1px solid $primary;
  }
}
</style>
