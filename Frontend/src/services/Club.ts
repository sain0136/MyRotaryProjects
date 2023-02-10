import type { IApiError } from "@/utils/frontend/interfaces/Frontend";
import type { IClub } from "@/utils/shared/interfaces/ClubInterface";
import type IUser from "@/utils/shared/interfaces/UserInterface";

export default class Clubs {
  /**
   * @returns Promise
   */
  public static async getAllClubs(): Promise<IApiError | IClub[]> {
    const apiReponse = await fetch(import.meta.env.VITE_API_URL + "club", {
      method: "GET",
    });
    return (await apiReponse.json()) as IApiError | Array<IClub>;
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
    );
    return (await apiReponse.json()) as IApiError | IClub;
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
    );
    return (await apiReponse.json()) as IApiError | Array<IUser>;
  }

  /**
   * @param  {IClub} creationObject
   */
  public static async createClub(
    creationObject: IClub
  ): Promise<boolean | IApiError> {
    const apiReponse = await fetch(import.meta.env.VITE_API_URL + "club", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(creationObject),
    });
    return (await apiReponse.json()) as IApiError | boolean;
  }

  /**
   * @param  {number} id
   * @param  {object} data
   * @returns Promise
   */
  public static async updateClub(
    id: number,
    data: object
  ): Promise<boolean | IApiError> {
    const apiReponse = await fetch(
      import.meta.env.VITE_API_URL + "club/" + id,
      {
        method: "Put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    return (await apiReponse.json()) as IApiError | boolean;
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
    );
    return (await apiReponse.json()) as IApiError | boolean;
  }
}
