<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { cookie, request } from "./utils";

export default {
  name: "App",
  created() {
    const accessCSRF = cookie.parse("X-CSRF-Token");
    const refreshCSRF = cookie.parse("X-RCSRF-Token");
    const user = localStorage.getItem("user");
    if (accessCSRF && refreshCSRF) {
      request.setCSRFHeader({ accessCSRF, refreshCSRF });
    }

    if (user) {
      this.$store.commit("SET_USER", JSON.parse(user));
    }
  },
};
</script>
