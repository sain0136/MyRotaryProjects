<template>
  <div class="container mt-8 min-w-full gap-8" :class="tailwind.DIVCOL">
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
      <ConfirmModal
        v-if="showConfirmModal.showConfirmModal"
        :modelValue="confirmNavigation"
        :question="showConfirmModal.confirmModalMessage"
      />
      <DistrictUploadModal
        v-if="showDistrictUploadModal"
        :districtIdProp="district.district_id"
        :districReportFileUpload="districReportFileUpload"
        :modelValue="showDistrictUploadModal"
        :formTypesListProp="formTypesList"
        @update:modelValue="
          showDistrictUploadModal = false;
          populateFormData();
        "
      />
      <h1
        v-if="!store.$state.districtFormProps.districtSettingsView === true"
        class="text-center font-bold"
        :class="tailwind.H1"
      >
        {{
          store.$state.districtFormProps.formModeProp === formMode.CREATE
            ? "Create New District"
            : "Update District"
        }}
      </h1>
      <form @submit.prevent="" class="flex w-2/4 flex-col p-8" novalidate>
        <BaseInputsText
          label="District Number"
          v-model="district.district_name"
        />
        <ErrorValidation
          v-if="v$.district.district_name.$error"
          :errorMsg="v$.district.district_name.$errors[0].$message"
        />
        <BaseInputsText
          v-model="district.district_president"
          label="District Governer"
        />
        <BaseInputsTextEmail v-model="district.district_email" label="Email " />
        <ErrorValidation
          v-if="v$.district.district_email.$error"
          :errorMsg="v$.district.district_email.$errors[0].$message"
        />
        <BaseTextArea
          v-model="district.district_description"
          label="Description"
        />
        <ErrorValidation
          v-if="v$.district.district_description.$error"
          :errorMsg="v$.district.district_description.$errors[0].$message"
        />

        <div
          class="my-4 flex flex-col items-center gap-4"
          v-if="
            store.$state.districtFormProps.formModeProp === formMode.UPDATE &&
            formTypesList.length > 0
          "
        >
          <hr class="my-8 h-px w-full border-0 bg-gray-500" />
          <h1 class="text-center font-bold" :class="tailwind.H1">
            Report Forms
          </h1>
          <RotaryButton
            label="Add Report Form"
            @click="showDistrictUploadModal = true"
            :formTypesListProp="formTypesList"
          />
          <hr class="my-8 h-px w-full border-0 bg-gray-500" />
        </div>

        <table
          v-if="district.district_details.reportLinks.length > 0"
          class="w-full text-left text-sm text-gray-500 dark:text-gray-400"
        >
          <thead class="text-s bg-primary-black uppercase text-primary-white">
            <tr>
              <th scope="col" class="px-6 py-3">FileType</th>
              <th scope="col" class="px-6 py-3">Link</th>
              <th scope="col" class="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody class="tb_r">
            <tr
              class="border-b"
              id="district_info"
              v-for="link in district.district_details.reportLinks"
              :key="district.district_id"
            >
              <th
                scope="row"
                class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
              >
                {{ link.extraLabel }}
              </th>
              <td class="px-6 py-4 text-primary-black">
                <a :href="link.url" target="_blank" :class="tailwind.A_LINK"
                  >View</a
                >
              </td>
              <td class="px-6 py-4 text-primary-black">
                <div class="buttons_container2 flex justify-center gap-2">
                  <button
                    title="Delete Report"
                    class="crud_buttons hover:text-primary-c"
                    @click="
                      deleteFile({
                        id: link.id,
                        fileType: link.fileType,
                        url: link.url,
                        location: link.location,
                        extraLabel: link.extraLabel,
                      })
                    "
                  >
                    <font-awesome-icon
                      class="hover:text-primary-color"
                      icon="fa-solid fa-trash-can"
                    />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <h1 class="my-4 text-center font-bold" :class="tailwind.H1">
          District Settings
        </h1>
        <hr class="my-8 h-px w-full border-0 bg-gray-500" />

        <BaseDatePicker
          v-model="district.district_details.dates.grant_submission_startdate"
          label="Date District Matching and District Simplified grant submission will be opened"
        />
        <ErrorValidation
          v-if="
            v$.district.district_details.dates.grant_submission_startdate.$error
          "
          :errorMsg="
            v$.district.district_details.dates.grant_submission_startdate
              .$errors[0].$message
          "
        />
        <BaseDatePicker
          v-model="district.district_details.dates.grant_submission_closedate"
          label="Date District Matching and District Simplified grant submission will be closed"
        />
        <ErrorValidation
          v-if="
            v$.district.district_details.dates.grant_submission_closedate.$error
          "
          :errorMsg="
            v$.district.district_details.dates.grant_submission_closedate
              .$errors[0].$message
          "
        />
        <BaseInputsText
          v-model="district.district_details.ddfCapes.dsgCap"
          label="Set the District Simplified Grant cap for DDF Matching"
          formType="number"
          inputMode="numeric"
        />
        <ErrorValidation
          v-if="v$.district.district_details.ddfCapes.dsgCap.$error"
          :errorMsg="
            v$.district.district_details.ddfCapes.dsgCap.$errors[0].$message
          "
        />
        <BaseInputsText
          v-model="district.district_details.ddfCapes.dsgFraction"
          label="Set the fraction/rate to the USD to match funds"
          formType="number"
          inputMode="numeric"
          step="0.01"
        />
        <ErrorValidation
          v-if="v$.district.district_details.ddfCapes.dsgFraction.$error"
          :errorMsg="
            v$.district.district_details.ddfCapes.dsgFraction.$errors[0]
              .$message
          "
        />
        <BaseInputsText
          v-model="district.district_details.ddfCapes.dmCap"
          label="Set the District Matching Grant cap for DDF Matching"
          formType="number"
          inputMode="numeric"
        />
        <ErrorValidation
          v-if="v$.district.district_details.ddfCapes.dmCap.$error"
          :errorMsg="
            v$.district.district_details.ddfCapes.dmCap.$errors[0].$message
          "
        />
        <BaseInputsText
          v-model="district.district_details.ddfCapes.dmFraction"
          label="Set the fraction/rate to the USD to match funds"
          formType="number"
          inputMode="numeric"
          step="0.01"
        />
        <ErrorValidation
          v-if="v$.district.district_details.ddfCapes.dmFraction.$error"
          :errorMsg="
            v$.district.district_details.ddfCapes.dmFraction.$errors[0].$message
          "
        />
        <hr class="my-8 h-px w-full border-0 bg-gray-500" />
        <h1 class="mb-4 text-center font-bold" :class="tailwind.H1">
          Set The Funding Sources That Will Be Used To Calculate Your District's
          DDF Limit.
        </h1>
        <div class="source_setting">
          <table
            class="w-full text-left text-sm text-gray-500 dark:text-gray-400"
          >
            <thead
              class="text-s h-1/3 bg-primary-black uppercase text-primary-white"
            >
              <th scope="col" class="px-6 py-3">Sources</th>
              <th scope="col" class="px-6 py-3">Add</th>
            </thead>
            <tr
              class="border-b bg-white"
              v-for="source in sourceList"
              :key="source"
            >
              <td
                scope="row"
                class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
              >
                {{ source }}
              </td>
              <td class="mt-3 flex justify-center">
                <button
                  title="Add source"
                  @click="addOrDeleteSourceToDdfCalculation(true, source)"
                >
                  <font-awesome-icon icon="fa-solid fa-circle-plus" />
                </button>
              </td>
            </tr>
          </table>
          <div class="mt-4 flex flex-col items-center">
            <RotaryButton
              label="Delete Last Source"
              @click="addOrDeleteSourceToDdfCalculation(false)"
            />
          </div>
          <h2
            class="my-8 justify-center text-center text-lg font-bold"
            :class="tailwind.H1"
          >
            Below is the list of funding sources that will used to calulate your
            districts DDF limit:
            <ErrorValidation :errorMsg="duplicateErrorMsg" />
          </h2>
          <ol start="1" class="mb-8 flex flex-col items-center">
            <li
              :class="tailwind.LABEL"
              v-for="label in district.district_details.ddfCalculation"
              :key="(label as string)"
            >
              {{ label }}
            </li>
          </ol>
          <div class="button_row mt-4 flex justify-center gap-4">
            <RotaryButton
              :label="submitButtonmsg"
              @click="validateDistrict()"
            />
            <RotaryButton label="Cancel" @click="redirect()" />
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import {
  TAILWIND_COMMON_CLASSES,
  type IApiException,
  FORM_MODE_PROP,
  ErrorMessages,
  type IApiError,
  DISTRIST_REPORT_TYPE,
} from "@/utils/frontend/interfaces/Frontend";
import { defineComponent, ref } from "vue";
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
import DistrictObject from "@/utils/shared/classes/DistrictObject";
import { useRotaryStore } from "@/stores/rotaryStore";
import Utilities from "@/utils/frontend/classes/Utilities";
import ErrorValidation from "@/components/common/baseformComponents/ErrorValidation.vue";
import DistrictsApi from "@/services/Districts";
import type { StorageInformation } from "@/utils/shared/interfaces/ProjectsInterface";
import {
  email,
  helpers,
  maxLength,
  minLength,
  required,
} from "@vuelidate/validators";
import UploadsApi from "@/services/Uploads";

