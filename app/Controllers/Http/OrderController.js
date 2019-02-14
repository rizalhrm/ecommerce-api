'use strict'

const Order = use('App/Models/Order');
const Product = use('App/Models/Product');

class OrderController {

    async index ({ response }) {
        let orders = await Order.query().with('product').fetch();
        return response.json(orders)
    }

    async store ({request, response}) {
        const orderData = request.only(['product_id', 'qty', 'price'])
        const order =  new Order()
        order.product_id = orderData.product_id
        order.qty = orderData.qty
        order.price = orderData.price

        await order.save()
        return response.status(201).json(order)
    }

    async show ({params, response}) {
        const order = await Order.find(params.id)
        return response.json(order)
    }

    async update ({params, request, response}) {
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
        }

    async delete ({params, response}) {
        const order = await Order.find(params.id)
        if (!order) {
            return response.status(404).json({data: 'Resource not found'})
        }
        await order.delete()
            return response.status(204).json(null)
        }

    async destroy ({response}) {
        await Order.truncate()
        return response.json(null);
    }
    
}



module.exports = OrderController
