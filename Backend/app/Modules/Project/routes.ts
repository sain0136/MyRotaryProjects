import Route from '@ioc:Adonis/Core/Route'

Route.resource('/project/', 'ProjectsController')
Route.post('/project/year', 'ProjectsController.getRotaryYears')
Route.post('/project/paginate', 'ProjectsController.projectsPagination')
Route.post('/project/filter', 'ProjectsController.paginationFilter')
Route.post('/project/status', 'ProjectsController.getProjectsByStatus')
Route.post('/project/conditional', 'ProjectsController.getAllProjectsWithCondtional')
Route.post('/project/changeStatus', 'ProjectsController.updateProjectStatus')
Route.post('/project/delete/', 'ProjectsController.destroyProject')
Route.post('/project/updateById', 'ProjectsController.updateById')
Route.post('/project/addProjectUser', 'ProjectsController.addUsersToProject')





// Route.post('/project/addUser/', 'ProjectsController.addUserToProject')
// Route.post('/project/usersProjects/', 'ProjectsController.showAllProjectsByUser')
// Route.post('/project/clubProjects/', 'ProjectsController.showAllProjectsByClub')
// Route.post('/project/districtProjects/', 'ProjectsController.showAllProjectsByDistrict')
// Route.post('/project/projectAdmins/', 'ProjectsController.showAllAdminsForProject')
// Route.post('/project/delete', 'ProjectsController.deleteProjectByProjectId')
// Route.post('/project/showProjectByIdPost', 'ProjectsController.showProjectByIdPost')
// Route.post('/project/updateById', 'ProjectsController.updateById')
// Route.post('/project/imageVerification', 'ProjectsController.imageVerification')
// Route.post('/project/fileVerfication', 'ProjectsController.fileVerfication')
// Route.post('/project/addFile', 'ProjectsController.addFile')
// Route.post('/project/projectStatus', 'ProjectsController.updateProjectStatus')
// Route.post('/project/addReportDocumentOrImage', 'ProjectsController.addReportDocumentOrImage')
// Route.post('/project/deletReportDocumentOrImage', 'ProjectsController.deletReportDocumentOrImage')
// Route.post('/project/deleteFile', 'ProjectsController.deleteFile')
// Route.post('/project/addImage', 'ProjectsController.addImage')
// Route.post('/project/deleteImage', 'ProjectsController.deleteImage')
// Route.post('/project/paginateClubs', 'ProjectsController.paginationIndexByClub')
// Route.post('/project/paginateDistrict', 'ProjectsController.paginationIndexByDistrict')
// Route.post('/project/uploadImagesReport', 'ProjectsController.reportMultiImageUpload')
// Route.post('/project/uploadImagesAdditional', 'ProjectsController.reportMultiFileUpload')
// Route.post(
//   '/project/projectsReportsForApproval',
//   'ProjectsController.showAllProjectsForReportApproval'
// )
