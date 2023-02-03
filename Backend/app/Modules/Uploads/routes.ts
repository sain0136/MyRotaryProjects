import Route from '@ioc:Adonis/Core/Route'


Route.post("/fileuploadtest/", "UploadsController.testUpload");
Route.post("/fileupload/", "UploadsController.handleFileUpload");
