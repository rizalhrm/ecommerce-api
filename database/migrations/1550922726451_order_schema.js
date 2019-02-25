'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrderSchema extends Schema {
  up () {
    this.create('orders', (table) => {
      table.increments()
      table.integer('product_id')
      .unsigned()
      .references('id')
      .inTable('products')
      .onUpdate('NO ACTION')
      .onDelete('SET NULL');
      table.integer('qty');
      table.double('price');
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users");
      table.timestamps()
    })
  }

  down () {
    this.drop('orders')
  }
}

module.exports = OrderSchema
