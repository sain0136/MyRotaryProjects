import type IDistrict from "../interfaces/DistrictInterface";
import type { StorageInformation } from "../interfaces/ProjectsInterface";

export default class RotaryDistrict implements IDistrict {
  district_id = 0;
  district_name = "";
  district_number = "";
  district_president = "";
  district_email = "";
  district_description = "";
  site_url = "";
  districtlogo_url = "";
  district_details = {
    ddfCalculation: ["District Club Contribution"] as String[],
    ddfCapes: {
      dsgCap: 0,
      dsgFraction: 0,
      dmCap: 0,
      dmFraction: 0,
    },
    dates: {
      grant_submission_closedate: "",
      grant_submission_startdate: "",
    },
    reportLinks: [] as StorageInformation[],
  };
  report = null;
  socialMedia = [] as string[];

  constructor() {}
}
