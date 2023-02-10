import type { IApiError } from "@/utils/frontend/interfaces/Frontend";
import type IUser from "@/utils/shared/interfaces/UserInterface";
const API = import.meta.env.VITE_API_URL;
const userRoute = "user/";
export default class UserApi {

  /**
   * @param  {string} email
   * @returns Promise
   */
  public static async validateEmailUnique(email: string): Promise<boolean | IApiError>{
    const apiReponse = await fetch(API + userRoute + "email/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email:email}),
    });
    return (await apiReponse.json()) as IApiError | boolean;

  }

  /**
   * @param  {number} id
   * @returns Promise
   */
  public static async getUserById(id: number): Promise<IUser | IApiError> {
    const apiReponse = await fetch(API + userRoute, {
      method: "GET",
    });
    return (await apiReponse.json()) as IApiError | IUser;
  }

  /**
   * @param  {IUser} newUser
   * @returns Promise
   */
  public static async createUser(newUser: IUser): Promise<boolean | IApiError> {
    const apiReponse = await fetch(API + userRoute, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ new_user: newUser }),
    });
    return (await apiReponse.json()) as IApiError | boolean;
  }

  /**
   * @param  {IUser} updatedUser
   * @param  {boolean} roleChanges
   * @returns Promise
   */
  public static async updateUser(
    updatedUser: IUser,
    roleChanges: boolean
  ): Promise<boolean | IApiError> {
    const apiReponse = await fetch(API + userRoute, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: updatedUser, role_change: roleChanges }),
    });
    return (await apiReponse.json()) as IApiError | boolean;
  }

  /**
   * @param  {number} id
   * @returns Promise
   */
  public static async delete(id: number): Promise<boolean | IApiError> {
    const apiReponse = await fetch(API + userRoute + id, {
      method: "DELETE",
    });
    return (await apiReponse.json()) as IApiError | boolean;
  }
}
