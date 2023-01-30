interface Club {
  club_name: string;
  club_address: string;
  club_city: string;
  club_postal: string;
  club_province: string;
  club_country: string;
  club_description: string;
  club_email: string;
  site_url: string;
  district_id: number;
  club_id: number;
  [key: string]: any;
}
export default Club;
