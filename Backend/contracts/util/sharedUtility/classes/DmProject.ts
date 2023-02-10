import type { IDmProject } from "../interfaces/ProjectsInterface";
import DsgProject from "./DsgProject";

export default class DmProject extends DsgProject implements IDmProject {
  hostclub_information = {
    host_club_name: "",
    district_number: "",
    district_country: "",
    location_city: "",
    location_country: "",
    location_community: "",
    host_primary_contact: {
      name: "",
      address: "",
      phone: "",
      email: "",
      cell: "",
    },
    listOfObjectives: [] as string[],
    host_sponsor_planned_project_description: "",
    host_commit_description: "",
    international_commit_description: "",
    sponsor_publicize_description: "",
    sectionC: {
      cooperating_organizations: [
        {
          organization_name: "",
          address: "",
          contact_person: {
            name: "",
            address: "",
            phone: "",
            email: "",
            cell: "",
          },
          website_address: "",
        },
      ],
      cooperating_organizations_roles_description: "",
      cooperating_organizations_identify_members: "",
    },
    sectionF: {
      local_currency_name: "",
      exchange_rate: "",
    },
  };

  constructor() {
    super();
  }
}
