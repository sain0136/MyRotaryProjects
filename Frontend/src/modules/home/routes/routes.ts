import LandingHome from "@/modules/home/views/LandingHome.vue";
import LandingApp from "@/modules/home/views/LandingApp.vue";
import CardDetails from "@/components/common/projectComponents/CardDetails.vue";
import PledgeForm from "@/components/common/forms/PledgeForm.vue";
import AboutUs from "@/modules/home/views/AboutUs.vue";
import ContactUs from "@/modules/home/views/ContactUs.vue";
import Stats from "@/modules/home/views/Stats.vue";
import UserLogin from "@/modules/home/views/UserLogin.vue";
import MyProfile from "@/modules/home/views/adminviews/MyProfile.vue";
import MyProjects from "@/modules/home/views/adminviews/MyProjects.vue";
import DistrictAdminClubs from "@/modules/home/views/adminviews/DistrictAdminClubs.vue";
import ClubProjects from "@/modules/home/views/adminviews/ClubProjects.vue";
import ClubSettings from "@/modules/home/views/adminviews/ClubSettings.vue";
import DistrictProjects from "@/modules/home/views/adminviews/DistrictProjects.vue";
import DistrictSettings from "@/modules/home/views/adminviews/DistrictSettings.vue";
import ProjectApprovals from "@/modules/home/views/adminviews/ProjectApprovals.vue";
import ReportApprovals from "@/modules/home/views/adminviews/ReportApprovals.vue";
import DistrictAdminClubForm from "@/components/common/forms/ClubForm.vue";
import UserFormForAdmins from "@/components/common/forms/UserForm.vue";
import ClubProjectFormLandingView from "@/components/common/forms/ClubProjectForm.vue";
import { useRotaryStore } from "@/stores/rotaryStore";
import DistrictSimplifiedProjectForm from "@/components/common/forms/DistrictSimplifiedProjectForm.vue"
import DistrictMatchingProjectForm from "@/components/common/forms/DistrictMatchingProjectForm.vue"
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
    {
      path: "/member",
      beforeEnter: () => {
        if (
          !useRotaryStore().$state.isClubAdminLoggedIn &&
          !useRotaryStore().$state.isDistrictAdminLoggedIn &&
          !useRotaryStore().$state.isClubUserLoggedIn &&
          !useRotaryStore().$state.isSiteAdminLoggedIn
        ) {
          return "/login";
        }
      },
      children: [
        {
          path: "/myprofile",
          component: MyProfile,
          name: "MyProfile",
        },
        {
          path: "/myprojects",
          component: MyProjects,
          name: "MyProjects",
        },
        {
          path: "/clubadmin",
          component: DistrictAdminClubs,
          name: "DistrictAdminClubs",
        },
        {
          path: "/clubform",
          component: DistrictAdminClubForm,
          name: "DistrictAdminClubForm",
        },
        {
          path: "/clubprojects",
          component: ClubProjects,
          name: "ClubProjects",
        },
        {
          path: "/clubsettings",
          component: ClubSettings,
          name: "ClubSettings",
        },
        {
          path: "/districtprojects",
          component: DistrictProjects,
          name: "DistrictProjects",
        },
        {
          path: "/districtsettings",
          component: DistrictSettings,
          name: "DistrictSettings",
        },
        {
          path: "/projectapprovals",
          component: ProjectApprovals,
          name: "ProjectApprovals",
        },
        {
          path: "/reportapprovals",
          component: ReportApprovals,
          name: "ReportApprovals",
        },
        {
          path: "/userform/admin",
          component: UserFormForAdmins,
          name: "UserFormForAdmins",
        },
        {
          path: "/clubproject",
          component: ClubProjectFormLandingView,
          name: "ClubProjectFormLandingView",
        },
        {
          path: "/dsgproject",
          component: DistrictSimplifiedProjectForm,
          name: "DistrictSimplifiedProjectForm",
        },
        {
          path: "/dmproject",
          component: DistrictMatchingProjectForm,
          name: "DistrictMatchingProjectForm",
        },
      ],
    },
  ],
};

export default route;
