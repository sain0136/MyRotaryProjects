import LandingHome from "@/modules/home/views/LandingHome.vue";
import LandingApp from "@/modules/home/views/LandingApp.vue";
import CardDetails from "@/components/common/projectComponents/CardDetails.vue";
import PledgeForm from "@/components/common/forms/PledgeForm.vue";
import AboutUs from "@/modules/home/views/AboutUs.vue"
import ContactUs from "@/modules/home/views/ContactUs.vue"
import Stats from "@/modules/home/views/Stats.vue"
import UserLogin from "@/modules/home/views/UserLogin.vue"
const route = {
  path: "/",
  component: LandingApp,
  name: "LandingApp",
  children: [
    { path: "/", component: LandingHome, mame: "LandingHome" },
    {
      path: "/project/:id?",
      component: CardDetails,
      name: "CardDetails",
      props: true,
    },
    {
      path: "/pledges-form/:id?",
      component: PledgeForm,
      name: "PledgeForm",
      props: true,
    },
    {
      path: "/about",
      component: AboutUs,
      name: "AboutUs",
    },
    {
      path: "/contact",
      component: ContactUs,
      name: "ContactUs",
    },
    {
      path: "/stats",
      component: Stats,
      name: "Stats",
    },
    {
      path: "/login",
      component: UserLogin,
      name: "UserLogin",
    },
  ],
};

export default route;
