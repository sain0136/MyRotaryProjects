import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Database from "@ioc:Adonis/Lucid/Database";
import Clubs from "App/Models/Clubs";
import Districts from "App/Models/Districts";
import Pledges from "App/Models/Pledges";
import Projects from "App/Models/Projects";
import Users from "App/Models/Users";
import { RotaryYear } from "Contracts/BackendInterfaces/RotaryYear";
import {
  ProjectCodeGenerator,
  SearchCriteria,
} from "Contracts/BackendInterfaces/Utility";
import ClubProject from "Contracts/Shared/SharedClasses/Classes/ClubProject";
import DmProject from "Contracts/Shared/SharedClasses/Classes/DmProject";
import DsgProject from "Contracts/Shared/SharedClasses/Classes/DsgProject";
import { CustomReponse } from "Contracts/Shared/SharedInterfaces/CustomReponse";
import {
  IClubProject,
  IDmProject,
  IDsgProject,
  ProjectDetails,
} from "Contracts/Shared/SharedInterfaces/ProjectsInterface";
import { DateTime } from "luxon/src/datetime";

export default class ProjectsController {
  /**
   * @param  {number} id
   */
  private async pledgesAsscoiated(id: number): Promise<Pledges[]> {
    return await Database.query()
      .from("pledge")
      .select("*")
      .where({ project_id: id });
  }
  /**
   * @desc Retrieves project details based on a given id including information about the creator,
   * district and club associated with the project.
   * @param  {number} id
   */
  private async getProjectDetails(id: number) {
    const projectById: Projects = await Projects.findOrFail(id);
    const creator: Users = await Users.findOrFail(projectById.createdBy);
    const projectDisrict: Districts = await Districts.findOrFail(
      projectById.districtId
    );
    const projectClub: Clubs = await Clubs.findOrFail(projectById.clubId);
    const projectDetails: ProjectDetails = {
      creatorData: {
        fullName: creator.fullName,
        email: creator.email,
        phone: creator.phone ? creator.phone : "",
        clubName: "",
      },
      districtClubData: {
        clubName: projectClub.clubName,
        district_name: projectDisrict.districtName,
      },
    };
    return projectDetails;
  }
  
  /**
   * @desc Add computed pledges and project details to a project object.
   * @param  {Projects} updatedProject
   */
  public async addComputed(updatedProject: Projects) {
    updatedProject.pledgesAssociated = await this.pledgesAsscoiated(
      updatedProject.projectId
    );
    updatedProject.projectDetails = await this.getProjectDetails(
      updatedProject.projectId
    );
    return updatedProject
  }

