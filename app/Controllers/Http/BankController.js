'use strict'

const Bank = use('App/Models/Bank');

class BankController {

    async index ({response}) {
        try {
            let banks = await Bank.all()
            return response.json(banks)
        } catch (err) {
            return {
                status: "Something went wrong",
                message: err.message
            }
        }
    }

    async store ({request, response}) {
        try {
            const bankData = request.only(['name', 'title', 'code', 'rekening', 'image'])
            const bank = await Bank.create(bankData)

            return response.status(201).json(bank)
        } catch (err) {
            return {
                status: "Failed...",
                message: err.message
            }
        }
    }

    async show ({params, response}) {
        try {
            const bank = await Bank.find(params.id)
            return response.json(bank)
        } catch (err) {
            return {
                status: "Something went wrong",
                message: err.message
            }
        }
    }
}

module.exports = BankController