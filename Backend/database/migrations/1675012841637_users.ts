import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "users";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("user_id").primary().unsigned();
      table.string("firstname", 50).notNullable();
      table.string("lastname", 50).notNullable();
      table.string("address", 100).nullable();
      table.string("user_city", 50).nullable();
      table.string("user_postal", 32).nullable();
      table.string("user_province", 100).nullable();
      table.string("user_country", 50).nullable();
      table.string("phone", 180).nullable();
      table.string("email", 254).notNullable().unique();
      table.string("password", 255).notNullable();
      table.jsonb("extra_details").nullable();
      table.string("user_type", 8).notNullable();
      table
        .integer("club_id", 50)
        .nullable()
        .unsigned()
        .references("club_id")
        .inTable("clubs")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .integer("district_id", 50)
        .nullable()
        .unsigned()
        .references("district_id")
        .inTable("districts")
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
