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
      },
      {
        path: "contents/:id/edit",
        name: "contentEdit",
        component: () => import("pages/ContentsEdit.vue"),
      },
      {
        path: "translation-reviews",
        redirect: "translation-reviews/pending",
      },
      {
        path: "translation-reviews/pending",
        name: "translationReviewPending",
        component: () => import("pages/TranslationReviewPending.vue"),
      },
      {
        path: "translation-reviews/history",
        name: "translationReviewHistory",
        component: () => import("pages/TranslationReviewHistory.vue"),
      },
      {
        path: "etcetera",
        name: "etc",
        component: () => import("pages/Etcetera.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("pages/Login.vue"),
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
