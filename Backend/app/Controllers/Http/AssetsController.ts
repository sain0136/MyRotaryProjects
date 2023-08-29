import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Assets from "../../Models/Assets";

export default class AssetsController {
  /**
   * @param  {HttpContextContract} {response}
   */
  public async index({ response }: HttpContextContract) {
    const assets = (await Assets.findOrFail(1)).$attributes;
    return response.json(assets);
  }

  public async fix() {
    let assetsRecord = await Assets.findOrFail(1);
    assetsRecord.assets = JSON.stringify({
      main_logo: {
        id: "2ba9c333-1b70-49b1-9459-92728f74966b",
        url: "http://127.0.0.1:3333/uploads/_image_assets_2ba9c333-1b70-49b1-9459-92728f74966b.jpg",
        file: {
          meta: {},
          size: 662332,
          type: "image",
          state: "moved",
          errors: [],
          extname: "jpg",
          isValid: true,
          subtype: "jpeg",
          fileName: "_image_assets_2ba9c333-1b70-49b1-9459-92728f74966b.jpg",
          filePath:
            "C:\\Up\\_image_assets_2ba9c333-1b70-49b1-9459-92728f74966b.jpg",
          fieldName: "image_assets",
          validated: true,
          clientName: "serge-pelletier-7Dmxf8JR-eM-unsplash.jpg",
        },
        fileType: "image_assets",
        location: "_image_assets_2ba9c333-1b70-49b1-9459-92728f74966b.jpg",
        extraLabel: "",
      },
      contentManagement: {
        TwitterUrl: "",
        FaceboolUrl: "",
        InstagramUrl: "",
        myRotaryAbout:
          "MyRotaryProjects aims to simplify project lifecycle management for Rotary Districts. Developed by Peter Labelle of District 7040, the app will replace the previously manual process used for Rotary grant applications, pledge tracking, and reporting. With this app, users will be able to easily create and pledge to projects, as well as track their progress and report on their completion. The app is being designed to be user-friendly and efficient, and Peter Labelle is committed to ensuring its successful deployment and scalability for Rotary District 7040 and future districts.",
        myRotaryEmail: "jssr89@yahoo.com",
        myRotaryPhone: "6133305497",
        myRotaryAddress: "1948 TROY AVE",
        myRotaryAdminEmail: "",
        myRotaryAdminFullName: "Jean Saint rose",
        myRotaryfooterDescription: "",
      },
    });
    await assetsRecord.save();
  }

  public async updateAssets({ request, response }: HttpContextContract) {
    let assetsRecord = await Assets.findOrFail(1);
    const newAssets = request.body();

    // Stringify the new assets and directly assign it to the assets field
    assetsRecord.assets = "";
    assetsRecord.assets = JSON.stringify(newAssets.assets);
    // Save the updated record
    await assetsRecord.save();

    // Fetch the updated assets
    const updatedAssets = (await Assets.findOrFail(1)).$attributes;

    return response.json(updatedAssets);
  }

  async script() {
    const assets = await Assets.findOrFail(1);
    const newAssets2 = assets.$attributes.assets ?? undefined;
    const newAssets: string | undefined = newAssets2 ?? undefined;
    if (newAssets) {
      const Assets = newAssets as any;
      Assets.contentManagement = {
        myRotaryEmail: "",
        myRotaryPhone: "",
        myRotaryAddress: "",
        myRotaryAbout: "",
        myRotaryAdminFullName: "",
        myRotaryAdminEmail: "",
        myRotaryfooterDescription: "",
        FaceboolUrl: "",
        TwitterUrl: "",
        InstagramUrl: "",
      };
      await assets.merge({ assets: JSON.stringify(Assets) }).save();
    }
  }
}
