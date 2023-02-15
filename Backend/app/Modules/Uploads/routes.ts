import Route from '@ioc:Adonis/Core/Route'


Route.post("/fileuploadtest/", "UploadsController.testUpload");
Route.post("/fileupload/", "UploadsController.handleFileUpload");
Route.post("/fileupload/delete/", "UploadsController.deleteUpload");
Route.post("/fileupload/delete/district", "UploadsController.deleteUploadDistrictReport");
