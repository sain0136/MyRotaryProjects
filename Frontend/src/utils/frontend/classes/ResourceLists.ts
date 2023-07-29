import {
  RotaryRoles,
  ProjectStatus,
  GrantType,
} from "@/utils/shared/interfaces/SharedInterface";
  
// List and common data needed
class ResourceLists {
   static unsafeTextReplacement =
    "This description is unsafe and has been replaced with this message. Please contact the webmaster if you believe this is an error.";

  constructor() {}

  static districtRoles: Array<string | undefined> = Object.keys(
    RotaryRoles
  ).map((ele: string) => {
    if (ele.includes("District")) {
      return ele;
    }
  });
 
  static formTabs = [
    { name: "Form", label: "Form" },
    { name: "Uploads", label: "Uploads" },
    { name: "Pdf", label: "Pdf" },
    { name: "Approval", label: "Approval" },
    { name: "Pledges", label: "Pledges" },
    { name: "Share", label: "Share" },
    { name: "Add Users", label: "Add Users" },
  ]

  static aboutUsDescription: string = ` MyRotaryProjects aims to simplify project lifecycle management for Rotary Districts.
     Developed by Peter Labelle of District 7040, the app will replace the previously manual process used for Rotary grant applications, pledge tracking,
      and reporting. With this app, users will be able to easily create and pledge to projects, as well as track their progress and report
       on their completion. The app is being designed to be user-friendly and efficient, and Peter Labelle is committed to ensuring its successful
        deployment and scalability for Rotary District 7040 and future districts.`;

  static siteValues = {
    adminEmail: "Peter.labelle@CornwallSunriseRotary.com ",
    adminPhone: "+1 613-362-4173",
    adminName: "Peter Labelle",
    adminPosition: "MyRotaryProjects Webmaster",
    adminClub: "Cornwall Sunrise Rotary Club",
    adminDistrict: "7040",
    adminCountry: "Canada",
    adminProvince: "Ontario",
    adminCity: "Cornwall",
    adminAddress: "239 Pitt Street",
    adminPostalCode: "Canada K6H 5R8",
    adminWebsite: "https://www.cornwallsunriserotary.com/",
    adminFacebook: "https://www.facebook.com/CornwallSunriseRotary/",
  };

  static areaFocusImages: Array<string> = [
    "/1-Peace-and-Conflict.png",
    "/2-Disease_Prevention.png",
    "/3-Water_and_Sanitation.png",
    "/4-Maternal_and_Child_Health.png",
    "/5-Basic_Education_and_Literacy.png",
    "/6-Economic_and_Community.png",
    "/7-Environment.png",
  ];

  static areaOfFocus: Array<string> = [
    "Peace Conflict Prevention",
    "Disease Prevention And Treatment",
    "Water And Sanitation",
    "Maternal And Child Health",
    "Basic Education And Literacy",
    "Economic And Community Development",
    "Environment",
  ];

  static clubRoles: Array<string> = ["Club Admin", "Standard Member"];

  static canadaProvinceList: Array<string> = [
    "Alberta",
    "British Columbia",
    "Manitoba",
    "New Brunswick",
    "Newfoundland and Labrador",
    "Northwest Territories",
    "Nova Scotia",
    "Nunavut",
    "Ontario",
    "Prince Edward Island",
    "Quebec",
    "Saskatchewan",
    "Yukon Territory",
  ];

  static unitedStatesList: Array<string> = [
    "Alaska",
    "Alabama",
    "Arkansas",
    "American Samoa",
    "Arizona",
    "California",
    "Colorado",
    "Connecticut",
    "District of Columbia",
    "Delaware",
    "Florida",
    "Georgia",
    "Guam",
    "Hawaii",
    "Iowa",
    "Idaho",
    "Illinois",
    "Indiana",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Massachusetts",
    "Maryland",
    "Maine",
    "Michigan",
    "Minnesota",
    "Missouri",
    "Mississippi",
    "Montana",
    "North Carolina",
    "North Dakota",
    "Nebraska",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "Nevada",
    "New York",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Puerto Rico",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Virginia",
    "Virgin Islands",
    "Vermont",
    "Washington",
    "Wisconsin",
    "West Virginia",
    "Wyoming",
  ];

  static northAmericaList: Array<string> = ["Canada", "United States"];

