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

    if (accessCSRF && refreshCSRF) {
      request.setCSRFHeader({ accessCSRF, refreshCSRF });
    }
  },
};
</script>
