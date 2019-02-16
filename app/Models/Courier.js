'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Courier extends Model {
    static get table() {
        return 'couriers'
    }
    static get primaryKey() {
        return 'id'
    }
}

module.exports = Courier