  static districtSimplifiedCriteria: Array<string> = [
    "	Projects should be short-term with the expectation of completion within the year the grant is received.",
    "	Priority will be given to local community projects and to International projects that are ineligible for TRF Matching Grants.",
    "	The project supported by this grant must respect the wishes, traditions and culture of the receiving community.",
    "	The project must promote the active and personal participation of Rotarians from all clubs involved in its implementation.",
    "	Project funds must not directly benefit a Rotarian, his/her spouse, a living Rotarian’s lineal descendant or ancestor or his/her spouse or an employee of a club, district or other Rotary entity or of Rotary International.",
    "	Project funds may not be used for salaries, travel or administrative overhead costs.",
    "	Project funds may not be used to reimburse applicants for projects already initiated or completed.",
    "	Project funds may not be used to purchase land or construct substantial buildings.",
    "	Project funds may not be used to fund a Rotary club’s on-going projects, but may be used to replicate successful projects that will benefit additional communities.",
    "	Projects must be sponsored by a Rotary club and/or district and publicly identified as such.",
    "	The stewardship of the DSG grant funds shall conform to the District Memorandum of Understanding.",
    "	The sponsor club shall appoint two Rotarians who will provide oversight and management of the project funds and who will serve as contacts for the District 7040 Rotary Foundation Committee.",
    "	Projects must adhere to Rotary’s seven areas of focus",
  ];

  static districtMatchingCriteria: Array<string> = [
    "	Priority will be given to International projects that are ineligible for TRF Global Grants.",
    "	Projects must be short-term with the expectation of completion within the year the grant is received.",
    " The project supported by this grant must respect the wishes, traditions and culture of the receiving community.",
    " The project must promote the active and personal participation of Rotarians from all clubs involved in its implementation.",
    " Project funds must not directly benefit a Rotarian, his/her spouse, a living Rotarian’s lineal descendant or ancestor or his/her spouse or an employee of a club, district or other Rotary entity or of Rotary International.",
    " Project funds may not be used for salaries, travel or administrative overhead costs.",
    " Project funds may not be used to reimburse applicants for projects already initiated or completed.",
    " Project funds may not be used to purchase land or construct substantial buildings.",
    " Project funds may not be used to fund a Rotary club’s on-going projects, but may be used to replicate successful projects that will benefit additional communities.",
    " Projects must be sponsored by a Rotary club and/or district and publicly identified as such.",
    " The stewardship of the Matching Grant funds shall conform to District Memorandum of Understanding.",
    " The sponsor club shall appoint two Rotarians who will provide oversight and management of the project funds and who will serve as contacts for the District 7040 Rotary Foundation Committee.",
    " Projects must adhere to Rotary’s six areas of focus.",
    " Participating clubs/districts must be certified.",
  ];

  static countryList: Array<string> = [
    "Canada",
    "United States",
    "Afghanistan",
    "Albania",
    "Algeria",
    "American Samoa",
    "Andorra",
    "Angola",
    "Anguilla",
    "Antarctica",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Aruba",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas (the)",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bermuda",
    "Bhutan",
    "Bolivia (Plurinational State of)",
    "Bonaire, Sint Eustatius and Saba",
    "Bosnia and Herzegovina",
    "Botswana",
    "Bouvet Island",
    "Brazil",
    "British Indian Ocean Territory (the)",
    "Brunei Darussalam",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cabo Verde",
    "Cambodia",
    "Cameroon",
    "Cayman Islands (the)",
    "Central African Republic (the)",
    "Chad",
    "Chile",
    "China",
    "Christmas Island",
    "Cocos (Keeling) Islands (the)",
    "Colombia",
    "Comoros (the)",
    "Congo (the Democratic Republic of the)",
    "Congo (the)",
    "Cook Islands (the)",
    "Costa Rica",
    "Croatia",
    "Cuba",
    "Curaçao",
    "Cyprus",
    "Czechia",
    "Côte d'Ivoire",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic (the)",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Eswatini",
    "Ethiopia",
    "Falkland Islands (the) [Malvinas]",
    "Faroe Islands (the)",
    "Fiji",
    "Finland",
    "France",
    "French Guiana",
    "French Polynesia",
    "French Southern Territories (the)",
    "Gabon",
    "Gambia (the)",
    "Georgia",
    "Germany",
    "Ghana",
    "Gibraltar",
    "Greece",
    "Greenland",
    "Grenada",
    "Guadeloupe",
    "Guam",
    "Guatemala",
    "Guernsey",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Heard Island and McDonald Islands",
    "Holy See (the)",
    "Honduras",
    "Hong Kong",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran (Islamic Republic of)",
    "Iraq",
    "Ireland",
    "Isle of Man",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jersey",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Korea (the Democratic People's Republic of)",
    "Korea (the Republic of)",
    "Kuwait",
    "Kyrgyzstan",
    "Lao People's Democratic Republic (the)",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Macao",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands (the)",
    "Martinique",
    "Mauritania",
    "Mauritius",
    "Mayotte",
    "Mexico",
    "Micronesia (Federated States of)",
    "Moldova (the Republic of)",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Montserrat",
    "Morocco",
    "Mozambique",
    "Myanmar",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands (the)",
    "New Caledonia",
    "New Zealand",
    "Nicaragua",
    "Niger (the)",
    "Nigeria",
    "Niue",
    "Norfolk Island",
    "Northern Mariana Islands (the)",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Palestine, State of",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines (the)",
    "Pitcairn",
    "Poland",
    "Portugal",
    "Puerto Rico",
    "Qatar",
    "Republic of North Macedonia",
    "Romania",
    "Russian Federation (the)",
    "Rwanda",
    "Réunion",
    "Saint Barthélemy",
    "Saint Helena, Ascension and Tristan da Cunha",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Martin (French part)",
    "Saint Pierre and Miquelon",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Sint Maarten (Dutch part)",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Georgia and the South Sandwich Islands",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "Sudan (the)",
    "Suriname",
    "Svalbard and Jan Mayen",
    "Sweden",
    "Switzerland",
    "Syrian Arab Republic",
    "Taiwan",
    "Tajikistan",
    "Tanzania, United Republic of",
    "Thailand",
    "Timor-Leste",
    "Togo",
    "Tokelau",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Turks and Caicos Islands (the)",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates (the)",
    "United Kingdom of Great Britain and Northern Ireland (the)",
    "United States Minor Outlying Islands (the)",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Venezuela (Bolivarian Republic of)",
    "Viet Nam",
    "Virgin Islands (British)",
    "Virgin Islands (U.S.)",
    "Wallis and Futuna",
    "Western Sahara",
    "Yemen",
    "Zambia",
    "Zimbabwe",
    "Åland Islands",
  ];

