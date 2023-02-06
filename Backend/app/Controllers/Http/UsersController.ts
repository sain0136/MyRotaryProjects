import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Users from "App/Models/Users";
import Hash from "@ioc:Adonis/Core/Hash";
import { CustomReponse } from "Contracts/Shared/SharedInterfaces/CustomReponse";

export default class UsersController {
  /**
   * @desc All users
   * @param  {HttpContextContract} {response}
   */
  public async index({ response }: HttpContextContract) {
    const allUsers: Users[] = await Users.all();
    for await (const user of allUsers) {
      if (user.userType === "CLUB") {
        user.role = user.role = await user
          .related("clubRole")
          .pivotQuery()
          .where({ user_id: user.userId });
      } else {
        user.role = await user
          .related("districtRole")
          .pivotQuery()
          .where({ user_id: user.userId });
      }
    }
    return response.json(allUsers);
  }
  /**
   * @desc Verify users password
   * @param  {} {request
   * @param  {HttpContextContract} response}
   */
  public async passwordVerfication({ request, response }: HttpContextContract) {
    const password: string = request.input("password");
    const email: string = request.input("email");
    const userByEmail: Users[] = await Users.query()
      .select()
      .where({ email: email });
    if (userByEmail.length < 1) {
      return response.json(new CustomReponse("Email not found!"));
    }
    let user: Users = userByEmail[0];
    if (await Hash.verify(user.password, password)) {
      let verifiedAndAccessGranted: Boolean = false;
      verifiedAndAccessGranted = true;
    } else {
      let verifiedAndAccessGranted: Boolean = false;
      verifiedAndAccessGranted = false;
      return response.json(new CustomReponse("Password is wrong!"));
    }
    if (user.userType === "CLUB") {
      user.role = user.role = await user
        .related("clubRole")
        .pivotQuery()
        .where({ user_id: user.userId });
    } else {
      user.role = await user
        .related("districtRole")
        .pivotQuery()
        .where({ user_id: user.userId });
    }
    return response.json(true);
  }
  /**
   * @desc Make sure users email for signup is unique
   * @param  {} {request
   * @param  {} response}
   */
  public async emailIsUnique({ request, response }: HttpContextContract) {
    const email: string = request.input("email");
    const emailIsInDatabase: Users[] = await Users.query()
      .select()
      .where({ email: email });
    if (emailIsInDatabase.length <= 0) {
      return response.json(true);
    } else {
      return response.json(false);
    }
  }

  /**
   * @desc Return user by id
   * @param  {} {params
   * @param  {HttpContextContract} response}
   */
  public async show({ params, response }: HttpContextContract) {
    const userById: Users = await Users.findOrFail(params.id);
    if (userById.userType === "CLUB") {
      userById.role = userById.role = await userById
        .related("clubRole")
        .pivotQuery()
        .where({ user_id: userById.userId });
    } else {
      userById.role = await userById
        .related("districtRole")
        .pivotQuery()
        .where({ user_id: userById.userId });
    }
    return response.json(userById);
  }
}
