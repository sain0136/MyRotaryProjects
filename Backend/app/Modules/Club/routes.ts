import Route from '@ioc:Adonis/Core/Route'

Route.resource('/club/', 'ClubsController')
Route.post('/clubmembersPaginated/', 'ClubsController.getAllClubMembersPaginated')
