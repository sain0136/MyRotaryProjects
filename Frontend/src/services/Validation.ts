import type { IApiError } from "@/utils/frontend/interfaces/Frontend";

export default class ValidationApi {
  /**
   * @param  {string} password
   * @param  {string} email
   * @returns Promise
   */
  public static async validateUserCredentials(
    password: string,
    email: string
  ): Promise<IApiError | boolean> {
    const apiReponse = await fetch(
      import.meta.env.VITE_API_URL + "user/verify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: password, email: email }),
      }
    );
    return (await apiReponse.json()) as IApiError | boolean;
  }
}
