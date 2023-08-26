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
        <h1 class="text-center font-bold" :class="tailwind.H1">
          {{
            store.$state.clubFormProps.formModeProp === formMode.CREATE
              ? headerFormatter("Create Club")
              : headerFormatter("Update Club")
          }}
        </h1>
        <form
          @submit.prevent=""
          autocomplete="off"
          class="flex w-2/4 flex-col p-8"
          novalidate
        >
          <BaseSelect
            v-if="store.$state.clubFormProps.formModeProp === formMode.CREATE && !store.clubFormProps.districtIdProp"
            v-model="districtChosen"
            label="Assign To District"
            :options="districtNameList"
          />
          <ErrorValidation
            v-if="v$.districtChosen.$error"
            :errorMsg="v$.districtChosen.$errors[0].$message"
          />
          <BaseInputsText v-model="club.club_name" label="Name" />
          <ErrorValidation
            v-if="v$.club.club_name.$error"
            :errorMsg="v$.club.club_name.$errors[0].$message"
          />
          <BaseInputsText v-model="club.club_address" label="Address" />
          <ErrorValidation
            v-if="v$.club.club_address.$error"
            :errorMsg="v$.club.club_address.$errors[0].$message"
          />
          <BaseInputsText v-model="club.club_city" label="City" />
          <ErrorValidation
            v-if="v$.club.club_city.$error"
            :errorMsg="v$.club.club_city.$errors[0].$message"
          />
          <BaseSelect
            v-model="club.club_country"
            label="Country"
            :options="countryList"
          />
          <ErrorValidation
            v-if="v$.club.club_country.$error"
            :errorMsg="v$.club.club_country.$errors[0].$message"
          />
          <BaseInputsText v-model="club.club_email" label="Email" />
          <ErrorValidation
            v-if="v$.club.club_email.$error"
            :errorMsg="v$.club.club_email.$errors[0].$message"
          />
          <BaseCheckBox v-model="club.settings.disableDsg" label="Disable District Simplified Projects" />
          <BaseCheckBox v-model="club.settings.disableDM" label="Disable District Matching Projects" />
          <BaseCheckBox v-model="club.settings.disableGlobal" label="Disable Global Projects" />
          <div class="button_row mt-4 flex justify-center gap-4">
            <RotaryButton
              :label="headerFormatter(submitButtonmsg)"
              @click="validateClubForm()"
            />
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
  import {
    useRotaryStore,
  } from "@/stores/rotaryStore";
  import Utilities from "@/utils/frontend/classes/Utilities";
  import ErrorValidation from "@/components/common/baseformComponents/ErrorValidation.vue";
  import DistrictsApi from "@/services/Districts";
  import ResourceLists from "@/utils/frontend/classes/ResourceLists";
  import type club from "@/utils/shared/classes/RotaryClub";
  import BaseInputsPassword from "@/components/common/baseformComponents/BaseInputsPassword.vue";
  
  import {
    email,
    helpers,
    required,
    requiredIf,
  } from "@vuelidate/validators";
  import type IDistrict from "@/utils/shared/interfaces/DistrictInterface";
  import RotaryClub from "@/utils/shared/classes/RotaryClub";
  import ClubsApi from "@/services/Club";
  export default defineComponent({
    name: "ClubForm",
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
        submitButtonmsg: "Submit",
        tailwind: TAILWIND_COMMON_CLASSES,
        club: new RotaryClub(),
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
        districtChosen: "",
        districtNameList: [] as string[],
        districtMapChosenDistrictToID: new Map<string, number>(),
        provinceOrStatesList: ResourceLists.canadaProvinceList,
        countryList: ResourceLists.northAmericaList,
      };
    },
    watch: {
      "club.club_country": {
        handler() {
          if (this.club.club_country === "United States") {
            this.provinceOrStatesList = ResourceLists.unitedStatesList;
          } else if (this.club.club_country === "Canada") {
            this.provinceOrStatesList = ResourceLists.canadaProvinceList;
          } else {
            this.provinceOrStatesList = [];
          }
        },
      },
      districtChosen: {
        async handler(): Promise<void> {
          this.club.district_id = this.districtMapChosenDistrictToID.get(
            this.districtChosen
          ) as number;
        },
      },
    },
    validations() {
      return {
        districtChosen: {
          requiredIfFuction: requiredIf(
            this.store.clubFormProps.formModeProp === "CREATE" && !this.store.clubFormProps.districtIdProp  &&
              this.districtChosen === ""
          ),
        },
        club: {
          club_name: {
            required: helpers.withMessage(ErrorMessages.REQURIED_FIELD, required),
          },
          club_address: {
            required: helpers.withMessage(ErrorMessages.REQURIED_FIELD, required),
          },
          club_city: {
            required: helpers.withMessage(ErrorMessages.REQURIED_FIELD, required),
          },
          club_country: {
            required: helpers.withMessage(ErrorMessages.REQURIED_FIELD, required),
          },
          club_email: {
            email: helpers.withMessage(ErrorMessages.INVALID_EMAIL, email),
          },
        },
      };
    },
    async created() {
      if (this.store.clubFormProps.formModeProp === "CREATE") {
        if ( this.store.clubFormProps.districtIdProp) {
          this.club.district_id = this.store.clubFormProps.districtIdProp;
          return;
        }
        await this.getAllDistricts();
      } else if (this.store.clubFormProps.formModeProp === "UPDATE") {
        await this.populateFormData();
      }
    },
    methods: {
      async populateFormData() {
        try {
          const response = await ClubsApi.getOneClubById(
            this.store.clubFormProps.clubIdProp as number
          );
          if (!Utilities.isAnApiError(response)) {
            this.club = response as RotaryClub;
          } else throw new Error(this.headerFormatter("Error loading club"));
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
      validateClubForm() {
        this.v$.$validate();
        ;
        if (!this.v$.$error) {
          this.createOrUpdateClub();
        }
      },
      async createOrUpdateClub() {
        try {
          if (this.store.clubFormProps.formModeProp === "CREATE") {
            const response = await ClubsApi.createClub(this.club);
            if (!Utilities.isAnApiError(response)) {
              this.toast.msg = this.headerFormatter("Club created successfully");
            } else throw new Error(this.headerFormatter("Error creating club"));
          } else if (this.store.clubFormProps.formModeProp === "UPDATE") {
            const response = await ClubsApi.updateClub(
              this.club.club_id,
              this.club
            );
            if (!Utilities.isAnApiError(response)) {
              this.toast.msg = this.headerFormatter("Club updated successfully");
            } else throw new Error(this.headerFormatter("Error updating club"));
          }
          window.scrollTo(0, 0);
          this.allowedToLeaveForm = true;
          this.toast.display = true;
          setTimeout(() => {
            this.toast.display = false;
            this.redirect();
          }, 3000);
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
      redirect() {
        this.store.$state.canLeaveForm = true;
        this.$router.go(-1);
      },
    },
  
    computed: {},
  });
  </script>
  
  <style scoped lang="scss"></style>
  