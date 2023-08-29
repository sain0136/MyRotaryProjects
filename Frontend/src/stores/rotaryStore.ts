import { defineStore } from "pinia";

import {
  FORM_MODE_PROP,
  MyError,
  type IApiError,
  type UserValidationApiResponse,
} from "@/utils/frontend/interfaces/Frontend";
import type IUser from "@/utils/shared/interfaces/UserInterface";
import type IDistrict from "@/utils/shared/interfaces/DistrictInterface";
import type { IClub } from "@/utils/shared/interfaces/ClubInterface";
import type {
  IClubProject,
  IDmProject,
  IDsgProject,
} from "@/utils/shared/interfaces/ProjectsInterface";
import {
  RotaryRoles,
  UserType,
} from "@/utils/shared/interfaces/SharedInterface";
import DistrictsApi from "@/services/Districts";
import ValidationApi from "@/services/Validation";
import Utilities from "@/utils/frontend/classes/Utilities";
import ClubsApi from "@/services/Club";

export interface IDistrictFormProps {
  formModeProp?: string;
  districtIdProp?: number;
  districtSettingsView?: boolean;
}

export interface IFocusedProjectsTableProps {
  tableViewProp?: "MYPROJECTS" | "DISTRICT" | "CLUB";
  conditionalIdProp?: number;
}

export interface IUserFormProps {
  formModeProp?: "UPDATE" | "CREATE" | "VIEW";
  userIdProp?: number;
  clubIdProp?: number;
  disrictIdProp?: number;
  userCreationTypeProp?: "DISTRICT_ADMIN" | "CLUB_MEMBER";
  myProfileViewProp?: true;
}

export interface IClubFormProps {
  formModeProp?: "UPDATE" | "CREATE" | "VIEW";
  districtIdProp?: number;
  clubIdProp?: number;
}

export interface IClubProjectFormProps {
  porjectIdProp?: number;
  formModeProp?: "UPDATE" | "CREATE" | "VIEW";
  isAdminOverrideClubIdProp?: number;
}

// make interfce for Dsg and Dm project form props
export interface IDsgOrDMProjectFormProps {
  porjectIdProp?: number;
  formModeProp?: "UPDATE" | "CREATE" | "VIEW";
  isAdminOverrideClubIdProp?: number;
}

class clubProjectFormPropsPojo implements IClubProjectFormProps {
  porjectIdProp: number | undefined;
  formModeProp: "UPDATE" | "CREATE" | "VIEW" | undefined;
  isAdminOverrideClubIdProp: number | undefined;
  constructor(props: IClubProjectFormProps) {
    this.porjectIdProp = props.porjectIdProp ? props.porjectIdProp : undefined;
    this.formModeProp = props.formModeProp ? props.formModeProp : undefined;
    this.isAdminOverrideClubIdProp = props.isAdminOverrideClubIdProp
      ? props.isAdminOverrideClubIdProp
      : undefined;
  }
}

class DSGOrDMFormPropsPojo implements IDsgOrDMProjectFormProps {
  porjectIdProp: number | undefined;
  formModeProp: "UPDATE" | "CREATE" | "VIEW" | undefined;
  isAdminOverrideClubIdProp: number | undefined;
  constructor(props: IClubProjectFormProps) {
    this.porjectIdProp = props.porjectIdProp ? props.porjectIdProp : undefined;
    this.formModeProp = props.formModeProp ? props.formModeProp : undefined;
    this.isAdminOverrideClubIdProp = props.isAdminOverrideClubIdProp
      ? props.isAdminOverrideClubIdProp
      : undefined;
  }
}

class focusedProjectsTablePojo implements IFocusedProjectsTableProps {
  tableViewProp: "MYPROJECTS" | "DISTRICT" | "CLUB" | undefined;
  conditionalIdProp: number | undefined;
  constructor(props: IFocusedProjectsTableProps) {
    this.tableViewProp = props.tableViewProp ? props.tableViewProp : undefined;
    this.conditionalIdProp = props.conditionalIdProp
      ? props.conditionalIdProp
      : undefined;
  }
}

class clubFormPropsPojo implements IClubFormProps {
  formModeProp: "UPDATE" | "CREATE" | "VIEW" | undefined;
  clubIdProp: number | undefined;
  districtIdProp: number | undefined;
  constructor(props: IClubFormProps) {
    this.formModeProp = props.formModeProp ? props.formModeProp : undefined;
    this.clubIdProp = props.clubIdProp ? props.clubIdProp : undefined;
    this.districtIdProp = props.districtIdProp
      ? props.districtIdProp
      : undefined;
  }
}

