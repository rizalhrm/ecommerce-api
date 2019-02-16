'use strict'

const Courier = use('App/Models/Courier');

class CourierController {
    async index ({response}) {
        let couriers = await Courier.all()
        return response.json(couriers)
    }
}

module.exports = CourierController
