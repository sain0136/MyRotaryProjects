<template>
  <div class="container mt-8 min-w-full gap-8" :class="tailwind.DIVCOL">
    <div class="landing_header w-full">
      <h1 class="header_h1">Pledge</h1>
    </div>
    <div class="container mx-16 mb-8" :class="tailwind.DIVCOL">
      <toast
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
      <h1 class="text-center font-bold" :class="tailwind.H1"></h1>
      <div class="flex flex-col">
        <h1 class="py-8 text-4xl font-bold text-primary-black">
          Pledge Today -
          {{
            loadedProject.project_name
              ? loadedProject.project_name
              : loadedProject.project_name
          }}
        </h1>
        <div class="mb-4 text-base text-primary-gray">
          <p class="mb-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            lobortis fringilla felis, vel dapibus sem faucibus ut. Nullam
            placerat pretium arcu, in condimentum orci viverra quis. Sed elit
            neque, consectetur sed fermentum id, aliquam sed justo. Donec
            tincidunt lacus sodales nibh iaculis auctor.
          </p>
          <p class="mb-2 text-primary-gray">
            Please complete your secure donation below. Have questions or need
            help? Call <span class="text-primary-color">555-555-5555</span> or
            email
            <span class="text-primary-color">info@cornwallrotary.com</span>
          </p>
        </div>
      </div>
      <hr class="my-4 h-px w-full border-0 bg-gray-500" />
      <div class="pledge_section w-full">
        <form method="post" @submit.prevent="" novalidate="true">
          <div class="donate_amount m-auto w-1/2">
            <h3 class="text-xl font-bold">
              {{ headerFormatter("How Much Would you like to Donate?") }}
            </h3>
            <h6 class="font-bold text-primary-green">
              {{
                headerFormatter(
                  "Maximum Pledge amount: " + maxAmountThatCanBePledgeFormated
                )
              }}
            </h6>
            <div class="form-group col-lg-4 col-md-8 col-xs-12 mt-5">
              <BaseInputsText
                label="Amount"
                formType="number"
                v-model="pledgeAmount"
              />
            </div>
            <ErrorValidation
              v-if="v$.pledgeAmount.$error"
              :errorMsg="v$.pledgeAmount.$errors[0].$message"
            />
          </div>
          <div class="form_portlet">
            <div>
              <BaseInputsText
                label="First Name"
                v-model="nonMemeberPledge.firstname"
              />
              <ErrorValidation
                v-if="v$.nonMemeberPledge.firstname.$error"
                :errorMsg="v$.nonMemeberPledge.firstname.$errors[0].$message"
              />
            </div>
            <div class="">
              <BaseInputsText
                label="Last Name"
                v-model="nonMemeberPledge.lastname"
              />
              <ErrorValidation
                v-if="v$.nonMemeberPledge.lastname.$error"
                :errorMsg="v$.nonMemeberPledge.lastname.$errors[0].$message"
              />
            </div>
            <div class="">
              <BaseInputsTextEmail
                label="Email"
                v-model="nonMemeberPledge.email"
              />
              <ErrorValidation
                v-if="v$.nonMemeberPledge.email.$error"
                :errorMsg="v$.nonMemeberPledge.email.$errors[0].$message"
              />
            </div>
            <div class="">
              <BaseInputsText label="Phone" v-model="nonMemeberPledge.phone" />
              <ErrorValidation
                v-if="v$.nonMemeberPledge.phone.$error"
                :errorMsg="v$.nonMemeberPledge.phone.$errors[0].$message"
              />
            </div>
            <div class="">
              <BaseInputsText
                label="Club Name"
                v-model="nonMemeberPledge.club_name"
              />
              <ErrorValidation
                v-if="v$.nonMemeberPledge.club_name.$error"
                :errorMsg="v$.nonMemeberPledge.club_name.$errors[0].$message"
              />
            </div>
            <div class="">
              <BaseInputsText
                label="District Number"
                v-model="nonMemeberPledge.district_number"
              />
              <ErrorValidation
                v-if="v$.nonMemeberPledge.district_number.$error"
                :errorMsg="
                  v$.nonMemeberPledge.district_number.$errors[0].$message
                "
              />
            </div>
          </div>

          <div class="button_row mt-4 flex justify-center gap-4">
            <RotaryButton :label="submitButtonmsg" @click="validateForm()" />
            <RotaryButton label="Cancel" @click="redirect()" />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import RotaryButton from "@/components/common/RotaryButton.vue";
