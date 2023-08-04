<template>
  <div class="landing_header w-full">
    <h1 class="header2_h1">Club Project Form</h1>
  </div>
  <ul
    class="flex flex-wrap justify-center border-b border-gray-200 text-center text-lg font-semibold text-primary-black"
  >
    <li class="mr-2">
      <h1
        aria-current="page"
        class="inline-block cursor-pointer rounded-t-lg p-4 text-primary-black"
        :class="activeTab1"
        @click="setTab(1)"
      >
        Form
      </h1>
    </li>
    <li class="mr-2">
      <h1
        @click="setTab(2)"
        :class="activeTab2"
        class="inline-block cursor-pointer rounded-t-lg p-4 text-primary-black hover:bg-gray-200 hover:text-gray-600"
      >
        Uploads
      </h1>
    </li>
    <li class="mr-2">
      <h1
        @click="setTab(3)"
        :class="activeTab3"
        class="inline-block cursor-pointer rounded-t-lg p-4 text-primary-black hover:bg-gray-200 hover:text-gray-600"
      >
        Pdf
      </h1>
    </li>
    <li class="mr-2">
      <h1
        v-if="store.$state.clubProjectFormProps.formModeProp === 'UPDATE'"
        @click="setTab(4)"
        :class="activeTab4"
        class="inline-block cursor-pointer rounded-t-lg p-4 text-primary-black hover:bg-gray-200 hover:text-gray-600"
      >
        Pledges
      </h1>
    </li>
    <li class="mr-2">
      <h1
        v-if="
          store.$state.clubProjectFormProps.formModeProp === 'UPDATE' &&
          (store.$state.loggedInUserData.role[0].district_role ===
            'District Admin' ||
            store.$state.loggedInUserData.role[0].district_role ===
              'District Grants Chair' ||
            store.$state.loggedInUserData.role[0].district_role ===
              'District Foundations Chair' ||
            store.$state.loggedInUserData.role[0].district_role ===
              'District International Chair')
        "
        @click="setTab(5)"
        :class="activeTab5"
        class="inline-block cursor-pointer rounded-t-lg p-4 text-primary-black hover:bg-gray-200 hover:text-gray-600"
      >
        Approvals
      </h1>
    </li>
    <li class="mr-2">
      <h1
        v-if="store.$state.clubProjectFormProps.formModeProp === 'UPDATE'"
        @click="setTab(6)"
        :class="activeTab6"
        class="inline-block cursor-pointer rounded-t-lg p-4 text-primary-black hover:bg-gray-200 hover:text-gray-600"
      >
        Share
      </h1>
    </li>
    <li class="mr-2">
      <h1
        v-if="store.$state.clubProjectFormProps.formModeProp === 'UPDATE'"
        @click="setTab(7)"
        :class="activeTab7"
        class="inline-block cursor-pointer rounded-t-lg p-4 text-primary-black hover:bg-gray-200 hover:text-gray-600"
      >
        Add Users
      </h1>
    </li>
  </ul>

  <div class="club_tabs mt-8 px-24 pb-24">
    <div class="form_tab" v-if="activeTab1">
      <div class="container my-8 min-w-full gap-8" :class="tailwind.DIVCOL">
        <div class="container" :class="tailwind.DIVCOL">
          <Toast
            v-if="toast.display"
            :msg="toast.msg"
            :width="toast.width"
            :closeTimer="toast.closeTimer"
          />
          <ExceptionModal
            v-if="serverException"
            :message="expectionObject.message"
            :stackTrace="expectionObject.stack"
            :toggleModel="true"
          />
          <form @submit.prevent="" novalidate>
            <BaseInputsText
              label="Project Name"
              v-model="projectToUpdateOrCreate.project_name"
            />
            <ErrorValidation
              v-if="v$.projectToUpdateOrCreate.project_name.$error"
              :errorMsg="
                v$.projectToUpdateOrCreate.project_name.$errors[0].$message
              "
            />
            <BaseTextArea
              v-model="projectToUpdateOrCreate.project_description"
              label="Description"
            />
            <ErrorValidation
              v-if="v$.projectToUpdateOrCreate.project_description.$error"
              :errorMsg="
                v$.projectToUpdateOrCreate.project_description.$errors[0]
                  .$message
              "
            />
            <BaseSelect
              v-model="projectToUpdateOrCreate.country"
              :options="countryList"
              label="Country"
            />
            <ErrorValidation
              v-if="v$.projectToUpdateOrCreate.country.$error"
              :errorMsg="v$.projectToUpdateOrCreate.country.$errors[0].$message"
            />
            <BaseSelect
              v-model="projectToUpdateOrCreate.region"
              :options="regionList"
              label="Region"
            />
            <ErrorValidation
              v-if="v$.projectToUpdateOrCreate.region.$error"
              :errorMsg="v$.projectToUpdateOrCreate.region.$errors[0].$message"
            />
            <BaseInputsText
              label="Funding Goal"
              v-model="projectToUpdateOrCreate.funding_goal"
              formType="number"
              inputMode="numeric"
            />
            <ErrorValidation
              v-if="v$.projectToUpdateOrCreate.funding_goal.$error"
              :errorMsg="
                v$.projectToUpdateOrCreate.funding_goal.$errors[0].$message
              "
            />
            <BaseInputsText
              label="Anticipated Funding"
              v-model="projectToUpdateOrCreate.anticipated_funding"
              formType="number"
              inputMode="numeric"
            />
            <ErrorValidation
              v-if="v$.projectToUpdateOrCreate.anticipated_funding.$error"
              :errorMsg="
                v$.projectToUpdateOrCreate.anticipated_funding.$errors[0]
                  .$message
              "
            />
            <ErrorValidation
              v-if="v$.projectToUpdateOrCreate.$error"
              :error-msg="formatter(projectToUpdateOrCreate.total_pledges)"
            />

            <BaseDatePicker
              v-model="projectToUpdateOrCreate.start_date"
              label="Project Start Date"
            />
            <ErrorValidation
              v-if="v$.projectToUpdateOrCreate.start_date.$error"
              :errorMsg="
                v$.projectToUpdateOrCreate.start_date.$errors[0].$message
              "
            />
            <BaseDatePicker
              v-model="projectToUpdateOrCreate.completion_date"
              label="Project Completion Date"
            />
            <ErrorValidation
              v-if="v$.projectToUpdateOrCreate.completion_date.$error"
              :errorMsg="
                v$.projectToUpdateOrCreate.completion_date.$errors[0].$message
              "
            />
            <div class="flex flex-col">
              <div class="area_focus flex">
                <img class="w-2/12" :src="areaFocusImages[0]" alt="" />
                <BaseCheckBox
                  v-model="
                    projectToUpdateOrCreate.area_focus.Peace_Conflict_Prevention 
                  "
                  :label="
                    Object.keys(projectToUpdateOrCreate.area_focus)[0].replace(
                      /_/g,
                      ' '
                    )
                  "
                />
              </div>
              <div class="area_focus flex">
                <img class="w-2/12" :src="areaFocusImages[1]" alt="" />
                <BaseCheckBox
                  v-model="
                    projectToUpdateOrCreate.area_focus
                      .Disease_Prevention_And_Treatment
                  "
                  :label="
                    Object.keys(projectToUpdateOrCreate.area_focus)[1].replace(
                      /_/g,
                      ' '
                    )
                  "
                />
              </div>
              <div class="area_focus flex">
                <img class="w-2/12" :src="areaFocusImages[2]" alt="" />
                <BaseCheckBox
                  v-model="
                    projectToUpdateOrCreate.area_focus.Water_And_Sanitation
                  "
                  :label="
                    Object.keys(projectToUpdateOrCreate.area_focus)[2].replace(
                      /_/g,
                      ' '
                    )
                  "
                />
              </div>
              <div class="area_focus flex">
                <img class="w-2/12" :src="areaFocusImages[3]" alt="" />
                <BaseCheckBox
                  v-model="
                    projectToUpdateOrCreate.area_focus.Maternal_And_Child_Health
                  "
                  :label="
                    Object.keys(projectToUpdateOrCreate.area_focus)[3].replace(
                      /_/g,
                      ' '
                    )
                  "
                />
              </div>
              <div class="area_focus flex">
                <img class="w-2/12" :src="areaFocusImages[4]" alt="" />
                <BaseCheckBox
                  v-model="
                    projectToUpdateOrCreate.area_focus
                      .Basic_Education_And_Literacy
                  "
                  :label="
                    Object.keys(projectToUpdateOrCreate.area_focus)[4].replace(
                      /_/g,
                      ' '
                    )
                  "
                />
              </div>
              <div class="area_focus flex">
                <img class="w-2/12" :src="areaFocusImages[5]" alt="" />
                <BaseCheckBox
                  v-model="
                    projectToUpdateOrCreate.area_focus
                      .Economic_And_Community_Development
                  "
                  :label="
                    Object.keys(projectToUpdateOrCreate.area_focus)[5].replace(
                      /_/g,
                      ' '
                    )
                  "
                />
              </div>
              <div class="area_focus flex">
                <img class="w-2/12" :src="areaFocusImages[6]" alt="" />
                <BaseCheckBox
                  v-model="projectToUpdateOrCreate.area_focus.Environment"
                  :label="
                    Object.keys(projectToUpdateOrCreate.area_focus)[6].replace(
                      /_/g,
                      ' '
                    )
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
            <div class="button_row mt-8 flex justify-center gap-4">
              <RotaryButton
                :label="submitButtonmsg"
                @click="validateClubProject()"
              />
              <RotaryButton label="Cancel" @click="redirect()" />
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="upload_tab" v-if="activeTab2">
      <UploadForm
        v-if="store.$state.clubProjectFormProps.formModeProp === 'UPDATE'"
        :projectProp="projectToUpdateOrCreate"
      />
      <div v-else>
        <h1 class="mt-4 text-center font-bold" :class="tailwind.H1">
          <span class="">{{
            headerFormatter("Please submit this project first")
          }}</span>
        </h1>
      </div>
    </div>
    <div class="pdf_tab" v-if="activeTab3">
      <ClubProjectPdf
        v-if="store.$state.clubProjectFormProps.formModeProp === 'UPDATE'"
        :projectProp="projectToUpdateOrCreate"
      />
      <div v-else>
        <h1 class="mt-4 text-center font-bold" :class="tailwind.H1">
          <span class="">{{
            headerFormatter("Please submit this project first")
          }}</span>
        </h1>
      </div>
    </div>
    <div class="pledge_tab" v-if="activeTab4">
      <AllPledgesTable
        :pledgesProp="projectToUpdateOrCreate.pledgesAssociated"
      />
    </div>
    <div class="approval_tab" v-if="activeTab5">
      <Toast
        v-if="toast.display"
        :msg="toast.msg"
        :width="toast.width"
        :closeTimer="toast.closeTimer"
      />
      <h1 class="mt-4 text-center font-bold" :class="tailwind.H1">
        Approve Project
      </h1>
      <div class="details my-8 flex flex-col items-center gap-8">
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
        <ErrorValidation v-if="projectApproval" :errorMsg="projectApproval" />
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
    </div>
    <div class="share_tab" v-if="activeTab6">
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
    <div class="addUser_tab" v-if="activeTab7">
      <AddUserProjectForm
        :projectAdminsProp="
          projectToUpdateOrCreate.projectDetails.projectAdmins
        "
        :projectId="projectToUpdateOrCreate.project_id"
        v-if="store.$state.clubProjectFormProps.formModeProp === 'UPDATE'"
      />
    </div>
  </div>
