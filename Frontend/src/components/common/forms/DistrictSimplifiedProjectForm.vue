<template>
  <n-modal v-model:show="showModal">
    <ErrorModal
      title="Server Error"
      :message="expectionObject.message"
      :stackTrace="expectionObject.stack"
    />
  </n-modal>
  <div class="landing_header w-full">
    <h1 class="header2_h1">District Simplified Project Form</h1>
  </div>
  <div class="formtabs_container p-4 md:p-24 lg:p-40">
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
            Areas of Focus
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
            class="text-center"
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
        <div class="form_item half_width">
          <h3 class="text-center" :class="tailwind.H3">
            {{
              "Provide a complete, detailed and itemised budget for the entire project. \n (Supporting documents may be requested)"
            }}
          </h3>
          <n-h3 class="text-center">{{
            "*All Budget Items and Funding Sources will be recorded in USD!"
          }}</n-h3>
        </div>
        <div class="form_item full_width table">
          <div class="relative overflow-x-auto" id="item_table">
            <table class="w-full text-left text-sm text-gray-500">
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
                  <td class="px-6 py-4 font-medium text-gray-900">
                    {{ item.itemCost }}
                  </td>
                  <td class="px-6 py-4 text-center">
                    <button
                      title="Delete item"
                      class="crud-buttons plus_icon hover:text-primary-color"
                      @click="deleteItemFromBudget(index)"
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
                  <td
                    colspan="3"
                    class="border-2 border-primary-color px-6 py-4 text-center font-bold text-gray-900"
                  >
                    Total Budget: USD {{ sumOfItemsCost }}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
        <div class="form_item half_width">
          <h3
            class="border-2 border-primary-color p-2 text-center text-lg font-bold text-primary-black"
          >
            {{
              `District ${store.$state.loggedInUsersDistrict.district_name}  will match District club contributions `
            }}
            {{
              "( " +
              store.loggedInUsersDistrict.district_details.ddfCapes.dsgFraction
            }}
            {{ " : 1 ) up to a maximum of" }}
            {{
              store.loggedInUsersDistrict.district_details.ddfCapes.dsgCap +
              " USD "
            }}
            {{ "on a first come basis depending upon availability of DDF" }}
          </h3>
        </div>
        <div class="form_item half_width">
          <h3
            class="border-2 border-primary-color p-2 text-center text-lg font-bold text-primary-black"
          >
            {{
              `*District ${store.$state.loggedInUsersDistrict.district_name}  calculates District Designated Funds from these funding sources: `
            }}
            <strong class="text-center text-primary-green">
              {{ fundingSourcesArrary }}</strong
            >
          </h3>
        </div>
        <div class="form_item half_width">
          <h3
            class="border-2 border-primary-color p-2 text-center text-lg font-bold text-primary-black"
          >
            {{ "DDF request limit: $" }}
            {{ districtSimplifiedGrantRequestLimit }} USD
          </h3>
        </div>
        <hr :class="tailwind.FORMHR" />
        <div class="form_item half_width">
          <h3 class="text-center" :class="tailwind.H3">
            {{ "Funding Sources" }}
          </h3>
        </div>
        <div class="form_item full_width table">
          <div class="relative overflow-x-auto">
            <table
              id="funding_source_table"
              class="6 w-full text-left text-sm text-gray-500"
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
                      v-model="fundingSources.sourceName"
                    />
                  </td>
                  <td class="px-6 py-4">
                    <BaseInputsText v-model="fundingSources.typeOfFunding" />
                  </td>
                  <td class="px-6 py-4">
                    <BaseInputsText v-model="fundingSources.amount" />
                  </td>
                  <td class="px-6 py-4 text-center">
                    <button
                      title="Add item"
                      class="plus_icon hover:text-primary-color"
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
                  <td class="px-6 py-4 font-medium text-gray-900">
                    {{ item.sourceName }}
                  </td>
                  <td class="px-6 py-4 font-medium text-gray-900">
                    {{ item.typeOfFunding }}
                  </td>
                  <td class="px-6 py-4 font-medium text-gray-900">
                    {{ item.amount }}
                  </td>
                  <td class="px-6 py-4 text-center">
                    <button
                      title="Delete item"
                      class="crud-buttons"
                      @click="deleteFromFundsArray(index)"
                    >
                      <font-awesome-icon
                        class="social-icon plus_icon hover:text-primary-color"
                        icon="trash-alt"
                      ></font-awesome-icon>
                    </button>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td
                    colspan="5"
                    class="border-2 border-primary-color px-6 py-4 text-center font-bold text-gray-900"
                  >
                    Total Funding: USD {{ sumOfAnticipatedFunding }}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
        <div class="form_item half_width">
          <div class="border-2 border-primary-color">
            <h1
              class="my-4 text-center font-bold underline-offset-8"
              :class="tailwind.H1"
            >
              Current Anticipated Funding:
              {{ sumOfAnticipatedFunding }}
            </h1>
            <h1
              class="my-4 border-primary-dark-color text-center font-bold underline-offset-8"
              :class="tailwind.H1"
            >
              Current Funding Goal:
              {{ formatter.format(projectToUpdateOrCreate.funding_goal) }}
            </h1>
            <h1
              class="my-4 text-center font-bold underline-offset-8"
              :class="tailwind.H1"
            >
              Pledge Amount To Date:
              {{ formatter.format(projectToUpdateOrCreate.total_pledges) }}
            </h1>
            <ErrorValidation
              class="text-center"
              v-if="
                v$.projectToUpdateOrCreate.district_simplified_grant_request
                  .$error
              "
              :errorMsg="
                v$.projectToUpdateOrCreate.district_simplified_grant_request
                  .$errors[0].$message
              "
            />
            <ErrorValidation
              class="text-center"
              v-if="v$.projectToUpdateOrCreate.anticipated_funding.$error"
              :errorMsg="
                v$.projectToUpdateOrCreate.anticipated_funding.$errors[0]
                  .$message
              "
            />
          </div>
        </div>
        <div class="form_item full_width">
          <div class="button_row mt-8 flex justify-center gap-4">
            <RotaryButton
              :label="submitButtonmsg"
              @click="validateDSGProject()"
            />
            <RotaryButton label="Cancel" @click="redirect()" />
          </div>
        </div>
        <div class="form_item"></div>
        <div class="form_item full_width"></div>
      </div>
    </div>
    <div v-else-if="activeTab === 'Uploads'">
      <UploadForm :projectProp="projectToUpdateOrCreate" />
    </div>
    <div v-else-if="activeTab === 'Pdf'">
      <DSProjectPdf :projectProp="projectToUpdateOrCreate" />
    </div>
    <div v-else-if="activeTab === 'Pledges'">
      <AllPledgesTable
        class="mt-8"
        :pledgesProp="projectToUpdateOrCreate.pledgesAssociated"
      />
    </div>
    <div v-else-if="activeTab === 'Approval'">
      <div class="details my-8 flex flex-col items-center gap-8">
        <h1 class="mt-4 text-center font-bold" :class="tailwind.H1">
          Approve Project
        </h1>
        <h6 class="mt-4 text-center font-bold">Project Administrator</h6>
        <ul class="border border-primary-color p-4">
          <li>
            <strong>Name:</strong>
            {{ projectToUpdateOrCreate.projectDetails.creatorData.fullName }}
          </li>
          <li>
            <strong>Email:</strong>
            {{ projectToUpdateOrCreate.projectDetails.creatorData.email }}
          </li>
          <li>
            <strong>Phone:</strong>
            {{ projectToUpdateOrCreate.projectDetails.creatorData.phone }}
          </li>
        </ul>
        <RotaryButton
          v-if="
            store.$state.loggedInUserData.role[0].district_role ===
              'District Admin' ||
            store.$state.loggedInUserData.role[0].district_role ===
              'District Grants Chair'
          "
          label="Approve"
          @click="approveProject()"
        />
        <h6 v-else class="mt-4 text-center font-bold">
          Must be a District Admin / Grants Chair to approve
        </h6>
      </div>
      <div
        v-if="projectToUpdateOrCreate.project_status === 'Reports Due'"
        class="flex flex-col gap-8"
      >
        <h1 class="mt-4 text-center font-bold" :class="tailwind.H1">
          Approve Reports
        </h1>
        <div class="flex justify-center">
          <RotaryButton
            v-if="
              store.$state.loggedInUserData.role[0].district_role ===
                'District Admin' ||
              store.$state.loggedInUserData.role[0].district_role ===
                'District Grants Chair' ||
              store.$state.loggedInUserData.role[0].district_role ===
                'District Foundations Chair' ||
              store.$state.loggedInUserData.role[0].district_role ===
                'District International Chair'
            "
            label="Approve Reports"
            @click="approveReports()"
          />
        </div>
      </div>
    </div>
    <div v-else-if="activeTab === 'Share'">
      <div class="share mt-8 flex justify-center">
        <button
          class="inline-flex items-center rounded-full bg-blue-700 py-2 px-4 text-white hover:bg-blue-800"
        >
          <font-awesome-icon
            class="mr-4 text-4xl text-primary-white"
            icon="fa-brands fa-square-facebook"
          />

          <ShareNetwork
            network="facebook"
            :url="$data.urlForShare"
            :title="$data.projectToUpdateOrCreate.project_name"
            :description="$data.projectToUpdateOrCreate.project_description"
            quote="Check Out this rotary project and make a pledge!"
            hashtags="myrotaryprojects,"
            class="link"
          >
            Share this Project On Facebook
          </ShareNetwork>
        </button>
      </div>
    </div>
    <div v-else-if="activeTab === 'Add Users'">
      <AddUserProjectForm
        :projectAdminsProp="
          projectToUpdateOrCreate.projectDetails.projectAdmins
        "
        :projectId="projectToUpdateOrCreate.project_id"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useNotification } from "naive-ui";
