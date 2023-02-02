import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Drive from "@ioc:Adonis/Core/Drive";
import Env from "@ioc:Adonis/Core/Env";

export default class UploadsController {
  public async testS3Upload({ request, response }: HttpContextContract) {
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
}
