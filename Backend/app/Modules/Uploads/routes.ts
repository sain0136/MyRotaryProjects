import Route from '@ioc:Adonis/Core/Route'


Route.post("/fileupload/", "UploadsController.testS3Upload");
