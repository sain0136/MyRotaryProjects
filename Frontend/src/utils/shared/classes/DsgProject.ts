
import type { IDsgProject, BudgetItem, FundingSource } from "@/utils/shared/interfaces/ProjectsInterface";
import GenericProject from "@/utils/shared/classes/GenericProject";


export default class DsgProject extends GenericProject implements IDsgProject {
  co_operating_organisation_contribution = 0;
  district_simplified_grant_request = 0;
  intial_sponsor_club_contribution = 0;
  itemized_budget = [] as BudgetItem[];
  extra_descriptions = {
    other_club_contribution: 0,
    other_sources: 0,
    fundingSourceArray: [] as FundingSource[],
    benefit_community_description: "",
    co_operating_organisation_letter: "",
    non_financial_participation: "",
    primary_contact: {
      address: "",
      email: "",
      cell: "",
      name: "",
      phone: "",
    },
    secondary_contact: {
      address: "",
      email: "",
      cell: "",
      name: "",
      phone: "",
    },
    sectionD: {
      community_benefit: "",
      project_accountability: "",
      ownership_project: "",
      inventory_project: "",
      customs_clearance: "",
    },
    sectionE: {
      project_capacity: "",
      project_sustainment: "",
      e: {
        Surveys: false,
        Questionnaires: false,
        Observations: false,
        Tests_Of_Knowledge: false,
        Interviews: false,
        Focus_Groups: false,
        Video_Media: false,
        Documents_Materials_Collections: false,
      },
    },
  };

  constructor() {
    super();
  }
}
