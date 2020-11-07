<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex justify-center full-width items-center">
        <div class="login-form-container q-mx-sm">
          <q-input
            v-model="email"
            label="Email"
            class="q-mb-lg"
            @keyup.enter="login"
          />
          <q-input
            v-model="password"
            label="Password"
            type="password"
            class="q-mb-lg"
            @keyup.enter="login"
          />
          <div class="flex justify-end">
            <q-btn color="primary" @click="login">로그인</q-btn>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  computed: {
    ...mapGetters(["isAdmin"]),
  },
  methods: {
    ...mapActions(["OBTAIN_TOKEN"]),
    async login() {
      if (!this.email || !this.password) {
        alert("이메일과 비밀번호를 입력해주세요.");
        return;
      }

      try {
        await this.OBTAIN_TOKEN({ email: this.email, password: this.password });
        if (this.isAdmin) {
          this.$router.push("/");
        } else {
          alert("관리자 권한이 없습니다.");
        }
      } catch (e) {
        if (e.response.status === 404) {
          alert("존재하지 않는 유저입니다.");
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.login-form-container {
  width: 100%;
  max-width: 400px;
}
</style>
