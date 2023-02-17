interface roles {
  club_id?: number;
  club_role?: string;
  district_id?: number;
  district_role?: string;
  role_id: number;
  user_id: number;
  created_at: string;
  updated_at: number;
}

interface IUser {
  firstname: string;
  lastname: string;
  address: string;
  user_city: string;
  user_postal: string;
  user_province: string;
  user_country: string;
  phone: string;
  email: string;
  password: string;  
  extra_details: object;
  club_id: number;
  district_id: number | null;
  user_type: string;
  // Created after
  user_id?: number;
  // computed properties
  fullName: string;
  role: Array<roles>;
  // creation or etc properties
  role_type?: string;
}
export default IUser;
