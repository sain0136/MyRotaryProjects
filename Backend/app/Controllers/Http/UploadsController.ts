import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Drive from "@ioc:Adonis/Core/Drive";
import Env from "@ioc:Adonis/Core/Env";
import { MultipartFileContract } from "@ioc:Adonis/Core/BodyParser";
import Projects from "../../Models/Projects";
import { v4 as uuidv4 } from "uuid";

import Assets from "../../Models/Assets";
import CustomReponse from "Contracts/util/backend/classes/CustomReponse";
import { FileType } from "Contracts/util/sharedUtility/interfaces/SharedInterface";
import {
  Uploads,
  StorageInformation,
} from "Contracts/util/sharedUtility/interfaces/ProjectsInterface";
import Districts from "App/Models/Districts";
import { DistrictDetails } from "Contracts/util/sharedUtility/interfaces/DistrictInterface";

type districtReportExtraDetails = {
  extraLabel: string;
  districtId: number;
};

type uploadStorageType = {
  id: number;
  fileType: string;
  url: string;
  location: string;
  file?: MultipartFileContract;
  extraLabel?: string;
};

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
    // try {
    //   if (coverImage) {
    //     await coverImage.moveToDisk("./", {}, "spaces");
    //     let path = coverImage.filePath;
    //     if (path) {
    //       res.s3url = path;
    //     }
    //   }
    // } catch (error) {
    //   res.s3error = error.message;
    //   res.s3url = error;
    // }
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
    const extraLabel: string = request.input("extra_label");
    const districtId: string = request.input("district_id");

    const districtReportExtraDetails: districtReportExtraDetails = {
      extraLabel: extraLabel,
      districtId: Number(districtId),
    };

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
    const uploadsArrayAssetImage = request.file("image_assets", {
      size: "10mb",
      extnames: ["jpg", "png", "gif"],
    });
    if (uploadsArrayAssetImage) {
      try {
        this.validateFileUpload([uploadsArrayAssetImage]);
        const updatedAssets = await this.handleSpacesUpload([
          uploadsArrayAssetImage,
        ]);
        return response.json(updatedAssets);
      } catch (error) {
        return response.json(new CustomReponse(error.message));
      }
    }
    let allFilesArray = [
      ...uploadsArrayCover,
      ...uploadsArrayEvidence,
      ...uploadsArrayReportFile,
      ...uploadsArrayReportImage,
    ];
    const projectId: number = request.input("project_id");
    let project: Projects | undefined;
    try {
      project = await Projects.findOrFail(projectId);
    } catch (error) {
      project = undefined;
    }
    if (allFilesArray) {
      const wasItValidated: MultipartFileContract[] | CustomReponse =
        this.validateFileUpload(allFilesArray);
      if (wasItValidated instanceof CustomReponse) {
        return response.json(wasItValidated);
      }
    }
    try {
      const updatedProjectOrDistrict: Projects | Districts =
        await this.handleSpacesUpload(
          allFilesArray,
          project,
          districtReportExtraDetails
        );
      return response.json(updatedProjectOrDistrict);
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
    projectToBeUpdated?: Projects,
    districtReportExtraDetails?: districtReportExtraDetails
  ): Promise<any> {
    try {
      let storageInformationToBeStored = [] as Array<uploadStorageType>;

      for await (const file of allFiles) {
        try {
          let storageInformation = {
            id: 0,
            fileType: "",
            url: "",
            location: "",
            file: file,
            extraLabel: "",
          } as uploadStorageType;
          let fileCategoryIndicator: string = "";
          if (projectToBeUpdated) {
            fileCategoryIndicator = projectToBeUpdated.projectCode;
          } else if (districtReportExtraDetails) {
            fileCategoryIndicator =
              districtReportExtraDetails.extraLabel +
              "_" +
              districtReportExtraDetails.districtId +
              "_";
          }
          const newUUID = uuidv4();
          await file.moveToDisk(
            "./",
            {
              name:
                fileCategoryIndicator +
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
              modifiedLocationString = path.replace(
                Env.get("LOCAL_UPLOAD_PATH"),
                ""
              );
            }
            storageInformation.url =
              Env.get("UPLOAD_URL") + "/uploads/" + modifiedLocationString;
            storageInformation.id = newUUID;
            storageInformation.location = modifiedLocationString;
            if (districtReportExtraDetails) {
              storageInformation.extraLabel =
                districtReportExtraDetails.extraLabel;
            }
            storageInformationToBeStored.push(storageInformation);
          } else
            throw new Error(
              "Upload of one of the files did not complete. Contact the webmaster."
            );
        } catch (error) {
          throw new Error(error);
        }
      }
      if (!projectToBeUpdated && districtReportExtraDetails) {
        return await this.storeDistrictReportLink(
          districtReportExtraDetails,
          storageInformationToBeStored
        );
      } else if (projectToBeUpdated) {
        return await this.storeProjectLinks(
          projectToBeUpdated,
          storageInformationToBeStored
        );
      } else if (allFiles.length === 1) {
        return await this.saveAssetLogoImage(storageInformationToBeStored[0]);
      }
    } catch (error) {
      return error.message;
    }
  }

  /**
   * @desc Stores the district report link in the database.
   * @param  {districtReportExtraDetails} districtReportExtraDetails
   * @param  {Array<StorageInformation>} storageInformationToBeStored
   * @returns Promise
   */
  private async storeDistrictReportLink(
    districtReportExtraDetails: districtReportExtraDetails,
    storageInformationToBeStored: Array<StorageInformation>
  ): Promise<Districts> {
    const district = await Districts.findOrFail(
      districtReportExtraDetails.districtId as number
    );
    const priorDistrictDetails =
      district.districtDetails as unknown as DistrictDetails;
    priorDistrictDetails.reportLinks.push(storageInformationToBeStored[0]);
    await district
      .merge({
        districtDetails: JSON.stringify(priorDistrictDetails),
      })
      .save();
    let updatedDistrict = await Districts.findOrFail(district.districtId);
    return updatedDistrict;
  }

  /**
   * @desc Stores the project links in the database.
   * @param  {Projects} project
   * @param  {Array<{id:number;fileType:string;url:string;location:string;file?:MultipartFileContract;}>} storageInformationToBeStored
   * @returns Promise
   */
  private async storeProjectLinks(
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
      delete storageInformation.file;

      if (fieldName.includes(FileType.IMAGE_COVER)) {
        try {
          const oldImagelink: StorageInformation = JSON.parse(
            project.imageLink
          );
          if (oldImagelink.location) {
            await Drive.delete(oldImagelink.location);
          }
          project.imageLink = JSON.stringify(storageInformation);
        } catch (error) {
          throw new Error(
            "Upload of one of the files did not complete. Contact the webmaster."
          );
        }
      }
      if (fieldName.includes(FileType.FILE_EVIDENCE)) {
        fileUploads?.evidence_files?.push(storageInformation);
      } else if (
        fieldName.includes(FileType.FILE_REPORT) ||
        fieldName.includes(FileType.IMAGE_REPORT)
      ) {
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
    await toBeUpdatedProject
      .merge({
        imageLink: toBeUpdatedProject.imageLink,
        fileUploads: toBeUpdatedProject.fileUploads,
      })
      .save();
    let updated = await Projects.findOrFail(toBeUpdatedProject.projectId);
    return updated;
  }

  /**
   * @desc Saves the logo image to the database
   * @param  {StorageInformation} storageInformation
   * @returns Promise
   */
  private async saveAssetLogoImage(
    storageInformation: StorageInformation
  ): Promise<Assets> {
    const assets = await Assets.findOrFail(1);
    let deleted: { main_logo: StorageInformation } =
      assets.assets as unknown as { main_logo: StorageInformation };
    if (deleted.main_logo.location) {
      await Drive.delete(deleted.main_logo.location);
    }
    const updatedAssets = await assets
      .merge({
        assets: JSON.stringify({ main_logo: { ...storageInformation } }),
      })
      .save();
    return updatedAssets;
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
      const indexToDelete = uploadFile?.evidence_files?.findIndex(
        (storageInformation) => {
          return storageInformation.id === uploadInformation.id;
        }
      );
      await Drive.delete(uploadFile?.evidence_files[indexToDelete].location);
      uploadFile?.evidence_files?.splice(indexToDelete, 1);
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
    await project
      .merge({
        fileUploads: JSON.stringify(uploadFile),
        imageLink: project.imageLink,
      })
      .save();
    const updatedProject = await Projects.findOrFail(projectId);
    return response.json(updatedProject);
  }

  /**
   * @desc Deletes an uploaded file from a district in the database
   * @param  {} {request
   * @param  {} response
   * @param  {HttpContextContract} }
   * @returns Promise
   */
  public async deleteUploadDistrictReport({
    request,
    response,
  }: HttpContextContract): Promise<void> {
    const districtId: number = request.input("district_id");
    const uploadInformation: StorageInformation =
      request.input("upload_information");
    const districtToUpdated = await Districts.findOrFail(districtId);
    const priorDistrictDetails =
      districtToUpdated.districtDetails as unknown as DistrictDetails;
    const indexToDelete = priorDistrictDetails.reportLinks.findIndex(
      (storageInformation) => {
        return storageInformation.id === uploadInformation.id;
      }
    );
    await Drive.delete(
      priorDistrictDetails.reportLinks[indexToDelete].location
    );
    priorDistrictDetails.reportLinks.splice(indexToDelete, 1);
    await districtToUpdated
      .merge({
        districtDetails: JSON.stringify(priorDistrictDetails),
      })
      .save();
    const updatedDistrict = await Districts.findOrFail(districtId);
    return response.json(updatedDistrict);
  }
  // produce a dummy json below for testing of deleteUploadDistrictReport
  // {
  //   "district_id": 1,
}
