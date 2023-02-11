import { createRouter, createWebHistory } from "vue-router";
import Test from "../components/test/TestComponent.vue";
import fourzerofour from "../components/common/fourzerofour.vue";
import SiteAdminRoute from "../modules/administration/routes/routes";
import HomeRoute from "../modules/home/routes/routes";
import LoginApp from "../modules/administration/views/LoginApp.vue";
const routes = [
  {
    path: "/Test",
    component: Test,
    name: "Test",
  },
  {
    path: "/adminportal",
    component: LoginApp,
    mame: "LoginApp",
  },
  { path: "/:pathMatch(.*)*", component: fourzerofour, name: "fourzzerofour" },
  HomeRoute,
  SiteAdminRoute, 
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (About.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import('../views/AboutView.vue')
  // }
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
