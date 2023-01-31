import DataObjectApi from "./DataObject";
import IUser from "./UserInterface";
export interface DistrictDetailsInterface {
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
  reportLinks: Array<ReportLinksInterface>;
}

export interface ReportLinksInterface {
  report_type: string;
  location: string;
  url: string;
}

export interface DistrictInterface {
  district_id: number;
  district_name: string;
  district_number: string;
  district_president: string;
  district_email: string;
  district_description: string;
  site_url: string;
  districtlogo_url: string;
  district_details: DistrictDetailsInterface;
  // send
  report: any;
  //  computated
  socialMedia: Array<DataObjectApi>;
}

export interface DistrictMetaInterface {
  current_page: number;
  first_page: number;
  first_page_url: string;
  last_page: number;
  last_page_url: string;
  next_page_url: null;
  per_page: number;
  previous_page_url: null;
  total: number;
  [key: string]: any;
}

export interface DistrictPaginationInterface {
  meta: DistrictMetaInterface;
  data: Array<IUser | DistrictInterface>;
}

export default DistrictInterface;
