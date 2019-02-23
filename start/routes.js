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
  return { greeting: 'Welcome Friends' }
})

Route.group(() => {
  Route.get('products', 'ProductController.index')
  Route.get('product/:id', 'ProductController.show');
  Route.post('products', 'ProductController.store');
  Route.put('products/:id', 'ProductController.update');
  Route.delete('product/:id', 'ProductController.delete');

  Route.get('orders', 'OrderController.index')
  Route.get('order/:id', 'OrderController.show');
  Route.post('order', 'OrderController.store');
  Route.patch('order/:id', 'OrderController.update');
  Route.delete('order/:id', 'OrderController.delete');
  Route.get('orders/destroy', 'OrderController.destroy');

  Route.get('banks', 'BankController.index')
  Route.post('bank', 'BankController.store');
  Route.get('bank/:id', 'BankController.show');

  Route.get('couriers', 'CourierController.index')

  Route.post("auth/register", "AuthController.register");
  Route.post("auth/login", "AuthController.login");
  Route.post("auth/logout", "AuthController.logout").middleware("auth");
  Route.post("auth/profile", "AuthController.profile").middleware("auth");
  Route.post("auth/refresh_token", "AuthController.refreshToken");

  Route.get('user/:id', 'ProfileController.getUser').middleware("auth");
}).prefix('api/v1')


//Route.group(('products')=> {
  //   Route.get('ProductController.index');
  //   Route.post('ProductController.store');
  //   Route.put('/:id', 'ProductController.update');
  // }).prefix('api/v1') 