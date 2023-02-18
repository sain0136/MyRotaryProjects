import Utilities from "@/utils/frontend/classes/Utilities";
import { MyError, type IApiError, type IApiException } from "@/utils/frontend/interfaces/Frontend";
import type { IClub } from "@/utils/shared/interfaces/ClubInterface";
import type IUser from "@/utils/shared/interfaces/UserInterface";

export default class ClubsApi {
  /**
   * @returns Promise
   */
  public static async getAllClubs(): Promise<IApiError | IClub[]> {
    const apiReponse = await fetch(import.meta.env.VITE_API_URL + "club", {
      method: "GET",
    }).then(async (response) => {
      return await response.json();
    });
    if (Utilities.isAnException(apiReponse)) {
      const exception = apiReponse as IApiException;
      throw new MyError(exception.message, exception.stack, exception.code);
    }
    return apiReponse as IApiError | Array<IClub>;
  }

  /**
   * @param  {number} id
   * @returns Promise
   */
  public static async getOneClubById(id: number): Promise<IClub | IApiError> {
    const apiReponse = await fetch(
      `${import.meta.env.VITE_API_URL}club/${id}`,
      {
        method: "GET",
      }
    ).then(async (response) => {
      return await response.json();
    });
    if (Utilities.isAnException(apiReponse)) {
      const exception = apiReponse as IApiException;
      throw new MyError(exception.message, exception.stack, exception.code);
    };
    return apiReponse as IApiError | IClub;
  }

  /**
   * @param  {number} club_id
   * @param  {number} current_page
   * @param  {number} limit
   */
  public static async AllClubMembersPaginted(
    club_id: number,
    current_page: number,
    limit: number
  ): Promise<IApiError | IUser[]> {
    const apiReponse = await fetch(
      import.meta.env.VITE_API_URL + "/club/members",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          club_id: club_id,
          current_page: current_page,
          limit: limit,
        }),
      }
    ).then(async (response) => {
      return await response.json();
    });
    if (Utilities.isAnException(apiReponse)) {
      const exception = apiReponse as IApiException;
      throw new MyError(exception.message, exception.stack, exception.code);
    };
    return apiReponse as IApiError | Array<IUser>;
  }

  /**
   * @param  {IClub} creationObject
   */
  public static async createClub(
    newClub: IClub
  ): Promise<boolean | IApiError> {
    const apiReponse = await fetch(import.meta.env.VITE_API_URL + "club", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({club:newClub}),
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
   * @param  {object} data
   * @returns Promise
   */
  public static async updateClub(
    id: number,
    updatedClub: object
  ): Promise<boolean | IApiError> {
    const apiReponse = await fetch(
      import.meta.env.VITE_API_URL + "club/" + id,
      {
        method: "Put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({club:updatedClub}),
      }
    ).then(async (response) => {
      return await response.json();
    });
    if (Utilities.isAnException(apiReponse)) {
      const exception = apiReponse as IApiException;
      throw new MyError(exception.message, exception.stack, exception.code);
    };
    return apiReponse as IApiError | boolean;
  }

  /**
   * @param  {number} id
   * @returns Promise
   */
  public static async deleteClub(id: number): Promise<boolean | IApiError> {
    const apiReponse = await fetch(
      `${import.meta.env.VITE_API_URL}club/${id}`,
      {
        method: "DELETE",
      }
    ).then(async (response) => {
      return await response.json();
    });
    if (Utilities.isAnException(apiReponse)) {
      const exception = apiReponse as IApiException;
      throw new MyError(exception.message, exception.stack, exception.code);
    };
    return apiReponse as IApiError | boolean;
  }
}
