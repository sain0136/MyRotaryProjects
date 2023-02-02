import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "pledges";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("pledge_id").primary().unsigned();
      table.decimal("pledge_amount", 15, 2).notNullable();
      table.string("firstname", 50).nullable();
      table.string("lastname", 50).nullable();
      table.string("phone", 180).nullable();
      table.string("email", 254).nullable();
      table.string("club_name", 50).nullable();
      table.string("district_number", 50).nullable();
      table
        .integer("project_id", 50)
        .nullable()
        .unsigned()
        .references("project_id")
        .inTable("projects")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .integer("user_id", 50)
        .notNullable()
        .unsigned()
        .references("user_id")
        .inTable("users");
      table.timestamp("created_at");
      table.timestamp("updated_at");
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
