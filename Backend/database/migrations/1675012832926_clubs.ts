import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "clubs";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("club_id").primary().unsigned();
      table.string("club_name", 50).notNullable();
      table.string("club_address", 100).notNullable();
      table.string("club_city", 50).notNullable();
      table.string("club_postal", 32).nullable();
      table.string("club_province", 100).nullable();
      table.string("club_country", 50).notNullable();
      table.string("club_email", 254).nullable();
      table.string("club_description", 3000).nullable();
      table.string("site_url", 200).nullable();
      table.jsonb('settings').nullable
      table
        .integer("district_id", 50)
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
