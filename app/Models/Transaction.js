'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Transaction extends Model {
    static get table() {
        return "transactions";
      }
    
      static get primaryKey() {
        return "id";
      }
    
      users() {
        return this.belongsTo("App/Models/User");
      }
}

module.exports = Transaction
