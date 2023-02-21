import Utilities from "@/utils/frontend/classes/Utilities";
import {
  MyError,
  type IApiError,
  type ProjectPagination,
  type RotaryYearObject,
  type IApiException,
} from "@/utils/frontend/interfaces/Frontend";
import type {
  IClubProject,
  IDmProject,
  IDsgProject,
} from "@/utils/shared/interfaces/ProjectsInterface";

const API_ROUTE = import.meta.env.VITE_API_URL + "project/";

export default class ProjectsApi {
  /**
   * @description This function is used get the current rotary year
   * @returns Promise
   */
  public static async getRotaryYear(): Promise<RotaryYearObject | IApiError> {
    const apiReponse = await fetch(API_ROUTE + "year", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async (response) => {
      return await response.json();
    });
    if (Utilities.isAnException(apiReponse)) {
      const exception = apiReponse as IApiException;
      throw new MyError(exception.message, exception.stack, exception.code);
    }
    return apiReponse as RotaryYearObject | IApiError;
  }

  /**
   * @description This function is used to get all projects paginated
   * @param  {string} id_type
   * @param  {number} id
   * @param  {number} current_page
   * @param  {number} limit
   * @returns Promise
   */
  public static async getAllProjectsPaginated(
    current_page: number,
    limit: number,
    id_type?: string,
    id?: number
  ): Promise<ProjectPagination | IApiError> {
    const apiReponse = await fetch(API_ROUTE + "paginate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_type: id_type,
        id: id,
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
    return apiReponse as ProjectPagination | IApiError;
  }

  /**
   * @description This function is used to get all projects filtered by a specific rotary year
   * @param  {string} id_type
   * @param  {number} id
   * @param  {number} current_page
   * @param  {number} limit
   * @returns Promise
   */
  public static async getProjectsFilterdPaginated(
    current_page: number,
    limit: number,
    filters: { [key: string]: string | number | boolean | undefined} = {}
  ): Promise<ProjectPagination | IApiError> {
    const apiReponse = await fetch(API_ROUTE + "filter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        search_criteria: {
          current_page: current_page,
          limit: limit,
          ...filters,
        },
      }),
    }).then(async (response) => {
      return await response.json();
    });
    if (Utilities.isAnException(apiReponse)) {
      const exception = apiReponse as IApiException;
      throw new MyError(exception.message, exception.stack, exception.code);
    }
    return apiReponse as ProjectPagination | IApiError;
  }

  /**
   * @description This function is used to create a new project
   * @param  {IDmProject|IDsgProject|IClubProject} newProject
   * @returns Promise
   */
  public static async createNewProject(
    newProject: IDmProject | IDsgProject | IClubProject
  ): Promise<IApiError | boolean> {
    const apiReponse = await fetch(API_ROUTE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ project: newProject }),
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
   * @description This function is used to update a project
   * @param  {IDmProject|IDsgProject|IClubProject} updatedProject
   * @returns Promise
   */
  public static async updateProject(
    updatedProject: IDmProject | IDsgProject | IClubProject
  ): Promise<IApiError | boolean> {
    const apiReponse = await fetch(API_ROUTE + "updateById", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ project: updatedProject }),
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
   * @description This function is used to get a project by id
   * @param  {number} id
   * @returns Promise
   *   */
  public static async getProjectById(
    id: number
  ): Promise<IApiError | IDmProject | IDsgProject | IClubProject> {
    const apiReponse = await fetch(API_ROUTE + id, {
      method: "GET",
    }).then(async (response) => {
      return await response.json();
    });
    if (Utilities.isAnException(apiReponse)) {
      const exception = apiReponse as IApiException;
      throw new MyError(exception.message, exception.stack, exception.code);
    }
    return apiReponse as IApiError | IDmProject | IDsgProject | IClubProject;
  }

  /**
   * @description This function is used to get projects based on status
   * @param  {string} status
   * @param  {number} district_id
   * @param  {number} current_page
   * @param  {number} limit
   * @returns Promise
   */
  public static async getProjectsByStatus(
    status: string,
    district_id: number,
    current_page: number,
    limit: number
  ): Promise<ProjectPagination | IApiError> {
    const apiReponse = await fetch(API_ROUTE + "status", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: status,
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
    return apiReponse as ProjectPagination | IApiError;
  }

  /**
   * @description This function is used to get projects based on a conditional
   * @param  {number} id
   * @param  {number} current_page
   * @param  {number} limit
   * @param  {string} conditional
   * @returns Promise
   */
  public static async getProjectsByConditional(
    id: number,
    current_page: number,
    limit: number,
    conditional: string
  ): Promise<ProjectPagination | IApiError> {
    const apiReponse = await fetch(API_ROUTE + "conditional", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        current_page: current_page,
        limit: limit,
        conditional: conditional,
      }),
    }).then(async (response) => {
      return await response.json();
    });
    if (Utilities.isAnException(apiReponse)) {
      const exception = apiReponse as IApiException;
      throw new MyError(exception.message, exception.stack, exception.code);
    }
    return apiReponse as ProjectPagination | IApiError;
  }

  /**
   * @desc This function updates the status of a project
   * @param  {number} project_id
   * @param  {string} project_status
   * @returns Promise
   */
  public static async updateProjectStatus(
    project_id: number,
    project_status: string
  ): Promise<IApiError | boolean> {
    const apiReponse = await fetch(API_ROUTE + "changeStatus", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        project_id: project_id,
        project_status: project_status,
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
   * @description This function is used to delete a project
   * @param  {number} project_id
   * @param  {string} override
   * @returns Promise
   */
  public static async deleteProject(
    project_id: number,
    override: string
  ): Promise<IApiError | boolean> {
    const apiReponse = await fetch(API_ROUTE + "delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        project_id: project_id,
        override: override,
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
}
