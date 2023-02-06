import { DateTime } from "luxon";
import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";
import { NonPlurizeNamingStrategy } from "Contracts/NonPlurizeNamingStrategy";

export default class Pledges extends BaseModel {
  public static namingStrategy = new NonPlurizeNamingStrategy();

  @column({ isPrimary: true })
  public pledgeId: number;

  @column({
    serialize: (value) => {
      if (value) {
        return parseFloat(value);
      }
    },
  })
  public pledgeAmount: number;

  @column()
  public firstname: string;

  @column()
  public lastname: string;

  @column()
  public phone: string;

  @column()
  public email: string;

  @column()
  public clubName: string;

  @column()
  public districtNumber: string;

  
  @column()
  public projectId: number;

  @column()
  public userId: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
