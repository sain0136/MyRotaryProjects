import { DateTime } from "luxon";
import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";
import { NonPlurizeNamingStrategy } from "Contracts/NonPlurizeNamingStrategy";

export default class Assets extends BaseModel {
  public static namingStrategy = new NonPlurizeNamingStrategy();

  @column({ isPrimary: true })
  public id: number;

  @column()
  public dmInitial?: number;

  @column()
  public dsgIntial?: number;

  @column()
  public clubIntial?: number;

  @column()
  public globalIntial?: number;

  @column()
  public assets?: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
