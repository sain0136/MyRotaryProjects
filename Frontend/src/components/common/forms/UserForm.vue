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
      <h1 v-if="!store.$state.userFormProps.myProfileViewProp" class="text-center font-bold" :class="tailwind.H1">
        {{
          store.$state.userFormProps.formModeProp === formMode.CREATE
            ? "Create User"
            : "Update:" + " " + user.fullName
        }}
      </h1>
      <form
        @submit.prevent=""
        autocomplete="off"
        class="flex w-2/4 flex-col p-8"
        novalidate
      >
        <div
          class="flex flex-col gap-4"
          v-if="
            userformProps.userCreationTypeProp === 'DISTRICT_ADMIN' &&
            userformProps.formModeProp === 'CREATE'
          "
        >
          <h1 class="text-center font-bold" :class="tailwind.H1">
            {{ headerFormatter("Admin User - District Assignment") }}
          </h1>
          <BaseSelect
            v-model="userBelongsToDistrict"
            :options="districtNameList"
          />
          <ErrorValidation
            v-if="v$.userBelongsToDistrict.$error"
            :errorMsg="v$.userBelongsToDistrict.$errors[0].$message"
          />
          <div v-if="user.district_id > 0">
            <h1 class="text-center" :class="tailwind.H1">
              {{ headerFormatter("Admin User - Club Assignment") }}
            </h1>
            <BaseSelect v-model="userBelongsToClub" :options="clubNameList" />
            <ErrorValidation
              v-if="v$.userBelongsToClub.$error"
              :errorMsg="v$.userBelongsToClub.$errors[0].$message"
            />
          </div>
        </div>
        <BaseSelect
          v-if="!userformProps.myProfileViewProp"
          label="Role"
          v-model="user.role_type"
          :options="rolesList"
        />
        <ErrorValidation
          v-if="v$.user.role_type.$error"
          :errorMsg="v$.user.role_type.$errors[0].$message"
        />
        <BaseInputsText
          label="First Name"
          v-model="user.firstname"
          autoCmplete="false"
          nameHtml="hidden"
        />
        <ErrorValidation
          v-if="v$.user.firstname.$error"
          :errorMsg="v$.user.firstname.$errors[0].$message"
        />
        <BaseInputsText label="Last Name" v-model="user.lastname" />
        <ErrorValidation
          v-if="v$.user.lastname.$error"
          :errorMsg="v$.user.lastname.$errors[0].$message"
        />
        <BaseInputsText label="Address" v-model="user.address" />
        <ErrorValidation
          v-if="v$.user.address.$error"
          :errorMsg="v$.user.address.$errors[0].$message"
        />
        <BaseInputsText label="City" v-model="user.user_city" />
        <ErrorValidation
          v-if="v$.user.user_city.$error"
          :errorMsg="v$.user.user_city.$errors[0].$message"
        />
        <BaseInputsText label="Postal/Zip Code" v-model="user.user_postal" />
        <ErrorValidation
          v-if="v$.user.user_postal.$error"
          :errorMsg="v$.user.user_postal.$errors[0].$message"
        />
        <BaseSelect
          v-if="provinceOrStatesList.length > 0"
          label="Province/State"
          v-model="user.user_province"
          :options="provinceOrStatesList"
        />
        <BaseInputsText
          v-if="provinceOrStatesList.length < 1"
          label="Province/State"
          v-model="user.user_province"
        />
        <ErrorValidation
          v-if="v$.user.user_province.$error"
          :errorMsg="v$.user.user_province.$errors[0].$message"
        />
        <BaseSelect
          label="Country"
          v-model="user.user_country"
          :options="countryList"
        />
        <ErrorValidation
          v-if="v$.user.user_country.$error"
          :errorMsg="v$.user.user_country.$errors[0].$message"
        />
        <BaseInputsText label="Phone" v-model="user.phone" />
        <ErrorValidation
          v-if="v$.user.phone.$error"
          :errorMsg="v$.user.phone.$errors[0].$message"
        />
        <BaseInputsTextEmail label="Email" v-model="user.email" />
        <ErrorValidation
          v-if="v$.user.email.$error"
          :errorMsg="v$.user.email.$errors[0].$message"
        />
        <BaseInputsPassword label="Password" v-model="user.password" />
        <ErrorValidation
          v-if="v$.user.password.$error"
          :errorMsg="v$.user.password.$errors[0].$message"
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
  type ClubPagination,
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
import BaseInputsPassword from "@/components/common/baseformComponents/BaseInputsPassword.vue";