import type { NotificationType } from "naive-ui";

import {
  FORM_MODE_PROP,
  MyError,
  TAILWIND_COMMON_CLASSES,
  type IApiError,
  type IApiException,
} from "@/utils/frontend/interfaces/Frontend";
import ResourceLists from "@/utils/frontend/classes/ResourceLists";
import AllPledgesTable from "@/components/common/tables/AllPledgesTable.vue";

import DSProjectPdf from "@/components/common/pdf/DSProjectPdf.vue";
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
import {
  GrantType,
  ProjectStatus,
} from "@/utils/shared/interfaces/SharedInterface";
import ProjectsApi from "@/services/Projects";
import ErrorModal from "@/components/common/modals/ErrorModal.vue";
import UploadForm from "@/components/common/forms/UploadForm.vue";
import AddUserProjectForm from "@/components/common/forms/AddUserProjectForm.vue";
import fastDeepEqual from "fast-deep-equal";

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
    ErrorModal,
    UploadForm,
    DSProjectPdf,
    AllPledgesTable,
    AddUserProjectForm,
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
      showModal: ref(false),
      toastController(
        type: NotificationType,
        title?: string,
        content?: string,
        duration?: number,
        closable?: boolean
      ) {
        notification[type]({
          title: title || "Error",
          duration: duration || 3000,
          closable: closable || false,
          content: content || "",
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
        { name: "Approval", label: "Approval" },
        { name: "Pledges", label: "Pledges" },
        { name: "Share", label: "Share" },
        { name: "Add Users", label: "Add Users" },
      ],
      tailwind: TAILWIND_COMMON_CLASSES,
      headerFormatter: Utilities.headerFormater,
      criteriaList: ResourceLists.districtSimplifiedCriteria,
      projectToUpdateOrCreate: new DsgProject() as IDsgProject, 
      initialProject: {} as IDsgProject,
      countryList: ResourceLists.countryList,
      areaFocusImages: ResourceLists.areaFocusImages,
      regionList: ResourceLists.regionList,
      areaFocusList: [] as Array<ImageType>,
      submitButtonmsg: "Submit",
      urlForShare: "",
      budgetItemName: "",
      budgetItemCost: "",
      addFundingSource: [
        "District Designated Funds Request (DDF)",
        "District Club Contribution",
        "Non-District Club Contribution",
        "Co-operating Organization Contribution",
        "Other sources",
      ],
      fundingSources: {} as FundingSource,
      expectionObject: {} as IApiException,
      projectApproval: "",
    };
  },
  watch: {
    projectToUpdateOrCreate: {
      handler() {
       if (fastDeepEqual(this.projectToUpdateOrCreate, this.initialProject)) {
        this.store.$state.canLeaveForm = true;
       } else {
        this.store.$state.canLeaveForm = false;
       }
      },
      deep: true,
    },
  },
  validations() {
    return {
      projectToUpdateOrCreate: {
        project_name: {
          required: helpers.withMessage(ErrorMessages.REQURIED_FIELD, required),
          maxLength: helpers.withMessage(
            ErrorMessages.PROJECT_NAME_LIMIT,
            maxLength(50)
          ),
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
                  this.projectToUpdateOrCreate.anticipated_funding.toFixed(2)
                ) <=
                parseFloat(this.projectToUpdateOrCreate.funding_goal.toFixed(2))
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
                  this.projectToUpdateOrCreate.anticipated_funding.toFixed(2)
                ) >=
                parseFloat(
                  this.projectToUpdateOrCreate.total_pledges.toFixed(2)
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
            "Maximum amount exceeded for District Simplified Grant Request",
            () => {
              if (
                parseFloat(
                  this.projectToUpdateOrCreate.district_simplified_grant_request.toFixed(
                    2
                  )
                ) > (this.districtSimplifiedGrantRequestLimit as number)
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
      this.tabs = [{ name: "Form", label: "Form" }];
      this.projectToUpdateOrCreate = new DsgProject();
      this.initialProject= {...this.projectToUpdateOrCreate};
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
  mounted() {
    this.store.$state.canLeaveForm = true;
  },
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
          this.initialProject= {...this.projectToUpdateOrCreate}
          this.urlForShare =
            "https://myrotaryprojects.org/" +
            "project/" +
            this.projectToUpdateOrCreate.project_id;
        } else throw new MyError((response as IApiError).message);
      } catch (error) {
        console.log(error);
        this.toastController(
          "error",
          "Error",
          "Error while populating form data. Please try again.",
          3000,
          false
        );
      }
    },
    async approveReports() {
      try {
        const response = await ProjectsApi.updateProjectStatus(
          this.projectToUpdateOrCreate.project_id as number,
          ProjectStatus.COMPLETED
        );
        if (!Utilities.isAnApiError(response) && response === true) {
          this.toastController(
            "success",
            "Success",
            "Project Approved Successfully"
          );
        } else {
          throw new MyError(
            (response as IApiError).message,
            (response as IApiError).stack,
            (response as IApiError).code
          );
        }
      } catch (error) {
        this.expectionObject = error as IApiException;
      }
    },

    addToFundsArray() {
      try {
        if (
          this.fundingSources.amount < 0 ||
          isNaN(this.fundingSources.amount)
        ) {
          const errorMsg = isNaN(this.fundingSources.amount)
            ? "Amount is not a number"
            : "Amount cannot be negative";
          this.toastController("error", "Error", errorMsg, 2000);
          this.fundingSources.amount = 0;
          return;
        }
        let fundingSourceAmountParsed = parseFloat(
          this.fundingSources.amount as unknown as string
        );
        fundingSourceAmountParsed = parseFloat(
          fundingSourceAmountParsed.toFixed(2)
        );
        switch (this.fundingSources.sourceName) {
          case "District Club Contribution":
            this.projectToUpdateOrCreate.intial_sponsor_club_contribution =
              parseFloat(
                (
                  this.projectToUpdateOrCreate
                    .intial_sponsor_club_contribution +
                  fundingSourceAmountParsed
                ).toFixed(2)
              );
            break;

          case "Non-District Club Contribution":
            this.projectToUpdateOrCreate.extra_descriptions.other_club_contribution =
              parseFloat(
                (
                  this.projectToUpdateOrCreate.extra_descriptions
                    .other_club_contribution + fundingSourceAmountParsed
                ).toFixed(2)
              );
            break;

          case "District Designated Funds Request (DDF)":
            let futureDdfAmount = parseFloat(
              (
                this.projectToUpdateOrCreate.district_simplified_grant_request +
                fundingSourceAmountParsed
              ).toFixed(2)
            );
            if (
              fundingSourceAmountParsed >
                this.districtSimplifiedGrantRequestLimit ||
              futureDdfAmount > this.districtSimplifiedGrantRequestLimit
            ) {
              this.toastController(
                "error",
                "Error",
                "The maximum amount for a Grant Request exceeded. Please adjust the amount.",
                2000
              );
              this.fundingSources = {} as FundingSource;
              return;
            } else {
              this.projectToUpdateOrCreate.district_simplified_grant_request =
                futureDdfAmount;
            }
            break;

          case "Co-operating Organization Contribution":
            this.projectToUpdateOrCreate.co_operating_organisation_contribution =
              parseFloat(
                (
                  this.projectToUpdateOrCreate
                    .co_operating_organisation_contribution +
                  fundingSourceAmountParsed
                ).toFixed(2)
              );
            break;

          case "Other sources":
            this.projectToUpdateOrCreate.extra_descriptions.other_sources =
              parseFloat(
                (
                  this.projectToUpdateOrCreate.extra_descriptions
                    .other_sources + fundingSourceAmountParsed
                ).toFixed(2)
              );
            break;

          default:
            break;
        }
        this.fundingSources.amount = fundingSourceAmountParsed;
        this.projectToUpdateOrCreate.extra_descriptions.fundingSourceArray.push(
          this.fundingSources
        );
      } catch (error) {
        this.toastController(
          "error",
          "Error",
          "Error while adding to funds array. Please try again.",
          3000,
          false
        );
        console.error(error);
      }
      this.fundingSources = {} as FundingSource;
    },

    deleteFromFundsArray(index: number) {
      try {
        const fundingSource =
          this.projectToUpdateOrCreate.extra_descriptions.fundingSourceArray[
            index
          ];

        switch (fundingSource.sourceName) {
          case "District Club Contribution":
            this.projectToUpdateOrCreate.intial_sponsor_club_contribution -=
              parseFloat(fundingSource.amount.toFixed(2));
            break;

          case "Non-District Club Contribution":
            this.projectToUpdateOrCreate.extra_descriptions.other_club_contribution -=
              parseFloat(fundingSource.amount.toFixed(2));
            break;

          case "District Designated Funds Request (DDF)":
            this.projectToUpdateOrCreate.district_simplified_grant_request -=
              parseFloat(fundingSource.amount.toFixed(2));
            break;

          case "Co-operating Organization Contribution":
            this.projectToUpdateOrCreate.co_operating_organisation_contribution -=
              parseFloat(fundingSource.amount.toFixed(2));
            break;

          case "Other sources":
            this.projectToUpdateOrCreate.extra_descriptions.other_sources -=
              parseFloat(fundingSource.amount.toFixed(2));
            break;

          default:
            break;
        }
        this.projectToUpdateOrCreate.extra_descriptions.fundingSourceArray.splice(
          index,
          1
        );
      } catch (error) {
        this.toastController(
          "error",
          "Error",
          "Error while deleting from funds array. Please try again.",
          3000,
          false
        );
        console.error(error);
      }
    },

    addToBudget(itemName: string, itemCost: string) {
      let itemCostParsed = parseFloat(itemCost);
      try {
        if (itemCostParsed < 0 || isNaN(itemCostParsed)) {
          const errorMsg = isNaN(itemCostParsed)
            ? "Invalid cost"
            : "Cost cannot be negative";
          this.toastController("error", "Invalid cost", errorMsg, 3000, true);
          this.budgetItemCost = "";
          return;
        }

        const budgetItemObject = {
          itemCost: parseFloat(itemCostParsed.toFixed(2)),
          itemName: itemName,
        };

        this.projectToUpdateOrCreate.funding_goal += budgetItemObject.itemCost;
        this.projectToUpdateOrCreate.itemized_budget.push(budgetItemObject);

        this.budgetItemCost = "";
        this.budgetItemName = "";
      } catch (error) {
        this.toastController(
          "error",
          "Error",
          "Error while adding to budget. Please try again.",
          3000,
          false
        );
        console.error(error);
      }
    },

    deleteItemFromBudget(index: number) {
      try {
        const item = this.projectToUpdateOrCreate.itemized_budget[index];
        this.projectToUpdateOrCreate.itemized_budget.splice(index, 1);
        this.projectToUpdateOrCreate.funding_goal = parseFloat(
          (this.projectToUpdateOrCreate.funding_goal - item.itemCost).toFixed(2)
        );
      } catch (error) {
        this.toastController(
          "error",
          "Error",
          "Error while deleting budget item. Please try again.",
          3000,
          false
        );
        console.error(error);
      }
    },

    async approveProject() {
      try {
        if (
          this.projectToUpdateOrCreate.project_status !==
          ProjectStatus.PENDINGAPPROVAL
        ) {
          this.toastController(
            "error",
            "Approval Error",
            "Project has not been submitted for approval.",
            3000,
            true
          );
          return;
        }

        const response = await ProjectsApi.updateProjectStatus(
          this.projectToUpdateOrCreate.project_id as number,
          ProjectStatus.APPROVED
        );

        if (!Utilities.isAnApiError(response) && response === true) {
          this.toastController(
            "success",
            "Success",
            this.headerFormatter("Project Approved"),
            3000,
            true
          );
          setTimeout(async () => {
            this.$router.push("/");
          }, 3000);
        } else {
          throw new MyError(
            (response as IApiError).message,
            (response as IApiError).stack,
            (response as IApiError).code
          );
        }
      } catch (error) {
        this.expectionObject = error as IApiException;
        this.showModal = true;
      }
    },

    async createDSGProject() {
      try {
        const response = await ProjectsApi.createNewProject(
          this.projectToUpdateOrCreate
        );
        if (!Utilities.isAnApiError(response)) {
          this.tabs = ResourceLists.formTabs;
          window.scrollTo(0, 0);
          this.toastController(
            "success",
            "Success",
            this.headerFormatter(
              "Project Created. You can begin uploading files"
            ),
            3500,
            true
          );
          this.store.setDSGOrDMFormProps({
            formModeProp: "UPDATE",
            porjectIdProp: response as number,
          });

          this.submitButtonmsg = Utilities.uncapitalize(FORM_MODE_PROP.UPDATE);
          setTimeout(async () => {
            await this.populateFormData(response as number);
          }, 3500);
        }
      } catch (error: any) {
        if (error.code === "ER_DUP_ENTRY") {
          this.duplicateNamesToast();
          return;
        }
        this.expectionObject = error as IApiException;
        this.showModal = true;
      }
    },

    async updateDSGProject() {
      try {
        const response = await ProjectsApi.updateProject(
          this.projectToUpdateOrCreate
        );
        if (!Utilities.isAnApiError(response)) {
          this.toastController(
            "success",
            "Success",
            this.headerFormatter("Project Updated"),
            3500,
            true
          );
          setTimeout(() => {
            this.redirect();
          }, 3500);
        }
      } catch (error: any) {
        if (error.code === "ER_DUP_ENTRY") {
          this.duplicateNamesToast();
          return;
        }
        this.showModal = true;
        this.expectionObject = error as IApiException;
      }
    },

    async validateDSGProject(): Promise<void> {
      await this.v$.$validate();

      if (this.v$.$error) {
        this.toastController("error", "Error", "Fix Form Errors", 4000, true);
        return;
      }

      if (!this.v$.$error) {
        const formMode = this.store.$state.DsgOrDMProjectFormProps.formModeProp;

        if (formMode === "CREATE") {
          this.createDSGProject();
        } else if (formMode === "UPDATE") {
          this.updateDSGProject();
        }
      }
    },

    formatterMoney(amount: number) {
      if (amount) {
        return `Total Pledges: ${this.currencyFormatter(amount)}`;
      } else {
        return this.headerFormatter(
          "Total Pledge Amount not available check pledges tab"
        );
      }
    },

    currencyFormatter(amount: number): string {
      const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      });
      return formatter.format(amount);
    },

    duplicateNamesToast() {
      this.toastController(
        "error",
        "Error",
        "Project name already exists. Please choose another name.",
        3500,
        true
      );
    },

    redirect() {
      this.store.$state.canLeaveForm = true;
      this.$router.go(-1);
    },
  },
  computed: {
    // Calculate sum of anticipated funding, convert it to USD format and update the projectToUpdateOrCreate object
    sumOfAnticipatedFunding(): string {
      let sum: number = 0;
      this.projectToUpdateOrCreate.extra_descriptions.fundingSourceArray.forEach(
        (el: { amount: number }) => {
          sum += parseFloat(el.amount.toFixed(2));
        }
      );
      const total =
        sum + parseFloat(this.projectToUpdateOrCreate.total_pledges.toFixed(2));
      this.projectToUpdateOrCreate.anticipated_funding = total;
      return this.currencyFormatter(total);
    },

    // Calculate sum of costs for all items in itemized_budget and convert it to USD format
    sumOfItemsCost(): string {
      let sum: number = 0;
      this.projectToUpdateOrCreate.itemized_budget.forEach(
        (item: { itemCost: number }) => {
          sum += parseFloat(item.itemCost.toFixed(2));
        }
      );
      this.projectToUpdateOrCreate.funding_goal = sum;
      return this.currencyFormatter(sum);
    },

    // Transform array of funding sources from ddfCalculation into a formatted string
    fundingSourcesArrary(): string {
      const sourcesArray =
        this.store.loggedInUsersDistrict.district_details.ddfCalculation.map(
          (ele: { toString: () => string }) => ` ${ele.toString()}`
        );
      return sourcesArray.join(", ");
    },

    // Calculate the limit for the district simplified grant request based on total funding and defined cap
    districtSimplifiedGrantRequestLimit(): number {
      const cap = parseFloat(
        this.store.loggedInUsersDistrict.district_details.ddfCapes
          .dsgCap as unknown as string
      );
      const fraction = parseFloat(
        this.store.loggedInUsersDistrict.district_details.ddfCapes
          .dsgFraction as unknown as string
      );
      let total = 0;
      this.store.loggedInUsersDistrict.district_details.ddfCalculation.forEach(
        (ele) => {
          this.projectToUpdateOrCreate.extra_descriptions.fundingSourceArray.forEach(
            (el: { sourceName: string; amount: number }) => {
              if (el.sourceName === ele) {
                total += parseFloat(el.amount.toFixed(2));
              }
            }
          );
        }
      );
      const limit = total < cap ? total * fraction : cap;
      return parseFloat(limit.toFixed(2));
    },
  },
});
</script>

<style scoped lang="scss">
@import "@/assets/syles.scss";
#item_table {
  table {
    width: 100%;
  }

  table th:nth-child(1) {
    /* Set the width for the first column */
    width: 45%;
  }

  table th:nth-child(2) {
    /* Set the width for the second column */
    width: 45%;
  }

  table th:nth-child(3) {
    /* Set the width for the third column */
    width: 10%;
  }
}
.plus_icon {
  font-size: 1.5rem;
}
</style>
