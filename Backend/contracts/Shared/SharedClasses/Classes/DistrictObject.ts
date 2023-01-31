import DataObjectApi from "Contracts/Shared/SharedInterfaces/DataObject";
import DistrictInterface, {
  DistrictDetailsInterface,
} from "Contracts/Shared/SharedInterfaces/DistrictInterface";

export default class RotaryDistrict implements DistrictInterface {
  district_id: number;
  district_name: string;
  district_number: string;
  district_president: string;
  district_email: string;
  district_description: string;
  site_url: string;
  districtlogo_filepath: string;
  district_details: DistrictDetailsInterface;
  report: any;
  socialMedia: DataObjectApi[];
  districtlogo_url = "";

  constructor() {
    this.district_id = 0;
    this.district_name = "";
    this.district_number = "";
    this.district_president = "";
    this.district_email = "";
    this.district_description = "";
    this.site_url = "";
    this.districtlogo_filepath = "";
    this.district_details = {
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
      reportLinks: [] as {
        report_type: string;
        location: string;
        url: string;
      }[],
    };
    this.report = null;
    this.socialMedia = [] as DataObjectApi[];
  }
}
