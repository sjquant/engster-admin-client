<template>
  <div class="q-pb-lg flex justify-end">
    <q-tabs dense align="justify" class="text-grey-7">
      <q-route-tab
        :ripple="false"
        to="/translation-reviews/pending"
        label="대기중"
      />
      <q-route-tab
        :ripple="false"
        to="/translation-reviews/history"
        label="처리내역"
      />
    </q-tabs>
  </div>
</template>
<script></script>
