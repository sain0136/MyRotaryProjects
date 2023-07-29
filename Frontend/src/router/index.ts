import { createRouter, createWebHistory } from "vue-router";
import fourzerofour from "@/components/common/fourzerofour.vue";
import SiteAdminRoutes from "@/modules/administration/routes/routes";
import LoginApp from "@/modules/administration/views/LoginApp.vue";
import LandingRoutes from "@/modules/home/routes/routes";
import type { RouteRecordRaw } from "vue-router";
import { useRotaryStore as store } from "@/stores/rotaryStore";

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
  routes: routes as RouteRecordRaw[],
});
router.beforeEach((to, from, next) => {
  // Scroll to top of page on route change
  window.scrollTo(0, 0);
  if (
    (from.name === "ClubProjectFormLandingView" ||
      from.name === "DistrictSimplifiedProjectForm" ||
      from.name === "DistrictMatchingProjectForm" ||
      from.name === "DistrictAdminClubForm" ||
      from.name === "UserFormForAdmins" ||
      from.name === "PledgeForm" ||
      from.name === "SiteAdminClubForm" ||
      from.name === "SiteAdminUserForm" ||
      from.name === "SiteAdminDistrictForm" ||
      from.name === "MyProfile" ||
      from.name === "DistrictSettings"
      )  &&
    store().$state.canLeaveForm === false
  ) {
    const answer = confirm(
      "Are you sure you want to leave? Any unsaved changes will be lost. Do not refresh the page."
    );
    if (answer) {
      next();
    } else {
      next(false);
    }
  } else {
    store().$state.canLeaveForm = false;
    next();
  }
});
export default router;
