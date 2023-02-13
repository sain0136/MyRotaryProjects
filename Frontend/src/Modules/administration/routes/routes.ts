import AdminApp from "../views/AdminApp.vue";
import AdminHome from "../views/AdminHome.vue";
import DistrictAdmins from "../views/DistrictAdmins.vue";
import AllDistricts from "../views/AllDistricts.vue";
import ClubAdmin from "../views/ClubAdmin.vue";
import AllProjects from "../views/AllProjects.vue";
import SiteAdminDistrictForm from "../../../components/common/forms/DistrictForm.vue";
const route = {
  path: "/admin",
  component: AdminApp,
  name: "AdminApp",

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
  ],
};
export default route;
