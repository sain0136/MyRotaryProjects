import router from "@/router";
import { useRotaryStore } from "@/stores/rotaryStore";
import Utilities from "@/utils/frontend/classes/Utilities";
import {
  MyError,
  type IApiError,
  type UserValidationApiResponse,
  type IApiException,
} from "@/utils/frontend/interfaces/Frontend";

export default class ValidationApi {
  /**
   * @param  {string} password
   * @param  {string} email
   * @returns Promise
   */
  public static async validateUserCredentials(
    password: string,
    email: string
  ): Promise<IApiError | UserValidationApiResponse> {
    const apiReponse = await fetch(
      import.meta.env.VITE_API_URL + "user/verify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: password, email: email }),
        credentials: "include",
      }
    ).then(async (response: Response) => {
      if (response.status === 401) {
        useRotaryStore().$state.showLogoutModal = true;
        useRotaryStore().signOut();
      }
      return await response.json();
    });
    
    if (Utilities.isAnException(apiReponse)) {
      const exception = apiReponse as IApiException;
      throw new MyError(exception.message, exception.stack, exception.code);
    }
    return apiReponse as IApiError | UserValidationApiResponse;
  }
  // create call to logut user from the backend
  public static async logoutUser(): Promise<IApiError | boolean> {
    const apiReponse = await fetch(
      import.meta.env.VITE_API_URL + "user/logout",
      {
        method: "POST",
        credentials: "include",
      }
    ).then(async (response: Response) => {
      if (response.status === 401) {
        useRotaryStore().$state.showLogoutModal = true;
        useRotaryStore().signOut();
      }
      return await response.json();
    });
    if (Utilities.isAnException(apiReponse)) {
      const exception = apiReponse as IApiException;
      throw new MyError(exception.message, exception.stack, exception.code);
    }
    return apiReponse as IApiError | boolean;
  }
}
