import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Clubs from "App/Models/Clubs";
import Projects from "App/Models/Projects";
import Users from "App/Models/Users";

import { IClub } from "Contracts/util/sharedUtility/interfaces/ClubInterface";


export default class ClubsController {
  /**
   * @desc Pull all clubs
   * @param  {HttpContextContract} {response}
   */
  public async index({ response }: HttpContextContract) {
    const clubs: Clubs[] = await Clubs.all();
    return response.json(clubs);
  }
  /**
   * @desc all club members paginated
   * @param  {} {request
   * @param  {HttpContextContract} response}
   */
  public async clubMembersPagination({
    request,
    response,
  }: HttpContextContract) {
    const clubID: number = request.input("club_id");
    const currentPage: number = request.input("current_page");
    const limit: number = request.input("limit");
    const allMembers = await Users.query()
      .where({ clubId: clubID })
      .paginate(currentPage, limit);
    for (const user of allMembers as unknown as Users[]) {
      user.role = await user
        .related("clubRole")
        .pivotQuery()
        .where({ user_id: user.userId });
    }
    return response.json(allMembers);
  }
  /**
   * @desc Create new club
   * @param  {} {request
   * @param  {HttpContextContract} response}
   */
  public async store({ request, response }: HttpContextContract) {
    const newClub: IClub = request.input("club");
    await Clubs.create({
      clubName: newClub.club_name,
      clubAddress: newClub.club_address,
      clubCity: newClub.club_city,
      clubPostal: newClub.club_postal,
      clubProvince: newClub.club_province,
      clubCountry: newClub.club_country,
      clubDescription: newClub.club_description,
      clubEmail: newClub.club_email,
      districtId: newClub.district_id,
      siteUrl: newClub.siteUrl,
      settings: JSON.stringify(newClub.settings),
    });
    return response.json(true);
  }
  /**
   * @param  {} {response
   * @param  {HttpContextContract} params}
   */
  public async show({ response, params }: HttpContextContract) {
    const clubID: number = parseInt(params.id);
    let clubById: Clubs = await Clubs.findOrFail(clubID);
    return response.json(clubById);
  }

  /**
   * @desc Update club record
   * @param  {} {request
   * @param  {} params
   * @param  {HttpContextContract} response}
   */
  public async update({ request, params, response }: HttpContextContract) {
    const updatedClubData: IClub = request.input("club");
    const clubID: number = parseInt(params.id);
    const clubToBeUpdated: Clubs = await Clubs.findOrFail(clubID);
    await clubToBeUpdated
      .merge({
        clubName: updatedClubData.club_name,
        clubAddress: updatedClubData.club_address,
        clubCity: updatedClubData.club_city,
        clubPostal: updatedClubData.club_postal,
        clubProvince: updatedClubData.club_province,
        clubCountry: updatedClubData.club_country,
        clubDescription: updatedClubData.club_description,
        clubEmail: updatedClubData.club_email,
        siteUrl: updatedClubData.siteUrl,
        settings: JSON.stringify(updatedClubData.settings),
      })
      .save();
    return response.json(true);
  }

  /**
   * @desc Delete club
   * @param  {} {params
   * @param  {HttpContextContract} response}
   */
  public async destroy({ params, response }: HttpContextContract) {
    const clubToBeDeleted: Clubs = await Clubs.findOrFail(parseInt(params.id));
    const allProjects = await Projects.all();
    const found = allProjects.find((ele) => {
      if (ele.clubId === parseInt(params.id)) {
        return true;
      }
    });
    if (!found) {
      await clubToBeDeleted.delete();
      return response.json(true);
    }
    return response.json(false);
  }
}
