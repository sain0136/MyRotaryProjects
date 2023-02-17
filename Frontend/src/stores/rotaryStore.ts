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

export interface IDistrictFormProps {
  formModeProp?: string;
  districtIdProp?: number;
}

export interface IUserFormProps {
  formModeProp?: "UPDATE" | "CREATE" | "VIEW";
  userIdProp?: number;
  clubIdProp?: number;
  disrictIdProp?: number;
  userCreationTypeProp?: "DISTRICT_ADMIN" | "CLUB_MEMBER";
}

class districtFormPropsPojo implements IDistrictFormProps {
  formModeProp: string | undefined;
  districtIdProp: number | undefined;
  constructor(props: IDistrictFormProps) {
    this.formModeProp = props.formModeProp ? props.formModeProp : undefined;
    this.districtIdProp = props.districtIdProp
      ? props.districtIdProp
      : undefined;
  }
}

class userFormPropsPojo implements IUserFormProps {
  formModeProp: "UPDATE" | "CREATE" | "VIEW" | undefined;
  userIdProp: number | undefined;
  clubIdProp: number | undefined;
  disrictIdProp: number | undefined;
  userCreationTypeProp: "DISTRICT_ADMIN" | "CLUB_MEMBER" | undefined;
  constructor(props: IUserFormProps) {
    this.formModeProp = props.formModeProp ? props.formModeProp : undefined;
    this.userIdProp = props.userIdProp ? props.userIdProp : undefined;
    this.clubIdProp = props.clubIdProp ? props.clubIdProp : undefined;
    this.disrictIdProp = props.disrictIdProp;
    this.userCreationTypeProp = props.userCreationTypeProp ? props.userCreationTypeProp : undefined;
  }
}
export const useRotaryStore = defineStore("main", {
  //The Global state variabales
  state: () => {
    return {
      districtFormProps: {} as IDistrictFormProps,
      userFormProps: {} as IUserFormProps,
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
      currentLoadedProjectData: {} as IDmProject | IDsgProject | IClubProject,
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
      if (user.user_id === 2) {
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
        } else if (user.user_type === UserType.Club) {
          let clubUserUserRoles = [RotaryRoles.CLUBADMIN, RotaryRoles.STANDARD];
          if (clubUserUserRoles[0] == user.role[0].club_role) {
            this.isClubAdminLoggedIn = true;
          }
          if (clubUserUserRoles[1] == user.role[0].club_role) {
            this.isClubUserLoggedIn = true;
          }
        } else throw new MyError("User role not found");
      }
      try {
        this.setDistrictData(user.district);
        this.setClubData(user.club);
      } catch (error) {
        throw new MyError((error as MyError).message);
      }
    },

    /**
     * @param  {IDistrict} district
     * @returns void
     */
    setDistrictData(district: IDistrict): void {
      if (district !== null) {
        this.loggedInUsersDistrict = district;
      } else throw new MyError("District data was not set");
    },

    /**
     * @param  {IClub} club
     * @returns void
     */
    setClubData(club: IClub): void {
      if (club !== null) {
        this.loggedInUsersClub = club;
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
    clearProps() {
      this.districtFormProps = {} as IDistrictFormProps;
    },
  },
  persist: true,
  // Keep state persistence through refresh
});
