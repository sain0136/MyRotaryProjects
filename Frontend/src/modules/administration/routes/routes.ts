import AdminApp from "@/modules/administration/views/AdminApp.vue";
import AdminHome from "@/modules/administration/views/AdminHome.vue";
import DistrictAdmins from "@/modules/administration/views/DistrictAdmins.vue";
import AllDistricts from "@/modules/administration/views/AllDistricts.vue";
import ClubAdmin from "@/modules/administration/views/ClubAdmin.vue";
import AllProjects from "@/modules/administration/views/AllProjects.vue";
import SiteAdminDistrictForm from "@/components/common/forms/DistrictForm.vue";
import SiteAdminUserForm from "@/components/common/forms/UserForm.vue";
import SiteAdminClubForm from "@/components/common/forms/ClubForm.vue";
import { useRotaryStore } from "@/stores/rotaryStore";
const route = {
  path: "/admin",
  component: AdminApp,
  name: "AdminApp",
  beforeEnter: () => {
    if (!useRotaryStore().$state.isSiteAdminLoggedIn) {
      return  '/admin-login' ;
    }
  },
  children: [
    {
      path: "home",
      component: AdminHome,
      name: "AdminHome",
    },
    {
      path: "users",
      component: DistrictAdmins,
      name: "DistrictAdmins",
      props: true,
    },
    {
      path: "districts",
      component: AllDistricts,
      name: "AllDistricts",
    },
    {
      path: "clubs",
      component: ClubAdmin,
      name: "ClubAdmin",
      props: true,
    },
    {
      path: "projects",
      component: AllProjects,
      name: "AllProjects",
      props: true,
    },
    {
      path: "/district-form/",
      component: SiteAdminDistrictForm,
      name: "SiteAdminDistrictForm",
      props: true,
    },
    {
      path: "/user-form/",
      component: SiteAdminUserForm,
      name: "SiteAdminUserForm",
      props: true,
    },
    {
      path: "/club-form/",
      component: SiteAdminClubForm,
      name: "SiteAdminClubForm",
      props: true,
    },
    
  ],
  
};
export default route;
