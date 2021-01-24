import { createRouter, createWebHashHistory } from "vue-router";
import Subreddit from "@/views/Subreddit.vue";
// import SubredditName from "@/store/state";
const routes = [
  {
    path: "/",
    name: "Subreddit",
    component: Subreddit,
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
  {
    path: "/r/:slug",
    name: "SearchSubreddit",
    component: Subreddit,
    props: true,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
