'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.group(() => {
  Route.get('products', 'ProductController.index')
  Route.get('product/:id', 'ProductController.show')
  Route.post('products', 'ProductController.store')
  Route.put('products/:id', 'ProductController.update')

  Route.get('orders', 'OrderController.index')
  Route.get('order/:id', 'OrderController.show')
  Route.post('order', 'OrderController.store')
  Route.patch('order/:id', 'OrderController.update')
  Route.delete('order/:id', 'OrderController.delete')
}).prefix('api/v1')
