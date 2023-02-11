import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Users from "../../Models/Users";
import Hash from "@ioc:Adonis/Core/Hash";
import CustomReponse from "Contracts/util/backend/classes/CustomReponse";
import IUser from "Contracts/util/sharedUtility/interfaces/UserInterface";
import Districts from "App/Models/Districts";
import Clubs from "App/Models/Clubs";
import Projects from "App/Models/Projects";
import { DateTime } from "luxon";

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
  public async passwordVerfication({
    request,
    response,
    session,
  }: HttpContextContract) {
    // session.clear();
    // return response.json((session as any).store);
    const password: string = request.input("password");
    const email: string = request.input("email");
    const userByEmail: Users[] = await Users.query()
      .select()
      .where({ email: email });
    if (userByEmail.length < 1) {
      return response.json(new CustomReponse("Email not found"));
    }
    let user: Users = userByEmail[0];
    if (await Hash.verify(user.password, password)) {
    } else {
      return response.json(new CustomReponse("Password is wrong"));
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
    let district = user.districtId
      ? await Districts.findOrFail(user.districtId)
      : undefined;
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
    let club: Clubs = await Clubs.findOrFail(user.clubId);
    if (!session.get("userIsLoggedIn")) {
      session.put("userIsLoggedIn", true);
      session.put("lastApiCallTimeStamp", DateTime.now().toMillis());
    }
    return response.json({
      user: user,
      verified: true,
      diistrict: district,
      club: club,
      session: session.get("lastApiCallTimeStamp"),
    });
  }

  // Create a function to logout user by clearing session
  public async logout({ session, response }: HttpContextContract) {
    session.clear();
    if (Object.keys((session as any).store).length > 0) {
      return response.json(new CustomReponse("You have been logged out"));
    } else {
      return response.json(true);
    }
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

  public async store({ request, response }: HttpContextContract) {
    const newUser: IUser = request.input("new_user");
    await Users.create({
      firstname: newUser.firstname,
      lastname: newUser.lastname,
      address: newUser.address,
      userCity: newUser.userCity,
      userPostal: newUser.userPostal,
      userProvince: newUser.userProvince,
      userCountry: newUser.userCountry,
      phone: newUser.phone,
      email: newUser.email,
      password: newUser.password,
      clubId: newUser.clubId,
      districtId: newUser.districtId,
      userType: newUser.userType,
      extraDetails: JSON.stringify(newUser.extra_details),
    });
    if (newUser.user_type === "DISTRICT") {
      const district: Districts = await Districts.findOrFail(
        newUser.district_id
      );
      await newUser.related("districtRole").attach({
        [district.districtId]: {
          district_role: newUser.role_type,
        },
      });
    } else {
      const club: Clubs = await Clubs.findOrFail(newUser.club_id);
      await newUser.related("clubRole").attach({
        [club.clubId]: {
          club_role: newUser.role_type,
        },
      });
    }
    return response.json(true);
  }

  /**
   * @param  {} {request
   * @param  {} params
   * @param  {HttpContextContract} response}
   */
  public async update({ request, params, response }: HttpContextContract) {
    const userId: number = parseInt(params.id);
    const userToBeUpdated: Users = await Users.findOrFail(userId);
    const currentUserInfo: IUser = request.input("user");
    const roleChanged: IUser = request.input("role_change");

    if (roleChanged) {
      if (currentUserInfo.userType === "DISTRICT") {
        await currentUserInfo.related("districtRole").detach();
        const district: Districts = await Districts.findOrFail(
          currentUserInfo.district_id
        );
        await currentUserInfo.related("districtRole").attach({
          [district.districtId]: {
            district_role: currentUserInfo.role_type,
          },
        });
      } else {
        await currentUserInfo.related("clubRole").detach();
        const club: Clubs = await Clubs.findOrFail(currentUserInfo.club_id);
        await currentUserInfo.related("clubRole").attach({
          [club.clubId]: {
            club_role: currentUserInfo.role_type,
          },
        });
      }
    }
    await userToBeUpdated
      .merge({
        firstname: currentUserInfo.firstname,
        lastname: currentUserInfo.lastname,
        address: currentUserInfo.address,
        userCity: currentUserInfo.userCity,
        userPostal: currentUserInfo.userPostal,
        userProvince: currentUserInfo.userProvince,
        userCountry: currentUserInfo.userCountry,
        phone: currentUserInfo.phone,
        email: currentUserInfo.email,
        password: currentUserInfo.password,
        clubId: currentUserInfo.clubId,
        districtId: currentUserInfo.districtId,
        userType: currentUserInfo.userType,
        extraDetails: JSON.stringify(currentUserInfo.extra_details),
      })
      .save();

    return response.json(true);
  }

  /**
   * @param  {} {params
   * @param  {HttpContextContract} response}
   */
  public async destroy({ params, response }: HttpContextContract) {
    const userToBeDeleted = await Users.findOrFail(parseInt(params.id));
    const allProjects = await Projects.all();
    const found = allProjects.find((ele) => {
      if (ele.createdBy === parseInt(params.id)) {
        return true;
      }
    });
    if (typeof found === "undefined") {
      if (userToBeDeleted.userType === "DISTRICT") {
        await userToBeDeleted.related("districtRole").detach();
        await userToBeDeleted.delete();
        return response.json(true);
      } else {
        await userToBeDeleted.related("clubRole").detach();
        await userToBeDeleted.delete();
        return response.json(true);
      }
    } else return response.json(false);
  }
}
