import router from "@/router";
import { useRotaryStore } from "@/stores/rotaryStore";
import Utilities from "@/utils/frontend/classes/Utilities";
import {
  MyError,
  type IApiError,
  type IApiException,
  type DistrictPagination,
  type UserPagination,
  type ClubPagination,
} from "@/utils/frontend/interfaces/Frontend";
import type IDistrict from "@/utils/shared/interfaces/DistrictInterface";

const API_ROUTE = import.meta.env.VITE_API_URL + "district/";

export default class DistrictsApi {
  /**
   * @returns Promise
   */
  public static async index(): Promise<IApiError | IDistrict[]> {
    const apiReponse = await fetch(API_ROUTE, {
      method: "GET",
      credentials: "include",
    }).then(async (response: Response) => {
      if (response.status === 401) {
        useRotaryStore().$state.showLogoutModal = true;
        useRotaryStore().signOut();
      }
      return await response.json();
    });
    if (Utilities.isAnException(apiReponse)) {
      const exception = apiReponse as IApiException;
      throw new MyError(exception.message, exception.stack, exception.code);
    }
    return apiReponse as IApiError | Array<IDistrict>;
  }

  /**
   * @param  {number} current_page
   * @param  {number} limit
   * @returns Promise
   */
  public static async paginationAllDistricts(
    current_page: number,
    limit: number
  ): Promise<IApiError | DistrictPagination> {
    const apiReponse = await fetch(API_ROUTE + "pagination", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ current_page: current_page, limit: limit }),
      credentials: "include",
    }).then(async (response: Response) => {
      if (response.status === 401) {
        useRotaryStore().$state.showLogoutModal = true;

        useRotaryStore().signOut();
      }
      return await response.json();
    });
    if (Utilities.isAnException(apiReponse)) {
      const exception = apiReponse as IApiException;
      throw new MyError(exception.message, exception.stack, exception.code);
    }
    return apiReponse as IApiError | DistrictPagination;
  }

  /**
   * @param  {number} district_id
   * @param  {number} current_page
   * @param  {number} limit
   * @returns Promise
   */
  public static async getAllClubsInDistrictPagination(
    district_id: number,
    current_page: number,
    limit: number
  ): Promise<IApiError | ClubPagination> {
    const apiReponse = await fetch(API_ROUTE + "clubs/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        district_id: district_id,
        current_page: current_page,
        limit: limit,
      }),
      credentials: "include",
    }).then(async (response: Response) => {
      if (response.status === 401) {
        useRotaryStore().$state.showLogoutModal = true;
        useRotaryStore().signOut();
      }
      return await response.json();
    });
    if (Utilities.isAnException(apiReponse)) {
      const exception = apiReponse as IApiException;
      throw new MyError(exception.message, exception.stack, exception.code);
    }
    return apiReponse as IApiError | ClubPagination;
  }

  // write a function to get a single district by id send as a get with id in url
  public static async getDistrictById(
    district_id: number
  ): Promise<IApiError | IDistrict> {
    const apiReponse = await fetch(API_ROUTE + district_id, {
      method: "GET",
      credentials: "include",
    }).then(async (response: Response) => {
      if (response.status === 401) {
        useRotaryStore().$state.showLogoutModal = true;
        useRotaryStore().signOut();
      }
      return await response.json();
    });
    if (Utilities.isAnException(apiReponse)) {
      const exception = apiReponse as IApiException;
      throw new MyError(exception.message, exception.stack, exception.code);
    }
    return apiReponse as IApiError | IDistrict;
  }

  /**
   * @param  {number} district_id
   * @param  {number} current_page
   * @param  {number} limit
   * @returns Promise
   */
  public static async allDistrictAdmins(
    district_id: number,
    current_page: number,
    limit: number
  ): Promise<IApiError | UserPagination> {
    const apiReponse = await fetch(API_ROUTE + "admins", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        district_id: district_id,
        current_page: current_page,
        limit: limit,
      }),
      credentials: "include",
    }).then(async (response: Response) => {
      if (response.status === 401) {
        useRotaryStore().$state.showLogoutModal = true;
        useRotaryStore().signOut();
      }
      return await response.json();
    });
    if (Utilities.isAnException(apiReponse)) {
      const exception = apiReponse as IApiException;
      throw new MyError(exception.message, exception.stack, exception.code);
    }
    return apiReponse as IApiError | UserPagination;
  }

  /**
   * @param  {IDistrict} newDistrict
   * @returns Promise
   */
  public static async createDistrict(
    newDistrict: IDistrict
  ): Promise<IApiError | IDistrict> {
    const apiReponse = await fetch(API_ROUTE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        district: newDistrict,
      }),
      credentials: "include",
    }).then(async (response: Response) => {
      if (response.status === 401) {
        useRotaryStore().$state.showLogoutModal = true;
        useRotaryStore().signOut();
      }
      return await response.json();
    });
    if (Utilities.isAnException(apiReponse)) {
      const exception = apiReponse as IApiException;
      throw new MyError(exception.message, exception.stack, exception.code);
    }
    return apiReponse as IApiError | IDistrict;
  }

  /**
   * @param  {IDistrict} updatedDistrict
   * @returns Promise
   */
  public static async updateDistrict(
    updatedDistrict: IDistrict,
    id: number
  ): Promise<boolean | IApiError> {
    const apiReponse = await fetch(API_ROUTE + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        district: updatedDistrict,
      }),
      credentials: "include",
    }).then(async (response: Response) => {
      if (response.status === 401) {
        useRotaryStore().$state.showLogoutModal = true;
        useRotaryStore().signOut();
      }
      return await response.json();
    });
    if (Utilities.isAnException(apiReponse)) {
      const exception = apiReponse as IApiException;
      throw new MyError(exception.message, exception.stack, exception.code);
    }
    return apiReponse as IApiError | boolean;
  }

  /**
   * @param  {number} id
   * @returns Promise
   */
  public static async deleteDistrict(id: number): Promise<boolean | IApiError> {
    const apiReponse = await fetch(API_ROUTE + id, {
      method: "DELETE",
      credentials: "include",
    }).then(async (response: Response) => {
      if (response.status === 401) {
        useRotaryStore().$state.showLogoutModal = true;
        useRotaryStore().signOut();
      }
      return await response.json();
    });
    if (Utilities.isAnException(apiReponse)) {
      const exception = apiReponse as IApiException;
      throw new MyError(exception.message, exception.stack, exception.code);
    }
    return apiReponse as IApiError | boolean;
  }
}
