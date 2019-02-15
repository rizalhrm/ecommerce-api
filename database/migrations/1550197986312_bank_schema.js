'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BankSchema extends Schema {
  up () {
    this.create('banks', (table) => {
      table.increments()
      table.string('name', 10).notNullable()
      table.string('title', 100).notNullable()
      table.integer('code')
      table.string('rekening', 20)
      table.text('image')
      table.timestamps()
    })
  }

  down () {
    this.drop('banks')
  }
}

module.exports = BankSchema
