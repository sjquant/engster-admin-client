<template>
  <div>
    <q-layout view="hHh Lpr lff">
      <q-header class="bg-primary">
        <q-toolbar>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
          <q-toolbar-title>Engster Admin</q-toolbar-title>
          <q-btn flat @click="logout" v-if="isAdmin" key="logout-btn"
            >로그아웃</q-btn
          >
          <q-btn flat @click="route('/login')" v-else key="login-btn"
            >로그인</q-btn
          >
        </q-toolbar>
      </q-header>
      <q-drawer
        v-model="drawer"
        show-if-above
        :width="272"
        :breakpoint="768"
        bordered
      >
        <q-scroll-area class="fit">
          <q-list class="menu-list">
            <q-item
              clickable
              v-ripple
              :active="
                each.activeFunc
                  ? each.activeFunc(each)
                  : each.name === $route.name
              "
              active-class="bg-blue-1"
              v-for="each in menuList"
              v-bind:key="each.name"
              @click="route(each.path)"
            >
              <q-item-section avatar>
                <q-icon :name="each.icon" />
              </q-item-section>
              <q-item-section>{{ each.label }}</q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
      </q-drawer>
      <q-page-container>
        <router-view></router-view>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      drawer: false,
      menuList: [
        {
          label: "컨텐츠 관리",
          icon: "view_list",
          path: "/contents",
          activeFunc: () => {
            return (
              this.$route.path === "/" ||
              this.$route.path.startsWith("/contents")
            );
          },
        },
        {
          label: "번역 검토",
          icon: "rate_review",
          path: "/translation-reviews",
          activeFunc: () => {
            return this.$route.path.startsWith("/translation-reviews");
          },
        },
        {
          name: "etc",
          label: "기타",
          icon: "linear_scale",
          path: "/etcetera",
        },
      ],
    };
  },
  computed: {
    ...mapState(["user"]),
    ...mapGetters(["isAdmin"]),
  },
  created() {
    // Validate First
    if (this.user) this.VALIDATE_TOKEN();
    this._interval = setInterval(() => {
      if (this.user) {
        this.VALIDATE_TOKEN();
      }
    }, 3600000);
  },
  methods: {
    ...mapActions(["SIGN_OUT", "VALIDATE_TOKEN"]),
    route(path) {
      // Catch for dealing with navigation duplicate failure
      this.$router.push(path).catch(() => {});
    },
    logout() {
      this.SIGN_OUT();
      this.$router.push("/login");
    },
  },
};
</script>
