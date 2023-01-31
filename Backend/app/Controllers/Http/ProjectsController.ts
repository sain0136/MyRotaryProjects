import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Projects from "App/Models/Projects";

export default class ProjectsController {
  public async index({ response }: HttpContextContract) {
    const allProjects = await Projects.all();
    return response.json(allProjects);
  }
}