  static regionList: Array<string> = [
    "Africa",
    "Central America",
    "North America",
    "South America",
    "Asia",
    "South East Asia",
    "Eastern Europe",
    "Western Europe",
    "Middle East",
  ];

  static measurable: object = {
    Surveys: false,
    Questionnaires: false,
    Observations: false,
    Tests_Of_Knowledge: false,
    Interviews: false,
    Focus_Groups: false,
    Video_Media: false,
    Documents_Materials_Collections: false,
  };

  static measurableList: Array<string> = [
    "Surveys",
    "Questionnaires",
    "Observations",
    "Tests of Knowledge",
    "Interviews",
    "Focus Groups",
    "Video/Media",
    "Documents/Materials Collections",
  ];

  static statusList: Array<string> = Object.values(ProjectStatus);
  static grantTypeList: Array<string> = Object.values(GrantType);

  static searchTermConversionMap() {
    const searchTermConversionMap: Map<string, string> = new Map();
    searchTermConversionMap.set(
      "Peace Conflict Prevention",
      "Peace_Conflict_Prevention"
    );
    searchTermConversionMap.set(
      "Disease Prevention And Treatment",
      "Disease_Prevention_And_Treatment"
    );
    searchTermConversionMap.set("Water And Sanitation", "Water_And_Sanitation");
    searchTermConversionMap.set(
      "Maternal And Child Health",
      "Maternal_And_Child_Health"
    );
    searchTermConversionMap.set(
      "Basic Education And Literacy",
      "Basic_Education_And_Literacy"
    );
    searchTermConversionMap.set(
      "Economic And Community Development",
      "Economic_And_Community_Development"
    );
    searchTermConversionMap.set("Environment", "Environment");
    return searchTermConversionMap;
  }

  static reverseTermConversionMap() {
    const reverseTermConversionMap: Map<string, string> = new Map();
    reverseTermConversionMap.set(
      "Peace_Conflict_Prevention",
      "Peace Conflict Prevention"
    );
    reverseTermConversionMap.set(
      "Disease_Prevention_And_Treatment",
      "Disease Prevention And Treatment"
    );
    reverseTermConversionMap.set(
      "Water_And_Sanitation",
      "Water And Sanitation"
    );
    reverseTermConversionMap.set(
      "Maternal_And_Child_Health",
      "Maternal And Child Health"
    );
    reverseTermConversionMap.set(
      "Basic_Education_And_Literacy",
      "Basic Education And Literacy"
    );
    reverseTermConversionMap.set(
      "Economic_And_Community_Development",
      "Economic And Community Development"
    );
    reverseTermConversionMap.set("Environment", "Environment");
    return reverseTermConversionMap;
  }
}
export default ResourceLists;
