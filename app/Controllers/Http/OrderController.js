'use strict'

const Order = use('App/Models/Order');

class OrderController {

    async index ({ response }) {
        try {
            let orders = await Order.query().with('product').fetch();
            return response.json(orders)
        } catch (err) {
            return {
                status: "Something went wrong",
                message: err.message
            }
        }
    }

    async store ({request, response}) {
        try {
            const orderData = request.only(['product_id', 'qty', 'price'])
            const order = await Order.create(orderData)

            return response.status(201).json(order)
        } catch (err) {
            return {
                status: "Failed...",
                message: err.message
            }
        }
    }

    async show ({params, response}) {
        try {
            const order = await Order.find(params.id)
            return response.json(order)
        } catch (err) {
            return {
                status: "Something went wrong",
                message: err.message
            }
        }   
    }

    async update ({params, request, response}) {
        try {
            const orderData = request.only(['product_id', 'qty', 'price'])
            const order = await Order.find(params.id)
            if (!order) {
                return response.status(404).json({data: 'Resource not found'})
            }

            order.product_id = orderData.product_id
            order.qty = orderData.qty
            order.price = orderData.price

            await order.save()
            return response.status(200).json(order)
        } catch (err) {
            return {
                status: "Failed...",
                message: err.message
            }
        }
    }
    
    async delete ({params, response}) {

        try {
            const order = await Order.find(params.id)
            await order.delete()
            return response.status(200).json({message: "Successfully deleted the product"})
        } catch (err) {
            return {
                status: "Failed...",
                message: err.message
            }
        }
    }

    async destroy ({response}) {
        try {
            await Order.truncate()
            return response.status(200).json({message: "Successfully destroyed the orders"})
        } catch (error) {
            return {
                status: "Failed...",
                message: err.message
            }
        }
        
    }
    
}

module.exports = OrderController
