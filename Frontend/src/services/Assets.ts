import router from "@/router";
import { useRotaryStore } from "@/stores/rotaryStore";
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
      credentials: "include",
    }).then(async (response: Response) => {
      if (response.status === 401) {
        alert("You were logged out due to inactivity. Please login again.");
        useRotaryStore().signOut();
        router.push({ name: "UserLogin" });
      }
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
