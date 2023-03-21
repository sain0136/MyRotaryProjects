import router from "@/router";
import { useRotaryStore } from "@/stores/rotaryStore";
import Utilities from "@/utils/frontend/classes/Utilities";
import {
  MyError,
  type IApiError,
  type IApiException,
} from "@/utils/frontend/interfaces/Frontend";
import type IUser from "@/utils/shared/interfaces/UserInterface";
const API = import.meta.env.VITE_API_URL + "user/";
export default class UserApi {
  /**
   * @param  {string} email
   * @returns Promise
   */
  public static async validateEmailUnique(
    email: string
  ): Promise<boolean | IApiError> {
    const apiReponse = await fetch(API + "email/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
      credentials: "include",
    }).then(async (response: Response) => {
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

  /**
   * @param  {number} id
   * @returns Promise
   */
  public static async getUserById(id: number): Promise<IUser | IApiError> {
    const apiReponse = await fetch(API + id, {
      method: "GET",
      credentials: "include",
    }).then(async (response: Response) => {
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
    return apiReponse as IApiError | IUser;
  }

  /**
   * @param  {IUser} newUser
   * @returns Promise
   */
  public static async createUser(newUser: IUser): Promise<boolean | IApiError> {
    const apiReponse = await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ new_user: newUser }),
      credentials: "include",
    }).then(async (response: Response) => {
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

  /**
   * @param  {IUser} updatedUser
   * @param  {boolean} roleChanges
   * @returns Promise
   */
  public static async updateUser(
    updatedUser: IUser
  ): Promise<boolean | IApiError> {
    const apiReponse = await fetch(API + updatedUser.user_id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: updatedUser }),
      credentials: "include",
    }).then(async (response: Response) => {
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

  /**
   * @param  {number} id
   * @returns Promise
   */
  public static async delete(id: number): Promise<boolean | IApiError> {
    const apiReponse = await fetch(API + id, {
      method: "DELETE",
      credentials: "include",
    }).then(async (response: Response) => {
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
