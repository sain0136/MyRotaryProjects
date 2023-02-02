import Assets from "App/Models/Assets";

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

export const GrantType = {
  CLUBPROJECT: "Club Project",
  DISTRICTSIMPLIFIEDPROJECT: "District Simplified Project",
  DISTRICTMATCHINGPROJECT: "District Matching Project",
  GLOBALPROJECT: "Global Project",
};

export const ProjectStatus = {
  LOOKINGFORFUNDING: "Looking for funding",
  FULLYFUNDED: "Fully funded",
  PENDINGAPPROVAL: "Pending approval",
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

export class ProjectCodeGenerator {
  
  constructor() {}

  /**
   * @param  {string} type
   * @returns Promise
   */
  public static async getProjectCode(type: string): Promise<number> {
    let assets = await Assets.findOrFail(1);
    let code: number = 0;
    Object.entries(assets).forEach((k: string | any, v: number): void => {
      if (k === type) {
        code = v;
        return;
      }
    });
    if (code > 0) {
      return code;
    }
    throw new Error("Error generating code");
  }

  /**
   * @param  {string} type
   * @param  {number} code
   */
  public static async setProjectCode(type: string, code: number) {
    let assets = await Assets.findOrFail(1);
    try {
      if (
        type === "dmInitial" ||
        "dsgIntial" ||
        "clubIntial" ||
        "globalIntial"
      ) {
        await assets
          .merge({
            [type]: code + 1,
          })
          .save();
      } else {
        throw new Error("Type passed in is wrong!");
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}
