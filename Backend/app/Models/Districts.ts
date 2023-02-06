import  {DateTime} from "luxon";
import {
  BaseModel,
  column,
  HasMany,
  hasMany,
  manyToMany,
  ManyToMany,
} from "@ioc:Adonis/Lucid/Orm";
import { NonPlurizeNamingStrategy } from "Contracts/NonPlurizeNamingStrategy";
import Club from "./Clubs";
import User from "./Users";

export default class Districts extends BaseModel {
  public static namingStrategy = new NonPlurizeNamingStrategy();

  @column({ isPrimary: true })
  public districtId: number;

  @column()
  public districtNumber: string;

  @column()
  public districtName: string;

  @column()
  public districtEmail?: string;

  @column()
  public siteUrl?: string;

  @column()
  public districtPresident?: string;

  @column()
  public districtDescription?: string;

  @column()
  public districtlogoUrl?: string;

  @column()
  public districtDetails: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @hasMany(() => Club, { foreignKey: "districtId" })
  public clubs: HasMany<typeof Club>;

  @hasMany(() => User, { foreignKey: "districtId" })
  public users: HasMany<typeof User>;

  @manyToMany(() => User, {
    pivotTable: "district_role",
    pivotColumns: ["district_role", "role_id"],
    localKey: "districtId",
    relatedKey: "userId",
    pivotForeignKey: "district_id",
    pivotRelatedForeignKey: "user_id",
    pivotTimestamps: true,
  })
  public districtRole: ManyToMany<typeof User>;
}
