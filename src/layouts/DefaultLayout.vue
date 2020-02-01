<template>
  <div>
    <q-layout view="hHh Lpr lff">
      <q-header class="bg-primary">
        <q-toolbar>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
          <q-toolbar-title>Engster Admin</q-toolbar-title>
        </q-toolbar>
      </q-header>

      <q-drawer v-model="drawer" show-if-above :width="272" :breakpoint="768" bordered>
        <q-scroll-area class="fit">
          <q-list class="menu-list">
            <q-item
              clickable
              v-ripple
              :active="currentMenu===each.menu"
              active-class="bg-blue-1"
              v-for="each in menuList"
              v-bind:key="each.name"
              @click="routeMenu(each.path)"
            >
              <q-item-section avatar>
                <q-icon :name="each.icon" />
              </q-item-section>
              <q-item-section>{{each.name}}</q-item-section>
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
          name: "포스팅 관리",
          menu: "Posts",
          icon: "post_add",
          path: "/posts"
        },
        {
          name: "컨텐츠 관리",
          menu: "Contents",
          icon: "view_list",
          path: "/contents"
        }
      ]
    };
  },
  computed: {
    currentMenu() {
      if (this.$route.path.match(/(^\/?$)|(^\/posts\/?$)/g)) return "Posts";
      else if (this.$route.path.match(/^\/contents\/?$/g)) return "Contents";
    }
  },
  methods: {
    routeMenu(path) {
      this.$router.push(path);
    }
  }
};
</script>