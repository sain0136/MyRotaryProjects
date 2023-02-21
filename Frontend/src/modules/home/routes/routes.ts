import LandingHome from "@/modules/home/views/LandingHome.vue";
import LandingApp from "@/modules/home/views/LandingApp.vue";
import CardDetails from "@/components/common/projectComponents/CardDetails.vue";
import PledgeForm from "@/components/common/forms/PledgeForm.vue";
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
  ],
};

export default route;
