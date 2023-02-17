import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "club_role";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("role_id").primary().unsigned();
      table.string("club_role", 40).notNullable();
      table
        .integer("user_id", 50)
        .unsigned()
        .references("user_id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .integer("club_id", 50)
        .unsigned()
        .references("club_id")
        .inTable("clubs")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.timestamp("created_at");
      table.timestamp("updated_at");
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
