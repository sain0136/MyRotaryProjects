import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { ModelPaginatorContract } from "@ioc:Adonis/Lucid/Orm";
import Clubs from "App/Models/Clubs";
import Districts from "App/Models/Districts";
import Users from "App/Models/Users";
import CustomReponse from "Contracts/util/backend/classes/CustomReponse";

import IDistrict, {
  DistrictDetails,
} from "Contracts/util/sharedUtility/interfaces/DistrictInterface";

export default class DistrictsController {
  /**
   * @desc Retruns all districts
   * @param  {HttpContextContract} {response}
   * @returns Promise
   */
  public async index({ response }: HttpContextContract): Promise<void> {
    const districts: Districts[] = await Districts.all();

    return response.json(districts);
  }

  // Show a single district
  public async show({ params, response }: HttpContextContract): Promise<void> {
    const district: Districts = await Districts.findOrFail(params.id);
    return response.json(district);
  }

  /**
   * @desc Returns all districts paginated
   * @param  {} {request
   * @param  {HttpContextContract} response}
   * @returns Promise
   */
  public async districtsPagination({
    request,
    response,
  }: HttpContextContract): Promise<void> {
    const currentPage: number = request.input("current_page");
    const limit: number = request.input("limit");
    const districts: ModelPaginatorContract<Districts> = await Districts.query()
      .select("*")
      .paginate(currentPage, limit);
    return response.json(districts);
  }
  /**
   * @desc Returns all the clubs in a district
   * @param  {} {request
   * @param  {} response
   * @param  {HttpContextContract} }
   * @returns Promise
   */
  public async allClubsInDistrictPagination({
    request,
    response,
  }: HttpContextContract): Promise<void> {
    const districtID: number = request.input("district_id");
    const currentPage: number = request.input("current_page");
    const limit: number = request.input("limit");
    const allClubsiNDistrict = await Clubs.query()
      .select("*")
      .where({ district_id: districtID })
      .paginate(currentPage, limit);
    return response.json(allClubsiNDistrict);
  }
  /**
   * @desc Gets all admins for a district and returns them with thier role
   * @param  {} {request
   * @param  {} response
   * @param  {HttpContextContract} }
   * @returns Promise
   */
  public async districtAdminsPagination({
    request,
    response,
  }: HttpContextContract): Promise<void> {
    const currentPage: number = request.input("current_page");
    const limit: number = request.input("limit");
    const districtID: number = request.input("district_id");
    const allAdmins: ModelPaginatorContract<Users> = await Users.query()
      .where({ district_id: districtID })
      .paginate(currentPage, limit);
    for await (const user of allAdmins) {
      user.role = await user
        .related("districtRole")
        .pivotQuery()
        .where({ user_id: user.userId });
    }
    return response.json(allAdmins);
  }

  /**
   * @desc Create district
   * @param  {} {request
   * @param  {HttpContextContract} response}
   * @returns Promise
   */
  public async store({
    request,
    response,
  }: HttpContextContract): Promise<void> {
    const district: IDistrict = request.input("district");
    let extraDetails: DistrictDetails = {
      ddfCalculation: district.district_details.ddfCalculation,
      dates: {
        grant_submission_closedate:
          district.district_details.dates.grant_submission_closedate,
        grant_submission_startdate:
          district.district_details.dates.grant_submission_startdate,
      },
      reportLinks: district.district_details.reportLinks,
      ddfCapes: {
        dsgCap: district.district_details.ddfCapes.dsgCap,
        dsgFraction: district.district_details.ddfCapes.dsgFraction,
        dmCap: district.district_details.ddfCapes.dmCap,
        dmFraction: district.district_details.ddfCapes.dmFraction,
      },
    };

    try {
      const created = await Districts.create({
        districtNumber: "D-" + district.district_name,
        districtName: "District " + district.district_name,
        districtEmail: district.district_email,
        districtPresident: district.district_president,
        districtDescription: district.district_description,
        siteUrl: district.site_url,
        districtDetails: JSON.stringify(extraDetails),
      });
      let newDistrict: Districts = await Districts.findOrFail(
        created.districtId
      );
      return response.json(newDistrict);
    } catch (error) {
      if (error.code === "ER_DUP_ENTRY") {
        return response.json(
          new CustomReponse("District Number Already Exists")
        );
      }
    }
  }

  /**
   * @desc Update district
   * @param  {} {response
   * @param  {} params
   * @param  {HttpContextContract} request}
   * @returns Promise
   */
  public async update({
    response,
    request,
    params,
  }: HttpContextContract): Promise<void> {
    const district: IDistrict = request.input("district");
    const districtToBeUpdated: Districts = await Districts.findOrFail(
      params.id
    );
    let extraDetails: DistrictDetails = {
      ddfCalculation: district.district_details.ddfCalculation,
      dates: {
        grant_submission_closedate:
          district.district_details.dates.grant_submission_closedate,
        grant_submission_startdate:
          district.district_details.dates.grant_submission_startdate,
      },
      reportLinks: district.district_details.reportLinks,
      ddfCapes: {
        dsgCap: district.district_details.ddfCapes.dsgCap,
        dsgFraction: district.district_details.ddfCapes.dsgFraction,
        dmCap: district.district_details.ddfCapes.dmCap,
        dmFraction: district.district_details.ddfCapes.dmFraction,
      },
    };
    try {
      await districtToBeUpdated
        .merge({
          districtNumber: district.district_number,
          districtName: district.district_name,
          districtEmail: district.district_email,
          districtPresident: district.district_president,
          districtDescription: district.district_description,
          siteUrl: district.site_url,
          districtDetails: JSON.stringify(extraDetails),
        })
        .save();
      return response.json(true);
    } catch (error) {
      if (error.code === "ER_DUP_ENTRY") {
        return response.json(
          new CustomReponse("District Number Already Exists")
        );
      }
    }
  }

  /**
   * @desc delete a district
   * @param  {} {response
   * @param  {HttpContextContract} params}
   * @returns Promise
   */
  public async destroy({
    response,
    params,
  }: HttpContextContract): Promise<void> {
    const districtToBeDeleted: Districts = await Districts.findOrFail(
      params.id
    );
    const clubFound: Clubs[] = await districtToBeDeleted
      .related("clubs")
      .query();
    if (clubFound.length <= 0) {
      await districtToBeDeleted.delete();
      return response.json(true);
    }
    const customReponse = new CustomReponse("This district has clubs!");
    return response.json(customReponse);
  }
}
