import { Knex } from "knex";


exports.up = async (knex: Knex) => {
    return knex.schema.createTableIfNotExists(
        "car",
        (table) => {
            table.string("plate_id").primary()
            table.enum("size", ["small", "medium", "large"])
        }
    )
}


exports.down = async (knex: Knex) => {
    return knex.schema.dropTable("car");
  };
