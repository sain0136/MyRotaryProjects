import type { IApiError } from "@/utils/frontend/interfaces/Frontend";

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
    );
    return apiReponse as IApiError | boolean;
  }
}
