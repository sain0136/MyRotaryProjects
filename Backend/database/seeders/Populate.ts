import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import Asset from "app/Models/Assset";

export default class extends BaseSeeder {
  public async run() {
    await Asset.create({
      clubIntial: 1000000,
      dsgIntial: 3000000,
      dmInitial: 5000000,
      globalIntial: 7000000,
      assets: "[]",
    });
  }
}
