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
  </ul>
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
              v$.projectToUpdateOrCreate.project_description.$errors[0].$message
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
              v$.projectToUpdateOrCreate.anticipated_funding.$errors[0].$message
            "
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
      :projectIdProp="projectToUpdateOrCreate.project_id"
    />
    <div v-else>
      <h1 class="mt-4 text-center font-bold" :class="tailwind.H1">
        <span class="">{{
          headerFormatter("Please submit this project first")
        }}</span>
      </h1>
    </div>
  </div>
  <div class="pdf_section"></div>
</template>

<script lang="ts">
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
import DistrictsApi from "@/services/Districts";
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
import { GrantType } from "@/utils/shared/interfaces/SharedInterface";
import ResourceLists from "@/utils/frontend/classes/ResourceLists";
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
  },
  props: {},
  data() {
    return {
      headerFormatter: Utilities.headerFormater,
      projectToUpdateOrCreate: {} as IClubProject,
      activeTab1: "",
      activeTab2: "",
      activeTab3: "",
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
      this.projectToUpdateOrCreate.grant_type = GrantType.CLUBPROJECT;
      this.projectToUpdateOrCreate.created_by = this.store.$state
        .loggedInUserData.user_id as number;
      this.projectToUpdateOrCreate.club_id =
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
          break;
        case 2:
          this.activeTab1 = "";
          this.activeTab2 = "bg-gray-200";
          this.activeTab3 = "";
          break;
        case 3:
          this.activeTab1 = "";
          this.activeTab2 = "";
          this.activeTab3 = "bg-gray-200";
          break;
        default:
          break;
      }
    },
    redirect() {
      this.$router.go(-1);
    },
  },
  computed: {},
});
</script>

<style scoped lang="scss">
@import "@/assets/syles.scss";
</style>
