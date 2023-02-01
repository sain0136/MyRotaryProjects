import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Projects from "App/Models/Projects";
import { RotaryYear } from "Contracts/BackendInterfaces/RotaryYear";
import { SearchCriteria } from "Contracts/BackendInterfaces/Utility";

export default class ProjectsController {
  private async filter(searchCriteria: SearchCriteria) {
    return await Projects.query()
      .where(async (db) => {
        let raw;
        if (searchCriteria.rotary_year) {
          db.from("projects").where({
            rotary_year: searchCriteria.rotary_year,
          });
        }

        if (searchCriteria.grant_type) {
          db.from("projects").where({ grant_type: searchCriteria.grant_type });
        }

        if (searchCriteria.district_id) {
          db.from("projects").where({
            district_id: searchCriteria.district_id,
          });
        }

        if (searchCriteria.club_id) {
          db.from("projects").where({ club_id: searchCriteria.club_id });
        }

        if (searchCriteria.project_region) {
          db.from("projects").where({ region: searchCriteria.project_region });
        }

        if (searchCriteria.project_status) {
          db.from("projects").where({
            project_status: searchCriteria.project_status,
          });
        }

        if (searchCriteria.area_focus) {
          db.from("projects").whereRaw(
            `area_focus->>'$.${searchCriteria.area_focus}' = 'true'`
          );
        }

        if (searchCriteria.search_text) {
          raw = await db
            .from("projects")
            .where(
              "project_description",
              "like",
              `%${searchCriteria.search_text}%`
            )
            .orWhere("project_name", "like", `%${searchCriteria.search_text}%`);
          console.log(raw);
        }
      })
      .orderBy("project_id", "desc")
      .paginate(searchCriteria.current_page, searchCriteria.limit);
  }

  /**
   * @param  {HttpContextContract} {response}
   */
  public async index({ response }: HttpContextContract) {
    const allProjects = await Projects.all();
    return response.json(allProjects);
  }

  /**S
   * @param  {HttpContextContract} {response}
   */
  public async getRotaryYears({ response }: HttpContextContract) {
    return response.json({
      currentRotaryYear: RotaryYear.getCurrentYear(),
      allRotaryYears: RotaryYear.getYears(
        parseInt(RotaryYear.getCurrentYear())
      ),
    });
  }

  /**
   * @desc Pagination function for retrieving projects based on club or district id or all projects.
   * @param  {} {request
   * @param  {HttpContextContract} response}
   */
  public async projectsPagination({ request, response }: HttpContextContract) {
    const idType: string = request.input("id_type");
    const id: number = request.input("id");
    const currentPage: number = request.input("current_page");
    const limit: number = request.input("limit");

    if (idType === "club") {
      const projects = await Projects.query()
        .select("*")
        .where({ club_id: id })
        .orderBy("project_id", "desc")
        .paginate(currentPage, limit);
      return response.json(projects);
    }

    if (idType === "district") {
      const projects = await Projects.query()
        .select("*")
        .where({ district_id: id })
        .orderBy("project_id", "desc")
        .paginate(currentPage, limit);
      return response.json(projects);
    }

    const projects = await Projects.query()
      .select("*")
      .orderBy("project_id", "desc")
      .paginate(currentPage, limit);
    return response.json(projects);
  }

  /**
   * @param  {} {request
   * @param  {HttpContextContract} response}
   */
  public async paginationFilter({ request, response }: HttpContextContract) {
    const searchCriteria: SearchCriteria = request.input("search_criteria");
    // const currentPage: number = request.input("current_page");
    // const limit: number = request.input("limit");
    // const clubId: number = request.input("club_id");
    // const searchText: string = request.input("search_text");
    // const projectStatus: string = request.input("project_status");
    // const projectRegion: string = request.input("project_region");
    // const areaOfFocus: string = request.input("area_focus");
    // const rotaryYear: string = request.input("rotary_year");
    // const districtId: number | string = request.input("district_id");
    // const grantType = request.input("grant_type");
    let go = await this.filter(searchCriteria);
    return response.json(go);
  }
}
