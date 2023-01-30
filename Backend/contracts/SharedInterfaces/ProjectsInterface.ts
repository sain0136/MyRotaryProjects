import { Meta } from './DistrictInterface'
export interface budgetItem {
  itemCost: number
  itemName: string
  supplierName?: string
  itemCostLocalCurrency?: number
}
export interface RotaryYearObject {
  allRotaryYears: Array<string>
  currentRotaryYear: string
}
export interface Pledge {
  pledge_amount: number
  firstname: string
  lastname: string
  email: string
  phone: string
  district_number: string
  club_name: string
}
export interface docLinks {
  url: string
  location: string
}
export interface fundingSource {
  sourceName: string
  typeOfFunding: string
  amount: number
}
export interface extraDescriptions {
  reportDockLinksArray: Array<any>
  other_club_contribution: number
  other_sources: number
  fundingSourceArray: Array<fundingSource>
  benefit_community_description: string
  co_operating_organisation_letter: string
  non_financial_participation: string
  primary_contact: {
    address: string
    email: string
    cell: string
    name: string
    phone: string
  }
  secondary_contact: {
    address: string
    email: string
    cell: string
    name: string
    phone: string
  }
  sectionD: {
    community_benefit: string
    project_accountability: string
    ownership_project: string
    inventory_project: string
    customs_clearance: string
  }
  sectionE: {
    project_capacity: string
    project_sustainment: string
    e: {
      Surveys: false
      Questionnaires: false
      Observations: false
      Tests_Of_Knowledge: false
      Interviews: false
      Focus_Groups: false
      Video_Media: false
      Documents_Materials_Collections: false
    }
  }
}
export interface hostclub_information {
  host_club_name: string
  district_number: string
  district_country: string
  location_city: string
  location_country: string
  location_community: string
  host_primary_contact: {
    name: string
    address: string
    phone: string
    email: string
    cell: string
  }
  listOfObjectives: Array<string>
  host_sponsor_planned_project_description: string
  host_commit_description: string
  international_commit_description: string
  sponsor_publicize_description: string
  sectionC: {
    cooperating_organizations: [
      {
        organization_name: string
        address: string
        contact_person: {
          name: string
          address: string
          phone: string
          email: string
          cell: string
        }
        website_address: string
      }
    ]
    cooperating_organizations_roles_description: string
    cooperating_organizations_identify_members: string
  }
  sectionF: {
    local_currency_name: string
    exchange_rate: string
  }
}
export interface districtOrClubInformation {
  fundingSourceArray?: []
  clubName: string
  district_name: string
}

export interface creatorInformation {
  fullName: string
  email: string
  phone: string
  clubName: string
}

export interface ClubProject {
  project_id: number
  project_name: string
  project_theme: string
  area_focus: {
    Peace_Conflict_Prevention: boolean
    Disease_Prevention_And_Treatment: boolean
    Water_And_Sanitation: boolean
    Maternal_And_Child_Health: boolean
    Basic_Education_And_Literacy: boolean
    Economic_And_Community_Development: boolean
    Environment: boolean
  }
  country: string
  estimated_completion: string
  funding_goal: number
  anticipated_funding: number
  created_by: number
  region: string
  rotary_year: string
  image_link: string
  project_status: string
  club_id: number
  doc_links: Array<docLinks>
  grant_code: string
  grant_id: number
  // creation or update properties
  image: any
  role_type: number
  grant_type: number
  // computed return properties
  creatorInformation: creatorInformation
  pledgesAssociated: Array<Pledge>
  grantString: String
  districtOrClubInformation: districtOrClubInformation
  district_id: number
  pledge_amount: number
}
export interface DSGProject {
  grant_code: string
  grant_id: number
  project_id: number
  project_name: string
  project_theme: string
  start_date: string
  country: string
  estimated_completion: string
  funding_goal: number
  anticipated_funding: number
  created_by: number
  region: string
  rotary_year: string
  image_link: string
  project_status: string
  club_id: number
  pledge_amount: number
  doc_links: Array<docLinks>
  co_operating_organisation_contribution: number
  district_simplified_grant_request: number
  intial_sponsor_club_contribution: number
  itemized_budget: Array<budgetItem>
  area_focus: {
    Peace_Conflict_Prevention: boolean
    Disease_Prevention_And_Treatment: boolean
    Water_And_Sanitation: boolean
    Maternal_And_Child_Health: boolean
    Basic_Education_And_Literacy: boolean
    Economic_And_Community_Development: boolean
    Environment: boolean
  }
  extra_descriptions: extraDescriptions
  // creation or update properties
  image: any
  role_type: number
  grant_type: number
  // computed return properties
  creatorInformation: creatorInformation
  pledgesAssociated: Array<Pledge>
  grantString: String
  districtOrClubInformation: districtOrClubInformation
  district_id: number
}
export interface DMProject {
  grant_code: string
  grant_id: number
  project_id: number
  project_name: string
  project_theme: string
  start_date: string
  country: string
  estimated_completion: string
  funding_goal: number
  anticipated_funding: number
  created_by: number
  region: string
  rotary_year: string
  image_link: string
  project_status: string
  club_id: number

  pledge_amount: number
  doc_links: Array<docLinks>
  co_operating_organisation_contribution: number
  district_matching_grant_request: number
  intial_sponsor_club_contribution: number
  itemized_budget: Array<budgetItem>
  area_focus: {
    Peace_Conflict_Prevention: boolean
    Disease_Prevention_And_Treatment: boolean
    Water_And_Sanitation: boolean
    Maternal_And_Child_Health: boolean
    Basic_Education_And_Literacy: boolean
    Economic_And_Community_Development: boolean
    Environment: boolean
  }
  extra_descriptions: extraDescriptions
  hostclub_information: hostclub_information
  // creation or update properties
  role_type: number
  image: any
  grant_type: number
  // computed return properties
  creatorInformation: creatorInformation
  pledgesAssociated: Array<Pledge>
  grantString: String
  districtOrClubInformation: districtOrClubInformation
  district_id: number
}
export interface ProjectPagination {
  meta: Meta
  data: Array<ClubProject | DMProject | DSGProject>
}
