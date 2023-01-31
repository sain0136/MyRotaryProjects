interface IUser {
  firstname: string;
  lastname: string;
  address: string;
  phone: string;
  user_city: string;
  user_country: string;
  user_postal: string;
  user_province: string;
  email: string;
  password: string;
  district_id: number | any;
  club_id: number | any;
  extra_userinformation: object;
  user_type: string;
  // comp properties
  fullName: string;
  role: Array<roles>;
  // creation or etc properties
  [key: string]: any;
  role_type: string;
}
interface roles {
  club_id: number;
  club_role: string;
  created_at: string;
  role_id: number;
  role_type: number;
  updated_at: number;
  user_id: number;
  district_id: number;
  district_role: string;
}

export default IUser;
