
import type { IClub } from "@/utils/shared/interfaces/ClubInterface";
import type IDistrict from "@/utils/shared/interfaces/DistrictInterface";
import type { IDsgProject, IDmProject, IClubProject } from "@/utils/shared/interfaces/ProjectsInterface";
import type IUser from "@/utils/shared/interfaces/UserInterface";
 export const FORM_MODE_PROP ={
  UPDATE:"UPDATE",
  CREATE:"CREATE",
  VIEW:"VIEW",
 } 

 export const DISTRIST_REPORT_TYPE = {
  DSG_EN: "DSG_EN",
  DSG_FR: "DSG_FR",
  DM_EN: "DM_EN",
  DM_FR: "DM_FR",
 }
 
 export const TAILWIND_COMMON_CLASSES = {
  H1:"text-2xl font-bold text-primary-black",
  H3:"text-xl font-bold text-primary-black",
  PARAGRAPHS:" text-primary-black text-lg",
  DIVROW:"flex flex-row justify-center items-center",
  DIVCOL:"flex flex-col justify-center items-center",
  LABEL:"text-primary-black base-text font-bold ", 
  A_LINK:"text-primary-black base-text font-bold  hover:text-primary-color",
  SUCCESS:"text-primary-green base-text font-bold", 
 }
export interface IResizeImageOptions {
  maxSize: number;
  file: File;
}

export interface RotaryYearObject {
  allRotaryYears: Array<string>;
  currentRotaryYear: string;
}

export interface DistricReportFileUpload{
  extra_label: string;
  district_id: number;
}

export interface IApiError {
  message: string;
  requestStaus: boolean;
  stack?: string;
  code?: string | number;
}

export interface IApiException {
  message: string | undefined;
  code: string | number | undefined;
  stack: string | undefined;
}

export class MyError extends Error implements IApiException{
  public stack: string | undefined;
  public code: string | number | undefined;
  constructor(message?: string, exceptionStack?: string, code?: string | number | undefined) {
    super(message);
      this.stack = exceptionStack;
      this.code = code;
  }
}

export interface MainAssets {
  id: number;
  dm_initial: number;
  dsg_intial: number;
  club_intial: number;
  global_intial: number;
  assets: {
    main_logo: {
      id: string;
      url: string;
      fileType: string;
      location: string;
    };
  };
}
interface meta{
  
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
    first_page: number;
    first_page_url: string;
    last_page_url: string;
    next_page_url: string;
    previous_page_url: string;
  
}
export interface DistrictPagination {
  meta: meta;
  data: Array<IDistrict>;
}

export interface ClubPagination {
  meta: meta;
  data: Array<IClub>;
}
export interface UserPagination {
  meta: meta;
  data: Array<IUser>;
}

export interface ProjectPagination {
  meta: meta;
  data: Array<IDsgProject | IDmProject | IClubProject>;
}

export const ErrorMessages = {
  REQURIED_FIELD: "This field is required",
  INVALID_EMAIL: "Please enter a valid email address",
  INVALID_PASSWORD: "Password must be at least 6 characters long",
  INVALID_PASSWORD_CONFIRMATION: "Password confirmation does not match",
  PASSWORD_MIN_LENGTH: "Password must be at least 6 characters long",
  REQURIED_NUM_MIN_LENGTH: "This field cant be zero",
  NUMBER_MUST_FRAC: "This field must be a fraction",
};

export interface UserValidationApiResponse {
  verified: boolean;
  user: IUser;
  district?: IDistrict;
  club: IClub;
}
