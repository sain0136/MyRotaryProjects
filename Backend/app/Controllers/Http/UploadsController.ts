import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Drive from "@ioc:Adonis/Core/Drive";
import Env from "@ioc:Adonis/Core/Env";
import { CustomReponse } from "Contracts/Shared/SharedInterfaces/CustomReponse";
import { MultipartFileContract } from "@ioc:Adonis/Core/BodyParser";
import Projects from "App/Models/Projects";
import { v4 as uuidv4 } from "uuid";
import {
  FileType,
  StorageInformation,
  Uploads,
} from "Contracts/Shared/SharedInterfaces/ProjectsInterface";

export default class UploadsController {
  /**
   * @param  {} {request
   * @param  {HttpContextContract} response}
   */
  public async testUpload({ request, response }: HttpContextContract) {
    const coverImage = request.file("test");
    const cover2 = coverImage;
    const res = {
      s3error: "",
      s3url: "",
      localurl: "",
    };
    try {
      if (coverImage) {
        await coverImage.moveToDisk("./", {}, "spaces");
        let path = coverImage.filePath;
        if (path) {
          res.s3url = path;
        }
      }
    } catch (error) {
      res.s3error = error.message;
      res.s3url = error;
    }
    try {
      if (cover2) {
        await cover2.moveToDisk("./", {}, "local");
        let path = cover2.filePath;
        if (path) {
          path = await Drive.getUrl(path as string);
          path = path.replace(/C:\/Up\//, "");
        }
        res.localurl = Env.get("TEST_UPLOAD_URL") + path;
      }
    } catch (error) {
      res.localurl = error.message;
    }
    return response.json(res);
  }

  /**
   * @desc Handles file upload and validates uploaded files, returns
   *  response with links or error message.
   * @param  {} {request
   * @param  {HttpContextContract} response}
   */
  public async handleFileUpload({ request, response }: HttpContextContract) {
    const uploadsArrayCover = request.files("image_cover", {
      size: "10mb",
      extnames: ["jpg", "png", "gif"],
    });
    const uploadsArrayEvidence = request.files("file_evidence", {
      size: "10mb",
      extnames: ["doc", "docx", "pdf", "xlsx"],
    });
    const uploadsArrayReportFile = request.files("file_report", {
      size: "10mb",
      extnames: ["doc", "docx", "pdf", "xlsx"],
    });
    const uploadsArrayReportImage = request.files("image_report", {
      size: "10mb",
      extnames: ["jpg", "png", "gif"],
    });
    let allFilesArray = [
      ...uploadsArrayCover,
      ...uploadsArrayEvidence,
      ...uploadsArrayReportFile,
      ...uploadsArrayReportImage,
    ];
    const projectId: number = request.input("project_id");
    const project = await Projects.findOrFail(projectId);
    if (allFilesArray) {
      const wasItValidated: MultipartFileContract[] | CustomReponse =
        this.validateFileUpload(allFilesArray);
      if (wasItValidated instanceof CustomReponse) {
        return response.json(wasItValidated);
      }
    }
    try {
      const updatedProject: Projects = await this.handleSpacesUpload(
        allFilesArray,
        project
      );
      return response.json(updatedProject);
    } catch (error) {
      return response.json(new CustomReponse(error.message));
    }
  }

  /**
   * @desc Validates an array of file uploads and returns either the array
   * or a custom response object with an error message.
   * @param  {MultipartFileContract[]} allFilesArray
   * @returns MultipartFileContract
   */
  private validateFileUpload(
    allFilesArray: MultipartFileContract[]
  ): MultipartFileContract[] | CustomReponse {
    try {
      try {
        allFilesArray.forEach((ele) => {
          if (!ele.isValid) {
            throw new Error(ele.errors[0].message);
          }
        });
      } catch (error) {
        throw error;
      }
      return allFilesArray;
    } catch (error) {
      return new CustomReponse(error.message);
    }
  }

  /**
   * @desc Handle file upload to DigitalOcean cloud for spaces.
   * Converts and stores files on disk and returns an array of file paths.
   * @param  {MultipartFileContract[]} allFiles
   * @param  {string} projectCode
   * @returns Promise
   */
  private async handleSpacesUpload(
    allFiles: MultipartFileContract[],
    projectToBeUpdated: Projects
  ): Promise<any> {
    try {
      let storageInformationToBeStored = [] as Array<{
        id: number;
        fileType: string;
        url: string;
        location: string;
        file?: MultipartFileContract;
      }>;

      for await (const file of allFiles) {
        try {
          let storageInformation = {
            id: 0,
            fileType: "",
            url: "",
            location: "",
            file: file,
          };
          const newUUID = uuidv4();
          await file.moveToDisk(
            "./",
            {
              name:
                projectToBeUpdated.projectCode +
                "_" +
                file.fieldName +
                "_" +
                newUUID +
                "." +
                file.extname,
            },
            "local"
          );
          storageInformation.fileType = file.fieldName;
          let path = file.filePath;
          if (path) {
            let modifiedLocationString = "";
            if (Env.get("NODE_ENV") === "development") {
              modifiedLocationString = path.replace("C:\\Up\\", "");
            }
            if (Env.get("NODE_ENV") === "production") {
              modifiedLocationString = path.replace("/", "");
            }
            storageInformation.url =
              Env.get("UPLOAD_URL") + "/uploads/" + modifiedLocationString;
            storageInformation.id = newUUID;
            storageInformation.location = modifiedLocationString;
            storageInformationToBeStored.push(storageInformation);
          } else
            throw new Error(
              "Upload of one of the files did not complete. Contact the webmaster."
            );
        } catch (error) {
          throw new Error(error);
        }
      }
      const projects = await this.storeLinks(
        projectToBeUpdated,
        storageInformationToBeStored
      );
      if (projects) {
        return projectToBeUpdated;
      }
    } catch (error) {
      return error.message;
    }
  }

  private async storeLinks(
    project: Projects,
    storageInformationToBeStored: Array<{
      id: number;
      fileType: string;
      url: string;
      location: string;
      file?: MultipartFileContract;
    }>
  ): Promise<Projects | undefined> {
    let obj = project.fileUploads;

    let fileUploads: Uploads = obj as unknown as Uploads;

    for await (const storageInformation of storageInformationToBeStored) {
      const { fieldName } = storageInformation.file as MultipartFileContract;
      if (fieldName.includes(FileType.IMAGE_COVER)) {
        delete storageInformation.file;
        project.imageLink = JSON.stringify(storageInformation);
      }
      if (fieldName.includes(FileType.FILE_EVIDENCE)) {
        delete storageInformation.file;

        fileUploads.evidence_files.push(storageInformation);
      } else if (
        fieldName.includes(FileType.FILE_REPORT) ||
        fieldName.includes(FileType.IMAGE_REPORT)
      ) {
        delete storageInformation.file;
        fileUploads.reports_files.push(storageInformation);
      }
    }

    project.fileUploads = JSON.stringify(fileUploads);
    return this.saveProjects(project);
  }

  /**
   * @desc saves the upload
   * @param  {Projects} toBeUpdatedProject
   */
  private async saveProjects(toBeUpdatedProject: Projects) {
    let updated = await toBeUpdatedProject
      .merge({
        imageLink: toBeUpdatedProject.imageLink,
        fileUploads: toBeUpdatedProject.fileUploads,
      })
      .save();
    return updated;
  }

  /**
   * @desc Deletes an uploaded file from a project in the database
   *  and from storage.
   * @param  {} {request
   * @param  {HttpContextContract} response}
   */
  public async deleteUpload({ request, response }: HttpContextContract) {
    const projectId: number = request.input("project_id");
    const uploadInformation: StorageInformation =
      request.input("upload_information");
    const project = await Projects.findOrFail(projectId);
    let uploadFileObj = project.fileUploads;
    const uploadFile: Uploads = uploadFileObj as unknown as Uploads;
    if (uploadInformation.fileType === FileType.IMAGE_COVER) {
      await Drive.delete(uploadInformation.location);
      project.imageLink = JSON.stringify({});
    }
    if (uploadInformation.fileType === FileType.FILE_EVIDENCE) {
      const indexToDelete = uploadFile.evidence_files.findIndex(
        (storageInformation) => {
          return storageInformation.id === uploadInformation.id;
        }
      );
      await Drive.delete(uploadFile.evidence_files[indexToDelete].location);
      uploadFile.evidence_files.splice(indexToDelete, 1);
    }
    if (
      uploadInformation.fileType === FileType.FILE_REPORT ||
      uploadInformation.fileType === FileType.IMAGE_REPORT
    ) {
      const indexToDelete = uploadFile.reports_files.findIndex(
        (storageInformation) => {
          return storageInformation.id === uploadInformation.id;
        }
      );
      await Drive.delete(uploadFile.reports_files[indexToDelete].location);
      uploadFile.reports_files.splice(indexToDelete, 1);
    }
    const updatedProject = await project
      .merge({
        fileUploads: JSON.stringify(uploadFile),
        imageLink: project.imageLink,
      })
      .save();
    return response.json(updatedProject.fileUploads);
  }
}
