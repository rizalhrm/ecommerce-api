'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddressSchema extends Schema {
  up () {
    this.create('addresses', (table) => {
      table.increments();
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users");
      table.string("label");
      table.string("name");
      table.string("phone");
      table.integer("province");
      table.integer("district");
      table.integer("sub_district");
      table.string("postal_code");
      table.text("full_address");
      table.timestamps();
    })
  }

  down () {
    this.drop('addresses')
  }
}

module.exports = AddressSchema
