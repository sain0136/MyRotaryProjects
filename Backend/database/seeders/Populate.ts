import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import Club from "App/Models/Clubs";
import District from "App/Models/Districts";
import User from "App/Models/Users";
import {
  GrantType,
  ProjectStatus,
  RotaryRoles,
  UserType,
} from "Contracts/BackendInterfaces/Utility";
import Assets from "../../app/Models/Assets";
import Projects from "App/Models/Projects";
import { DateTime } from "luxon";
import { RotaryYear } from "Contracts/BackendInterfaces/RotaryYear";

export default class extends BaseSeeder {
  public async run() {
    await Assets.create({
      dmInitial: 800000,
      dsgIntial: 500000,
      clubIntial: 100000,
      globalIntial: 1200000,
    });
    await District.createMany([
      {
        districtName: "District 7000",
        districtNumber: "D-7000",
        districtEmail: "district7000@gmail.com",
        districtPresident: "John Stewert",
        districtDescription:
          "These are better (and almost always) handled at the database level instead of the application level. It's the job of the DBMS to enforce this kind of referential integrity assuming you define your schema correctly so that entities are correctly linked together, via foreign keys.",
        districtDetails: JSON.stringify({
          DdfCalculation: ["District Club Contribution"],
          dates: {
            grant_submission_closedate: "",
            grant_submission_startdate: "",
          },
          reportLinks: [],
          ddfCapes: {
            dsgCap: 0,
            dsgFraction: 0,
            dmCap: 0,
            dmFraction: 0,
          },
        }),
      },
      {
        districtName: "District 6000",
        districtNumber: "D-6000",
        districtPresident: "Daivd Polista",
        districtEmail: "peter@gmail.com",
        districtDetails: JSON.stringify({
          DdfCalculation: ["District Club Contribution"],
          dates: {
            grant_submission_closedate: "",
            grant_submission_startdate: "",
          },
          reportLinks: [],
          ddfCapes: {
            dsgCap: 0,
            dsgFraction: 0,
            dmCap: 0,
            dmFraction: 0,
          },
        }),
        districtDescription:
          "Every seeder file must extend the BaseSeeder class and implement the run method.The following example uses a Lucid model to create multiple users. However, you can also use the Database query builder directly. In other words, seeders don't care what you write inside the run method.",
      },
      {
        districtName: "District 5000",
        districtNumber: "D-1234",
        districtPresident: "Sebastien Saintrose",
        districtEmail: "pfsdfsdf@gmail.com",
        districtDetails: JSON.stringify({
          DdfCalculation: ["District Club Contribution"],
          dates: {
            grant_submission_closedate: "",
            grant_submission_startdate: "",
          },
          reportLinks: [],
          ddfCapes: {
            dsgCap: 0,
            dsgFraction: 0,
            dmCap: 0,
            dmFraction: 0,
          },
        }),
        districtDescription:
          "Every seeder file must extend the BaseSeeder class and implement the run method.The following example uses a Lucid model to create multiple users. However, you can also use the Database query builder directly. In other words, seeders don't care what you write inside the run method.",
      },
    ]);
    await Club.createMany([
      {
        clubName: "Cornwall",
        clubAddress: "239 Pitt Street",
        clubCity: "Cornwall",
        clubPostal: "K2C 4V5",
        clubProvince: "Ontario",
        clubCountry: "Canada",
        clubEmail: "cornwallian12@gmail.com",
        siteUrl: "https://www.cornwallrotary.com/",
        districtId: 1,
      },
      {
        clubName: "Brockville",
        clubAddress: "3543 Sud Street",
        clubCity: "CornwBrockvilleall",
        clubPostal: "R4H 4V5",
        clubProvince: "Ontario",
        clubCountry: "Canada",
        clubEmail: "brokallian12@gmail.com",
        siteUrl: "https://www.espn.com/",
        districtId: 1,
      },
    ]);
    const guest: User = await User.create({
      firstname: "John",
      lastname: "Doe",
      address: "234 bluders ave",
      userCity: "cornwall",
      userPostal: "K4V 2VC",
      userProvince: "Ontario",
      userCountry: "Canada",
      phone: "",
      email: "",
      password: "123456",
      districtId: 1,
      userType: UserType.District,
    });
    await guest.related("districtRole").attach({
      [1]: {
        district_role: RotaryRoles.GUEST,
      },
    });
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
      districtId: 1,
      clubId: 1,
      userType: UserType.District,
    });
    await siteAdminUser.related("districtRole").attach({
      [1]: {
        district_role: RotaryRoles.DISTRICTADMIN,
      },
    });
    const newUser: User = await User.create({
      firstname: "John",
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
      districtId: 1,
      clubId: 1,
      userType: UserType.District,
    });
    await newUser.related("districtRole").attach({
      [1]: {
        district_role: RotaryRoles.DISTRICTADMIN,
      },
    });
    const clubUser: User = await User.create({
      firstname: "Sandy",
      lastname: "Rosemen ",
      address: "544 ilop ave",
      userCity: "brockville",
      userPostal: "K4V 5D4",
      userProvince: "Ontario",
      userCountry: "Canada",
      phone: "613-455-6733",
      email: "admintyyy@gmail.com",
      password: "123456",
      extraDetails: JSON.stringify({}),
      clubId: 1,
      userType: UserType.Club,
    });
    await clubUser.related("clubRole").attach({
      [1]: {
        club_role: RotaryRoles.CLUBADMIN,
      },
    });
    await Projects.create({
      projectName: "Test Club Project",
      grantType: GrantType.CLUBPROJECT,
      projectStatus: ProjectStatus.LOOKINGFORFUNDING,
      projectNumber: 1000001,
      projectCode: "CP-1000001",
      projectDescription:
        "It works by capitalizing the very first letter in each sentence, and will then go on to transform the rest of the text into lowercase as well as converting i’s into I’s. Every letter after a full stop will get converted into an upper case letter.",
      country: "Italy",
      region: "Africa",
      startDate: DateTime.now(),
      completionDate: DateTime.now().set({ day: 31 }),
      areaFocus: JSON.stringify({
        Peace_Conflict_Prevention: false,
        Disease_Prevention_And_Treatment: true,
        Water_And_Sanitation: false,
        Maternal_And_Child_Health: false,
        Basic_Education_And_Literacy: false,
        Economic_And_Community_Development: false,
        Environment: false,
      }),
      fundingGoal: 5000,
      currentFunds: 1000,
      anticipatedFunding: 0,
      totalPledges: 0,
      fileUploads: JSON.stringify({
        reports_files: [],
        evidence_files: [],
      }),
      imageLink: JSON.stringify({}),
      createdBy: 2,
      clubId: 1,
      districtId: 1,
      rotaryYear: RotaryYear.getCurrentYear(),
    });
    await Projects.create({
      projectName: "Test Africa Project",
      grantType: GrantType.CLUBPROJECT,
      projectStatus: ProjectStatus.LOOKINGFORFUNDING,
      projectNumber: 1000002,
      projectCode: "CP-1000002",
      projectDescription:
        "It works by capitalizing the very first letter in each sentence, and will then go on to transform the rest of the text into lowercase as well as converting i’s into I’s. Every letter after a full stop will get converted into an upper case letter.",
      country: "Ghana",
      region: "Africa",
      startDate: DateTime.now(),
      completionDate: DateTime.now().set({ month: 4 }),
      areaFocus: JSON.stringify({
        Peace_Conflict_Prevention: false,
        Disease_Prevention_And_Treatment: true,
        Water_And_Sanitation: false,
        Maternal_And_Child_Health: false,
        Basic_Education_And_Literacy: false,
        Economic_And_Community_Development: false,
        Environment: false,
      }),
      fundingGoal: 5000,
      currentFunds: 1500,
      anticipatedFunding: 0,
      totalPledges: 0,
      fileUploads: JSON.stringify({
        reports_files: [],
        evidence_files: [],
      }),
      imageLink:  JSON.stringify({}),
      createdBy: 2,
      clubId: 1,
      districtId: 1,
      rotaryYear: RotaryYear.getCurrentYear(),
    });
    await Projects.create({
      projectName: "Test Club DSG",
      grantType: GrantType.DISTRICTSIMPLIFIEDPROJECT,
      projectStatus: ProjectStatus.LOOKINGFORFUNDING,
      projectNumber: 4000001,
      projectCode: "DSG-4000001",
      projectDescription:
        "It works by capitalizing the very first letter in each sentence, and will then go on to transform the rest of the text into lowercase as well as converting i’s into I’s. Every letter after a full stop will get converted into an upper case letter.",
      country: "Italy",
      region: "Africa",
      startDate: DateTime.now(),
      completionDate: DateTime.now().set({ day: 31 }),
      areaFocus: JSON.stringify({
        Peace_Conflict_Prevention: false,
        Disease_Prevention_And_Treatment: true,
        Water_And_Sanitation: false,
        Maternal_And_Child_Health: false,
        Basic_Education_And_Literacy: false,
        Economic_And_Community_Development: true,
        Environment: true,
      }),
      fundingGoal: 4000,
      currentFunds: 3000,
      anticipatedFunding: 0,
      totalPledges: 0,
      fileUploads: JSON.stringify({
        reports_files: [],
        evidence_files: [],
      }),
      imageLink:  JSON.stringify({}),
      createdBy: 2,
      clubId: 1,
      districtId: 1,
      rotaryYear: RotaryYear.getCurrentYear(),
      extraDescriptions: JSON.stringify({}),
      coOperatingOrganisationContribution: 0,
      districtSimplifiedGrantRequest: 0,
      intialSponsorClubContribution: 0,
      itemizedBudget: JSON.stringify([]),
    });
    await Projects.create({
      projectName: "Test Club DM",
      grantType: GrantType.DISTRICTMATCHINGPROJECT,
      projectStatus: ProjectStatus.LOOKINGFORFUNDING,
      projectNumber: 6000001,
      projectCode: "DM-6000001",
      projectDescription:
        "It works by capitalizing the very first letter in each sentence, and will then go on to transform the rest of the text into lowercase as well as converting i’s into I’s. Every letter after a full stop will get converted into an upper case letter.",
      country: "Italy",
      region: "Africa",
      startDate: DateTime.now(),
      completionDate: DateTime.now().set({ month: 11 }),
      areaFocus: JSON.stringify({
        Peace_Conflict_Prevention: true,
        Disease_Prevention_And_Treatment: true,
        Water_And_Sanitation: false,
        Maternal_And_Child_Health: false,
        Basic_Education_And_Literacy: true,
        Economic_And_Community_Development: false,
        Environment: false,
      }),
      fundingGoal: 15000,
      currentFunds: 11000,
      anticipatedFunding: 0,
      totalPledges: 0,
      fileUploads: JSON.stringify({
        reports_files: [],
        evidence_files: [],
      }),
      imageLink:  JSON.stringify({}),
      createdBy: 2,
      clubId: 1,
      districtId: 1,
      rotaryYear: RotaryYear.getCurrentYear(),
      extraDescriptions: JSON.stringify({}),
      coOperatingOrganisationContribution: 0,
      districtSimplifiedGrantRequest: 0,
      intialSponsorClubContribution: 0,
      itemizedBudget: JSON.stringify([]),
      hostclubInformation: JSON.stringify([]),
    });
  }
}