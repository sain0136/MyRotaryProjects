import type { IApiError } from "@/utils/frontend/interfaces/Frontend";
import type {
  IClubProject,
  IDmProject,
  IDsgProject,
  Pledge,
} from "@/utils/shared/interfaces/ProjectsInterface";

const API_ROUTE = import.meta.env.VITE_API_URL + "pledge/";

export default class PledgesApi {
  /**
   * @param  {number} project_id
   * @param  {number} current_page
   * @param  {number} limit
   * @returns Promise
   */
  public static async showOneProjectWithPledgesPaginated(
    project_id: number,
    current_page: number,
    limit: number
  ): Promise<IApiError | IDmProject | IDsgProject | IClubProject> {
    const apiReponse = await fetch(API_ROUTE + "project/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        project_id: project_id,
        current_page: current_page,
        limit: limit,
      }),
    });
    return (await apiReponse.json()) as
      | IApiError
      | IDmProject
      | IDsgProject
      | IClubProject;
  }

  /**
   * @param  {Pledge} newPledge
   * @returns Promise
   */
  public static async createPledge(
    newPledge: Pledge
  ): Promise<IApiError | IDmProject | IDsgProject | IClubProject> {
    const apiReponse = await fetch(API_ROUTE + '/create', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pledge: newPledge }),
    });
    return (await apiReponse.json()) as
      | IApiError
      | IDmProject
      | IDsgProject
      | IClubProject;
  }

  /**
   * @param  {number} id
   * @returns Promise
   */
  public static async showPledgesByUser(
    id: number
  ): Promise<IApiError | Pledge[]> {
    const apiReponse = await fetch(API_ROUTE + "userPledges/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: id,
      }),
    });
    return (await apiReponse.json()) as IApiError | Array<Pledge>;
  }

  /**
   * @param  {number} id
   * @returns Promise
   */
  public static async deletePledge(id: number): Promise<boolean | IApiError> {
    const apiReponse = await fetch(API_ROUTE + "delete/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pledge_id: id }),
    });
    return (await apiReponse.json()) as IApiError | boolean;
  }
}
