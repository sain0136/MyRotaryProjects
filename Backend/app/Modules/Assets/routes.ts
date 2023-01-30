import Route from '@ioc:Adonis/Core/Route'
Route.resource('/assets/', 'AssetsController')
Route.post('/assets/verify', 'AssetsController.imageVerification')
Route.post('/assets/addImage', 'AssetsController.addImage')
Route.post('/assets/deleteImage', 'AssetsController.deleteImage')
