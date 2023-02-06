import Route from '@ioc:Adonis/Core/Route'

Route.resource('/pledge/', 'PledgesController')

// Route.post('/pledge/user/', 'PledgesController.showPledgesByProjectIdByUserId')

 Route.post('/pledge/project/', 'PledgesController.showOneProjectWithPledgesPaginated')

 Route.post('/pledge/userPledges/', 'PledgesController.showAllPledgesByUser')

 Route.post('/pledge/delete/', 'PledgesController.deletePledge')


Route.post('/pledge/create', 'PledgesController.pledgeStore')

