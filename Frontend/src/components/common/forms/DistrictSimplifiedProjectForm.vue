<template>
  <div class="landing_header w-full">
    <h1 class="header2_h1">District Simplified Project Form</h1>
  </div>
  <div class="formtabs_container p-4 md:p-24">
    <ul
      class="flex flex-wrap justify-center border-b border-gray-200 text-center text-sm font-medium text-gray-500 dark:border-gray-700 dark:text-gray-400"
    >
      <li class="mr-2" v-for="tab in tabs" :key="tab.name">
        <a
          @click="activeTab = tab.name"
          class="inline-block cursor-pointer rounded-t-lg p-4 text-2xl hover:bg-gray-50 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300"
          :class="{
            ' active  bg-gray-100 text-primary-dark-color dark:bg-gray-800 dark:text-blue-500':
              tab.name === activeTab,
          }"
        >
          {{ tab.label }}
        </a>
      </li>
    </ul>
    <div class="form_wrapper" v-if="activeTab === 'Form'">
      <h1
        class="my-4 text-center underline underline-offset-8"
        :class="tailwind.H1"
      >
        District Simplified Grants Club Application Form Criteria
      </h1>
      <ul class="my-8 px-4">
        <li class="list-disc" v-for="listItem in criteriaList" :key="listItem">
          {{ listItem }}
        </li>
      </ul>
      <hr :class="tailwind.FORMHR" />
      <div class="form_container">
        <div class="form_item half_width">
          <BaseInputsText
            label="Project Name*"
            v-model="projectToUpdateOrCreate.project_name"
          />
          <ErrorValidation
            v-if="v$.projectToUpdateOrCreate.project_name.$error"
            :errorMsg="
              v$.projectToUpdateOrCreate.project_name.$errors[0].$message
            "
          />
        </div>
        <div class="form_item full_width">
          <BaseTextArea
            v-model="projectToUpdateOrCreate.project_description"
            label="Description*"
          />
          <ErrorValidation
            v-if="v$.projectToUpdateOrCreate.project_description.$error"
            :errorMsg="
              v$.projectToUpdateOrCreate.project_description.$errors[0].$message
            "
          />
        </div>
        <div class="form_item">
          <BaseSelect
            v-model="projectToUpdateOrCreate.country"
            :options="countryList"
            label="Country*"
          />
          <ErrorValidation
            v-if="v$.projectToUpdateOrCreate.country.$error"
            :errorMsg="v$.projectToUpdateOrCreate.country.$errors[0].$message"
          />
        </div>
        <div class="form_item">
          <BaseSelect
            v-model="projectToUpdateOrCreate.region"
            :options="regionList"
            label="Region*"
          />
          <ErrorValidation
            v-if="v$.projectToUpdateOrCreate.region.$error"
            :errorMsg="v$.projectToUpdateOrCreate.region.$errors[0].$message"
          />
        </div>
        <div class="form_item">
          <BaseDatePicker
            v-model="projectToUpdateOrCreate.start_date"
            label="Project Start Date*"
          />
          <ErrorValidation
            v-if="v$.projectToUpdateOrCreate.start_date.$error"
            :errorMsg="
              v$.projectToUpdateOrCreate.start_date.$errors[0].$message
            "
          />
        </div>
        <div class="form_item">
          <BaseDatePicker
            v-model="projectToUpdateOrCreate.completion_date"
            label="Project Completion Date*"
          />
          <ErrorValidation
            v-if="v$.projectToUpdateOrCreate.completion_date.$error"
            :errorMsg="
              v$.projectToUpdateOrCreate.completion_date.$errors[0].$message
            "
          />
        </div>
        <div class="form_item full_width">
          <h3 class="form_item full_width text-center" :class="tailwind.H3">
            Areaa of Focus
          </h3>
          <div class="areaoffocus_container">
            <div class="item">
              <img :src="areaFocusImages[0]" alt="" />
              <BaseCheckBox
                v-model="
                  projectToUpdateOrCreate.area_focus.Peace_Conflict_Prevention
                "
                :label="
                  areaFocusList.find(
                    (area) => area.key === 'Peace_Conflict_Prevention'
                  )?.label
                "
              />
            </div>
            <div class="item">
              <img :src="areaFocusImages[1]" alt="" />
              <BaseCheckBox
                v-model="
                  projectToUpdateOrCreate.area_focus
                    .Disease_Prevention_And_Treatment
                "
                :label="
                  areaFocusList.find(
                    (area) => area.key === 'Disease_Prevention_And_Treatment'
                  )?.label
                "
              />
            </div>
            <div class="item">
              <img :src="areaFocusImages[2]" alt="" />
              <BaseCheckBox
                v-model="
                  projectToUpdateOrCreate.area_focus.Water_And_Sanitation
                "
                :label="
                  areaFocusList.find(
                    (area) => area.key === 'Water_And_Sanitation'
                  )?.label
                "
              />
            </div>
            <div class="item">
              <img :src="areaFocusImages[3]" alt="" />
              <BaseCheckBox
                v-model="
                  projectToUpdateOrCreate.area_focus.Maternal_And_Child_Health
                "
                :label="
                  areaFocusList.find(
                    (area) => area.key === 'Maternal_And_Child_Health'
                  )?.label
                "
              />
            </div>
            <div class="item">
              <img :src="areaFocusImages[4]" alt="" />
              <BaseCheckBox
                v-model="
                  projectToUpdateOrCreate.area_focus
                    .Basic_Education_And_Literacy
                "
                :label="
                  areaFocusList.find(
                    (area) => area.key === 'Basic_Education_And_Literacy'
                  )?.label
                "
              />
            </div>
            <div class="item">
              <img :src="areaFocusImages[5]" alt="" />
              <BaseCheckBox
                v-model="
                  projectToUpdateOrCreate.area_focus
                    .Economic_And_Community_Development
                "
                :label="
                  areaFocusList.find(
                    (area) => area.key === 'Economic_And_Community_Development'
                  )?.label
                "
              />
            </div>
            <div class="item">
              <img :src="areaFocusImages[6]" alt="" />
              <BaseCheckBox
                v-model="projectToUpdateOrCreate.area_focus.Environment"
                :label="
                  areaFocusList.find((area) => area.key === 'Environment')
                    ?.label
                "
              />
            </div>
          </div>
          <ErrorValidation
            v-if="v$.projectToUpdateOrCreate.area_focus.$error"
            :errorMsg="
              v$.projectToUpdateOrCreate.area_focus.$errors[0].$message
            "
          />
        </div>
        <div class="form_item full_width">
          <BaseTextArea
            label="1. Describe how the project will benefit the community or address a community need.*"
            v-model="
              projectToUpdateOrCreate.extra_descriptions
                .benefit_community_description
            "
          />
          <ErrorValidation
            v-if="
              v$.projectToUpdateOrCreate.extra_descriptions
                .benefit_community_description.$error
            "
            :errorMsg="
              v$.projectToUpdateOrCreate.extra_descriptions
                .benefit_community_description.$errors[0].$message
            "
          />
        </div>
        <div class="form_item full_width">
          <BaseTextArea
            label="2. Describe the non-financial participation by Rotarians in the project.*"
            v-model="
              projectToUpdateOrCreate.extra_descriptions
                .non_financial_participation
            "
          />
          <ErrorValidation
            v-if="
              v$.projectToUpdateOrCreate.extra_descriptions
                .non_financial_participation.$error
            "
            :errorMsg="
              v$.projectToUpdateOrCreate.extra_descriptions
                .non_financial_participation.$errors[0].$message
            "
          />
        </div>
        <div class="form_item full_width">
          <BaseTextArea
            label="3. If a co-operating organisation will be involved in the project, provide a letter stating its role in the project and how Rotarians will interface with the organisation."
            v-model="
              projectToUpdateOrCreate.extra_descriptions
                .co_operating_organisation_letter
            "
          />
        </div>
        <div class="form_item full_width"></div>
        <div class="form_item full_width">
          <h3 class="text-center" :class="tailwind.H3">
            {{ headerFormatter("Primary and Optional Seconday contacts") }}
          </h3>
        </div>
        <div class="form_item">
          <BaseInputsText
            label="Primary Contact Name*"
            v-model="
              projectToUpdateOrCreate.extra_descriptions.primary_contact.name
            "
          />
          <ErrorValidation
            v-if="
              v$.projectToUpdateOrCreate.extra_descriptions.primary_contact.name
                .$error
            "
            :errorMsg="
              v$.projectToUpdateOrCreate.extra_descriptions.primary_contact.name
                .$errors[0].$message
            "
          />
        </div>
        <div class="form_item">
          <BaseInputsText
            label="Primary Contact Address*"
            v-model="
              projectToUpdateOrCreate.extra_descriptions.primary_contact.address
            "
          />
          <ErrorValidation
            v-if="
              v$.projectToUpdateOrCreate.extra_descriptions.primary_contact
                .address.$error
            "
            :errorMsg="
              v$.projectToUpdateOrCreate.extra_descriptions.primary_contact
                .address.$errors[0].$message
            "
          />
        </div>
        <div class="form_item">
          <BaseInputsText
            label="Primary Contact Email*"
            v-model="
              projectToUpdateOrCreate.extra_descriptions.primary_contact.email
            "
          />
          <ErrorValidation
            v-if="
              v$.projectToUpdateOrCreate.extra_descriptions.primary_contact
                .email.$error
            "
            :errorMsg="
              v$.projectToUpdateOrCreate.extra_descriptions.primary_contact
                .email.$errors[0].$message
            "
          />
        </div>
        <div class="form_item">
          <BaseInputsText
            label="Primary Contact Phone*"
            v-model="
              projectToUpdateOrCreate.extra_descriptions.primary_contact.phone
            "
          />
          <ErrorValidation
            v-if="
              v$.projectToUpdateOrCreate.extra_descriptions.primary_contact
                .phone.$error
            "
            :errorMsg="
              v$.projectToUpdateOrCreate.extra_descriptions.primary_contact
                .phone.$errors[0].$message
            "
          />
        </div>
        <hr :class="tailwind.FORMHR" />
        <div class="form_item">
          <BaseInputsText
            label="Secondary Contact Name"
            v-model="
              projectToUpdateOrCreate.extra_descriptions.secondary_contact.name
            "
          />
        </div>
        <div class="form_item">
          <BaseInputsText
            label="Secondary Contact Address"
            v-model="
              projectToUpdateOrCreate.extra_descriptions.secondary_contact
                .address
            "
          />
        </div>
        <div class="form_item">
          <BaseInputsText
            label="Secondary Contact Email"
            v-model="
              projectToUpdateOrCreate.extra_descriptions.secondary_contact.email
            "
          />
        </div>
        <div class="form_item">
          <BaseInputsText
            label="Secondary Contact Phone"
            v-model="
              projectToUpdateOrCreate.extra_descriptions.secondary_contact.phone
            "
          />
        </div>
        <div class="form_item full_width">
          <h3 class="text-center" :class="tailwind.H3">
            {{
              headerFormatter(
                "Provide a complete, detailed and itemised budget for the entire project. ( Supporting documents may be requested )"
              )
            }}
          </h3>
          <n-h3 class="text-center">{{
            headerFormatter(
              "All Budget Items and Funding Sources will be recorded in USD!"
            )
          }}</n-h3>
        </div>
        <div class="form_item full_width">
          <div class="relative overflow-x-auto max-w-screen-md shadow-md sm:rounded-lg">
            <table id="item_table" class="min-w-full text-left text-sm text-gray-500">
              <thead class="bg-gray-50 text-xs uppercase text-gray-700">
                <tr>
                  <th scope="col" :class="tailwind.TABLEHEADER">Item Name</th>
                  <th scope="col" :class="tailwind.TABLEHEADER">Cost</th>
                  <th scope="col" :class="tailwind.TABLEHEADER">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b bg-white">
                  <td class="px-6 py-4">
                    <BaseInputsText v-model="budgetItemName" />
                  </td>
                  <td class="px-6 py-4">
                    <BaseInputsText v-model="budgetItemCost" />
                  </td>
                  <td class="px-6 py-4 text-center">
                    <button
                      title="Add item"
                      class="plus_icon hover:text-primary-color"
                      @click="addToBudget(budgetItemName, budgetItemCost)"
                    >
                      <font-awesome-icon icon="fa-solid fa-circle-plus" />
                    </button>
                  </td>
                </tr>
                <tr
                  class="border-b bg-gray-50"
                  id="funding_source"
                  v-for="(
                    item, index
                  ) in projectToUpdateOrCreate.itemized_budget"
                  :key="index"
                >
                  <td class="px-6 py-4 font-medium text-gray-900">
                    {{ item.itemName }}
                  </td>
                  <td class="px-6 py-4">
                    {{ item.itemCost }}
                  </td>
                  <td class="px-6 py-4">
                    <button
                      title="Delete item"
                      class="crud-buttons"
                      @click="deleteItemByIndex(index)"
                    >
                      <font-awesome-icon
                        class="social-icon"
                        icon="trash-alt"
                      ></font-awesome-icon>
                    </button>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td></td>
                  <td
                    class="border-2 border-primary-color px-6 py-4 font-bold text-gray-900"
                  >
                    Total Budget:
                  </td>
                  <td
                    class="border-2 border-primary-color px-6 py-4 font-bold text-gray-900"
                  >
                    <!-- USD {{ sumOfItemsCost }} -->
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
        <div class="form_item full_width">
          <h3
            class="border-2 border-primary-color p-2 text-center text-lg font-bold text-primary-black"
          >
            {{
              headerFormatter(
                "Your District will match District club contributions "
              )
            }}
            {{
              "( " +
              store.loggedInUsersDistrict.district_details.ddfCapes.dsgFraction
            }}
            {{ headerFormatter(" : 1 ) up to a maximum of $") }}
            {{
              store.loggedInUsersDistrict.district_details.ddfCapes.dsgCap +
              " USD. "
            }}
            {{
              headerFormatter(
                "on a first come basis depending upon availability of DDF."
              )
            }}
          </h3>
        </div>
        <div class="form_item full_width">
          <h3
            class="border-2 border-primary-color p-2 text-center text-lg font-bold text-primary-black"
          >
            {{
              headerFormatter(
                "* Your District calculates District Designated Funds from these funding sources: "
              )
            }}
            <strong class="text-center text-primary-green">
              {{ fundingSourcesArrary }}</strong
            >
          </h3>
        </div>
        <div class="form_item full_width">
          <h3
            class="border-2 border-primary-color p-2 text-center text-lg font-bold text-primary-black"
          >
            {{ headerFormatter("your current DDF request limit: $ ") }}
            {{ districtSimplifiedGrantRequestLimit }} USD
          </h3>
        </div>
        <hr :class="tailwind.FORMHR" />
        <div class="form_item full_width">
          <div class="relative overflow-x-auto">
            <table
              id="funding_source_table"
              class="w-full 6
              
              
              
              
              
              2522222222222222222222222222222222222223333text-left text-sm text-gray-500"
            >
              <thead class="bg-gray-50 text-xs uppercase text-gray-700">
                <tr>
                  <th scope="col" :class="tailwind.TABLEHEADER">#</th>
                  <th scope="col" :class="tailwind.TABLEHEADER">Source</th>
                  <th scope="col" :class="tailwind.TABLEHEADER">Details</th>
                  <th scope="col" :class="tailwind.TABLEHEADER">Amount</th>
                  <th scope="col" :class="tailwind.TABLEHEADER">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b bg-white">
                  <td class="px-6 py-4">*</td>
                  <td class="px-6 py-4">
                    <BaseSelect
                      :options="addFundingSource"
                      v-model="fundingSourceAdd"
                    />
                  </td>
                  <td class="px-6 py-4">
                    <BaseInputsText v-model="fundingSources.typeOfFunding" />
                  </td>
                  <td class="px-6 py-4">
                    <BaseInputsText v-model="fundingSources.amount" />
                  </td>
                  <td class="px-6 py-4">
                    <button
                      title="Add item"
                      class="crud-buttons text-lg hover:text-primary-color"
                      @click="addToFundsArray()"
                    >
                      <font-awesome-icon icon="fa-solid fa-circle-plus" />
                    </button>
                  </td>
                </tr>
                <tr
                  class="border-b bg-gray-50"
                  id="funding_source"
                  v-for="(item, index) in projectToUpdateOrCreate
                    .extra_descriptions.fundingSourceArray"
                  :key="index"
                >
                  <td class="px-6 py-4 font-medium text-gray-900">
                    {{ index + 1 }}
                  </td>
                  <td class="px-6 py-4">
                    {{ item.sourceName }}
                  </td>
                  <td class="px-6 py-4">
                    {{ item.typeOfFunding }}
                  </td>
                  <td class="px-6 py-4">
                    {{ item.amount }}
                  </td>
                  <td class="px-6 py-4">
                    <button
                      title="Delete item"
                      class="crud-buttons"
                      @click="deleteFromFundsArray(index)"
                    >
                      <font-awesome-icon
                        class="social-icon"
                        icon="trash-alt"
                      ></font-awesome-icon>
                    </button>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td
                    class="border-2 border-primary-color px-6 py-4 font-bold text-gray-900"
                  >
                    Total Funding:
                  </td>
                  <td
                    class="border-2 border-primary-color px-6 py-4 font-bold text-gray-900"
                  >
                    <!-- USD {{ sumOfAnticipatedFunding }} -->
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        <div class="form_item"></div>
        <div class="form_item full_width"></div>
      </div>
    </div>
    <div v-else-if="activeTab === 'Uploads'">Uploads</div>
    <div v-else-if="activeTab === 'Pdf'">Pdf</div>
    <div v-else-if="activeTab === 'Pledges'">Pledges</div>
    <div v-else-if="activeTab === 'Share'">Share</div>
    <div v-else-if="activeTab === 'Add Users'">Add Users</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useNotification } from "naive-ui";