import {
  email,
  helpers,
  maxLength,
  minLength,
  required,
  requiredIf,
} from "@vuelidate/validators";
import type IDistrict from "@/utils/shared/interfaces/DistrictInterface";
import type { IClub } from "@/utils/shared/interfaces/ClubInterface";
import {
  RotaryRoles,
  UserType,
} from "@/utils/shared/interfaces/SharedInterface";
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
    BaseInputsPassword,
  },
  props: {
    test: {
      type: String,
      default: "test",
    },
  },
  data() {
    return {
      headerFormatter: Utilities.headerFormater,
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
      rolesList: [] as string[],
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
      userBelongsToDistrict: "",
      userBelongsToClub: "",
      belongsToClub: "",
      changeInput: "",
    };
  },
  watch: {
    "user.user_country": {
      async handler() {
        if (this.user.user_country === "Canada") {
          this.provinceOrStatesList = ResourceLists.canadaProvinceList;
        } else if (this.user.user_country === "United States") {
          this.provinceOrStatesList = ResourceLists.unitedStatesList;
        } else {
          this.provinceOrStatesList = [];
        }
      },
    },
    userBelongsToDistrict: {
      async handler() {
        this.user.district_id = this.districtMapChosenDistrictToID.get(
          this.userBelongsToDistrict
        ) as number;
        await this.setClubArray(this.user.district_id);
      },
    },
    userBelongsToClub: {
      async handler(): Promise<void> {
        this.user.club_id = this.clubMapChosenDistrictToID.get(
          this.userBelongsToClub
        ) as number;
      },
    },
  },
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
        phone: {
          required: helpers.withMessage(ErrorMessages.REQURIED_FIELD, required),
          maxLength: maxLength(50),
        },
        password: {
          required: helpers.withMessage(ErrorMessages.REQURIED_FIELD, required),
          passWordLength: helpers.withMessage(
            ErrorMessages.PASSWORD_MIN_LENGTH,
            () => {
              return this.user.password.length >= 6;
            }
          ),
        },
        role_type: {
          required: helpers.withMessage(ErrorMessages.REQURIED_FIELD, required),
        },
      },

      userBelongsToDistrict: {
        required: requiredIf(
          this.userformProps.formModeProp === "CREATE" &&
            this.userformProps.userCreationTypeProp !== "CLUB_MEMBER" &&
            this.userBelongsToDistrict == ""
        ),
      },
      userBelongsToClub: {
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
    await this.getAllDistricts();
    this.userformProps = this.store.$state.userFormProps;
    if (this.userformProps.userCreationTypeProp === "CLUB_MEMBER") {
      this.rolesList = Object.values(RotaryRoles).filter((el) => {
        return !el.includes("District");
      });
      this.user.user_type = UserType.Club;
      this.user.club_id = this.store.$state.userFormProps.clubIdProp as number;
      this.user.district_id = this.store.$state.loggedInUsersDistrict.district_id;

    }
    if (this.userformProps.userCreationTypeProp === "DISTRICT_ADMIN") {
      this.rolesList = Object.values(RotaryRoles).filter((el) => {
        return el.includes("District");
      });
      this.user.user_type = UserType.District;
    }
    if (this.userformProps.formModeProp === FORM_MODE_PROP.UPDATE) {
      this.orginalEmail = this.user.email;
      this.submitButtonmsg = Utilities.uncapitalize(FORM_MODE_PROP.UPDATE);
      await this.populateFormData();
      this.user.role_type = this.user.role[0]?.district_role
        ? this.user.role[0]?.district_role
        : (this.user.role[0]?.club_role as string);
    }
    if (this.userformProps.formModeProp === FORM_MODE_PROP.CREATE) {
      this.submitButtonmsg = Utilities.uncapitalize(FORM_MODE_PROP.CREATE);
    }
  },
  async mounted() {},
  methods: {
    async setClubArray(districtId: number) {
      this.user.club_id = 0;
      this.clubNameList = [];
      try {
        let response = await DistrictsApi.getAllClubsInDistrictPagination(
          districtId,
          1,
          10000000
        );
        if (
          !Utilities.isAnApiError(response) &&
          (response as ClubPagination).data.length > 0
        ) {
          (response as ClubPagination).data.forEach((el: IClub) => {
            this.clubNameList.push(el.club_name);
            this.clubMapChosenDistrictToID.set(
              el.club_name,
              el.club_id as number
            );
          });
        } else {
          window.scrollTo(0, 0);
          this.toast.display = true;
          this.toast.msg = this.headerFormatter(
            "No clubs found, add a club to this district"
          );
          setTimeout(() => {
            window.scrollTo(0, 0);
            this.toast.display = false;
          }, 3000);
        }
      } catch (error) {
        this.serverException = true;
        this.expectionObject = error as IApiException;
      }
    },
    async getAllDistricts() {
      try {
        const response = await DistrictsApi.index();
        if (!Utilities.isAnApiError(response)) {
          if ((response as Array<IDistrict>).length >= 0) {
            (response as Array<IDistrict>).forEach((ele: IDistrict) => {
              this.districtNameList.push(ele.district_name);
              this.districtMapChosenDistrictToID.set(
                ele.district_name,
                ele.district_id
              );
            });
          }
        } else throw new Error("No districts found");
      } catch (error) {
        this.serverException = true;
        this.expectionObject = error as IApiException;
      }
    },
    async populateFormData() {
      try {
        let response = await UserApi.getUserById(
          this.store.$state.userFormProps.userIdProp as number
        );
        if (!Utilities.isAnApiError(response)) {
          this.user = response as RotaryUser;
          this.orginalEmail = this.user.email;
        }
      } catch (error) {
        this.serverException = true;
        this.expectionObject = error as IApiException;
      }
    },
    validateUser(): void {
      this.v$.$validate();
      if (!this.v$.$error) {
        this.createOrUpdateUser();
      }
    },
    async emailHandler(isThisACreate: boolean) {
      if (this.userformProps.formModeProp === "UPDATE") {
        if (this.orginalEmail === this.user.email) {
          return true;
        }
      }
      try {
        const response = await UserApi.validateEmailUnique(this.user.email);
        if (!Utilities.isAnApiError(response) && response) {
          return true;
        } else {
          this.toast.display = true;
          window.scrollTo(0, 0);
          this.toast.msg = this.headerFormatter(
            "Email already exists, please use another email"
          );
          setTimeout(() => {
            window.scrollTo(0, 0);
            this.toast.display = false;
          }, 3000);
          return false;
        }
      } catch (error) {
        this.serverException = true;
        this.expectionObject = error as IApiException;
      }
    },

    async createOrUpdateUser(): Promise<void> {
      if (await this.emailHandler(true)) {
        try {
          let response: IApiError | boolean;
          if (this.userformProps.formModeProp === FORM_MODE_PROP.CREATE) {
            response = await UserApi.createUser(this.user);
            this.toast.msg = this.headerFormatter("User created successfully");
          } else if (
            this.userformProps.formModeProp === FORM_MODE_PROP.UPDATE
          ) {
            response = await UserApi.updateUser(this.user);
            this.toast.msg = this.headerFormatter("User updated successfully");
          } else {
            throw new Error("Invalid form mode");
          }
          if (!Utilities.isAnApiError(response)) {
            window.scrollTo(0, 0);
            this.toast.display = true;
            setTimeout(() => {
              this.toast.display = false;
              this.redirect();
            }, 3000);
          } else {
            window.scrollTo(0, 0);
            this.toast.display = true;
            this.toast.msg = this.headerFormatter("User creation failed");
            setTimeout(() => {
              this.toast.display = false;
            }, 3000);
          }
        } catch (error) {
          this.serverException = true;
          this.expectionObject = error as IApiException;
        }
      }
    },
    resetSet() {
      (this.showConfirmModal as any) = {
        showConfirmModal: false,
        confirmModalMessage: "",
        idTobeDeleted: 0,
      };
    },
    redirect(): void {
      this.store.$state.canLeaveForm = true;
      this.$router.go(-1);
    },
  },
  computed: {},
});
</script>

<style scoped lang="scss"></style>
