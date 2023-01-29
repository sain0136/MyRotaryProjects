import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "districts";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("district_id").primary().unsigned();
      table.string("district_number", 10).unique().notNullable();
      table.string("district_name", 50).unique().notNullable();
      table.string("district_email", 254).nullable().unique();
      table.string("site_url", 200).nullable();
      table.string("district_president", 50).nullable();
      table.string("district_description", 3000).nullable();
      table.string("districtlogo_url", 200).nullable();
      table.jsonb("district_details").nullable();
      table.timestamp("created_at");
      table.timestamp("updated_at");
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
