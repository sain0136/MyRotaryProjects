import Route from '@ioc:Adonis/Core/Route'

Route.resource('/user/', 'UsersController')

Route.post('user/json/', 'UsersController.jsonGetById')
Route.post('user/verify/', 'UsersController.passwordVerfication')
Route.post('user/validateEmail/', 'UsersController.emailValidation')
