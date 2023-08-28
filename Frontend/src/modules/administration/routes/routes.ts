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
import UserFormForSiteAdmin from "@/components/common/forms/UserForm.vue";
import ClubAdministration from "@/modules/administration/components/ClubAdministration.vue"
import AdminClub from "@/modules/administration/views/AdminClub.vue"
import ClubProjectFormSiteView from "@/components/common/forms/ClubProjectForm.vue";
import DistrictSimplifiedProjectFormSiteView from "@/components/common/forms/DistrictSimplifiedProjectForm.vue"
import DistrictMatchingProjectFormSiteView from "@/components/common/forms/DistrictMatchingProjectForm.vue"

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
    {
      path: "/user-form-for-site-admin/",
      component: UserFormForSiteAdmin,
      name: "UserFormForSiteAdmin",
      props: true,
    },
    {
      path: "club-administration/:clubDistrictIdProp",
      component: ClubAdministration,
      name: "ClubAdministration",
      props: true,
    },
    {
      path: "admin-club",
      component: AdminClub,
      name: "AdminClub",
    },
    {
      path: "/clubproject",
      component: ClubProjectFormSiteView,
      name: "ClubProjectFormSiteView",
    },
    {
      path: "/dsgproject",
      component: DistrictSimplifiedProjectFormSiteView,
      name: "DistrictSimplifiedProjectFormSiteView",
    },
    {
      path: "/dmproject",
      component: DistrictMatchingProjectFormSiteView,
      name: "DistrictMatchingProjectFormSiteView",
    },
  ],
  
};
export default route;
