import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
// import Club from "../../app/Models/Clubs";
// import District from "../../app/Models/Districts";
import User from "../../app/Models/Users";
import {
/*   GrantType,
  ProjectStatus, */
  RotaryRoles,
  UserType,
} from "../../contracts/util/backend/interfaces/Utilities";
// import Assets from "../../app/Models/Assets";
// import Projects from "../../app/Models/Projects";
// import { DateTime } from "luxon";
// import RotaryYear from "Contracts/util/backend/classes/RotaryYear";
// import { FundingSource } from "Contracts/util/sharedUtility/interfaces/ProjectsInterface";

export default class extends BaseSeeder {
  public async run() {
    // await Assets.create({
    //   dmInitial: 100000,
    //   dsgInitial: 100000,
    //   clubInitial: 100001,
    //   globalInitial: 100000,
    //   assets: JSON.stringify({ main_logo: {} }),
    // });
    // await District.createMany([
    //   {
    //     districtName: "District 7000",
    //     districtNumber: "D-7000",
    //     districtEmail: "district7000@gmail.com",
    //     districtPresident: "John Stewert",
    //     districtDescription:
    //       "These are better (and almost always) handled at the database level instead of the application level. It's the job of the DBMS to enforce this kind of referential integrity assuming you define your schema correctly so that entities are correctly linked together, via foreign keys.",
    //     districtDetails: JSON.stringify({
    //       ddfCalculation: ["District Club Contribution"],
    //       dates: {
    //         grant_submission_closedate: '2023-05-19',
    //         grant_submission_startdate: '2023-03-19'
    //       },
    //       reportLinks: [],
    //       ddfCapes: {
    //         dmCap: '1000',
    //         dsgCap: '1000',
    //         dmFraction: '.5',
    //         dsgFraction: '1'
    //       },
    //     }),
    //   },
    //   {
    //     districtName: "District 6000",
    //     districtNumber: "D-6000",
    //     districtPresident: "Daivd Polista",
    //     districtEmail: "peter@gmail.com",
    //     districtDetails: JSON.stringify({
    //       ddfCalculation: ["District Club Contribution"],
    //       dates: {
    //         grant_submission_closedate: '2023-05-19',
    //         grant_submission_startdate: '2023-03-19'
    //       },
    //       reportLinks: [],
    //       ddfCapes: {
    //         dmCap: '1000',
    //         dsgCap: '1000',
    //         dmFraction: '.5',
    //         dsgFraction: '1'
    //       },
    //     }),
    //     districtDescription:
    //       "Every seeder file must extend the BaseSeeder class and implement the run method.The following example uses a Lucid model to create multiple users. However, you can also use the Database query builder directly. In other words, seeders don't care what you write inside the run method.",
    //   },
    //   {
    //     districtName: "District 5000",
    //     districtNumber: "D-1234",
    //     districtPresident: "Sebastien Saintrose",
    //     districtEmail: "pfsdfsdf@gmail.com",
    //     districtDetails: JSON.stringify({
    //       ddfCalculation: ["District Club Contribution"],
    //       dates: {
    //         grant_submission_closedate: "",
    //         grant_submission_startdate: "",
    //       },
    //       reportLinks: [],
    //       ddfCapes: {
    //         dsgCap: 0,
    //         dsgFraction: 0,
    //         dmCap: 0,
    //         dmFraction: 0,
    //       },
    //     }),
    //     districtDescription:
    //       "Every seeder file must extend the BaseSeeder class and implement the run method.The following example uses a Lucid model to create multiple users. However, you can also use the Database query builder directly. In other words, seeders don't care what you write inside the run method.",
    //   },
    // ]);
    // await Club.createMany([
    //   {
    //     clubName: "Cornwall",
    //     clubAddress: "239 Pitt Street",
    //     clubCity: "Cornwall",
    //     clubPostal: "K2C 4V5",
    //     clubProvince: "Ontario",
    //     clubCountry: "Canada",
    //     clubEmail: "cornwallian12@gmail.com",
    //     siteUrl: "https://www.cornwallrotary.com/",
    //     districtId: 1,
    //   },
    //   {
    //     clubName: "Brockville",
    //     clubAddress: "3543 Sud Street",
    //     clubCity: "CornwBrockvilleall",
    //     clubPostal: "R4H 4V5",
    //     clubProvince: "Ontario",
    //     clubCountry: "Canada",
    //     clubEmail: "brokallian12@gmail.com",
    //     siteUrl: "https://www.espn.com/",
    //     districtId: 1,
    //   },
    // ]);
    // const guest: User = await User.create({
    //   firstname: "John",
    //   lastname: "Doe",
    //   address: "234 bluders ave",
    //   userCity: "cornwall",
    //   userPostal: "K4V 2VC",
    //   userProvince: "Ontario",
    //   userCountry: "Canada",
    //   phone: "",
    //   email: "",
    //   password: "123456",
    //   districtId: 4,
    //   userType: UserType.District,
    // });
    // await guest.related("districtRole").attach({
    //   [1]: {
    //     district_role: RotaryRoles.GUEST,
    //   },
    // });
    const siteAdminUser: User = await User.create({
      firstname: "Peter",
      lastname: "Labelle",
      address: "329 Pitt",
      userCity: "Cornwall",
      userPostal: "K4V 2VC",
      userProvince: "Ontario",
      userCountry: "Canada",
      phone: "613-330-5423",
      email: "admin@myrotaryrotaryprojects.com",
      password: "WeThr3K1ngsFrom@Far",
      extraDetails: JSON.stringify({
        yarn: "They are full!",
        number: [1, 2, 3, 4],
      }),
      districtId: 4,
      clubId: 3,
      userType: UserType.District,
    });
    await siteAdminUser.related("districtRole").attach({
      [1]: {
        district_role: RotaryRoles.DISTRICTADMIN,
      },
    });
    const newUser: User = await User.create({
      firstname: "Jean",
      lastname: "Saint Rose ",
      address: "234 bluders ave",
      userCity: "cornwall",
      userPostal: "K4V 2VC",
      userProvince: "Ontario",
      userCountry: "Canada",
      phone: "613-330-5423",
      email: "jssr26@gmail.com",
      password: "123456",
      extraDetails: JSON.stringify({}),
      districtId: 4,
      clubId: 3,
      userType: UserType.District,
    });
    await newUser.related("districtRole").attach({
      [1]: {
        district_role: RotaryRoles.DISTRICTADMIN,
      },
    });
    // const clubUser: User = await User.create({
    //   firstname: "Sandy",
    //   lastname: "Rosemen ",
    //   address: "544 ilop ave",
    //   userCity: "brockville",
    //   userPostal: "K4V 5D4",
    //   userProvince: "Ontario",
    //   userCountry: "Canada",
    //   phone: "613-455-6733",
    //   email: "admintyyy@gmail.com",
    //   password: "123456",
    //   extraDetails: JSON.stringify({}),
    //   clubId: 1,
    //   userType: UserType.Club,
    // });
    // await clubUser.related("clubRole").attach({
    //   [1]: {
    //     club_role: RotaryRoles.CLUBADMIN,
    //   },
    // });
    // await Projects.create({
    //   projectName: "Test Club Project",
    //   grantType: GrantType.CLUBPROJECT,
    //   projectStatus: ProjectStatus.LOOKINGFORFUNDING,
    //   projectNumber: 100000,
    //   projectCode: "CP-100000",
    //   projectDescription:
    //     "It works by capitalizing the very first letter in each sentence, and will then go on to transform the rest of the text into lowercase as well as converting i’s into I’s. Every letter after a full stop will get converted into an upper case letter.",
    //   country: "Italy",
    //   region: "Africa",
    //   startDate: DateTime.now(),
    //   completionDate: DateTime.now().set({ day: 31 }),
    //   areaFocus: JSON.stringify({
    //     Peace_Conflict_Prevention: false,
    //     Disease_Prevention_And_Treatment: true,
    //     Water_And_Sanitation: false,
    //     Maternal_And_Child_Health: false,
    //     Basic_Education_And_Literacy: false,
    //     Economic_And_Community_Development: false,
    //     Environment: false,
    //   }),
    //   fundingGoal: 5000,
    //   anticipatedFunding: 200,
    //   totalPledges: 0,
    //   fileUploads: JSON.stringify({
    //     reports_files: [],
    //     evidence_files: [],
    //   }),
    //   imageLink: JSON.stringify({}),
    //   createdBy: 2,
    //   clubId: 1,
    //   districtId: 1,
    //   rotaryYear: RotaryYear.getCurrentYear(),
    // });
    // await Projects.create({
    //   projectName: "Test Africa Project",
    //   grantType: GrantType.CLUBPROJECT,
    //   projectStatus: ProjectStatus.LOOKINGFORFUNDING,
    //   projectNumber: 100001,
    //   projectCode: "CP-100001",
    //   projectDescription:
    //     "It works by capitalizing the very first letter in each sentence, and will then go on to transform the rest of the text into lowercase as well as converting i’s into I’s. Every letter after a full stop will get converted into an upper case letter.",
    //   country: "Ghana",
    //   region: "Africa",
    //   startDate: DateTime.now(),
    //   completionDate: DateTime.now().set({ month: 4 }),
    //   areaFocus: JSON.stringify({
    //     Peace_Conflict_Prevention: false,
    //     Disease_Prevention_And_Treatment: true,
    //     Water_And_Sanitation: false,
    //     Maternal_And_Child_Health: false,
    //     Basic_Education_And_Literacy: false,
    //     Economic_And_Community_Development: false,
    //     Environment: false,
    //   }),
    //   fundingGoal: 5000,
    //   anticipatedFunding: 0,
    //   totalPledges: 0,
    //   fileUploads: JSON.stringify({
    //     reports_files: [],
    //     evidence_files: [],
    //   }),
    //   imageLink: JSON.stringify({}),
    //   createdBy: 2,
    //   clubId: 1,
    //   districtId: 1,
    //   rotaryYear: RotaryYear.getCurrentYear(),
    // });
    // await Projects.create({
    //   projectName: "Test Club DSG",
    //   grantType: GrantType.DISTRICTSIMPLIFIEDPROJECT,
    //   projectStatus: ProjectStatus.LOOKINGFORFUNDING,
    //   projectNumber: 100000,
    //   projectCode: "DSG-100000",
    //   projectDescription:
    //     "It works by capitalizing the very first letter in each sentence, and will then go on to transform the rest of the text into lowercase as well as converting i’s into I’s. Every letter after a full stop will get converted into an upper case letter.",
    //   country: "Italy",
    //   region: "Africa",
    //   startDate: DateTime.now(),
    //   completionDate: DateTime.now().set({ day: 31 }),
    //   areaFocus: JSON.stringify({
    //     Peace_Conflict_Prevention: false,
    //     Disease_Prevention_And_Treatment: true,
    //     Water_And_Sanitation: false,
    //     Maternal_And_Child_Health: false,
    //     Basic_Education_And_Literacy: false,
    //     Economic_And_Community_Development: true,
    //     Environment: true,
    //   }),
    //   fundingGoal: 4000,
    //   anticipatedFunding: 500,
    //   totalPledges: 0,
    //   fileUploads: JSON.stringify({
    //     reports_files: [],
    //     evidence_files: [],
    //   }),
    //   imageLink: JSON.stringify({}),
    //   createdBy: 2,
    //   clubId: 1,
    //   districtId: 1,
    //   rotaryYear: RotaryYear.getCurrentYear(),
    //   extraDescriptions: JSON.stringify({
    //     other_club_contribution: 0,
    //     other_sources: 0,
    //     fundingSourceArray: [] as FundingSource[],
    //     benefit_community_description: "",
    //     co_operating_organisation_letter: "",
    //     non_financial_participation: "",
    //     primary_contact: {
    //       address: "",
    //       email: "",
    //       cell: "",
    //       name: "",
    //       phone: "",
    //     },
    //     secondary_contact: {
    //       address: "",
    //       email: "",
    //       cell: "",
    //       name: "",
    //       phone: "",
    //     },
    //     sectionD: {
    //       community_benefit: "",
    //       project_accountability: "",
    //       ownership_project: "",
    //       inventory_project: "",
    //       customs_clearance: "",
    //     },
    //     sectionE: {
    //       project_capacity: "",
    //       project_sustainment: "",
    //       e: {
    //         Surveys: false,
    //         Questionnaires: false,
    //         Observations: false,
    //         Tests_Of_Knowledge: false,
    //         Interviews: false,
    //         Focus_Groups: false,
    //         Video_Media: false,
    //         Documents_Materials_Collections: false,
    //       },
    //     },
    //   }),
    //   coOperatingOrganisationContribution: 0,
    //   districtSimplifiedGrantRequest: 0,
    //   intialSponsorClubContribution: 0,
    //   itemizedBudget: JSON.stringify([]),
    // });
    // await Projects.create({
    //   projectName: "Test Club DM",
    //   grantType: GrantType.DISTRICTMATCHINGPROJECT,
    //   projectStatus: ProjectStatus.LOOKINGFORFUNDING,
    //   projectNumber: 100000,
    //   projectCode: "DM-100000",
    //   projectDescription:
    //     "It works by capitalizing the very first letter in each sentence, and will then go on to transform the rest of the text into lowercase as well as converting i’s into I’s. Every letter after a full stop will get converted into an upper case letter.",
    //   country: "Italy",
    //   region: "Africa",
    //   startDate: DateTime.now(),
    //   completionDate: DateTime.now().set({ month: 11 }),
    //   areaFocus: JSON.stringify({
    //     Peace_Conflict_Prevention: true,
    //     Disease_Prevention_And_Treatment: true,
    //     Water_And_Sanitation: false,
    //     Maternal_And_Child_Health: false,
    //     Basic_Education_And_Literacy: true,
    //     Economic_And_Community_Development: false,
    //     Environment: false,
    //   }),
    //   fundingGoal: 15000,
    //   anticipatedFunding: 1500,
    //   totalPledges: 0,
    //   fileUploads: JSON.stringify({
    //     reports_files: [],
    //     evidence_files: [],
    //   }),
    //   imageLink: JSON.stringify({}),
    //   createdBy: 2,
    //   clubId: 1,
    //   districtId: 1,
    //   rotaryYear: RotaryYear.getCurrentYear(),
    //   extraDescriptions: JSON.stringify({
    //     other_club_contribution: 0,
    //     other_sources: 0,
    //     fundingSourceArray: [] as FundingSource[],
    //     benefit_community_description: "",
    //     co_operating_organisation_letter: "",
    //     non_financial_participation: "",
    //     primary_contact: {
    //       address: "",
    //       email: "",
    //       cell: "",
    //       name: "",
    //       phone: "",
    //     },
    //     secondary_contact: {
    //       address: "",
    //       email: "",
    //       cell: "",
    //       name: "",
    //       phone: "",
    //     },
    //     sectionD: {
    //       community_benefit: "",
    //       project_accountability: "",
    //       ownership_project: "",
    //       inventory_project: "",
    //       customs_clearance: "",
    //     },
    //     sectionE: {
    //       project_capacity: "",
    //       project_sustainment: "",
    //       e: {
    //         Surveys: false,
    //         Questionnaires: false,
    //         Observations: false,
    //         Tests_Of_Knowledge: false,
    //         Interviews: false,
    //         Focus_Groups: false,
    //         Video_Media: false,
    //         Documents_Materials_Collections: false,
    //       },
    //     },
    //   }),
    //   coOperatingOrganisationContribution: 0,
    //   districtSimplifiedGrantRequest: 0,
    //   intialSponsorClubContribution: 0,
    //   itemizedBudget: JSON.stringify([]),
    //   hostclubInformation: JSON.stringify({
    //     host_club_name: "",
    //     district_number: "",
    //     district_country: "",
    //     location_city: "",
    //     location_country: "",
    //     location_community: "",
    //     host_primary_contact: {
    //       name: "",
    //       address: "",
    //       phone: "",
    //       email: "",
    //       cell: "",
    //     },
    //     listOfObjectives: [] as string[],
    //     host_sponsor_planned_project_description: "",
    //     host_commit_description: "",
    //     international_commit_description: "",
    //     sponsor_publicize_description: "",
    //     sectionC: {
    //       cooperating_organizations: [
    //         {
    //           organization_name: "",
    //           address: "",
    //           contact_person: {
    //             name: "",
    //             address: "",
    //             phone: "",
    //             email: "",
    //             cell: "",
    //           },
    //           website_address: "",
    //         },
    //       ],
    //       cooperating_organizations_roles_description: "",
    //       cooperating_organizations_identify_members: "",
    //     },
    //     sectionF: {
    //       local_currency_name: "",
    //       exchange_rate: "",
    //     },
    //   }),
    // });
  }
}
