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
      <form @submit.prevent="" class="flex w-2/4 flex-col p-8" novalidate>
        <h1 class="text-center font-bold" :class="tailwind.H1">
          {{
            store.$state.userFormProps.formModeProp === formMode.CREATE
              ? "Create User"
              : "Update User" + " " + user.fullName
          }}
        </h1>
        <BaseInputsText label="First Name" v-model="user.firstname" />
        <ErrorValidation
          v-if="v$.user.firstname.$error"
          :errorMsg="v$.user.firstname.$errors[0].$message"
        />
        <div class="button_row mt-4 flex justify-center gap-4">
          <RotaryButton :label="submitButtonmsg" @click="validateUser()" />
          <RotaryButton label="Cancel" @click="redirect()" />
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import {
  TAILWIND_COMMON_CLASSES,
  type IApiException,
  FORM_MODE_PROP,
  ErrorMessages,
  type IApiError,
  DISTRIST_REPORT_TYPE,
} from "@/utils/frontend/interfaces/Frontend";
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
import RotaryUser from "@/utils/shared/classes/RotaryUser";
import { useRotaryStore, type IUserFormProps } from "@/stores/rotaryStore";
import Utilities from "@/utils/frontend/classes/Utilities";
import ErrorValidation from "@/components/common/baseformComponents/ErrorValidation.vue";
import DistrictsApi from "@/services/Districts";
import ResourceLists from "@/utils/frontend/classes/ResourceLists";
import type club from "@/utils/shared/classes/RotaryClub";
import UserApi from "@/services/User";
import {
  email,
  helpers,
  maxLength,
  minLength,
  required,
  requiredIf,
} from "@vuelidate/validators";
export default defineComponent({
  name: "UserForm",
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
  data() {
    return {
      userformProps: {} as IUserFormProps,
      submitButtonmsg: "Submit",
      user: new RotaryUser(),
      tailwind: TAILWIND_COMMON_CLASSES,
      serverException: false,
      expectionObject: {} as IApiException,
      confirmNavigation: false,
      formMode: FORM_MODE_PROP,
      toast: {
        display: false,
        msg: "",
        width: "w-1/2",
        closeTimer: 4000,
      },
      allowedToLeaveForm: false,
      submited: false,
      changePassword: false,
      provinceOrStatesList: ResourceLists.canadaProvinceList,
      countryList: ResourceLists.countryList,
      districtRolesList: ResourceLists.districtRoles,
      clubRolesList: ResourceLists.clubRoles,
      districtMapChosenDistrictToID: new Map<string, number>(),
      clubMapChosenDistrictToID: new Map<string, number>(),
      districtNameList: [] as string[],
      clubNameList: [] as string[],
      clubListObjectArray: [] as club[],
      orginalEmail: "",
      modelText: "",
      provinceInputTypeToggle: false,
      allowedToLeaveRoute: false,
      userRole: "",
      belongsToDistrict: "",
      belongsToClub: "",
    };
  },
  watch: {},
  validations() {
    return {
      user: {
        firstname: {
          required: helpers.withMessage(ErrorMessages.REQURIED_FIELD, required),
          maxLength: maxLength(50),
        },
        lastname: {
          required: helpers.withMessage(ErrorMessages.REQURIED_FIELD, required),
          maxLength: maxLength(50),
        },
        address: {
          required: helpers.withMessage(ErrorMessages.REQURIED_FIELD, required),
          maxLength: maxLength(100),
        },
        user_postal: {
          required: helpers.withMessage(ErrorMessages.REQURIED_FIELD, required),
          maxLength: maxLength(32),
        },
        user_province: {
          required: helpers.withMessage(ErrorMessages.REQURIED_FIELD, required),
          maxLength: maxLength(100),
        },
        user_city: {
          required: helpers.withMessage(ErrorMessages.REQURIED_FIELD, required),
          maxLength: maxLength(50),
        },
        user_country: {
          required: helpers.withMessage(ErrorMessages.REQURIED_FIELD, required),
          maxLength: maxLength(50),
        },
        email: {
          required: helpers.withMessage(ErrorMessages.REQURIED_FIELD, required),
          email: helpers.withMessage(ErrorMessages.INVALID_EMAIL, email),
        },
        password: {
          required: helpers.withMessage(ErrorMessages.REQURIED_FIELD, required),
          passWordLength: helpers.withMessage(
            ErrorMessages.PASSWORD_MIN_LENGTH,
            () => {
              return this.user.password.length > 6;
            }
          ),
        },
      },
      belongsToDistrict: {
        required: requiredIf(
          this.userformProps.formModeProp === "CREATE" &&
            this.userformProps.userCreationTypeProp !== "CLUB_MEMBER" &&
            this.belongsToDistrict == ""
        ),
      },
      belongsToClub: {
        required: requiredIf(
          this.userformProps.formModeProp == "CREATE" &&
            this.userformProps.userCreationTypeProp !== "CLUB_MEMBER" &&
            this.belongsToClub == ""
        ),
      },
      // roleTypePreApiCall: {
      //   required: requiredIf(
      //     this.editOrCreateProp == "CREATE" && this.user.role_type == 0
      //   ),
      // },
    };
  },
  async created() {
    this.userformProps = this.store.$state.userFormProps;
    if (this.userformProps.formModeProp === FORM_MODE_PROP.UPDATE) {
      this.submitButtonmsg = Utilities.uncapitalize(FORM_MODE_PROP.UPDATE);
      await this.populateFormData();
    }
  },
  methods: {
    async populateFormData() {
      try {
        debugger
        let response = await UserApi.getUserById(
          this.store.$state.userFormProps.userIdProp as number
        );
        if (!Utilities.isAnApiError(response)) {
          this.user = response as RotaryUser;
        }
      } catch (error) {
        this.serverException = true;
        this.expectionObject = error as IApiException;
      }
    },
    validateUser(): void {
      this.v$.$validate();
      if (!this.v$.$error) {
        if (
          this.userformProps.formModeProp === "CREATE" &&
          this.userformProps.userCreationTypeProp === "DISTRICT_ADMIN"
        ) {
          this.createAdminUser();
        } else if (
          this.userformProps.formModeProp === "CREATE" &&
          this.userformProps.userCreationTypeProp === "CLUB_MEMBER"
        ) {
          this.createClubUser();
        } else if (
          this.userformProps.formModeProp === "UPDATE" &&
          this.userformProps.userCreationTypeProp === "DISTRICT_ADMIN"
        ) {
          this.updateAdminUser();
        } else if (
          this.userformProps.formModeProp === "UPDATE" &&
          this.userformProps.userCreationTypeProp === "CLUB_MEMBER"
        ) {
          this.updateClubUser();
        } else {
          this.updateClubUser();
        }
      }
    },
    async emailHandler(isThisACreate: boolean): Promise<boolean> {
      return true;
    },
    async createClubUser(): Promise<void> {
      this.emailHandler(true);
    },
    async createAdminUser(): Promise<void> {
      this.emailHandler(true);
    },
    async updateAdminUser(): Promise<void> {
      if (await this.emailHandler(false)) {
      }
    },
    async updateClubUser(): Promise<void> {},
    resetSet() {
      (this.showConfirmModal as any) = {
        showConfirmModal: false,
        confirmModalMessage: "",
        idTobeDeleted: 0,
      };
    },
    redirect(): void {
      this.$router.go(-1);
    },
  },
  computed: {},
});
</script>

<style scoped lang="scss"></style>
