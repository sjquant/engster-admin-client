<template>
  <q-dialog :value="value" @input="$emit('input')" ref="dialog">
    <q-card style="min-width: 320px">
      <q-card-section class="q-pb-sm">
        <div class="text-h6">상태 변경</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-option-group :options="options" type="radio" v-model="status" />
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-input v-model="message" outlined autogrow dense />
      </q-card-section>

      <q-card-actions align="right" class="text-primary q-pt-none">
        <q-btn flat label="취소" v-close-popup />
        <q-btn flat label="제출" @click="submit" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { translationAPI } from "../../api";

export default {
  props: {
    value: Boolean,
    id: Number,
    originalStatus: String,
  },
  watch: {
    id() {
      this.message = "";
      this.status = this.originalStatus;
    },
  },
  data() {
    return {
      message: "",
      status: "PENDING",
      options: [
        { label: "대기중", value: "PENDING" },
        { label: "변경요청", value: "CHANGE_REQUESTED" },
        { label: "승인", value: "APPROVED" },
        { label: "거부", value: "REJECTED" },
      ],
    };
  },
  methods: {
    async submit() {
      if (this.status === "CHANGE_REQUESTED" && !this.message) {
        alert("메세지를 입력해주세요.");
        return;
      }

      if (
        this.status !== "CHANGE_REQUESTED" &&
        this.originalStatus === this.status
      ) {
        alert("상태를 변경해주세요.");
        return;
      }

      try {
        await translationAPI.createReview(this.id, {
          status: this.status,
          message: this.message || null,
        });
        this.$refs.dialog.hide();
        this.$emit("status-changed", { id: this.id, status: this.status });
      } catch {
        alert("문제가 발생했습니다.");
      }
    },
  },
};
</script>
