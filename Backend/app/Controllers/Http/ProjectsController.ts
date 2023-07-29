import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Database from "@ioc:Adonis/Lucid/Database";
import Clubs from "../../Models/Clubs";
import Districts from "../../Models/Districts";
import Pledges from "../../Models/Pledges";
import Projects from "../../Models/Projects";
import Users from "../../Models/Users";
import RotaryYear from "Contracts/util/backend/classes/RotaryYear";
import CustomReponse from "Contracts/util/backend/classes/CustomReponse";
import ProjectCodeGenerator from "Contracts/util/backend/classes/ProjectCodeGenerator";
import {
  ProjectDetails,
  IDmProject,
  IDsgProject,
  IClubProject,
} from "Contracts/util/sharedUtility/interfaces/ProjectsInterface";
import {
  ProjectStatus,
  SearchCriteria,
} from "Contracts/util/sharedUtility/interfaces/SharedInterface";
import { DateTime } from "luxon";
import IUser from "Contracts/util/sharedUtility/interfaces/UserInterface";
import { dbError } from "Contracts/util/backend/interfaces/Utilities";
import { handleDatabaseError } from "Contracts/util/backend/classes/databaseError";

export default class ProjectsController {
  /**
   * @param  {number} id
   */
  private async pledgesAsscoiated(id: number): Promise<Pledges[]> {
    return await Database.query()
      .from("pledges")
      .select("*")
      .where({ project_id: id });
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
    let projectAdmins = await Database.from("project_roles")
      .select("*")
      .where({ project_id: id });
    const allProjectAdmins = [] as IUser[];
    for await (const admin of projectAdmins) {
      const user: Users = await Users.findOrFail(admin.user_id);
      allProjectAdmins.push(user as unknown as IUser);
    }

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
      projectAdmins: allProjectAdmins ? allProjectAdmins : [],
    };
    return projectDetails;
  }

  /**
   * @desc Add computed pledges and project details to a project object.
   * @param  {Projects} updatedProject
   */
  private async addComputed(updatedProject: Projects) {
    updatedProject.pledgesAssociated = await this.pledgesAsscoiated(
      updatedProject.projectId
    );
    updatedProject.projectDetails = await this.getProjectDetails(
      updatedProject.projectId
    );
    return updatedProject;
  }

  /**
   * @param  {HttpContextContract} {response}
   */
  public async index({ response }: HttpContextContract) {
    const allProjects = await Projects.all();
    for await (const project of allProjects) {
      project.pledgesAssociated = await this.pledgesAsscoiated(
        project.projectId
      );
      project.projectDetails = await this.getProjectDetails(project.projectId);
    }
    return response.json(allProjects);
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
          await db
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
   * @desc Pagination function for retrieving projects based on club or district id or all projects.
   * @param  {} {request
   * @param  {HttpContextContract} response}
   */
  public async projectsPagination({ request, response }: HttpContextContract) {
    const idType: string = request.input("id_type");
    const id: number = request.input("id");
    const currentPage: number = request.input("current_page");
    const limit: number = request.input("limit");
    this.normalizeProjectStatus();
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
      .orderByRaw(
        "CASE WHEN project_status = 'Completed' THEN 1 ELSE 0 END, project_id DESC"
      )
      .orderBy("project_id", "desc")
      .paginate(currentPage, limit);
    return response.json(projects);
  }

  // Temporary function to normalize project status then it will become a cron job
  async normalizeProjectStatus() {
    const projects = await Projects.all();
    for await (const project of projects) {
      if (project.projectStatus === ProjectStatus.LOOKINGFORFUNDING) {
        let fullyFunded =
          parseFloat(project.anticipatedFunding.toString()) ===
          parseFloat(project.fundingGoal.toString())
            ? true
            : false;
        if (fullyFunded) {
          await project
            .merge({ projectStatus: ProjectStatus.FULLYFUNDED })
            .save();
        }
      }
    }
  }

  /**
   * @desc Filters projects based on provided search criteria
   * and returns the result sorted by project ID in descending order,
   * paginated by current page and limit.
   * @param  {HttpContextContract} {request
   * @param  {HttpContextContract} response}
   * @returns Promise
   * @memberof ProjectsController
   * */
  public async paginationFilter({ request, response }: HttpContextContract) {
    const searchCriteria: SearchCriteria = request.input("search_criteria");
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
    const convertedStartDate = DateTime.fromFormat(
      newProject.start_date,
      "yyyy-MM-dd"
    );
    const convertedCompletionDate = DateTime.fromFormat(
      newProject.completion_date,
      "yyyy-MM-dd"
    );
    newProject.project_name = newProject.project_name.trim();  
    if (newProject.grant_type === "Club Project") {
      try {
        const projectNumber: number = await ProjectCodeGenerator.getProjectCode(
          "clubInitial"
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
          rotaryYear: RotaryYear.getCurrentYear(),
          clubId: newProject.club_id,
          country: newProject.country,
          districtId: newProject.district_id,
          projectStatus: newProject.project_status,
          imageLink: JSON.stringify(newProject.image_link),
          totalPledges: newProject.total_pledges,
          projectNumber: projectNumber,
          projectCode: "CP-" + projectNumber.toString(),
          extraDescriptions: JSON.stringify(newProject.extra_descriptions),
          fileUploads: JSON.stringify(newProject.file_uploads),
        });
        if (createdProject.projectId) {
          try {
            await ProjectCodeGenerator.setProjectCode(
              "clubInitial",
              createdProject.projectNumber
            );
          } catch (error) {
            return response.json(new CustomReponse(error));
          }
        }
        return response.json(createdProject.projectId);
      } catch (error) {
        const errorParsed = handleDatabaseError(error) as unknown as dbError;
        return response.json(new CustomReponse(errorParsed.message, errorParsed.stack , errorParsed.code));
      }
    }

    if (newProject.grant_type === "District Simplified Project") {
      try {
        const projectNumber: number = await ProjectCodeGenerator.getProjectCode(
          "dsgInitial"
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
          imageLink: JSON.stringify(newProject.image_link),
          totalPledges: newProject.total_pledges,
          projectNumber: projectNumber,
          projectCode: "DS-" + projectNumber.toString(),
          coOperatingOrganisationContribution: (newProject as IDsgProject)
            .co_operating_organisation_contribution,
          districtSimplifiedGrantRequest: (newProject as IDsgProject)
            .district_simplified_grant_request,
          intialSponsorClubContribution: (newProject as IDsgProject)
            .intial_sponsor_club_contribution,
          extraDescriptions: JSON.stringify(newProject.extra_descriptions),
          itemizedBudget: JSON.stringify(
            (newProject as IDsgProject).itemized_budget
          ),
          fileUploads: JSON.stringify(newProject.file_uploads),
        });
        if (createdProject.projectId) {
          try {
            await ProjectCodeGenerator.setProjectCode(
              "dsgInitial",
              createdProject.projectNumber
            );
          } catch (error) {
            return response.json(new CustomReponse(error));
          }
        }
        return response.json(createdProject.projectId);
      } catch (error) {
        const errorParsed = handleDatabaseError(error) as unknown as dbError;
        return response.json(new CustomReponse(errorParsed.message, errorParsed.stack , errorParsed.code));
      }
    }

    if (newProject.grant_type === "District Matching Project") {
      try {
        const projectNumber: number = await ProjectCodeGenerator.getProjectCode(
          "dmInitial"
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
          imageLink: JSON.stringify(newProject.image_link),
          totalPledges: newProject.total_pledges,
          projectNumber: projectNumber,
          projectCode: "DM-" + projectNumber.toString(),
          coOperatingOrganisationContribution: (newProject as IDmProject)
            .co_operating_organisation_contribution,
          districtMatchingGrantRequest: (newProject as IDmProject)
            .district_matching_grant_request,
          intialSponsorClubContribution: (newProject as IDmProject)
            .intial_sponsor_club_contribution,
          extraDescriptions: JSON.stringify(newProject.extra_descriptions),
          itemizedBudget: JSON.stringify(
            (newProject as IDmProject).itemized_budget
          ),
          fileUploads: JSON.stringify(newProject.file_uploads),
          hostclubInformation: JSON.stringify(
            (newProject as IDmProject).hostclub_information
          ),
        });
        if (createdProject.projectId) {
          try {
            await ProjectCodeGenerator.setProjectCode(
              "dmInitial",
              createdProject.projectNumber
            );
          } catch (error) {
            const errorParsed = handleDatabaseError(error) as unknown as dbError;
            return response.json(new CustomReponse(errorParsed.message, errorParsed.stack , errorParsed.code));
          }
        }
        return response.json(createdProject.projectId);
      } catch (error) {
        const errorParsed = handleDatabaseError(error) as unknown as dbError;
        return response.json(new CustomReponse(errorParsed.message, errorParsed.stack , errorParsed.code));
      }
    }
  }

  /**
   * @param  {} {params
   * @param  {HttpContextContract} response}
   */
  public async show({ params, response }: HttpContextContract) {
    const projectById: Projects = await Projects.findOrFail(params.id);
    projectById.pledgesAssociated = await this.pledgesAsscoiated(
      projectById.projectId
    );
    projectById.projectDetails = await this.getProjectDetails(
      projectById.projectId
    );
    return response.json(projectById);
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
    const conditional: number | string = request.input("conditional");
    const value: number | string | boolean = request.input("value");
    const currentPage: number = request.input("current_page");
    const limit: number = request.input("limit");
    const adminTable: boolean = request.input("project_admin_table");

    if (adminTable) {
      const projectsWhereUserAdmin = await Database.from("project_roles")
        .where({ user_id: value })
        .orderBy("project_id", "desc")
        .paginate(currentPage, limit);
      const relatedProjectsWhereUserAdmin = [] as unknown[];
      for await (const projects of projectsWhereUserAdmin as Array<{
        project_id: number;
      }>) {
        relatedProjectsWhereUserAdmin.push(
          await Projects.findOrFail(projects.project_id)
        );
      }
      let data = {
        data: relatedProjectsWhereUserAdmin,
        meta: {
          total: projectsWhereUserAdmin.total,
          current_page: projectsWhereUserAdmin.currentPage,
          per_page: projectsWhereUserAdmin.perPage,
          last_page: projectsWhereUserAdmin.lastPage,
          first_page: projectsWhereUserAdmin.firstPage,
        },
      };
      return response.json(data);
    }

    const projects: Projects[] = await Projects.query()
      .select()
      .where({ [conditional]: value })
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

    const convertedStartDate = DateTime.fromFormat(
      oldProjectImformation.start_date,
      "yyyy-MM-dd"
    );
    const convertedCompletionDate = DateTime.fromFormat(
      oldProjectImformation.completion_date,
      "yyyy-MM-dd"
    );
    oldProjectImformation.project_name = oldProjectImformation.project_name.trim();
    let nonPledgeFullyFunded =
      parseFloat(oldProjectImformation.anticipated_funding.toString()) ===
      parseFloat(oldProjectImformation.funding_goal.toString())
        ? true
        : false;
    if (oldProjectImformation.grant_type === "Club Project") {
      try {
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
            region: oldProjectImformation.region,
            rotaryYear: oldProjectImformation.rotary_year,
            country: oldProjectImformation.country,
            projectStatus: nonPledgeFullyFunded
              ? ProjectStatus.FULLYFUNDED
              : oldProjectImformation.project_status,
            imageLink: JSON.stringify(oldProjectImformation.image_link),
            totalPledges: oldProjectImformation.total_pledges,
            extraDescriptions: JSON.stringify(
              oldProjectImformation.extra_descriptions
            ),
            fileUploads: JSON.stringify(oldProjectImformation.file_uploads),
          })
          .save();
        return response.json(await this.addComputed(updatedProject));
      } catch (error) {
        const errorParsed = handleDatabaseError(error) as unknown as dbError;
        return response.json(new CustomReponse(errorParsed.message, errorParsed.stack , errorParsed.code));      }
    }

    if (oldProjectImformation.grant_type === "District Simplified Project") {
      try {
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
            region: oldProjectImformation.region,
            rotaryYear: oldProjectImformation.rotary_year,

            country: oldProjectImformation.country,

            projectStatus: nonPledgeFullyFunded
              ? ProjectStatus.FULLYFUNDED
              : oldProjectImformation.project_status,
            imageLink: JSON.stringify(oldProjectImformation.image_link),
            totalPledges: oldProjectImformation.total_pledges,

            coOperatingOrganisationContribution: (
              oldProjectImformation as IDsgProject
            ).co_operating_organisation_contribution,
            districtSimplifiedGrantRequest: (
              oldProjectImformation as IDsgProject
            ).district_simplified_grant_request,
            intialSponsorClubContribution: (
              oldProjectImformation as IDsgProject
            ).intial_sponsor_club_contribution,
            extraDescriptions: JSON.stringify(
              oldProjectImformation.extra_descriptions
            ),
            itemizedBudget: JSON.stringify(
              (oldProjectImformation as IDsgProject).itemized_budget
            ),
            fileUploads: JSON.stringify(
              (oldProjectImformation as IDsgProject).file_uploads
            ),
          })
          .save();
        return response.json(await this.addComputed(updatedProject));
      } catch (error) {
        const errorParsed = handleDatabaseError(error) as unknown as dbError;
        return response.json(new CustomReponse(errorParsed.message, errorParsed.stack , errorParsed.code));
      }
    }

    if ((oldProjectImformation.grant_type = "District Matching Project")) {
      try {
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
            region: oldProjectImformation.region,
            rotaryYear: oldProjectImformation.rotary_year,

            country: oldProjectImformation.country,

            projectStatus: nonPledgeFullyFunded
              ? ProjectStatus.FULLYFUNDED
              : oldProjectImformation.project_status,
            imageLink: JSON.stringify(oldProjectImformation.image_link),
            totalPledges: oldProjectImformation.total_pledges,

            coOperatingOrganisationContribution: (
              oldProjectImformation as IDmProject
            ).co_operating_organisation_contribution,
            districtSimplifiedGrantRequest: (
              oldProjectImformation as IDmProject
            ).district_simplified_grant_request,
            intialSponsorClubContribution: (oldProjectImformation as IDmProject)
              .intial_sponsor_club_contribution,
            extraDescriptions: JSON.stringify(
              (oldProjectImformation as IDmProject).extra_descriptions
            ),
            itemizedBudget: JSON.stringify(
              (oldProjectImformation as IDmProject).itemized_budget
            ),
            fileUploads: JSON.stringify(oldProjectImformation.file_uploads),
            hostclubInformation: JSON.stringify(
              (oldProjectImformation as IDmProject).hostclub_information
            ),
          })
          .save();
        return response.json(await this.addComputed(updatedProject));
      } catch (error) {
        const errorParsed = handleDatabaseError(error) as unknown as dbError;
        return response.json(new CustomReponse(errorParsed.message, errorParsed.stack , errorParsed.code));
      }
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

  /**
   * @desc Add admin users to a project by project id and user id
   * @param  {} {request
   * @param  {HttpContextContract} response}
   * @returns Promise
   */
  public async addUsersToProject({
    request,
    response,
  }: HttpContextContract): Promise<void> {
    try {
      const userId: number = request.input("user_id");
      const projectId: number = request.input("project_id");
      const projectToBeUpdated: Projects = await Projects.findOrFail(projectId);
      await projectToBeUpdated.related("projectRole").attach([userId]);
      return response.json(true);
    } catch (error) {
      return response.json(false);
    }
  }
}

