import type {
  ClubProjectExtraDescriptions,
  IClubProject,
} from "../interfaces/ProjectsInterface";
import GenericProject from "./GenericProject";

export default class ClubProject
  extends GenericProject
  implements IClubProject
{
  extra_descriptions: ClubProjectExtraDescriptions = { extra: "" };

  constructor() {
    super();
  }
}
