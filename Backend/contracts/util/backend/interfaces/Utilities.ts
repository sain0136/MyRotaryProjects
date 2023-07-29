
export const AreaOfFocus = [
  "Peace Conflict Prevention",
  "Disease Prevention And Treatment",
  "Water And Sanitation",
  "Maternal And Child Health",
  "Basic Education And Literacy",
  "Economic And Community Development",
  "Environment",
];



export interface IAreaOfFocus {
  Peace_Conflict_Prevention: boolean;
  Disease_Prevention_And_Treatment: boolean;
  Water_And_Sanitation: boolean;
  Maternal_And_Child_Health: boolean;
  Basic_Education_And_Literacy: boolean;
  Economic_And_Community_Development: boolean;
  Environment: boolean;
}

export const UserType = {
  District: "DISTRICT",
  Club: "CLUB",
};

export const RotaryRoles = {
  DISTRICTADMIN: "District Admin",
  DISTRICTGRANT: "District Grants Chair",
  DISTRICTFOUNDATION: "District Foundations Chair",
  DISTRICTINTERNATIONAL: "District International Chair",
  CLUBADMIN: "Club Admin",
  STANDARD: "Standard Member",
  GUEST: "Guest",
};

export const DistrictRoles: Array<string | undefined> = Object.values(
  RotaryRoles
).map((ele: string) => {
  if (ele.includes("District")) {
    return ele;
  }
});

export const GrantType = {
  CLUBPROJECT: "Club Project",
  DISTRICTSIMPLIFIEDPROJECT: "District Simplified Project",
  DISTRICTMATCHINGPROJECT: "District Matching Project",
  GLOBALPROJECT: "Global Project",
};

export const ProjectStatus = {
  LOOKINGFORFUNDING: "Looking For Funding",
  FULLYFUNDED: "Fully Funded",
  PENDINGAPPROVAL: "Pending Approval",
  APPROVED: "Approved",
  REPORTSDUE: "Reports Due",
  COMPLETED: "Completed",
};

export interface SearchCriteria {
  current_page: number;
  limit: number;
  club_id: number;
  search_text: string;
  project_status: string;
  project_region: string;
  area_focus: string;
  rotary_year: string;
  district_id: number;
  grant_type: string;
}

export const condtionals= {
  created_by:"created_by",
  club_id:"club_id",
  district_id:"district_id"
}

export interface dbError   {
  message: string;
  code: string | number;
  stack?: string;
}
