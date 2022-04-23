import { Knex } from "knex";


exports.up = async (knex: Knex) => {
    return knex.schema.createTableIfNotExists(
        "parkinglot",
        (table) => {
            table.string("slot_id").primary()
            table.enum("size", ["small", "medium", "large"])
            table.string("car_id").nullable()
            table.integer("position").notNullable()
        }
    )
}


exports.down = async (knex: Knex) => {
    return knex.schema.dropTable("parkinglot");
  };
