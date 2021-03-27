<template>
  <div class="tab-container">
    <q-tabs dense v-model="tab" align="justify" class="text-grey-7">
      <q-tab :ripple="false" name="pending" label="대기중" />
      <q-tab :ripple="false" name="processed" label="처리내역" />
    </q-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tab: "pending",
    };
  },
};
</script>
<style scoped lang="scss">
.tab-container {
  width: 200px;
}
</style>
