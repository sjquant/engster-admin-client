<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { request } from "./utils";

export default {
  name: "App",
  created() {
    const user = localStorage.getItem("user");
    request.setCSRFHeader();
    if (user) {
      this.$store.commit("SET_USER", JSON.parse(user));
    }
  },
};
</script>
