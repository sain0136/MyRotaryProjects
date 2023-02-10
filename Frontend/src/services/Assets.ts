import type {
  IApiError,
  MainAssets,
} from "@/utils/frontend/interfaces/Frontend";
import.meta.env.VITE_API_URL;

class AssetsApi {
  /**
   * @returns Promise
   */
  public static async getMainAssets(): Promise<IApiError | MainAssets> {
    const apiReponse = await fetch(import.meta.env.VITE_API_URL + "assets/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return (await apiReponse.json()) as IApiError | MainAssets;
  }
}

export default AssetsApi;
