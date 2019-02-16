'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CourierSchema extends Schema {
  up () {
    this.create('couriers', (table) => {
      table.increments()
      table.string('name', 30).notNullable()
      table.double('price')
      table.timestamps()
    })
  }

  down () {
    this.drop('couriers')
  }
}

module.exports = CourierSchema
