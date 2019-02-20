'use strict'

const Product = use('App/Models/Product')
const DataGrid = use('DataGrid')

class ProductController {

    async index () {

        try {
            const products = {
                query () {
                  return Product.query()
                },
            
                // <GET param>:<DB column> for sortable columns
                sortable: {
                  id: 'id',
                  name: 'name',
                  price:  'price',
                  rating: 'rating',
                  created_at: 'created_at'
                },
            
                // global searchable fields
                searchable: ['name', 'description'],
            
                // <GET param>:<DB column> for filterable columns
                filterable: {
                  name: 'name',
                  price:  'price',
                  rating: 'rating'
                }
            
              }

            return DataGrid.paginate(products)
        } catch (err) {
            return {
                status: "Something went wrong",
                message: err.message
            }
        }

    }

    async store ({request, response}) {

        try {
            const productData = request.only(['name', 'price', 'image', 'description', 'rating'])
            const product = await Product.create(productData)

            return response.status(201).json(product)
        } catch (err) {
            return {
                status: "Failed...",
                message: err.message
            }
        }
        
    }

    async show ({params, response}) {
        try {
            const product = await Product.find(params.id)
            return response.json(product)
        } catch (err) {
            return {
                status: "Something went wrong",
                message: err.message
            }
        }
    }

    async update ({params, request, response}) {
        try {
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
        } catch (err) {
            return {
                status: "Failed...",
                message: err.message
            }
        }
    }

    async delete ({params, response}) {

        try {
            const product = await Product.find(params.id)
            await product.delete()
            return response.status(200).json({message: "Successfully deleted the product"})
        } catch (err) {
            return {
                status: "Failed...",
                message: err.message
            }
        }

    }

}

module.exports = ProductController
