import Utilities from "@/utils/frontend/classes/Utilities";
import { MyError, type IApiError, type IApiException } from "@/utils/frontend/interfaces/Frontend";
import type { IClub } from "@/utils/shared/interfaces/ClubInterface";
import type IDistrict from "@/utils/shared/interfaces/DistrictInterface";
import type IUser from "@/utils/shared/interfaces/UserInterface";

const API_ROUTE = import.meta.env.VITE_API_URL + "district/";

export default class DistrictsApi {
  /**
   * @returns Promise
   */
  public static async index(): Promise<IApiError | IDistrict[]> {
    const apiReponse = await fetch(API_ROUTE, {
      method: "GET",
    }).then(async (response) => {
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
  ): Promise<IApiError | IDistrict[]> {
    const apiReponse = await fetch(API_ROUTE + "pagination", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ current_page: current_page, limit: limit }),
    }).then(async (response) => {
      return await response.json();
    });
    if (Utilities.isAnException(apiReponse)) {
      const exception = apiReponse as IApiException;
      throw new MyError(exception.message, exception.stack, exception.code);
    }
    return apiReponse as IApiError | Array<IDistrict>;
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
  ): Promise<IApiError | IClub[]> {
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
    }).then(async (response) => {
      return await response.json();
    });
    if (Utilities.isAnException(apiReponse)) {
      const exception = apiReponse as IApiException;
      throw new MyError(exception.message, exception.stack, exception.code);
    }
    return apiReponse as IApiError | Array<IClub>;
  }

  // write a function to get a single district by id send as a get with id in url 
  public static async getDistrictById(
    district_id: number
  ): Promise<IApiError | IDistrict> {
    const apiReponse = await fetch(API_ROUTE + district_id, {
      method: "GET",
    }).then(async (response) => {
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
  ): Promise<IApiError | IUser[]> {
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
    }).then(async (response) => {
      return await response.json();
    });
    if (Utilities.isAnException(apiReponse)) {
      const exception = apiReponse as IApiException;
      throw new MyError(exception.message, exception.stack, exception.code);
    }
    return apiReponse as IApiError | Array<IUser>;
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
    }).then(async (response) => {
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
    }).then(async (response) => {
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
    }).then(async (response) => {
      return await response.json();
    });
    if (Utilities.isAnException(apiReponse)) {
      const exception = apiReponse as IApiException;
      throw new MyError(exception.message, exception.stack, exception.code);
    }
    return apiReponse as IApiError | boolean;
  }
}