export default defineComponent({
  beforeRouteLeave(next: any) {
    if (this.allowedToLeaveForm) {
      next(true);
      return;
    }
    (this.showConfirmModal as any) = {
      showConfirmModal: true,
      confirmModalMessage:
        "Are you sure you want to leave form with subitting?",
      idTobeDeleted: 0,
    };
  },
  name: "DistrictForm",
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
  },
  props: {
    test: {
      type: String,
      default: "",
    },
  },
  setup() {
    const store = useRotaryStore();
    const showConfirmModal = ref({
      showConfirmModal: false,
      confirmModalMessage: "",
      idTobeDeleted: 0,
    });
    function updateShowModal(newValue: any) {
      showConfirmModal.value = newValue;
    }

    const v$ = useVuelidate();
    return {
      showConfirmModal,
      updateShowModal,
      v$,
      store,
    };
  },
  data() {
    return {
      districReportFileUpload: {
        extra_label: "",
        district_id: 0,
      },
      formTypesList: [] as string[],
      formMode: FORM_MODE_PROP,
      submitButtonmsg: "Submit",
      district: new DistrictObject(),
      tailwind: TAILWIND_COMMON_CLASSES,
      serverException: false,
      expectionObject: {} as IApiException,
      confirmNavigation: false,
      toast: {
        display: false,
        msg: "",
        width: "w-1/2",
        closeTimer: 4000,
      },
      allowedToLeaveForm: false,
      submited: false,
      sourceList: [
        "District Club Contribution",
        "Non-District Club Contribution",
        "Co-operating Organization Contribution",
        "Other sources",
      ],
      modelText: "",
      districtCreated: false,
      showDistrictUploadModal: false,
      duplicateErrorMsg: "",
    };
  },
  validations() {
    return {
      district: {
        // district_number: { required },
        district_name: {
          required: helpers.withMessage(ErrorMessages.REQURIED_FIELD, required),
        },
        district_description: {
          required: helpers.withMessage(ErrorMessages.REQURIED_FIELD, required),
          maxLength: maxLength(1000),
          minLenght: minLength(100),
        },
        district_email: {
          required: helpers.withMessage(ErrorMessages.REQURIED_FIELD, required),
          email: helpers.withMessage(ErrorMessages.INVALID_EMAIL, email),
        },
        district_details: {
          dates: {
            grant_submission_closedate: { required },
            grant_submission_startdate: { required },
          },
          ddfCapes: {
            dsgCap: {
              greaterThanOne: helpers.withMessage(
                ErrorMessages.REQURIED_NUM_MIN_LENGTH,
                () => {
                  return this.district.district_details.ddfCapes.dsgCap >= 1;
                }
              ),
            },
            dsgFraction: {
              greaterThanOne: helpers.withMessage(
                ErrorMessages.REQURIED_NUM_MIN_LENGTH,
                () => {
                  return (
                    this.district.district_details.ddfCapes.dsgFraction > 0
                  );
                }
              ),
              lessThanOne: helpers.withMessage(
                ErrorMessages.NUMBER_MUST_FRAC,
                () => {
                  return (
                    this.district.district_details.ddfCapes.dsgFraction <= 1
                  );
                }
              ),
            },
            dmCap: {
              greaterThanOne: helpers.withMessage(
                ErrorMessages.REQURIED_NUM_MIN_LENGTH,
                () => {
                  return this.district.district_details.ddfCapes.dmCap >= 1;
                }
              ),
            },
            dmFraction: {
              greaterThanOne: helpers.withMessage(
                ErrorMessages.REQURIED_NUM_MIN_LENGTH,
                () => {
                  return this.district.district_details.ddfCapes.dmFraction > 0;
                }
              ),
              lessThanOne: helpers.withMessage(
                ErrorMessages.NUMBER_MUST_FRAC,
                () => {
                  return this.district.district_details.ddfCapes.dmFraction <= 1;
                }
              ),
            },
          },
        },
      },
    };
  },
  watch: {
    confirmNavigation: {
      async handler(newValue: any) {
        if (newValue) {
          this.allowedToLeaveForm = true;
          this.$router.go(-1);
        }
      },
      immediate: true,
    },
  },
  async created() {
    if (
      this.store.$state.districtFormProps.formModeProp === FORM_MODE_PROP.UPDATE
    ) {
      this.submitButtonmsg = Utilities.uncapitalize(FORM_MODE_PROP.UPDATE);
      await this.populateFormData();
      this.setformTypesList();
    }
    this.setformTypesList();
  },
  methods: {
    setformTypesList() {
      const checkReportType = [] as string[];
      for (const key in DISTRIST_REPORT_TYPE) {
        checkReportType.push(key);
      }
      if (this.district.district_details.reportLinks.length > 0) {
        this.district.district_details.reportLinks.forEach((item) => {
          if (checkReportType.includes(item.extraLabel as string)) {
            checkReportType.splice(
              checkReportType.indexOf(item.extraLabel as string),
              1
            );
          }
        });
        this.formTypesList = checkReportType;
      } else {
        this.formTypesList = checkReportType;
      }
    },
    async validateDistrict(): Promise<void> {
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
        // if (this.submited) {
        //   this.updateExistingDistrict();
        //   return;
        // }
        if (
          this.store.$state.districtFormProps.formModeProp ===
          FORM_MODE_PROP.UPDATE
        ) {
          this.updateExistingDistrict();
        } else {
          this.createDistrict();
        }
      }
    },
    async createDistrict() {
      try {
        const response = await DistrictsApi.createDistrict(this.district);
        if (!Utilities.isAnApiError(response)) {
          window.scrollTo(0, 0);
          this.district = response as DistrictObject;
          this.districtCreated = true;
          this.showDistrictUploadModal = true;
          this.store.$state.districtFormProps.formModeProp =
            FORM_MODE_PROP.UPDATE;
          this.store.$state.districtFormProps.districtIdProp =
            this.district.district_id;
          this.submitButtonmsg = Utilities.uncapitalize(FORM_MODE_PROP.UPDATE);
          this.toast.display = true;
          this.toast.msg =
            "District Created Successfully! Upload District Reports";
          setTimeout(() => {
            this.toast.display = false;
            this.showDistrictUploadModal = true;
          }, 3000);
        } else {
          this.toast.display = true;
          this.toast.msg = (response as IApiError).message;
          window.scrollTo(0, 0);
          setTimeout(() => {
            this.toast.display = false;
          }, 4000);
        }
      } catch (error) {
        this.serverException = true;
        this.expectionObject = error as IApiException;
      }
    },
    async updateExistingDistrict() {
      try {
        const response = await DistrictsApi.updateDistrict(
          this.district,
          this.district.district_id
        );
        if (!Utilities.isAnApiError(response)) {
          this.toast.display = true;
          this.toast.msg = "District Updated";
          window.scrollTo(0, 0);
          setTimeout(() => {
            this.redirect();
          }, 2000);
        }
      } catch (error) {
        this.serverException = true;
        this.expectionObject = error as IApiException;
      }
    },
    async populateFormData() {
      try {
        let response = await DistrictsApi.getDistrictById(
          this.store.$state.districtFormProps.districtIdProp as number
        );
        if (!Utilities.isAnApiError(response)) {
          this.district = response as DistrictObject;
        }
      } catch (error) {
        this.serverException = true;
        this.expectionObject = error as IApiException;
      }
    },
    resetSet() {
      (this.showConfirmModal as any) = {
        showConfirmModal: false,
        confirmModalMessage: "",
        idTobeDeleted: 0,
      };
    },
    addOrDeleteSourceToDdfCalculation(add: boolean, source?: string) {
      if (add && source) {
        let duplicate =
          this.district.district_details.ddfCalculation.includes(source);
        if (duplicate) {
          this.duplicateErrorMsg = "Duplicate source";
          setTimeout(() => {
            this.duplicateErrorMsg = "";
          }, 2000);
          return;
        }
        this.district.district_details.ddfCalculation.push(source);
      } else if (!add) {
        this.district.district_details.ddfCalculation.pop();
      }
    },
    async deleteFile(strorageInformation: StorageInformation) {
      try {
        const response = await UploadsApi.deleteADistrictReportUpload(
          this.district.district_id,
          strorageInformation
        );
        if (response) {
          this.district = response as DistrictObject;
          this.setformTypesList();
        }
      } catch (error) {
        this.serverException = true;
        this.expectionObject = error as IApiException;
      }
    },
    redirect() {
      this.store.$state.canLeaveForm = true;
      this.$router.go(-1);
      // this.$router.push({ name: "AdminHome" });
    },
  },

  computed: {},
});
</script>

<style scoped lang="scss">
ol {
  list-style: decimal;
}
</style>
