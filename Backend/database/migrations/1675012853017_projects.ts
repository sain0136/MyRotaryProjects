import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "projects";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("project_id").primary().unsigned();
      table.string("project_name", 50).notNullable().unique();
      table.string("grant_type", 50).notNullable();
      table.string("project_status", 25).notNullable();
      table.integer("project_number", 7).notNullable()
      // the code is the number + the abbrev of the type of project i.e DM-1348420
      table.string("project_code", 12).notNullable().unique();
      table.string("project_description", 3000).nullable();
      table.string("country", 50).notNullable();
      table.string("region", 50).notNullable();
      table.date("start_date").nullable();
      table.date("completion_date").notNullable();
      table.jsonb("area_focus").notNullable();
      table.decimal("funding_goal", 15, 2).notNullable();
      table.decimal("anticipated_funding", 15, 2).nullable();
      table.decimal("intial_sponsor_club_contribution", 15, 2).nullable();
      table.decimal("co_operating_organisation_contribution", 15, 2).nullable();
      table.decimal("district_simplified_grant_request", 15, 2).nullable();
      table.decimal("district_matching_grant_request", 15, 2).nullable();
      table.decimal("total_pledges", 15, 2).nullable();
      table.string("currency", 5).notNullable().defaultTo("USD");
      table.jsonb("extra_descriptions").nullable();
      table.jsonb("itemized_budget").nullable();
      table.jsonb("hostclub_information").nullable();
      table.jsonb("file_uploads").nullable();
      table.string("rotary_year", 10).notNullable();
      table.string("image_link", 3000).nullable();
      table
        .integer("created_by", 50)
        .unsigned()
        .references("user_id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
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
        .notNullable()
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
