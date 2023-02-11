import type { IClubProject, IDmProject, IDsgProject } from "@/utils/shared/interfaces/ProjectsInterface";

export interface IResizeImageOptions {
  maxSize: number;
  file: File;
}

export interface RotaryYearObject {
  allRotaryYears: Array<string>;
  currentRotaryYear: string;
}

export interface IApiError {
  message: string;
  requestStaus: boolean;
  exceptionStack?:string;
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

export interface ProjectPagination {
  meta: {
    total: number;      
    per_page: number;
    current_page: number;
    last_page: number;
    first_page: number;
    first_page_url: string;
    last_page_url: string;
    next_page_url: string;
    previous_page_url: string;
  };  
  data: Array<IDsgProject | IDmProject | IClubProject>;
}

export const ErrorMessages = {
  REQURIED_FIELD: "This field is required",
  INVALID_EMAIL: "Please enter a valid email address",
  INVALID_PASSWORD: "Password must be at least 6 characters long",
  INVALID_PASSWORD_CONFIRMATION: "Password confirmation does not match",  
  PASSWORD_MIN_LENGTH: "Password must be at least 6 characters long",
}