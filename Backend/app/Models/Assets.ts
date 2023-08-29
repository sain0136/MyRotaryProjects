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
  public dsgInitial?: number;

  @column()
  public clubInitial?: number;

  @column()
  public globalInitial?: number;

  @column({
    serialize: (value: string | null) => {
      if (value) {
        let parse =
          typeof value === "object" &&
          Object.keys(value as unknown as object).length < 1
            ? "{}"
            : JSON.parse(value);
        return parse;
      }
    },
  })
  public assets?: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
