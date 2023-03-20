import { DateTime } from "luxon";
import {
  BaseModel,
  HasMany,
  ManyToMany,
  column,
  computed,
  hasMany,
  manyToMany,
} from "@ioc:Adonis/Lucid/Orm";
import { NonPlurizeNamingStrategy } from "Contracts/NonPlurizeNamingStrategy";
import Pledge from "./Pledges";
import Pledges from "./Pledges";
import { ProjectDetails } from "Contracts/util/sharedUtility/interfaces/ProjectsInterface";
import Users from "./Users";

export default class Projects extends BaseModel {
  public static namingStrategy = new NonPlurizeNamingStrategy();

  @computed()
  public pledgesAssociated: Array<Pledge> | [];

  @computed()
  public projectDetails: ProjectDetails | {};

  @column({ isPrimary: true })
  public projectId: number;

  @column()
  public projectName: string;

  @column()
  public grantType: string;

  @column()
  public projectStatus: string;

  @column()
  public projectNumber: number;

  @column()
  public projectCode: string;

  @column()
  public projectDescription: string;

  @column()
  public country: string;

  @column()
  public region: String;

  @column.date()
  public startDate: DateTime;

  @column.date()
  public completionDate: DateTime;

  @column(/* {
    serialize: (value: string | null) => {
          if (typeof value === 'object') {
        if (Object.keys(value as unknown as object).length <= 0) {
                  return JSON.parse("{}");
        }
      }else return JSON.parse(value)
    },
  } */)
  public areaFocus: string;

  @column({
    serialize: (value) => {
      if (value) {
        return parseFloat(value);
      }
    },
  })
  public fundingGoal: number;

  @column({
    serialize: (value) => {
      if (value) {
        return parseFloat(value);
      }
    },
  })
  public anticipatedFunding: number;

  @column({
    serialize: (value) => {
      if (value) {
        return parseFloat(value);
      }
    },
  })
  public intialSponsorClubContribution: number;

  @column({
    serialize: (value) => {
      if (value) {
        return parseFloat(value);
      }
    },
  })
  public coOperatingOrganisationContribution: number;

  @column({
    serialize: (value) => {
      if (value) {
        return parseFloat(value);
      }
    },
  })
  public districtSimplifiedGrantRequest: number;

  @column({
    serialize: (value) => {
      if (value) {
        return parseFloat(value);
      }
    },
  })
  public districtMatchingGrantRequest: number;

  @column({
    serialize: (value) => {
      if (value) {
        return parseFloat(value);
      }
    },
  })
  public totalPledges: number;

  @column()
  public currency: string;

  @column({
    serialize: (value: string | null) => {
      if (value) {
        let parse =
          typeof value === "object" &&
          Object.keys(value as unknown as object).length < 1
            ? "{}"
            : JSON.stringify(value);
        return JSON.parse(parse);
      }
    },
  })
  public extraDescriptions: string;

  @column({
    serialize: (value: string | null) => {
      if (value) {
        let parse =
          typeof value === "object" &&
          Object.keys(value as unknown as object).length < 1
            ? "[]"
            : JSON.stringify(value);
        return JSON.parse(parse);
      }
    },
  })
  public itemizedBudget: string;

  @column({
    serialize: (value: string | null) => {
      if (value) {
        let parse =
          typeof value === "object" &&
          Object.keys(value as unknown as object).length < 1
            ? "{}"
            : JSON.stringify(value);
        return JSON.parse(parse);
      }
    },
  })
  public hostclubInformation: string;

  @column({
    serialize: (value: string | null) => {
      if (value) {
        let parse =
          typeof value === "object" &&
          Object.keys(value as unknown as object).length < 1
            ? "{}"
            : JSON.stringify(value);
        return JSON.parse(parse);
      }
    },
  })
  public fileUploads: string;

  @column()
  public rotaryYear: string;

  @column({
    serialize: (value: string | null) => {
      if (value) {
        return JSON.parse(value);
      }
    },
  })
  public imageLink: string;

  @column()
  public createdBy: number;

  @column()
  public clubId: number;

  @column()
  public districtId: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @hasMany(() => Pledges, { foreignKey: "projectId" })
  public pledges: HasMany<typeof Pledges>;

  @manyToMany(() => Users, {
    pivotTable: "project_roles",
    localKey: "projectId",
    relatedKey: "userId",
    pivotRelatedForeignKey: "user_id",
    pivotForeignKey: "project_id",
    pivotTimestamps: true,
  })
  public projectRole: ManyToMany<typeof Users>;
}
