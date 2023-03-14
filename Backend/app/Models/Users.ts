import { DateTime } from "luxon";
import {
  BaseModel,
  BelongsTo,
  HasMany,
  ManyToMany,
  beforeSave,
  belongsTo,
  column,
  computed,
  hasMany,
  manyToMany,
} from "@ioc:Adonis/Lucid/Orm";
import Hash from "@ioc:Adonis/Core/Hash";
import { NonPlurizeNamingStrategy } from "Contracts/NonPlurizeNamingStrategy";
import Club from "./Clubs";
import District from "./Districts";
import Project from "./Projects";
import Pledge from "./Pledges";
import Projects from "./Projects";

export default class Users extends BaseModel {
  public static namingStrategy = new NonPlurizeNamingStrategy();
  @computed()
  public get fullName() {
    return `${this.firstname} ${this.lastname}`;
  }

  @computed()
  public get role_type() {
    return ""
  }
  // added becasue I didnt write relationship many to many correctly in model
  @computed()
  public role?: string[];

  @column({ isPrimary: true })
  public userId: number;

  @column()
  public firstname: string;

  @column()
  public lastname: string;

  @column()
  public address?: string;

  @column()
  public userCity?: string;

  @column()
  public userPostal?: string;

  @column()
  public userProvince?: string;

  @column()
  public userCountry?: string;

  @column()
  public phone?: string;

  @column()
  public email: string;

  @column()
  public password: string;

  @beforeSave()
  public static async hashPassword(user: Users) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password);
    }
  }

  @column()
  public extraDetails: string;

  @column()
  public userType: string;

  @column()
  public clubId?: number;

  @column()
  public districtId?: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @belongsTo(() => District, {
    localKey: "districtId",
  })
  public districts: BelongsTo<typeof District>;

  @belongsTo(() => Club, {
    localKey: "clubId",
  })
  public clubs: BelongsTo<typeof Club>;

  @hasMany(() => Project)
  public projects: HasMany<typeof Project>;

  @hasMany(() => Pledge)
  public pledges: HasMany<typeof Pledge>;

  @manyToMany(() => Club, {
    pivotTable: "club_role",
    pivotColumns: ["club_role", "role_id"],
    localKey: "userId",
    relatedKey: "clubId",
    pivotForeignKey: "user_id",
    pivotRelatedForeignKey: "club_id",
    pivotTimestamps: true,
  })
  public clubRole: ManyToMany<typeof Club>;

  @manyToMany(() => District, {
    pivotTable: "district_role",
    pivotColumns: ["district_role", "role_id"],
    localKey: "userId",
    relatedKey: "districtId",
    pivotForeignKey: "user_id",
    pivotRelatedForeignKey: "district_id",
    pivotTimestamps: true,
  })
  public districtRole: ManyToMany<typeof District>;

  @manyToMany(() => Projects, {
    pivotTable: 'project_roles',
    localKey: 'userId',
    relatedKey: 'projectId',
    pivotRelatedForeignKey: 'project_id',
    pivotForeignKey: 'user_id',
    pivotTimestamps: true,
  })
  public projectRole: ManyToMany<typeof Projects>
}