import BaseSelect from "@/components/common/baseformComponents/BaseSelect.vue";
import BaseInputsText from "@/components/common/baseformComponents/BaseInputsText.vue";
import BaseInputsTextEmail from "@/components/common/baseformComponents/BaseInputsTextEmail.vue";
import Toast from "@/components/common/toast/Toast.vue";
import PledgesApi from "@/services/Pledges";
import ProjectsApi from "@/services/Projects";
import { useRotaryStore } from "@/stores/rotaryStore";
import ResourceLists from "@/utils/frontend/classes/ResourceLists";
import Utilities from "@/utils/frontend/classes/Utilities";
import ErrorValidation from "@/components/common/baseformComponents/ErrorValidation.vue";
import ExceptionModal from "@/components/common/modals/ExceptionModal.vue";

import {
  TAILWIND_COMMON_CLASSES,
  type IApiException,
  MyError,
  ErrorMessages,
} from "@/utils/frontend/interfaces/Frontend";
import type {
  IClubProject,
  IDmProject,
  IDsgProject,
} from "@/utils/shared/interfaces/ProjectsInterface";
import useVuelidate from "@vuelidate/core";
import { email, helpers, maxLength, required } from "@vuelidate/validators";
import { defineComponent } from "vue";
export default defineComponent({
  setup() {
    const store = useRotaryStore();

    return {
      store,
      v$: useVuelidate(),
    };
  },
  name: "PledgeForm",
  components: {
    RotaryButton,
    BaseSelect,
    BaseInputsText,
    BaseInputsTextEmail,
    Toast,
    ErrorValidation,
    ExceptionModal,
  },
  props: {},
  validations() {
    return {
      pledgeAmount: {
        maxAmount: helpers.withMessage(
          "Cannot exceed the max pledge limit",
          () => {
            return this.pledgeAmount <= this.maxPledgeAmount;
          }
        ),
        minAmount: helpers.withMessage("Pledge cannot be zero", () => {
          return this.pledgeAmount > 0;
        }),
      },
      nonMemeberPledge: {
        firstname: {
          required: helpers.withMessage(
            ErrorMessages.REQURIED_FIELD,
            (value) => {
              if (this.isUserLoggedIn) {
                return true;
              }
              if (value !== "") {
                return true;
              } else return false;
            }
          ),
          maxLength: maxLength(50),
        },
        lastname: {
          required: helpers.withMessage(
            ErrorMessages.REQURIED_FIELD,
            (value) => {
              if (this.isUserLoggedIn) {
                return true;
              }
              if (value !== "") {
                return true;
              } else return false;
            }
          ),
          maxLength: maxLength(50),
        },
        email: {
          email: helpers.withMessage(ErrorMessages.INVALID_EMAIL, email),
          required: helpers.withMessage(
            ErrorMessages.REQURIED_FIELD,
            (value) => {
              if (this.isUserLoggedIn) {
                return true;
              }
              if (value !== "") {
                return true;
              } else return false;
            }
          ),
          maxLength: maxLength(50),
        },
        phone: {
          required: helpers.withMessage(
            ErrorMessages.REQURIED_FIELD,
            (value) => {
              if (this.isUserLoggedIn) {
                return true;
              }
              if (value !== "") {
                return true;
              } else return false;
            }
          ),
          maxLength: maxLength(50),
        },
        club_name: {
          required: helpers.withMessage(
            ErrorMessages.REQURIED_FIELD,
            (value) => {
              if (this.isUserLoggedIn) {
                return true;
              }
              if (value !== "") {
                return true;
              } else return false;
            }
          ),
          maxLength: maxLength(50),
        },
        district_number: {
          required: helpers.withMessage(
            ErrorMessages.REQURIED_FIELD,
            (value) => {
              if (this.isUserLoggedIn) {
                return true;
              }
              if (value !== "") {
                return true;
              } else return false;
            }
          ),
          maxLength: maxLength(50),
        },
      },
    };
  },
  data() {
    return {
      headerFormatter: Utilities.headerFormater,
      maxPledgeAmount: 0,
      loadedProject: {} as IDsgProject | IDmProject | IClubProject,
      toast: {
        display: false,
        msg: "",
        width: "w-1/2",
        closeTimer: 4000,
      },
      projectsFundingGoal: 0,
      projectsAnticipatedFunding: 0,
      userId: 1,
      projectId: 0,
      pledgeAmount: 0,
      nonMemeberPledge: {
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        club_name: "",
        district_number: "",
      },
      pledgesMade: 0,
      errorText: "",
      allowedToLeaveRoute: false,
      tailwind: TAILWIND_COMMON_CLASSES,
      serverException: false,
      expectionObject: {} as IApiException,
      submitButtonmsg: "Submit",
    };
  },
  watch: {},
  async created() {
    if (Object.values(this.store.$state.loggedInUserData).length > 0) {
      this.userId = this.store.$state.loggedInUserData.user_id as number;
      this.nonMemeberPledge.firstname = this.store.$state.loggedInUserData
        .firstname as string;
      this.nonMemeberPledge.lastname = this.store.$state.loggedInUserData
        .lastname as string;
      this.nonMemeberPledge.email = this.store.$state.loggedInUserData
        .email as string;
      this.nonMemeberPledge.phone = this.store.$state.loggedInUserData
        .phone as string;
    }
    await this.loadProject();
  },
  methods: {
    async validateForm() {
      await this.v$.$validate();
      if (!this.v$.$error) {
        this.createPleadge();
      }
    },
    async createPleadge() {
      try {
        const projectId = this.$route.params.id as string;
        const formartedPledgeAmount = parseFloat(
          Number(this.pledgeAmount).toFixed(2)
        );
        const response = await PledgesApi.createPledge({
          project_id: Number(projectId),
          user_id: this.userId,
          pledge_amount: formartedPledgeAmount,
          firstname: this.nonMemeberPledge.firstname,
          lastname: this.nonMemeberPledge.lastname,
          email: this.nonMemeberPledge.email,
          phone: this.nonMemeberPledge.phone,
          club_name: this.nonMemeberPledge.club_name,
          district_number: this.nonMemeberPledge.district_number,
        });
        if (!Utilities.isAnApiError(response)) {
          this.toast.display = true;
          this.toast.msg = "Pledge Created Successfully";
          window.scrollTo(0, 0);
          this.submitButtonmsg = "Submitting...";
          setTimeout(() => {
            this.redirect();
          }, 3000);
        } else
          throw new MyError(
            (response as IApiException).message,
            (response as IApiException).stack
          );
      } catch (error) {
        this.serverException = true;
        this.expectionObject = error as IApiException;
      }
    },
    async loadProject() {
      try {
        const projectId = this.$route.params.id as string;
        const response = await ProjectsApi.getProjectById(Number(projectId));
        if (!Utilities.isAnApiError(response)) {
          this.loadedProject = response as
            | IDsgProject
            | IDmProject
            | IClubProject;
          this.maxPledgeAmount =
            this.loadedProject.funding_goal -
            this.loadedProject.anticipated_funding;
        } else
          throw new MyError(
            (response as IApiException).message,
            (response as IApiException).stack
          );
      } catch (error) {
        this.serverException = true;
        this.expectionObject = error as IApiException;
      }
    },
    redirect() {
      this.store.$state.canLeaveForm = true;
      this.$router.go(-1);
    },
  },
  computed: {
    isUserLoggedIn() {
      const state = this.store.$state;
      return (
        state.isClubUserLoggedIn ||
        state.isClubAdminLoggedIn ||
        state.isDistrictAdminLoggedIn ||
        state.isSiteAdminLoggedIn
      );
    },
    maxAmountThatCanBePledgeFormated() {
      const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      });
      let number: number =
        this.loadedProject.funding_goal -
        this.loadedProject.anticipated_funding;
      number = parseFloat(number.toFixed(2));
      // `this` points to the component instance
      return formatter.format(number);
    },
  },
});
</script>

<style scoped lang="scss">
@import "@/assets/syles.scss";
.form_portlet {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;
}
</style>
