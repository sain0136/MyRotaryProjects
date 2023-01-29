import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "district_roles";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("role_id").primary().unsigned();
      table.string("district_role", 25).notNullable();
      table
        .integer("user_id", 50)
        .unsigned()
        .references("user_id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .integer("district_id", 50)
        .unsigned()
        .references("district_id")
        .inTable("districts")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.timestamps(true, true);

      table.timestamp("created_at");
      table.timestamp("updated_at");
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