</template>

<script lang="ts">
import AllPledgesTable from "@/components/common/tables/AllPledgesTable.vue";
import ClubProjectPdf from "@/components/common/pdf/ClubProjectPdf.vue";

import {
  TAILWIND_COMMON_CLASSES,
  type IApiException,
  FORM_MODE_PROP,
  ErrorMessages,
  type IApiError,
  DISTRIST_REPORT_TYPE,
  MyError,
} from "@/utils/frontend/interfaces/Frontend";
import { defineComponent, ref } from "vue";
import UploadForm from "@/components/common/forms/UploadForm.vue";
import DistrictUploadModal from "@/components/common/modals/DistrictUploadModal.vue";
import BaseDatePicker from "@/components/common/baseformComponents/BaseDatePicker.vue";
import RotaryButton from "@/components/common/RotaryButton.vue";
import BaseFileUpload from "@/components/common/baseformComponents/BaseFileUpload.vue";
import BaseSelect from "@/components/common/baseformComponents/BaseSelect.vue";
import BaseCheckBox from "@/components/common/baseformComponents/BaseCheckBox.vue";
import BaseInputsText from "@/components/common/baseformComponents/BaseInputsText.vue";
import BaseInputsTextEmail from "@/components/common/baseformComponents/BaseInputsTextEmail.vue";
import BaseTextArea from "@/components/common/baseformComponents/BaseTextArea.vue";
import useVuelidate from "@vuelidate/core";
import ConfirmModal from "@/components/common/../common/modals/ConfirmModal.vue";
import ExceptionModal from "@/components/common/modals/ExceptionModal.vue";
import Toast from "@/components/common/toast/Toast.vue";
import { useRotaryStore } from "@/stores/rotaryStore";
import Utilities from "@/utils/frontend/classes/Utilities";
import ErrorValidation from "@/components/common/baseformComponents/ErrorValidation.vue";
import type {
  IClubProject,
  IDmProject,
  IDsgProject,
  StorageInformation,
} from "@/utils/shared/interfaces/ProjectsInterface";
import {
  email,
  helpers,
  maxLength,
  minLength,
  required,
} from "@vuelidate/validators";
import UploadsApi from "@/services/Uploads";
import ProjectsApi from "@/services/Projects";
import ClubProject from "@/utils/shared/classes/ClubProject";
import {
  GrantType,
  ProjectStatus,
} from "@/utils/shared/interfaces/SharedInterface";
import AddUserProjectForm from "@/components/common/forms/AddUserProjectForm.vue";
import ResourceLists from "@/utils/frontend/classes/ResourceLists";
import fastDeepEqual from "fast-deep-equal";
export default defineComponent({
  name: "ClubProjectForm",
  setup() {
    const store = useRotaryStore();
    const v$ = useVuelidate();
    return {
      v$,
      store,
    };
  },
  components: {
    AllPledgesTable,
    AddUserProjectForm,
    RotaryButton,
    BaseFileUpload,
    BaseSelect,
    BaseCheckBox,
    BaseInputsText,
    BaseTextArea,
    ConfirmModal,
    ExceptionModal,
    Toast,
    BaseInputsTextEmail,
    BaseDatePicker,
    DistrictUploadModal,
    ErrorValidation,
    UploadForm,
    ClubProjectPdf,
  },
  props: {},
  data() {
    return {
      projectApproval: "",
      urlForShare: "",
      headerFormatter: Utilities.headerFormater,
      projectToUpdateOrCreate:  new ClubProject() as IClubProject,
      activeTab1: "",
      activeTab2: "",
      activeTab3: "",
      activeTab4: "",
      activeTab5: "",
      activeTab6: "",
      activeTab7: "",
      submitButtonmsg: "Submit",
      tailwind: TAILWIND_COMMON_CLASSES,
      expectionObject: {} as IApiException,
      toast: {
        display: false,
        msg: "",
        width: "w-1/2",
        closeTimer: 4000,
      },
      allowedToLeaveForm: false,
      submited: false,
      serverException: false,
      countryList: ResourceLists.countryList,
      areaFocusImages: ResourceLists.areaFocusImages,
      regionList: ResourceLists.regionList,
      initialProject: {} as IClubProject,
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
                  this.projectToUpdateOrCreate
                    .anticipated_funding as unknown as string
                ) <=
                parseFloat(
                  this.projectToUpdateOrCreate.funding_goal as unknown as string
                )
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
                  this.projectToUpdateOrCreate
                    .anticipated_funding as unknown as string
                ) >=
                parseFloat(
                  this.projectToUpdateOrCreate
                    .total_pledges as unknown as string
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
      },
    };
  },
  async created() {
    this.setTab(1);
    if (this.store.$state.clubProjectFormProps.formModeProp === "UPDATE") {
      this.submitButtonmsg = Utilities.uncapitalize(FORM_MODE_PROP.UPDATE);
      await this.populateFormData();
    } else if (
      this.store.$state.clubProjectFormProps.formModeProp === "CREATE"
    ) {
      this.projectToUpdateOrCreate = new ClubProject();
      this.initialProject = { ...this.projectToUpdateOrCreate };
      this.projectToUpdateOrCreate.grant_type = GrantType.CLUBPROJECT;
      this.projectToUpdateOrCreate.created_by = this.store.$state
        .loggedInUserData.user_id as number;
      this.projectToUpdateOrCreate.club_id =
        this.store.$state.clubProjectFormProps.isAdminOverrideClubIdProp ??
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
  },
  methods: {
    async approveProject() {
      if (
        this.projectToUpdateOrCreate.project_status !==
        ProjectStatus.PENDINGAPPROVAL
      ) {
        this.projectApproval = "Project has not been submitted for approval.";
        setTimeout(() => {
          this.projectApproval = "";
        }, 3000);
        return;
      }
      try {
        const response = await ProjectsApi.updateProjectStatus(
          this.projectToUpdateOrCreate.project_id as number,
          ProjectStatus.APPROVED
        );
        if (!Utilities.isAnApiError(response) && response === true) {
          window.scrollTo(0, 0);
          this.toast.display = true;
          this.toast.msg = this.headerFormatter("Project Approved");
          setTimeout(async () => {
            this.toast.display = false;
            this.$router.push("/");
          }, 4000);
        } else {
          throw new MyError(
            (response as IApiError).message,
            (response as IApiError).stack,
            (response as IApiError).code
          );
        }
      } catch (error) {
        this.expectionObject = error as IApiException;
        this.serverException = true;
      }
    },

    async createClubProject() {
      try {
        const response = await ProjectsApi.createNewProject(
          this.projectToUpdateOrCreate
        );
        if (!Utilities.isAnApiError(response)) {
          window.scrollTo(0, 0);
          this.toast.display = true;
          this.toast.msg = this.headerFormatter(
            "Project Created. You can begin uploading files"
          );
          this.store.setClubProjectFormProps({
            formModeProp: "UPDATE",
            porjectIdProp: response as number,
          });
          this.submitButtonmsg = Utilities.uncapitalize(FORM_MODE_PROP.UPDATE);
          setTimeout(async () => {
            this.toast.display = false;
            await this.populateFormData();
          }, 4000);
        } else {
          throw new MyError(
            (response as IApiError).message,
            (response as IApiError).stack,
            (response as IApiError).code
          );
        }
      } catch (error) {
        this.serverException = true;
        this.expectionObject = error as IApiException;
      }
    },
    async updateClubProject() {
      try {
        const response = await ProjectsApi.updateProject(
          this.projectToUpdateOrCreate
        );
        if (!Utilities.isAnApiError(response)) {
          window.scrollTo(0, 0);
          this.toast.display = true;
          this.toast.msg = this.headerFormatter("Project Updated");
          setTimeout(async () => {
            this.toast.display = false;
            this.redirect();
          }, 4000);
        } else {
          throw new MyError(
            (response as IApiError).message,
            (response as IApiError).stack,
            (response as IApiError).code
          );
        }
      } catch (error) {
        this.serverException = true;
        this.expectionObject = error as IApiException;
      }
    },
    async validateClubProject(): Promise<void> {
      await this.v$.$validate();
      if (this.v$.$error) {
        window.scrollTo(0, 0);
        this.toast.display = true;
        this.toast.msg = "Fix Form Errors";
        setTimeout(() => {
          this.toast.display = false;
        }, 4000);
        return;
      }
      if (!this.v$.$error) {
        if (this.store.$state.clubProjectFormProps.formModeProp === "CREATE") {
          this.createClubProject();
        } else if (
          this.store.$state.clubProjectFormProps.formModeProp === "UPDATE"
        ) {
          this.updateClubProject();
        }
      }
    },
    async populateFormData() {
      try {
        const response = await ProjectsApi.getProjectById(
          this.store.$state.clubProjectFormProps.porjectIdProp as number
        );
        if (!Utilities.isAnApiError(response)) {
          this.projectToUpdateOrCreate = response as IClubProject;
          this.initialProject = { ...this.projectToUpdateOrCreate };
          this.urlForShare =
            "https://myrotaryprojects.org/" +
            "project/" +
            this.projectToUpdateOrCreate.project_id;
        } else throw new MyError((response as IApiError).message);
      } catch (error) {
        this.serverException = true;
        this.expectionObject = error as IApiException;
      }
    },
    setTab(tab: number) {
      switch (tab) {
        case 1:
          this.activeTab1 = "bg-gray-200";
          this.activeTab2 = "";
          this.activeTab3 = "";
          this.activeTab4 = "";
          this.activeTab5 = "";
          this.activeTab6 = "";
          this.activeTab7 = "";
          break;
        case 2:
          this.activeTab1 = "";
          this.activeTab2 = "bg-gray-200";
          this.activeTab3 = "";
          this.activeTab4 = "";
          this.activeTab5 = "";
          this.activeTab6 = "";
          this.activeTab7 = "";
          break;
        case 3:
          this.activeTab1 = "";
          this.activeTab2 = "";
          this.activeTab3 = "bg-gray-200";
          this.activeTab4 = "";
          this.activeTab5 = "";
          this.activeTab6 = "";
          this.activeTab7 = "";
          break;
        case 4:
          this.activeTab1 = "";
          this.activeTab2 = "";
          this.activeTab3 = "";
          this.activeTab4 = "bg-gray-200";
          this.activeTab5 = "";
          this.activeTab6 = "";
          this.activeTab7 = "";
          break;
        case 5:
          this.activeTab1 = "";
          this.activeTab2 = "";
          this.activeTab3 = "";
          this.activeTab4 = "";
          this.activeTab5 = "bg-gray-200";
          this.activeTab6 = "";
          this.activeTab7 = "";
          break;
        case 6:
          this.activeTab1 = "";
          this.activeTab2 = "";
          this.activeTab3 = "";
          this.activeTab4 = "";
          this.activeTab5 = "";
          this.activeTab6 = "bg-gray-200";
          this.activeTab7 = "";
          break;
        case 7:
          this.activeTab1 = "";
          this.activeTab2 = "";
          this.activeTab3 = "";
          this.activeTab4 = "";
          this.activeTab5 = "";
          this.activeTab6 = "";
          this.activeTab7 = "bg-gray-200";
          break;
        default:
          break;
      }
    },
    formatter(amount: number) {
      if (amount) {
        const formatter = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        });
        return "Total Pledges :" + formatter.format(amount);
      } else {
        return this.headerFormatter(
          "Total Pledge Amount not available check pledges tab"
        );
      }
    },

    redirect() {
      this.store.$state.canLeaveForm = true;
      this.$router.go(-1);
    },
  },
  computed: {},
});
</script>

<style scoped lang="scss">
@import "@/assets/syles.scss";
</style>
