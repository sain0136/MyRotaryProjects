import Route from "@ioc:Adonis/Core/Route";

Route.resource("/district/", "DistrictsController");
Route.post("/district/pagination", "DistrictsController.districtsPagination");
Route.post(
  "/district/clubs/",
  "DistrictsController.allClubsInDistrictPagination"
);
Route.post("/district/admins", "DistrictsController.districtAdminsPagination");



// 
Route.post("/reportSaver/", "DistrictsController.reportSaver");
Route.post("/reportDeletion/", "DistrictsController.reportDeletion");
Route.get("/districtAdmins/", "DistrictsController.getDistictAdmins");
Route.get("/district/di/:id", async ({ params }) => {
  return { message: `You provided an id of ${params.id}` };
}).where("id", Route.matchers.number());
