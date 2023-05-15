import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'clubs'

  public async up () {
    this.schema.alterTable(this.tableName , (table) => {
      table.jsonb('settings').nullable
    });
  }
  
  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('settings') // drop jsonB column
    })
  }
}
