import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Database from "@ioc:Adonis/Lucid/Database";
import Projects from "App/Models/Projects";
import { ProjectStatus } from "Contracts/BackendInterfaces/Utility";

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
      .from("pledge")
      .select("*")
      .where({ project_id: project.projectId })
      .paginate(currentPage, limit);
    project.pledgesAssociated = pledges;
    return response.json(project);
  }
  /**
   * @param  {} {request
   * @param  {HttpContextContract} response}
   * @returns Promise
   */
  public async storePledge({
    request,
    response,
  }: HttpContextContract): Promise<void> {
    const pledge = request.input("pledge");
    const project: Projects = await Projects.findOrFail(pledge.project_id);
    const newPledgeTotal = (project.totalPledges += pledge.pledge_amount);

    await Database.table("pledges").insert({
      pledge_amount: pledge.pledge_amount,
      firstname: pledge.firstname,
      lastname: pledge.lastname,
      email: pledge.email,
      phone: pledge.phone,
      district_number: pledge.district_number ? pledge.district_number : null,
      club_name: pledge.club_name ? pledge.club_name : null,
      projectId: pledge.project_id,
      userId: pledge.user_id,
    });
    if (
      project.anticipatedFunding === project.fundingGoal &&
      project.projectStatus === ProjectStatus.LOOKINGFORFUNDING
    ) {
      await project
        .merge({
          totalPledges: newPledgeTotal,
          projectStatus: ProjectStatus.FULLYFUNDED,
        })
        .save();
    
    }
    return response.json(project);
  }
}
