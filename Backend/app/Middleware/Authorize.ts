import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import UnAuthorizedException from "App/Exceptions/UnAuthorizedException";
import { DateTime } from "luxon";

export default class Authorize {
  public async handle(
    { session }: HttpContextContract,
    next: () => Promise<void>
  ) {
    if (session.get("userIsLoggedIn")) {
      let lastApiCallTimeStamp = session.get("lastApiCallTimeStamp");
      let now = DateTime.now().toMillis();
      const twoHoursInMilliseconds = 3600000;
      if (now - lastApiCallTimeStamp > twoHoursInMilliseconds) {
        session.clear();
        const message = "You were logged out due to inactivity. Please login again.";
        const status = 403;
        const errorCode = "E_UNAUTHORIZED";
        throw new UnAuthorizedException(message, status, errorCode);
      } else {
        session.put("lastApiCallTimeStamp", now);
        await next();
      }
    } else {
      await next();
    }
  }
}
