'use strict'

const Product = use('App/Models/Product')

class ProductController {

    async index ({response}) {
        let products = await Product.all()
        return response.json(products)
    }

    async store ({request, response}) {
        const productData = request.only(['name', 'price', 'image', 'description', 'rating'])
        const product =  new Product()
        product.name = productData.name
        product.price = productData.price
        product.image = productData.image
        product.description = productData.description
        product.rating = productData.rating

        await product.save()
        return response.status(201).json(product)
    }

    async show ({params, response}) {
        const product = await Product.find(params.id)
        return response.json(product)
    }

    async update ({params, request, response}) {
        const productData = request.only(['name', 'price', 'image', 'description', 'rating'])
        const product = await Product.find(params.id)

        if (!product) {
            return response.status(404).json({data: 'Resource not found'})
        }

        product.name = productData.name
        product.price = productData.price
        product.image = productData.image
        product.description = productData.description
        product.rating = productData.rating

        await product.save()
        return response.status(200).json(product)
    }
}

module.exports = ProductController
