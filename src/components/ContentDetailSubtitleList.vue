<template>
  <div class="flex justify-center q-mt-xl">
    <div v-if="!subtitles.length">
      <div class="text-grey-6 q-mt-xl">
        아직 등록된 자막이 없습니다. 자막을 추가해주세요.
      </div>
      <div class="flex justify-center">
        <q-btn
          unelevated
          label="자막 추가하기"
          color="primary"
          class="q-my-lg"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["subtitles"]),
  },
};
</script>
