import { DateTime } from "luxon";
import { BaseModel, HasMany, column, computed, hasMany } from "@ioc:Adonis/Lucid/Orm";
import { NonPlurizeNamingStrategy } from "Contracts/NonPlurizeNamingStrategy";
import Pledge from "./Pledges";
import { ProjectDetails } from "Contracts/Shared/SharedInterfaces/ProjectsInterface";
import Pledges from "./Pledges";

export default class Projects extends BaseModel {
  public static namingStrategy = new NonPlurizeNamingStrategy();

  @computed()
  public pledgesAssociated: Array<Pledge>;

  @computed()
  public projectDetails: ProjectDetails;

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
      if (value) {
        return JSON.parse(value)
      }
    },
  } */)
  public areaFocus: string;

  @column()
  public fundingGoal: number;

  @column()
  public currentFunds: number;

  @column()
  public anticipatedFunding: number;

  @column()
  public intialSponsorClubContribution: number;

  @column()
  public coOperatingOrganisationContribution: number;

  @column()
  public districtSimplifiedGrantRequest: number;

  @column()
  public districtMatchingGrantRequest: number;

  @column()
  public totalPledges: number;

  @column()
  public currency: string;

  @column(/* {
    serialize: (value: string | null) => {
      if (value) {
        return JSON.parse(value);
      }
    },
  } */)
  public extraDescriptions: string;

  @column(/* {
    serialize: (value: string | null) => {
      if (value) {
        return JSON.parse(value);
      }
    },
  } */)
  public itemizedBudget: string;

  @column(/* {
    serialize: (value: string | null) => {
      if (value) {
        return JSON.parse(value);
      }
    },
  } */)
  public hostclubInformation: string;

  @column(/* {
    serialize: (value: string | null) => {
      if (value) {
        return JSON.parse(value);
      }
    },
  } */)
  public fileUploads: string;

  @column()
  public rotaryYear: string;

  @column()
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

  @hasMany(() => Pledges,{ foreignKey: 'projectId',})
  public pledges: HasMany<typeof Pledges>
}
