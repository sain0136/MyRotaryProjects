import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Database from "@ioc:Adonis/Lucid/Database";
import Pledges from "../../Models/Pledges";
import Projects from "../../Models/Projects";
import { Pledge } from "Contracts/util/sharedUtility/interfaces/ProjectsInterface";
import { ProjectStatus } from "Contracts/util/sharedUtility/interfaces/SharedInterface";

export default class PledgesController {
  /**
   * @param  {} {request
   * @param  {HttpContextContract} response}
   * @returns Promise
   */
  public async showOneProjectWithPledgesPaginated({
    request,
    response,
  }: HttpContextContract): Promise<void> {
    const projectId: number = request.input("project_id");
    const project: Projects = await Projects.findOrFail(projectId);
    const currentPage: number = request.input("current_page");
    const limit: number = request.input("limit");
    const pledges = await Database.query()
      .from("pledges")
      .select("*")
      .where({ project_id: project.projectId })
      .paginate(currentPage, limit);
    let allPledges = await this.normalizePledgesAmount(project, false, pledges);
    project.pledgesAssociated = allPledges;
    return response.json(project);
  }

  public async pledgeStore({ request, response }: HttpContextContract) {
    const pledge = request.input("pledge");
    let pledgeHelper: Pledge = pledge;
    const project: Projects = await Projects.findOrFail(pledge.project_id);
    await Pledges.create({
      pledgeAmount: pledge.pledge_amount,
      firstname: pledge.firstname,
      lastname: pledge.lastname,
      email: pledge.email,
      phone: pledge.phone,
      districtNumber: pledge.district_number ? pledge.district_number : null,
      clubName: pledge.club_name ? pledge.club_name : null,
      projectId: pledge.project_id,
      userId: pledge.user_id,
    });
    let changeStatus: Boolean = false;
    if (
      (parseFloat(project.anticipatedFunding.toString())+ parseFloat(pledge.pledge_amount) ) ===
        parseFloat(project.fundingGoal.toString()) &&
      project.projectStatus === ProjectStatus.LOOKINGFORFUNDING
    ) {
      changeStatus = true;
    }

    await project
      .merge({
        anticipatedFunding:
          parseFloat(project.anticipatedFunding.toString()) +
          pledgeHelper.pledge_amount,
        totalPledges:
          parseFloat(project.totalPledges.toString()) +
          pledgeHelper.pledge_amount,
        projectStatus: changeStatus
          ? ProjectStatus.FULLYFUNDED
          : ProjectStatus.LOOKINGFORFUNDING,
      })
      .save();
    let allPledges = await this.normalizePledgesAmount(project, true);
    project.pledgesAssociated = allPledges;
    return response.json(project);
  }

  public async showAllPledgesByUser({
    request,
    response,
  }: HttpContextContract) {
    const userId: number = request.input("user_id");
    const pledges = await Database.query()
      .from("pledges")
      .where({ user_id: userId });
    this.normalizePledgesAmount(null, false, pledges);
    return response.json(pledges);
  }

  public async deletePledge({
    request,
    response,
  }: HttpContextContract): Promise<void> {
    const pledgeId: number = request.input("pledge_id");
    const pledge: Pledges = await Pledges.findOrFail(pledgeId);
    const project: Projects = await Projects.findOrFail(pledge.projectId);
    if (project.projectStatus === ProjectStatus.LOOKINGFORFUNDING) {
      await project
        .merge({
          anticipatedFunding:
            parseFloat(project.anticipatedFunding.toString()) -
            pledge.pledgeAmount,
          totalPledges:
            parseFloat(project.totalPledges.toString()) - pledge.pledgeAmount,
        })
        .save();
      await pledge.delete();
      return response.json(true);
    }
    return response.json(false);
  }

  private async normalizePledgesAmount(
    project: Projects | null,
    nonPaginated: boolean,
    allPledgesParam?: any
  ) {
    let allPledges = nonPaginated ? null : allPledgesParam;
    if (nonPaginated && project) {
      allPledges = await Database.query()
        .from("pledges")
        .select("*")
        .where({ project_id: project.projectId });
    }
    allPledges.forEach((val: Pledge) => {
      val.pledge_amount = parseFloat(val.pledge_amount.toString());
    });
    return allPledges;
  }
}
