import type {IClub} from "../interfaces/ClubInterface";

export default class RotaryClub implements IClub {
  club_name= "";
  club_address= "";
  club_city= "";
  club_postal= "";
  club_province= "";
  club_country= "";
  club_description= "";
  club_email= "";
  site_url= "";
  district_id= 0;
  club_id= 0;
  settings?: { allowedDsg?: boolean | undefined; allowedDM?: boolean | undefined; allowedGlobal?: boolean | undefined; } | undefined;
  constructor() {}
}
