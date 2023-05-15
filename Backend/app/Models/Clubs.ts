import { DateTime } from "luxon";
import {
  BaseModel,
  BelongsTo,
  HasMany,
  ManyToMany,
  belongsTo,
  column,
  hasMany,
  manyToMany,
} from "@ioc:Adonis/Lucid/Orm";
import { NonPlurizeNamingStrategy } from "Contracts/NonPlurizeNamingStrategy";
import User from "./Users";
import District from "./Districts";

export default class Clubs extends BaseModel {
  public static namingStrategy = new NonPlurizeNamingStrategy();

  @column({ isPrimary: true })
  public clubId: number;

  @column()
  public clubName: string;

  @column()
  public clubAddress: string;

  @column()
  public clubCity: string;

  @column()
  public clubPostal: string;

  @column()
  public clubProvince: string;

  @column()
  public clubCountry: string;

  @column()
  public clubEmail?: string;

  @column()
  public clubDescription?: string;

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
  public settings: string;

  @column()
  public siteUrl?: string;

  @column()
  public districtId: number;

  @hasMany(() => User, { foreignKey: "clubId" })
  public users: HasMany<typeof User>;

  @manyToMany(() => User, {
    pivotTable: "club_role",
    pivotColumns: ["club_role", "role_id"],
    localKey: "clubId",
    relatedKey: "userId",
    pivotForeignKey: "club_id",
    pivotRelatedForeignKey: "user_id",
    pivotTimestamps: true,
  })
  public clubRole: ManyToMany<typeof User>;

  @belongsTo(() => District, {
    localKey: "districtId",
  })
  public district: BelongsTo<typeof District>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
