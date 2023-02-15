import Utilities from "@/utils/frontend/classes/Utilities";
import {
  MyError,
  type IApiError,
  type IApiException,
} from "@/utils/frontend/interfaces/Frontend";
import type IDistrict from "@/utils/shared/interfaces/DistrictInterface";
import type {
  StorageInformation,
  Uploads,
} from "@/utils/shared/interfaces/ProjectsInterface";
import Axios from "axios";

const API_ROUTE = import.meta.env.VITE_API_URL + "fileupload/";

export default class UploadsApi {
  /**
   * @param  {{image_cover?:File;file_evidence?:Array<File>;file_report?:Array<File>;image_report?:Array<File>;image_assets?:File;}} uploadData
   * @returns Promise
   */
  public static async fileUpload(uploadData: {
    image_cover?: File;
    file_evidence?: Array<File>;
    file_report?: Array<File>;
    image_report?: Array<File>;
    image_assets?: File;
    extraLabel?: string;
    districtId?: number;
  }) {
    let fd = new FormData();

    if (uploadData.extraLabel) {
      fd.append("extra_label", uploadData.extraLabel);
    }

    if (uploadData.districtId) {
      fd.append("district_id", uploadData.districtId.toString());
    }

    if (uploadData.image_cover) {
      fd.append("image_cover", uploadData.image_cover);
    }
    if (uploadData.file_evidence && uploadData.file_evidence.length > 0) {
      for (const file of uploadData.file_evidence) {
        fd.append("file_evidence", file);
      }
    }
    if (uploadData.file_report && uploadData.file_report.length > 0) {
      for (const file of uploadData.file_report) {
        fd.append("file_report", file);
      }
    }
    if (uploadData.image_report && uploadData.image_report.length > 0) {
      for (const file of uploadData.image_report) {
        fd.append("image_report", file);
      }
    }
    if (uploadData.image_assets) {
      fd.append("image_assets", uploadData.image_assets);
    }
    try {
      const apiReponse = await Axios.post(API_ROUTE, fd, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Access-Control-Request-Method": "POST",
        },
      });
      if (typeof apiReponse.data === "boolean") {
        if (apiReponse.data) {
          return true;
        }
        return apiReponse.data;
      }
      if (Utilities.isAnException(apiReponse.data)) {
        const exception = apiReponse.data as IApiException;
        throw new MyError(exception.message, exception.stack, exception.code);
      }
      return apiReponse.data as IApiError | boolean | IDistrict;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @param  {number} project_id
   * @param  {StorageInformation} upload_information
   * @returns Promise
   */
  public static async deleteAnUpload(
    upload_information: StorageInformation,
    project_id?: number
  ): Promise<IApiError | Uploads> {
    const apiReponse = await fetch(API_ROUTE + "delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        project_id: project_id,
        upload_information: upload_information,
      }),
    }).then(async (response) => {
      return await response.json();
    });
    if (Utilities.isAnException(apiReponse)) {
      const exception = apiReponse as IApiException;
      throw new MyError(exception.message, exception.stack, exception.code);
    }
    return apiReponse as IApiError | Uploads;
  }

  //  write a deleteADistrictReportUpload function below that will delete a district report upload
  public static async deleteADistrictReportUpload(
    district_id: number,
    upload_information: StorageInformation
  ): Promise<IApiError | IDistrict> {
    const apiReponse = await fetch(API_ROUTE + "delete/district", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        district_id: district_id,
        upload_information: upload_information,
      }),
    }).then(async (response) => {
      return await response.json();
    });
    if (Utilities.isAnException(apiReponse)) {
      const exception = apiReponse as IApiException;
      throw new MyError(exception.message, exception.stack, exception.code);
    }
    return apiReponse as IApiError | IDistrict;
  }
}
