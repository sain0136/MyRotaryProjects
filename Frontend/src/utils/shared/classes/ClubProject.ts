

import type { IClubProject, ClubProjectExtraDescriptions } from "@/utils/shared/interfaces/ProjectsInterface";
import GenericProject from "@/utils/shared/classes/GenericProject";

export default class ClubProject
  extends GenericProject
  implements IClubProject
{
  extra_descriptions: ClubProjectExtraDescriptions = { extra: "" };

  constructor() {
    super();
  }
}
