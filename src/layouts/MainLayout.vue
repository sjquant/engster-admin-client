<template>
  <div>
    <q-layout view="hHh Lpr lff">
      <q-header class="bg-primary">
        <q-toolbar>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
          <q-toolbar-title>Engster Admin</q-toolbar-title>
          <q-btn flat @click="route('/login')">로그인</q-btn>
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
              :active="each.name === $route.name"
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
export default {
  data() {
    return {
      drawer: false,
      menuList: [
        {
          name: "contents",
          label: "컨텐츠 관리",
          icon: "view_list",
          path: "/contents",
        },
      ],
    };
  },
  methods: {
    route(path) {
      this.$router.push(path);
    },
  },
};
</script>
