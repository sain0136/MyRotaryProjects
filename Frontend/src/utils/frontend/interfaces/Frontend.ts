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
