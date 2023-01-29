import { DateTime } from "luxon";
import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class Assset extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public dmInitial: number;

  @column()
  public dsgIntial: number;

  @column()
  public clubIntial: number;

  @column()
  public globalIntial: number;

  @column()
  public assets: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
