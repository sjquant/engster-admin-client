const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "contents",
        name: "contentList",
        component: () => import("pages/Contents.vue"),
        alias: "/",
      },
      {
        path: "contents/create",
        name: "contentCreate",
        component: () => import("pages/ContentsCreate.vue"),
      },
      {
        path: "contents/:id",
        name: "contentDetail",
        component: () => import("pages/ContentsDetail.vue"),
      }
    ],
  },
];

// Always leave this as last one
if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    component: () => import("pages/Error404.vue"),
  });
}

export default routes;
