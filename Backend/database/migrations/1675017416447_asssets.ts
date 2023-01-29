import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "assets";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.integer("dm_initial").nullable();
      table.integer("dsg_intial").nullable();
      table.integer("club_intial").nullable();
      table.integer("global_intial").nullable();
      table.jsonb("assets").nullable();
      table.timestamp("created_at");
      table.timestamp("updated_at");
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
