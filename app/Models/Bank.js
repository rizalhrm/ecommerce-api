'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Bank extends Model {
    static get table() {
        return 'banks'
    }
    static get primaryKey() {
        return 'id'
    }
}

module.exports = Bank
