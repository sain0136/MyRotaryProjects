import { DistrictMetaInterface } from "./DistrictInterface";

export interface BudgetItem {
  itemCost: number;
  itemName: string;
  supplierName?: string;
  itemCostLocalCurrency?: number;
}

export interface Pledge {
  pledge_amount: number;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  district_number: string;
  club_name: string;
}

export interface DocLinks {
  url: string;
  location: string;
}

export interface FundingSource {
  sourceName: string;
  typeOfFunding: string;
  amount: number;
}

export interface ProjectDetails {
  creatorData: {
    fullName: string;
    email: string;
    phone: string;
    clubName: string;
  };
  districtClubData: { clubName: string; district_name: string };
}

export interface ClubProjectExtraDescriptions {
  extra: string;
}

interface SectionSurvey {
  Surveys: boolean;
  Questionnaires: boolean;
  Observations: boolean;
  Tests_Of_Knowledge: boolean;
  Interviews: boolean;
  Focus_Groups: boolean;
  Video_Media: boolean;
  Documents_Materials_Collections: boolean;
}

interface ContactSection {
  address: string;
  email: string;
  cell: string;
  name: string;
  phone: string;
}

interface SectionD {
  community_benefit: string;
  project_accountability: string;
  ownership_project: string;
  inventory_project: string;
  customs_clearance: string;
}

interface SectionE {
  project_capacity: string;
  project_sustainment: string;
  e: SectionSurvey;
}

export interface ExtraDescriptions {
  other_club_contribution: number;
  other_sources: number;
  fundingSourceArray: Array<FundingSource>;
  benefit_community_description: string;
  co_operating_organisation_letter: string;
  non_financial_participation: string;
  primary_contact: ContactSection;
  secondary_contact: ContactSection;
  sectionD: SectionD;
  sectionE: SectionE;
}
interface CoopOrganization {
  organization_name: string;
  address: string;
  contact_person: ContactSection;
  website_address: string;
}

interface SectionC {
  cooperating_organizations: Array<CoopOrganization>;
  cooperating_organizations_roles_description: string;
  cooperating_organizations_identify_members: string;
}

interface SectionF {
  local_currency_name: string;
  exchange_rate: string;
}

export interface HostclubInformation {
  host_club_name: string;
  district_number: string;
  district_country: string;
  location_city: string;
  location_country: string;
  location_community: string;
  host_primary_contact: ContactSection;
  listOfObjectives: Array<string>;
  host_sponsor_planned_project_description: string;
  host_commit_description: string;
  international_commit_description: string;
  sponsor_publicize_description: string;
  sectionC: SectionC;
  sectionF: SectionF;
}
export interface DistrictOrClubInformation {
  fundingSourceArray?: [];
  clubName: string;
  district_name: string;
}

export interface CreatorInformation {
  fullName: string;
  email: string;
  phone: string;
  clubName: string;
}

export interface ProjectPagination {
  meta: DistrictMetaInterface;
  data: Array<IClubProject | IDMProject | IDSGProject>;
}

export interface Uploads {
  reports_files: Array<DocLinks>;
  evidence_files: Array<DocLinks>;
}

export interface IGenericProject {
  project_id: number;
  project_name: string;
  grant_type: string;
  project_status: string;
  project_number: number;
  project_code: string;
  project_description: string;
  country: string;
  region: string;
  start_date: string;
  completion_date: string;
  area_focus: {
    Peace_Conflict_Prevention: boolean;
    Disease_Prevention_And_Treatment: boolean;
    Water_And_Sanitation: boolean;
    Maternal_And_Child_Health: boolean;
    Basic_Education_And_Literacy: boolean;
    Economic_And_Community_Development: boolean;
    Environment: boolean;
  };
  funding_goal: number;
  current_funds: number;
  anticipated_funding: number;
  total_pledges: number;
  file_uploads: Uploads;
  // creation or update properties
  image: any;
  file: any;
  mulitFile: Array<any>;
  // computed return properties
  pledgesAssociated: Array<Pledge>;
  projectDetails: ProjectDetails;
}

export interface IClubProject extends IGenericProject {
  extra_descriptions: ClubProjectExtraDescriptions;
}

export interface IDSGProject extends IGenericProject {
  extra_descriptions: ExtraDescriptions;
  co_operating_organisation_contribution: number;
  district_simplified_grant_request: number;
  intial_sponsor_club_contribution: number;
  itemized_budget: Array<BudgetItem>;
}

export interface IDMProject extends IGenericProject, IDSGProject {
  hostclub_information: HostclubInformation;
}

export interface IGlobalProject
  extends IGenericProject,
    IDSGProject,
    IDMProject {}
