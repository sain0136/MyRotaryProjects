import Utilities from "@/utils/frontend/classes/Utilities";
import {
  MyError,
  type IApiError,
  type IApiException,
  type MainAssets,
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
    }).then(async (response) => {
      return await response.json();
    });
    if (Utilities.isAnException(apiReponse)) {
      const exception = apiReponse as IApiException;
      throw new MyError(exception.message, exception.stack, exception.code);
    }
    return apiReponse as IApiError | MainAssets;
  }
}

export default AssetsApi;
