import type IUser from "@/utils/shared/interfaces/UserInterface";
import type { Roles } from "@/utils/shared/interfaces/UserInterface";
export default class RotaryUser implements IUser {
  firstname = "";
  lastname = "";
  address = "";
  phone = "";
  user_city = "";
  user_country = "";
  user_postal = "";
  user_province = "";
  email = "";
  password = "";
  district_id = 0;
  club_id = 0;
  extra_userinformation = {};
  user_type = "";
  fullName = "";
  role = [] as Array<Roles> ;
  role_type = "";
  extra_details = {};
  user_id =0;

  constructor() {}
}
