import Assets from "App/Models/Assets";

export default class ProjectCodeGenerator {
    constructor() {}
    
    /**
     * @param  {string} type
     * @returns Promise
     */
    public static async getProjectCode(type: string): Promise<number> {
      let assets = await Assets.findOrFail(1);
      let code: number = 0;
      Object.entries(assets.$attributes).forEach((k: string | any, ): void => {
        if (k[0] === type) {
          code = k[1] + 1;
          return;
        }
      });
      if (code > 0) {
        return code;
      }
      throw new Error("Error generating code");
    }
  
    /**
     * @param  {string} type
     * @param  {number} code
     */
    public static async setProjectCode(type: string, code: number) {
      let assets = await Assets.findOrFail(1);
      try {
        if (
          type === "dmInitial" ||
          "dsgInitial" ||
          "clubInitial" ||
          "globalInitial"
        ) {
          await assets
            .merge({
              [type]: code,
            })
            .save();
        } else {
          throw new Error("Type passed in is wrong!");
        }
      } catch (error) {
        throw new Error(error);
      }
    }
  }