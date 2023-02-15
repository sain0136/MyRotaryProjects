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
        :districReportFileUpload="districReportFileUpload"
      />
      <h1 class="text-center font-bold" :class="tailwind.H1">
        {{
          store.$state.districtFormProps.formModeProp === formMode.CREATE
            ? "Create New District"
            : "Update District"
        }}
      </h1>
      <hr class="mt-2 h-px w-full border-0 bg-gray-500" />
      <form @submit.prevent="" class="flex w-2/4 flex-col p-8">
        <BaseInputsText label="District Name" v-model="district.district_name" />
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
        <h1
          v-if="district.district_details.reportLinks.length > 0"
          class="text-center font-bold"
          :class="tailwind.H1"
        >
          Report Forms
        </h1>
        <table
          v-if="district.district_details.reportLinks.length > 0"
          class="w-full text-left text-sm text-gray-500 dark:text-gray-400"
        >
          <thead class="text-s bg-primary-black uppercase text-primary-white">
            <tr>
              <th scope="col" class="px-6 py-3">FileType</th>
              <th scope="col" class="px-6 py-3">Link</th>
              <th scope="col" class="px-6 py-3">Actions</th>
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
                {{ link.url }}
              </td>
              <td class="px-6 py-4 text-primary-black">
                <div class="buttons_container2 flex gap-2">
                  <button
                    title="Delete Report"
                    class="crud_buttons hover:text-primary-c"
                    @click=""
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
          label="Set the date for when DM and DSG grant submission will be opened"
        />
        <BaseDatePicker
          v-model="district.district_details.dates.grant_submission_closedate"
          label="Set the date for when DM and DSG grant submission will be closed"
        />
        <BaseInputsText
          v-model="district.district_details.ddfCapes.dsgCap"
          label="Set the District Simplified Grant cap for DDF Matching"
          formType="number"
          inputMode="numeric"
        />
        <BaseInputsText
          v-model="district.district_details.ddfCapes.dsgFraction"
          label="Set the fraction/rate to the USD to match funds"
          formType="number"
          inputMode="numeric"
        />
        <BaseInputsText
          v-model="district.district_details.ddfCapes.dmCap"
          label="Set the District Matching Grant cap for DDF Matching"
          formType="number"
          inputMode="numeric"
        />
        <BaseInputsText
          v-model="district.district_details.ddfCapes.dmFraction"
          label="Set the fraction/rate to the USD to match funds"
          formType="number"
          inputMode="numeric"
        />
        <hr class="my-8  h-px w-full border-0 bg-gray-500" />
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
import { email, helpers, maxLength, minLength, required } from "@vuelidate/validators";

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
  props: {},
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
  validations() {
    return {
      district: {
        // district_number: { required },
        district_name: {
          required:helpers.withMessage(ErrorMessages.REQURIED_FIELD, required)
        },
        district_description: {
          required:helpers.withMessage(ErrorMessages.REQURIED_FIELD, required),
          maxLength: maxLength(1000),
          minLenght: minLength(100),
        },
        district_email: {
          required:helpers.withMessage(ErrorMessages.REQURIED_FIELD, required),
          email: helpers.withMessage(ErrorMessages.INVALID_EMAIL, email),
        },
        district_details: {
          dates: {
            grant_submission_closedate: { required },
            grant_submission_startdate: { required },
          },
          ddfCapes: {
            dsgCap: { required },
            dsgFraction: { required },
            dmCap: { required },
            dmFraction: { required },
          },
        },
      },
    };
  },
  data() {
    return {
      districReportFileUpload: {
        extra_label: "",
        district_id: 0,
      },
      formMode: FORM_MODE_PROP,
      submitButtonmsg: "Submit",
      district: new DistrictObject(),
      tailwind: TAILWIND_COMMON_CLASSES,
      serverException: false,
      expectionObject: {} as IApiException,
      confirmNavigation: null as any,
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
      this.store.$state.districtFormProps.formModeProp === FORM_MODE_PROP.EDIT
    ) {
      this.submitButtonmsg = Utilities.uncapitalize(FORM_MODE_PROP.EDIT);
      await this.populateFormData();
    }
  },
  methods: {
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
      // if (!this.v$.$error) {
      //   if (this.submited) {
      //     this.updateExistingDistrict();
      //     return;
      //   }
      //   if (this.editOrCreateProp == "CREATE") {
      //     this.createDistrict();
      //   } else {
      //     this.updateExistingDistrict();
      //   }
      // }
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
    redirect() {
      this.$router.push({ name: "AdminHome" });
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
