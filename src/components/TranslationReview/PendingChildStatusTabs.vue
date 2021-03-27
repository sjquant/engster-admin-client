<template>
  <div class="q-ma-sm flex justify-end">
    <q-tabs
      :value="tab"
      dense
      align="justify"
      class="text-grey-7"
      @input="(v) => $emit('update:tab', v)"
    >
      <q-tab :ripple="false" name="history" label="처리내역" />
      <q-tab :ripple="false" name="otherTranslations" label="다른번역" />
    </q-tabs>
  </div>
</template>
<script>
export default {
  props: {
    tab: String,
  },
};
</script>
