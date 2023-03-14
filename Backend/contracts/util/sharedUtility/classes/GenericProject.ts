import type {
  StorageInformation,
  IGenericProject,
} from "../interfaces/ProjectsInterface";
import IUser from "../interfaces/UserInterface";

export default class GenericProject implements IGenericProject {
  project_id = 0;
  project_name = "";
  project_theme = "";
  grant_type = "";
  project_status = "";
  project_number = 0;
  project_code = "";
  project_description = "";
  country = "";
  region = "";
  start_date = "";
  completion_date = "";
  area_focus = {
    Peace_Conflict_Prevention: false,
    Disease_Prevention_And_Treatment: false,
    Water_And_Sanitation: false,
    Maternal_And_Child_Health: false,
    Basic_Education_And_Literacy: false,
    Economic_And_Community_Development: false,
    Environment: false,
  };
  funding_goal = 0;
  anticipated_funding = 0;
  total_pledges = 0;
  file_uploads = {
    project_image: {
      url: "",
      location: "",
    },
    reports_files: [] as StorageInformation[],
    evidence_files: [] as StorageInformation[],
  };
  rotary_year = "";
  image_link = "";
  created_by = 0;
  club_id = 0
  district_id = 0
  image = null;
  file = null;
  mulitFile = [];
  pledgesAssociated = [];
  projectDetails = {
    creatorData: {
      fullName: "",
      email: "",
      phone: "",
      clubName: "",
    },
    districtClubData: { clubName: "", district_name: "" },
    projectAdmins: [] as IUser[],
  };

  constructor() {}
}
