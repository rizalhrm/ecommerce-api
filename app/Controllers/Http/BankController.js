'use strict'

const Bank = use('App/Models/Bank');

class BankController {

    async index ({response}) {
        let banks = await Bank.all()
        return response.json(banks)
    }

    async store ({request, response}) {
        const bankData = request.only(['name', 'title', 'code', 'rekening', 'image'])
        const bank =  new Bank()
        bank.name = bankData.name
        bank.title = bankData.title
        bank.code = bankData.code
        bank.rekening = bankData.rekening
        bank.image = bankData.image

        await bank.save()
        return response.status(201).json(bank)
    }

    async show ({params, response}) {
        const bank = await Bank.find(params.id)
        return response.json(bank)
    }
}

module.exports = BankController
