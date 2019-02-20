'use strict'

const Courier = use('App/Models/Courier');

class CourierController {
    async index ({response}) {
        try {
            let couriers = await Courier.all()
            return response.json(couriers)
        } catch (err) {
            return {
                status: "Something went wrong",
                message: err.message
            }
        }
    }
}

module.exports = CourierController