class districtFormPropsPojo implements IDistrictFormProps {
  formModeProp: string | undefined;
  districtIdProp: number | undefined;
  districtSettingsView: boolean | undefined;

  constructor(props: IDistrictFormProps) {
    this.formModeProp = props.formModeProp ? props.formModeProp : undefined;
    this.districtIdProp = props.districtIdProp
      ? props.districtIdProp
      : undefined;
    this.districtSettingsView = props.districtSettingsView
      ? props.districtSettingsView
      : undefined;
  }
}

class userFormPropsPojo implements IUserFormProps {
  formModeProp: "UPDATE" | "CREATE" | "VIEW" | undefined;
  userIdProp: number | undefined;
  clubIdProp: number | undefined;
  disrictIdProp: number | undefined;
  userCreationTypeProp: "DISTRICT_ADMIN" | "CLUB_MEMBER" | undefined;
  myProfileViewProp: true | undefined;
  constructor(props: IUserFormProps) {
    this.formModeProp = props.formModeProp ? props.formModeProp : undefined;
    this.userIdProp = props.userIdProp ? props.userIdProp : undefined;
    this.clubIdProp = props.clubIdProp ? props.clubIdProp : undefined;
    this.disrictIdProp = props.disrictIdProp;
    this.userCreationTypeProp = props.userCreationTypeProp
      ? props.userCreationTypeProp
      : undefined;
    this.myProfileViewProp = props.myProfileViewProp
      ? props.myProfileViewProp
      : undefined;
  }
}
export const useRotaryStore = defineStore("main", {
  //The Global state variabales
  state: () => {
    return {
      DsgOrDMProjectFormProps: {} as IDsgOrDMProjectFormProps,
      focusedProjectsTableProps: {} as IFocusedProjectsTableProps,
      districtFormProps: {} as IDistrictFormProps,
      userFormProps: {} as IUserFormProps,
      clubFormProps: {} as IClubFormProps,
      clubProjectFormProps: {} as IClubProjectFormProps,
      isSiteAdminLoggedIn: false,
      isDistrictAdminLoggedIn: false,
      isClubAdminLoggedIn: false,
      isClubUserLoggedIn: false,
      //store current route for navigation
      currentRoute: "",
      //store current user login infromation
      loggedInUserData: {} as IUser,
      // Current club or District data for user logged in
      loggedInUsersDistrict: {} as IDistrict,
      loggedInUsersClub: {} as IClub,
      //the project focused on for CRUD
      currentLoadedProjectExtraDetails: {} as
        | IDmProject
        | IDsgProject
        | IClubProject,
      showLogoutModal: false,
      canLeaveForm: false,
      mainLogoUrl: "",
      lastActiveTabClubAdminComponent: "",
      lastActiveTabAdminHomeComponent: "",
    };
  },
  //Used to manipulate state variable without changing the States themseleves
  getters: {},
  //Actions to manipulate and change state
  actions: {
    /**
     * @description This function is used to validate user login credentials
     * @param  {string} email
     * @param  {string} password
     * @returns Promise
     */
    async validateUserLogin(
      email: string,
      password: string
    ): Promise<true | IApiError | MyError> {
      try {
        const apiReponse = await ValidationApi.validateUserCredentials(
          password,
          email
        );
        if ("message" in apiReponse) {
          return apiReponse as IApiError;
        } else
          this.setLoggedInUserInforamtion(
            (apiReponse as UserValidationApiResponse).user
          );
        return true;
      } catch (error) {
        return error as MyError;
      }
    },

    /**
     * @param  {IUser} user
     * @returns void
     */
    setLoggedInUserInforamtion(user: IUser): void {
      this.loggedInUserData = user;
      if (user.email === "admin@myrotaryrotaryprojects.com") {
        this.isSiteAdminLoggedIn = true;
      }
      if (user.user_type === UserType.District) {
        let districtUserRoles = [
          RotaryRoles.DISTRICTADMIN,
          RotaryRoles.DISTRICTGRANT,
          RotaryRoles.DISTRICTFOUNDATION,
          RotaryRoles.DISTRICTINTERNATIONAL,
        ];
        if (districtUserRoles.includes(user.role[0].district_role as string)) {
          this.isDistrictAdminLoggedIn = true;
        }
      } else if (user.user_type === UserType.Club) {
        let clubUserUserRoles = [RotaryRoles.CLUBADMIN, RotaryRoles.STANDARD];
        if (clubUserUserRoles[0] == user.role[0].club_role) {
          this.isClubAdminLoggedIn = true;
        }
        if (clubUserUserRoles[1] == user.role[0].club_role) {
          this.isClubUserLoggedIn = true;
        }
      } else throw new MyError("User role not found");
      try {
        this.setDistrictData(user.district_id);
        this.setClubData(user.club_id);
      } catch (error) {
        throw new MyError((error as MyError).message);
      }
    },

    /**
     * @param  {number|null} district_id
     * @returns Promise
     */
    async setDistrictData(district_id: number | null): Promise<void> {
      if (district_id !== null) {
        try {
          const response = await DistrictsApi.getDistrictById(district_id);
          this.loggedInUsersDistrict = response as IDistrict;
        } catch (error) {
          throw new MyError((error as MyError).message);
        }
      } else throw new MyError("District data was not set");
    },

    async setClubData(club_id: number | null): Promise<void> {
      if (club_id !== null) {
        try {
          const response = await ClubsApi.getOneClubById(club_id);
          this.loggedInUsersClub = response as IClub;
        } catch (error) {
          throw new MyError((error as MyError).message);
        }
      } else throw new MyError("Club data was not set");
    },

    async signOut(): Promise<void> {
      let response = await ValidationApi.logoutUser();
      if (typeof response !== "boolean") {
        throw new MyError((response as IApiError).message);
      }
      this.isSiteAdminLoggedIn = false;
      this.isDistrictAdminLoggedIn = false;
      this.isClubAdminLoggedIn = false;
      this.isClubUserLoggedIn = false;
      this.loggedInUserData = {} as IUser;
      this.loggedInUsersDistrict = {} as IDistrict;
      this.loggedInUsersClub = {} as IClub;
    },
    async resetDistrictData(): Promise<void> {
      try {
        let reponse = await DistrictsApi.getDistrictById(
          this.loggedInUserData.district.district_id
        );
        this.loggedInUsersDistrict = reponse as IDistrict;
      } catch (error) {
        throw new MyError((error as MyError).message);
      }
    },
    setDistrictFormProps(props: IDistrictFormProps) {
      let districtFormProps = new districtFormPropsPojo({ ...props });
      this.districtFormProps = districtFormProps;
    },
    setUserFormProps(props: IUserFormProps) {
      const userFormProps = new userFormPropsPojo({ ...props });
      this.userFormProps = userFormProps;
    },
    // make a setClubFormProps function below
    setClubFormProps(props: IClubFormProps) {
      const clubFormProps = new clubFormPropsPojo({ ...props });
      this.clubFormProps = clubFormProps;
    },

    clearProps() {
      this.districtFormProps = {} as IDistrictFormProps;
    },
    setCurrentLoadedProjectExtraDetails(
      reset: boolean,
      project?: IDmProject | IDsgProject | IClubProject
    ) {
      if (reset) {
        this.currentLoadedProjectExtraDetails = {} as
          | IDmProject
          | IDsgProject
          | IClubProject;
      } else {
        if (project) {
          this.currentLoadedProjectExtraDetails = project;
        } else {
          throw new MyError("Project could not be set");
        }
      }
    },
    setFocusedProjectsTableProps(props: IFocusedProjectsTableProps) {
      const focusedProjectsTableProps = new focusedProjectsTablePojo({
        ...props,
      });
      this.focusedProjectsTableProps = focusedProjectsTableProps;
    },
    setClubProjectFormProps(props: IClubProjectFormProps) {
      const clubProjectFormProps = new clubProjectFormPropsPojo({
        ...props,
      });
      this.clubProjectFormProps = clubProjectFormProps;
    },
    setDSGOrDMFormProps(props: IDsgOrDMProjectFormProps) {
      const DSGOrDMFormProps = new DSGOrDMFormPropsPojo({
        ...props,
      });
      this.DsgOrDMProjectFormProps = DSGOrDMFormProps;
    },

    async reloadDistrictDates() {
      try {
        let box = this.loggedInUsersDistrict;
        const response = await DistrictsApi.getDistrictById(
          this.loggedInUsersDistrict.district_id
        );
        if (!Utilities.isAnApiError(response)) {
          this.loggedInUsersDistrict = response as IDistrict;
        } else {
          throw new MyError((response as IApiError).message);
        }
      } catch (error) {
        throw new MyError("District info could not be reset");
      }
    },
  },
  persist: true,
  // Keep state persistence through refresh
});
