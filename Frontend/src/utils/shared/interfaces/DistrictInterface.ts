import type { StorageInformation } from "@/utils/shared/interfaces/ProjectsInterface";


export interface DistrictDetails {
  ddfCalculation: Array<String>;
  ddfCapes: {
    dsgCap: number;
    dsgFraction: number;
    dmCap: number;
    dmFraction: number;
  };
  dates: {
    grant_submission_closedate: string;
    grant_submission_startdate: string;
  };
  reportLinks: Array<StorageInformation>;
}


export interface IDistrict {
  district_id: number; district_number: string;
  district_name: string;
   district_email: string;
  site_url: string;

  district_president: string;
  district_description: string;
  districtlogo_url: string;
  district_details: DistrictDetails;
  // send
  report?: any;
  //  computated
  socialMedia?: Array<string>;
}
export default IDistrict;
