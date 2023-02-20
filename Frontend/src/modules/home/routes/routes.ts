import LandingHome from "@/modules/home/views/LandingHome.vue";
import LandingApp from "@/modules/home/views/LandingApp.vue";
const route = {
  path: "/",
  component: LandingApp,
  name: "LandingApp",
  children: [{ path: "/", component: LandingHome, mame: "LandingHome" }],
};

export default route;
