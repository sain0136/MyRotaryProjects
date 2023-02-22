import Utilities from "@/utils/frontend/classes/Utilities";
import {
  MyError,
  type IApiError,
  type IApiException,
} from "@/utils/frontend/interfaces/Frontend";

export default class MailerApi {
  /**
   * @param  {string} sender_email
   * @param  {string} sender_name
   * @param  {string} body
   */
  public static async contactMailer(
    sender_email: string,
    sender_name: string,
    body: string
  ) {
    const apiReponse = await fetch(
      import.meta.env.VITE_API_URL + "mail/contactUs",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sender_email: sender_email,
          sender_name: sender_name,
          body: body,
        }),
      }
    ).then(async (response) => {
      return await response.json();
    });
    if (Utilities.isAnException(apiReponse)) {
      const exception = apiReponse as IApiException;
      throw new MyError(exception.message, exception.stack, exception.code);
    }

    return apiReponse as unknown as IApiError | boolean;
  }
}
