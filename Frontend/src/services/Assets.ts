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
        useRotaryStore().signOut();
        useRotaryStore().$state.showLogoutModal = true;
      }
      return await response.json();
    });
    if (Utilities.isAnException(apiReponse)) {
      const exception = apiReponse as IApiException;
      throw new MyError(exception.message, exception.stack, exception.code);
    }
    return apiReponse as IApiError | MainAssets;
  }

  public static async updateMainAssets(assets: MainAssets) {
    const apiReponse = await fetch(
      import.meta.env.VITE_API_URL + "assets/updateAssets",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(assets),
        credentials: "include",
      }
    ).then(async (response: Response) => {
      if (response.status === 401) {
        useRotaryStore().signOut();
        useRotaryStore().$state.showLogoutModal = true;
      }
      return await response.json();
    });

    return apiReponse as MainAssets;
  }
}

export default AssetsApi;
