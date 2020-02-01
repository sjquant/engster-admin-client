
const routes = [
  {
    path: '/',
    component: () => import('layouts/DefaultLayout.vue'),
    children: [
      { path: 'posts', component: () => import('pages/Posts.vue'), alias: "" },
      { path: 'posts/new', component: () => import('pages/NewPost.vue') },
      { path: 'contents', component: () => import('pages/Contents.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
