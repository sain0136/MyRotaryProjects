import {
  ClubProjectExtraDescriptions,
  IClubProject,
} from "Contracts/Shared/SharedInterfaces/ProjectsInterface";
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
