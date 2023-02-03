import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Drive from "@ioc:Adonis/Core/Drive";
import Env from "@ioc:Adonis/Core/Env";
import { CustomReponse } from "Contracts/Shared/SharedInterfaces/CustomReponse";
import { MultipartFileContract } from "@ioc:Adonis/Core/BodyParser";
import Projects from "App/Models/Projects";
import { v4 as uuidv4 } from 'uuid';


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
   * @param  {} {request
   * @param  {HttpContextContract} response}
   */
  public async handleFileUpload({ request, response }: HttpContextContract) {
    const uploadsArray = request.files("image_cover", {
      size: "5mb",
      extnames: ["jpg", "png", "gif"],
    });
    const projectId: number = request.input("project_id");
    const project = await Projects.findOrFail(projectId);
    if (uploadsArray) {
      const notValidated: MultipartFileContract[] | CustomReponse =
        this.validateFileUpload(uploadsArray);
      if (notValidated instanceof CustomReponse) {
        return response.json(notValidated);
      }
    }
    try {
      const links = await this.handleSpacesUpload(
        uploadsArray,
        project.projectCode
      );
      return response.json(links);
    } catch (error) {
      return response.json(error.message);
    }
  }

  private validateFileUpload(
    uploadsArray: MultipartFileContract[]
  ): MultipartFileContract[] | CustomReponse {
    try {
      try {
        uploadsArray.forEach((ele) => {
          if (!ele.isValid) {
            throw new Error(ele.errors[0].message);
          }
        });
      } catch (error) {
        throw error;
      }
      return uploadsArray;
    } catch (error) {
      return new CustomReponse(error.message);
    }
  }

  private async handleSpacesUpload(
    allFiles: MultipartFileContract[],
    projectCode: string
  ): Promise<any> {
    type res = {
      s3error?: string;
      s3url?: string;
    };
    let newLinks = [] as res[];
    let count = 0;
    try {
      for await (const file of allFiles) {
        try {
          const newUUID = uuidv4();
          await file.moveToDisk(
            "./",
            { name: projectCode + "_" + file.fieldName + "_" + newUUID },
            "spaces"
          );
          let path = file.filePath;
          if (path) {
            newLinks.push({
              s3url: path,
            });
            count += 1;
          }
        } catch (error) {
          throw new Error(error);
        }
      }
      return newLinks;
    } catch (error) {
      return error.message;
    }
  }
}
