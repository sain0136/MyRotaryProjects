import { LucidModel, SnakeCaseNamingStrategy } from '@ioc:Adonis/Lucid/Orm'
import { string } from '@poppinss/utils/build/helpers'

export class NonPlurizeNamingStrategy extends SnakeCaseNamingStrategy {
  public tableName(model: LucidModel): string {
    return string.snakeCase(model.name)
  }
}
