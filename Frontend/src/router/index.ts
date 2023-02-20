import { createRouter, createWebHistory } from "vue-router";
import fourzerofour from "@/components/common/fourzerofour.vue";
import SiteAdminRoutes from "@/modules/administration/routes/routes";
import LoginApp from "@/modules/administration/views/LoginApp.vue";
import LandingRoutes from "@/modules/home/routes/routes"
const routes = [
  {
    path: "/admin-login",
    component: LoginApp,
    mame: "LoginApp",
  },
  
  { path: "/:pathMatch(.*)*", component: fourzerofour, name: "fourzzerofour" },
  SiteAdminRoutes,
  LandingRoutes,
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
  routes,
});

export default router;
