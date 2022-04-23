import { Knex } from "knex";


exports.up = async (knex: Knex) => {
    return knex.schema.createTableIfNotExists(
        "parkinglog",
        (table) => {
            table.string("id").primary();
            table.string("slot_id").notNullable();
            table.string("car_id").notNullable();
            table.bigInteger("entering_time").notNullable();
            table.bigInteger("leaving_time").nullable();
        }
    );
};

exports.down = async (knex: Knex) => {
    return knex.schema.dropTable("parkinglog");
  };