import {
  FORM_MODE_PROP,
  MyError,
  TAILWIND_COMMON_CLASSES,
  type IApiError,
} from "@/utils/frontend/interfaces/Frontend";
import ResourceLists from "@/utils/frontend/classes/ResourceLists";
import { ErrorMessages } from "@/utils/frontend/interfaces/Frontend";
import BaseDatePicker from "@/components/common/baseformComponents/BaseDatePicker.vue";
import RotaryButton from "@/components/common/RotaryButton.vue";
import BaseFileUpload from "@/components/common/baseformComponents/BaseFileUpload.vue";
import BaseSelect from "@/components/common/baseformComponents/BaseSelect.vue";
import BaseCheckBox from "@/components/common/baseformComponents/BaseCheckBox.vue";
import BaseInputsText from "@/components/common/baseformComponents/BaseInputsText.vue";
import BaseInputsTextEmail from "@/components/common/baseformComponents/BaseInputsTextEmail.vue";
import BaseTextArea from "@/components/common/baseformComponents/BaseTextArea.vue";
import useVuelidate from "@vuelidate/core";
import { useRotaryStore } from "@/stores/rotaryStore";
import ErrorValidation from "@/components/common/baseformComponents/ErrorValidation.vue";
import type {
  FundingSource,
  IDsgProject,
} from "@/utils/shared/interfaces/ProjectsInterface";
import {
  email,
  helpers,
  maxLength,
  minLength,
  required,
} from "@vuelidate/validators";
import Utilities from "@/utils/frontend/classes/Utilities";
import DsgProject from "@/utils/shared/classes/DsgProject";
import { GrantType } from "@/utils/shared/interfaces/SharedInterface";
import ProjectsApi from "@/services/Projects";
interface ImageType {
  label: string;
  key: string;
  [key: string]: string;
}
export default defineComponent({
  name: "DistrictSimplifiedProjectForm",
  components: {
    RotaryButton,
    BaseFileUpload,
    BaseSelect,
    BaseCheckBox,
    BaseInputsText,
    BaseTextArea,
    BaseInputsTextEmail,
    BaseDatePicker,
    ErrorValidation,
  },
  props: {},
  setup() {
    const notification = useNotification();
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });
    const store = useRotaryStore();
    const v$ = useVuelidate();
    return {
      handleClick1() {
        let count = 4;
        notification.success({
          title: "Api response",
          content: `This is a notification with count ${count}`,
          duration: 3000,
          closable: false,
        });
      },
      v$,
      store,
      formatter,
    };
  },
  data() {
    return {
      activeTab: "Form",
      tabs: [
        { name: "Form", label: "Form" },
        { name: "Uploads", label: "Uploads" },
        { name: "Pdf", label: "Pdf" },
        { name: "Pledges", label: "Pledges" },
        { name: "Share", label: "Share" },
        { name: "Add Users", label: "Add Users" },
      ],
      tailwind: TAILWIND_COMMON_CLASSES,
      headerFormatter: Utilities.headerFormater,
      criteriaList: ResourceLists.districtSimplifiedCriteria,
      projectToUpdateOrCreate: {} as IDsgProject,
      countryList: ResourceLists.countryList,
      areaFocusImages: ResourceLists.areaFocusImages,
      regionList: ResourceLists.regionList,
      areaFocusList: [] as Array<ImageType>,
      submitButtonmsg: "Submit",
      urlForShare: "",
      budgetItemName: "",
      budgetItemCost: "",
      fundingSourcesArrary: "",
      addFundingSource: [
        "District Designated Funds Request (DDF)",
        "District Club Contribution",
        "Non-District Club Contribution",
        "Co-operating Organization Contribution",
        "Other sources",
      ],
      fundingSources: {} as FundingSource,
      fundingSourceAdd: "",
    };
  },
  watch: {},
  validations() {
    return {
      projectToUpdateOrCreate: {
        project_name: {
          required: helpers.withMessage(ErrorMessages.REQURIED_FIELD, required),
        },
        project_description: {
          required: helpers.withMessage(ErrorMessages.REQURIED_FIELD, required),
          maxLength: maxLength(3000),
          minLenght: minLength(100),
        },
        area_focus: {
          oneMustBeSelected: helpers.withMessage(
            ErrorMessages.ONE_MUST_BE_SELECTED,
            () => {
              const areaFocuseValues = Object.values(
                this.projectToUpdateOrCreate.area_focus
              );
              return areaFocuseValues.includes(true);
            }
          ),
        },
        country: {
          required: helpers.withMessage(ErrorMessages.REQURIED_FIELD, required),
        },
        region: {
          required: helpers.withMessage(ErrorMessages.REQURIED_FIELD, required),
        },
        funding_goal: {
          required: helpers.withMessage(ErrorMessages.REQURIED_FIELD, required),
          maxAmount: helpers.withMessage(
            ErrorMessages.MAX_AMOUNT,
            (value: number) => value <= 100000000
          ),
        },
        anticipated_funding: {
          lowerThanFundingGoal: helpers.withMessage(
            ErrorMessages.LOWER_THAN_FUNDING_GOAL,
            () => {
              if (
                parseFloat(
                  this.projectToUpdateOrCreate.anticipated_funding.toString()
                ) <=
                parseFloat(this.projectToUpdateOrCreate.funding_goal.toString())
              ) {
                return true;
              } else {
                return false;
              }
            }
          ),
          cantBelowerThanPledgesTotal: helpers.withMessage(
            ErrorMessages.CANT_BE_LOWER_THAN_PLEDGES_TOTAL,
            () => {
              if (
                parseFloat(
                  this.projectToUpdateOrCreate.anticipated_funding.toString()
                ) >=
                parseFloat(
                  this.projectToUpdateOrCreate.total_pledges.toString()
                )
              ) {
                return true;
              } else {
                return false;
              }
            }
          ),
        },
        start_date: {
          required: helpers.withMessage(ErrorMessages.REQURIED_FIELD, required),
        },
        completion_date: {
          required: helpers.withMessage(ErrorMessages.REQURIED_FIELD, required),
          dateAfterStartDate: helpers.withMessage(
            ErrorMessages.DATE_AFTER_START_DATE,
            () => {
              const projectStartDate = new Date(
                this.projectToUpdateOrCreate.start_date
              );
              const completionDate = new Date(
                this.projectToUpdateOrCreate.completion_date
              );
              return completionDate > projectStartDate;
            }
          ),
        },
        extra_descriptions: {
          benefit_community_description: {
            required: helpers.withMessage(
              ErrorMessages.REQURIED_FIELD,
              required
            ),
            maxLength: maxLength(3000),
            minLength: minLength(150),
          },
          non_financial_participation: {
            required: helpers.withMessage(
              ErrorMessages.REQURIED_FIELD,
              required
            ),
            maxLength: maxLength(3000),
            minLength: minLength(150),
          },
          primary_contact: {
            address: { required },
            email: { required, email },
            name: { required },
            phone: { required },
          },
        },
        district_simplified_grant_request: {
          validateRequest: helpers.withMessage(
            "You have exceeded the maximum amount for your Grant Request. Please adjust.",
            () => {
              if (
                this.projectToUpdateOrCreate.district_simplified_grant_request >
                (this.districtSimplifiedGrantRequestLimit as number)
              ) {
                return false;
              } else {
                return true;
              }
            }
          ),
        },
      },
    };
  },
  async created() {
    if (this.store.$state.DsgOrDMProjectFormProps.formModeProp === "UPDATE") {
      this.submitButtonmsg = Utilities.uncapitalize(FORM_MODE_PROP.UPDATE);
      await this.populateFormData();
    } else if (
      this.store.$state.DsgOrDMProjectFormProps.formModeProp === "CREATE"
    ) {
      this.projectToUpdateOrCreate = new DsgProject();
      this.projectToUpdateOrCreate.grant_type =
        GrantType.DISTRICTSIMPLIFIEDPROJECT;
      this.projectToUpdateOrCreate.created_by = this.store.$state
        .loggedInUserData.user_id as number;
      this.projectToUpdateOrCreate.club_id =
        this.store.$state.DsgOrDMProjectFormProps.isAdminOverrideClubIdProp ??
        this.store.$state.loggedInUserData.club_id;

      if (
        (this.store.$state.loggedInUserData.district_id as number) ||
        this.store.$state.loggedInUsersDistrict.district_id
      ) {
        this.projectToUpdateOrCreate.district_id =
          (this.store.$state.loggedInUserData.district_id as number) ||
          this.store.$state.loggedInUsersDistrict.district_id;
      } else throw new Error("No District Id");
    }
    this.areaFocusList = Object.keys(
      this.projectToUpdateOrCreate.area_focus
    ).map((key) => {
      return {
        label: key.replace(/_/g, " "),
        key: key,
      };
    });
  },
  mounted() {},
  methods: {
    async populateFormData(responseProjectId?: number) {
      try {
        const response = await ProjectsApi.getProjectById(
          responseProjectId
            ? responseProjectId
            : (this.store.$state.DsgOrDMProjectFormProps
                .porjectIdProp as number)
        );
        if (!Utilities.isAnApiError(response)) {
          this.projectToUpdateOrCreate = response as IDsgProject;
          this.urlForShare =
            "https://myrotaryprojects.org/" +
            "project/" +
            this.projectToUpdateOrCreate.project_id;
        } else throw new MyError((response as IApiError).message);
      } catch (error) {
        console.log(error);
      }
    },
    async approveReports() {
      // TODO: implementation
    },

    addToFundsArray() {
      // TODO: implementation
    },

    deleteItemByIndex(index: number) {
      // TODO: implementation
    },

    deleteFromFundsArray(index: number) {
      // TODO: implementation
    },

    addToBudget(itemName: string, itemCost: number | string) {
      // TODO: implementation
    },

    async approveProject() {
      // TODO: implementation
    },

    async createDSGProject() {
      // TODO: implementation
    },

    async updateDSGProject() {
      // TODO: implementation
    },

    async validateDSGProject(): Promise<void> {
      // TODO: implementation
    },

    formatterMoney(amount: number) {
      // TODO: implementation
    },

    redirect() {
      // TODO: implementation
    },
  },
  computed: {
    districtSimplifiedGrantRequestLimit() {
      const cap = this.store.loggedInUsersDistrict.district_details.ddfCapes
        .dsgCap as number;
      const fraction = this.store.loggedInUsersDistrict.district_details
        .ddfCapes.dsgFraction as number;
      let limit: number = 0;
      let total: number = 0;
      this.store.loggedInUsersDistrict.district_details.ddfCalculation.forEach(
        (ele) => {
          this.projectToUpdateOrCreate.extra_descriptions.fundingSourceArray.forEach(
            (el) => {
              if (el.sourceName === ele) {
                total = total + parseFloat(el.amount.toString());
              }
            }
          );
        }
      );
      if (total < parseFloat(cap.toString())) {
        limit = total * parseFloat(fraction.toString());
      } else {
        limit = parseFloat(cap.toString());
      }
      return parseFloat(limit.toFixed(2));
    },
  },
});
</script>

<style scoped lang="scss">
@import "@/assets/syles.scss";
#item_table{
table {
  width: 100%;
}

table th:nth-child(1) {
  /* Set the width for the first column */
  width: 40%;
}

table th:nth-child(2) {
  /* Set the width for the second column */
  width: 40%;
}

table th:nth-child(3) {
  /* Set the width for the third column */
  width: 20%;
}
}
.plus_icon {
  font-size: 1.5rem;
}


</style>
