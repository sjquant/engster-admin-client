<template>
  <q-card flat class="subtitle-item__card bg-grey-2">
    <q-card-section horizontal class="q-my-md">
      <q-card-section vertical class="subtitle-item__subtitle-container">
        <div>
          {{ subtitle.line }}
        </div>
        <div v-if="subtitle.translation">
          <q-separator color="grey-4" class="q-my-sm" />
          <div>
            {{ subtitle.translation }}
          </div>
        </div>
      </q-card-section>

      <q-card-section
        class="subtitle-item__time-container absolute-right flex items-center"
      >
        {{ sec2time(subtitle.time) }}
      </q-card-section>
    </q-card-section>
  </q-card>
</template>

<script>
import { time } from "../utils";
export default {
  props: {
    subtitle: Object,
  },
  methods: {
    sec2time: time.sec2time,
  },
};
</script>
<style lang="scss" scoped>
.subtitle-item__card {
  max-width: 600px;

  .subtitle-item__subtitle-container {
    width: calc(100% - 90px);
  }

  .subtitle-item__time-container {
    width: 90px;
  }
}
</style>
