import AdminApp from "@/modules/administration/views/AdminApp.vue";
import AdminHome from "@/modules/administration/views/AdminHome.vue";
import DistrictAdmins from "@/modules/administration/views/DistrictAdmins.vue";
import AllDistricts from "@/modules/administration/views/AllDistricts.vue";
import ClubAdmin from "@/modules/administration/views/ClubAdmin.vue";
import AllProjects from "@/modules/administration/views/AllProjects.vue";
import SiteAdminDistrictForm from "@/components/common/forms/DistrictForm.vue";

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
