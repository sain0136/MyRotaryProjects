import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'project_roles'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('user_id').unsigned().references('users.user_id')
      table.integer('project_id').unsigned().references('projects.project_id')
      table.unique(['project_id', 'user_id'])
      table.timestamp("created_at");
      table.timestamp("updated_at");
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