  /**
   * @desc Filters projects based on provided search criteria
   * and returns the result sorted by project ID in descending order,
   * paginated by current page and limit.
   * @param  {SearchCriteria} searchCriteria
   */
  private async filter(searchCriteria: SearchCriteria) {
    return await Projects.query()
      .where(async (db) => {
        let raw: Projects[];
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

  /**
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
    let filteredProjects = await this.filter(searchCriteria);
    return response.json(filteredProjects);
  }

  /**
   * @param  {} {request
   * @param  {HttpContextContract} response}
   * @returns Promise
   */
  public async store({
    request,
    response,
  }: HttpContextContract): Promise<void> {
    const newProject: IDmProject | IDsgProject | IClubProject =
      request.input("project");
    const convertedStartDate: DateTime = DateTime.fromFormat(
      newProject.start_date,
      "D"
    );
    const convertedCompletionDate: DateTime = DateTime.fromFormat(
      newProject.completion_date,
      "D"
    );

    if (newProject instanceof ClubProject) {
      try {
        const projectNumber: number = await ProjectCodeGenerator.getProjectCode(
          "clubIntial"
        );
        const createdProject = await Projects.create({
          projectName: newProject.project_name,
          projectDescription: newProject.project_description,
          grantType: newProject.grant_type,
          areaFocus: JSON.stringify(newProject.area_focus),
          completionDate: convertedCompletionDate,
          fundingGoal: newProject.funding_goal,
          anticipatedFunding: newProject.anticipated_funding,
          startDate: convertedStartDate,
          createdBy: newProject.created_by,
          region: newProject.region,
          rotaryYear: newProject.rotary_year,
          clubId: newProject.club_id,
          country: newProject.country,
          districtId: newProject.district_id,
          projectStatus: newProject.project_status,
          imageLink: newProject.image_link,
          totalPledges: newProject.total_pledges,
          projectNumber: projectNumber,
          projectCode: "CP-" + projectNumber.toString(),
          extraDescriptions: JSON.stringify(newProject.extra_descriptions),
          fileUploads: JSON.stringify(newProject.file_uploads),
        });
        if (createdProject.projectId) {
          try {
            await ProjectCodeGenerator.setProjectCode(
              "clubIntial",
              createdProject.projectNumber
            );
          } catch (error) {
            return response.json(new CustomReponse(error));
          }
        }
        return response.json(true);
      } catch (error) {
        return response.json(new CustomReponse(error));
      }
    }

    if (newProject instanceof DsgProject) {
      try {
        const projectNumber: number = await ProjectCodeGenerator.getProjectCode(
          "dsgIntial"
        );
        const createdProject = await Projects.create({
          projectName: newProject.project_name,
          projectDescription: newProject.project_description,
          grantType: newProject.grant_type,
          areaFocus: JSON.stringify(newProject.area_focus),
          completionDate: convertedCompletionDate,
          startDate: convertedStartDate,
          fundingGoal: newProject.funding_goal,
          anticipatedFunding: newProject.anticipated_funding,
          createdBy: newProject.created_by,
          region: newProject.region,
          rotaryYear: newProject.rotary_year,
          clubId: newProject.club_id,
          country: newProject.country,
          districtId: newProject.district_id,
          projectStatus: newProject.project_status,
          imageLink: newProject.image_link,
          totalPledges: newProject.total_pledges,
          projectNumber: projectNumber,
          projectCode: "DS-" + projectNumber.toString(),
          coOperatingOrganisationContribution:
            newProject.co_operating_organisation_contribution,
          districtSimplifiedGrantRequest:
            newProject.district_simplified_grant_request,
          intialSponsorClubContribution:
            newProject.intial_sponsor_club_contribution,
          extraDescriptions: JSON.stringify(newProject.extra_descriptions),
          itemizedBudget: JSON.stringify(newProject.itemized_budget),
          fileUploads: JSON.stringify(newProject.file_uploads),
        });
        if (createdProject.projectId) {
          try {
            await ProjectCodeGenerator.setProjectCode(
              "dsgIntial",
              createdProject.projectNumber
            );
          } catch (error) {
            return response.json(new CustomReponse(error));
          }
        }
        return response.json(true);
      } catch (error) {
        return response.json(new CustomReponse(error));
      }
    }

    if (newProject instanceof DmProject) {
      try {
        const projectNumber: number = await ProjectCodeGenerator.getProjectCode(
          "dmIntial"
        );
        const createdProject = await Projects.create({
          projectName: newProject.project_name,
          projectDescription: newProject.project_description,
          grantType: newProject.grant_type,
          areaFocus: JSON.stringify(newProject.area_focus),
          completionDate: convertedCompletionDate,
          startDate: convertedStartDate,
          fundingGoal: newProject.funding_goal,
          anticipatedFunding: newProject.anticipated_funding,
          createdBy: newProject.created_by,
          region: newProject.region,
          rotaryYear: newProject.rotary_year,
          clubId: newProject.club_id,
          country: newProject.country,
          districtId: newProject.district_id,
          projectStatus: newProject.project_status,
          imageLink: newProject.image_link,
          totalPledges: newProject.total_pledges,
          projectNumber: projectNumber,
          projectCode: "DM-" + projectNumber.toString(),
          coOperatingOrganisationContribution:
            newProject.co_operating_organisation_contribution,
          districtSimplifiedGrantRequest:
            newProject.district_simplified_grant_request,
          intialSponsorClubContribution:
            newProject.intial_sponsor_club_contribution,
          extraDescriptions: JSON.stringify(newProject.extra_descriptions),
          itemizedBudget: JSON.stringify(newProject.itemized_budget),
          fileUploads: JSON.stringify(newProject.file_uploads),
          hostclubInformation: JSON.stringify(newProject.hostclub_information),
        });
        if (createdProject.projectId) {
          try {
            await ProjectCodeGenerator.setProjectCode(
              "dmIntial",
              createdProject.projectNumber
            );
          } catch (error) {
            return response.json(new CustomReponse(error));
          }
        }
        return response.json(true);
      } catch (error) {
        return response.json(new CustomReponse(error));
      }
    }
  }

  /**
   * @param  {} {params
   * @param  {HttpContextContract} response}
   */
  public async show({ params, response }: HttpContextContract) {
    const ProjectById: Projects = await Projects.findOrFail(params.id);
    return response.json(ProjectById);
  }

  /**
   * @param  {} {request
   * @param  {HttpContextContract} response}
   */
  public async getProjectsByStatus({ request, response }: HttpContextContract) {
    const districtId: number = request.input("district_id");
    const status: number = request.input("status");
    const currentPage: number = request.input("current_page");
    const limit: number = request.input("limit");
    const allProjectsByStatus: Projects[] = await Projects.query()
      .where({
        districtId: districtId,
        projectStatus: status,
      })
      .orderBy("project_id", "desc")
      .paginate(currentPage, limit);

    return response.json(allProjectsByStatus);
  }

  /**
   * @desc Paginates projects based on condtional that is a column and returns JSON response.
   * @param  {} {request
   * @param  {} response
   * @param  {HttpContextContract} }
   */
  public async getAllProjectsWithCondtional({
    request,
    response,
  }: HttpContextContract) {
    const conditional: number = request.input("conditional");
    const id: number = request.input("id");
    const currentPage: number = request.input("current_page");
    const limit: number = request.input("limit");

    const projects: Projects[] = await Projects.query()
      .select()
      .where({ [conditional]: id })
      .orderBy("project_id", "desc")
      .paginate(currentPage, limit);
    return response.json(projects);
  }

  /**
   * @param  {} {request
   * @param  {HttpContextContract} response}
   */
  public async updateProjectStatus({ request, response }: HttpContextContract) {
    const projectId: number = request.input("project_id");
    const projectStatus: string = request.input("project_status");
    const oldProjectImformation: Projects = await Projects.findOrFail(
      projectId
    );
    await oldProjectImformation
      .merge({
        projectStatus: projectStatus,
      })
      .save();
    return response.json(true);
  }

  public async updateById({ request, response }: HttpContextContract) {
    const oldProjectImformation: IDmProject | IDsgProject | IClubProject =
      request.input("project");

    const projectToBeUpdateds: Projects = await Projects.findOrFail(
      oldProjectImformation.project_id
    );

    const convertedStartDate: DateTime = DateTime.fromFormat(
      oldProjectImformation.start_date,
      "D"
    );

    const convertedCompletionDate: DateTime = DateTime.fromFormat(
      oldProjectImformation.completion_date,
      "D"
    );

    if (oldProjectImformation instanceof ClubProject) {
      const updatedProject = await projectToBeUpdateds
        .merge({
          projectName: oldProjectImformation.project_name,
          projectDescription: oldProjectImformation.project_description,
          grantType: oldProjectImformation.grant_type,
          areaFocus: JSON.stringify(oldProjectImformation.area_focus),
          completionDate: convertedCompletionDate,
          fundingGoal: oldProjectImformation.funding_goal,
          anticipatedFunding: oldProjectImformation.anticipated_funding,
          startDate: convertedStartDate,
          createdBy: oldProjectImformation.created_by,
          region: oldProjectImformation.region,
          rotaryYear: oldProjectImformation.rotary_year,
          clubId: oldProjectImformation.club_id,
          country: oldProjectImformation.country,
          districtId: oldProjectImformation.district_id,
          projectStatus: oldProjectImformation.project_status,
          imageLink: oldProjectImformation.image_link,
          totalPledges: oldProjectImformation.total_pledges,
          projectNumber: oldProjectImformation.project_number,
          projectCode: oldProjectImformation.project_code,
          extraDescriptions: JSON.stringify(
            oldProjectImformation.extra_descriptions
          ),
          fileUploads: JSON.stringify(oldProjectImformation.file_uploads),
        })
        .save();
      return response.json(await this.addComputed(updatedProject));
    }

    if (oldProjectImformation instanceof DsgProject) {
      const updatedProject = await projectToBeUpdateds
        .merge({
          projectName: oldProjectImformation.project_name,
          projectDescription: oldProjectImformation.project_description,
          grantType: oldProjectImformation.grant_type,
          areaFocus: JSON.stringify(oldProjectImformation.area_focus),
          completionDate: convertedCompletionDate,
          startDate: convertedStartDate,
          fundingGoal: oldProjectImformation.funding_goal,
          anticipatedFunding: oldProjectImformation.anticipated_funding,
          createdBy: oldProjectImformation.created_by,
          region: oldProjectImformation.region,
          rotaryYear: oldProjectImformation.rotary_year,
          clubId: oldProjectImformation.club_id,
          country: oldProjectImformation.country,
          districtId: oldProjectImformation.district_id,
          projectStatus: oldProjectImformation.project_status,
          imageLink: oldProjectImformation.image_link,
          totalPledges: oldProjectImformation.total_pledges,
          projectNumber: oldProjectImformation.project_number,
          projectCode: oldProjectImformation.project_code,
          coOperatingOrganisationContribution:
            oldProjectImformation.co_operating_organisation_contribution,
          districtSimplifiedGrantRequest:
            oldProjectImformation.district_simplified_grant_request,
          intialSponsorClubContribution:
            oldProjectImformation.intial_sponsor_club_contribution,
          extraDescriptions: JSON.stringify(
            oldProjectImformation.extra_descriptions
          ),
          itemizedBudget: JSON.stringify(oldProjectImformation.itemized_budget),
          fileUploads: JSON.stringify(oldProjectImformation.file_uploads),
        })
        .save();
      return response.json(await this.addComputed(updatedProject));
    }

    if (oldProjectImformation instanceof DmProject) {
      const updatedProject = await projectToBeUpdateds
        .merge({
          projectName: oldProjectImformation.project_name,
          projectDescription: oldProjectImformation.project_description,
          grantType: oldProjectImformation.grant_type,
          areaFocus: JSON.stringify(oldProjectImformation.area_focus),
          completionDate: convertedCompletionDate,
          startDate: convertedStartDate,
          fundingGoal: oldProjectImformation.funding_goal,
          anticipatedFunding: oldProjectImformation.anticipated_funding,
          createdBy: oldProjectImformation.created_by,
          region: oldProjectImformation.region,
          rotaryYear: oldProjectImformation.rotary_year,
          clubId: oldProjectImformation.club_id,
          country: oldProjectImformation.country,
          districtId: oldProjectImformation.district_id,
          projectStatus: oldProjectImformation.project_status,
          imageLink: oldProjectImformation.image_link,
          totalPledges: oldProjectImformation.total_pledges,
          projectNumber: oldProjectImformation.project_number,
          projectCode: oldProjectImformation.project_code,
          coOperatingOrganisationContribution:
            oldProjectImformation.co_operating_organisation_contribution,
          districtSimplifiedGrantRequest:
            oldProjectImformation.district_simplified_grant_request,
          intialSponsorClubContribution:
            oldProjectImformation.intial_sponsor_club_contribution,
          extraDescriptions: JSON.stringify(
            oldProjectImformation.extra_descriptions
          ),
          itemizedBudget: JSON.stringify(oldProjectImformation.itemized_budget),
          fileUploads: JSON.stringify(oldProjectImformation.file_uploads),
          hostclubInformation: JSON.stringify(
            oldProjectImformation.hostclub_information
          ),
        })
        .save();
      return response.json(await this.addComputed(updatedProject));
    }
  }

  /**
   * @desc Destroy a project, if no pledges are associated with the project
   * it will be deleted, otherwise it will return false.
   * @param  {} {request
   * @param  {HttpContextContract} response}
   */
  public async destroyProject({ request, response }: HttpContextContract) {
    const projectId: number = request.input("project_id");
    const projectToBeDeleted: Projects = await Projects.findOrFail(projectId);
    const pledgesAssociated: Pledges[] = await this.pledgesAsscoiated(
      projectToBeDeleted.projectId
    );
    const override: string = request.input("override");
    if (override) {
      await projectToBeDeleted.delete();
      return response.json(true);
    }
    if (pledgesAssociated.length < 1) {
      await projectToBeDeleted.delete();
      return response.json(true);
    } else {
      return response.json(false);
    }
  }
}
