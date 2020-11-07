<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex justify-center full-width items-center">
        <div class="login-form-container q-mx-sm">
          <q-input v-model="email" label="Email" class="q-mb-lg" />
          <q-input
            v-model="password"
            label="Password"
            type="password"
            class="q-mb-lg"
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
import { mapActions } from "vuex";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    ...mapActions(["OBTAIN_TOKEN"]),
    login() {
      this.OBTAIN_TOKEN({ email: this.email, password: this.password });
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
