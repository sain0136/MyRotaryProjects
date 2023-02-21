<template>
  <div class="container mt-8 min-w-full gap-8" :class="tailwind.DIVCOL">
    <div class="landing_header w-full">
      <h1 class="header_h1">Pledge</h1>
    </div>
    <div class="container mx-16 mb-8" :class="tailwind.DIVCOL">
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
      <h1 class="text-center font-bold" :class="tailwind.H1">
        {{
          loadedProject.project_name
            ? loadedProject.project_name
            : loadedProject.project_name
        }}
      </h1>
      <div class="flex flex-col">
        <h1 class="py-8 text-4xl font-bold text-primary-black">Pledge Today</h1>
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
      <div class="donate-form-section flr">
        <div class="donation-form-outer">
          <form method="post" action="contact.html">
            <!--Form Portlet-->
            <div class="form-portlet">
              <h3 class="text-xl font-bold">
                How Much Would you like to Donate?
              </h3>
              <div class="row clearfix">
                <div class="form-group col-lg-4 col-md-8 col-xs-12 mt-5">
                  <BaseInputsText label="Other Amount" v-model="pledgeAmount" />
                </div>
              </div>
            </div>

            <!--Form Portlet-->
            <div class="form-portlet">
              <h3 class="text-xl font-bold">Billing Information</h3>

              <div class="row clearfix">
                <div class="form-group col-lg-6 col-md-6 col-xs-12">
                  <div class="field-label">
                    First Name <span class="required">*</span>
                  </div>
                  <BaseInputsText
                    label="First Name"
                    v-model="nonMemeberPledge.firstname"
                    required
                  />
                  <ErrorValidation
                    v-if="v$.nonMemeberPledge.firstname.$error"
                    :errorMsg="
                      v$.nonMemeberPledge.firstname.$errors[0].$message
                    "
                  />
                </div>

                <div class="form-group col-lg-6 col-md-6 col-xs-12">
                  <div class="field-label">
                    Last Name <span class="required">*</span>
                  </div>
                  <BaseInputsText
                    label="Last Name"
                    v-model="nonMemeberPledge.lastname"
                    required
                  />
                  <ErrorValidation
                    v-if="v$.nonMemeberPledge.lastname.$error"
                    :errorMsg="v$.nonMemeberPledge.lastname.$errors[0].$message"
                  />
                </div>

                <div class="form-group col-lg-6 col-md-6 col-xs-12">
                  <div class="field-label">
                    Email <span class="required">*</span>
                  </div>
                  <BaseInputsTextEmail
                    label="Email"
                    v-model="nonMemeberPledge.email"
                    required
                  />
                  <ErrorValidation
                    v-if="v$.nonMemeberPledge.email.$error"
                    :errorMsg="v$.nonMemeberPledge.email.$errors[0].$message"
                  />
                </div>

                <div class="form-group col-lg-6 col-md-6 col-xs-12">
                  <div class="field-label">
                    Phone <span class="required">*</span>
                  </div>
                  <BaseInputsText
                    label="Phone"
                    v-model="nonMemeberPledge.phone"
                    required
                  />
                  <ErrorValidation
                    v-if="v$.nonMemeberPledge.phone.$error"
                    :errorMsg="v$.nonMemeberPledge.phone.$errors[0].$message"
                  />
                </div>

                <div class="form-group col-lg-6 col-md-6 col-xs-12">
                  <div class="field-label">
                    Club Name <span class="required">*</span>
                  </div>
                  <BaseInputsText
                    label="Club Name"
                    v-model="nonMemeberPledge.club_name"
                    required
                  />
                  <ErrorValidation
                    v-if="v$.nonMemeberPledge.club_name.$error"
                    :errorMsg="
                      v$.nonMemeberPledge.club_name.$errors[0].$message
                    "
                  />
                </div>

                <div class="form-group col-lg-4 col-md-4 col-xs-12">
                  <div class="field-label">
                    District Number <span class="required">*</span>
                  </div>
                  <BaseInputsText
                    label="District Number"
                    v-model="nonMemeberPledge.district_number"
                  />
                </div>
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
  </div>
</template>

<script lang="ts">
import RotaryButton from "@/components/common/RotaryButton.vue";
import BaseSelect from "@/components/common/baseformComponents/BaseSelect.vue";
import BaseInputsText from "@/components/common/baseformComponents/BaseInputsText.vue";
import BaseInputsTextEmail from "@/components/common/baseformComponents/BaseInputsTextEmail.vue";

import PledgesApi from "@/services/Pledges";
import ProjectsApi from "@/services/Projects";
import { useRotaryStore } from "@/stores/rotaryStore";
import ResourceLists from "@/utils/frontend/classes/ResourceLists";
import Utilities from "@/utils/frontend/classes/Utilities";
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
  },
  props: {},
  validations() {
    return {
      nonMemeberPledge: {
        firstname: {
          required: helpers.withMessage(ErrorMessages.REQURIED_FIELD, required),
          maxLength: maxLength(50),
        },
        lastname: {
          required: helpers.withMessage(ErrorMessages.REQURIED_FIELD, required),
          maxLength: maxLength(50),
        },
        email: {
          email: helpers.withMessage(ErrorMessages.INVALID_EMAIL, email),
          required: helpers.withMessage(ErrorMessages.REQURIED_FIELD, required),
          maxLength: maxLength(50),
        },
        phone: {
          required: helpers.withMessage(ErrorMessages.REQURIED_FIELD, required),
          maxLength: maxLength(50),
        },
        club_name: {
          required: helpers.withMessage(ErrorMessages.REQURIED_FIELD, required),
          maxLength: maxLength(50),
        },
        district_number: {
          required: helpers.withMessage(ErrorMessages.REQURIED_FIELD, required),
          maxLength: maxLength(50),
        },
      },
    };
  },
  data() {
    return {
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
    createPleadge() {
      try {
        const projectId = this.$route.params.id as string;
        const response = PledgesApi.createPledge({
          project_id: Number(projectId),
          user_id: this.userId,
          pledge_amount: this.pledgeAmount,
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
            (response as unknown as IApiException).message,
            (response as unknown as IApiException).stack
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
      this.$router.go(-1);
    },
  },
  computed: {
    maxAmountThatCanBePledge() {
      const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      });
      let number: number =
        this.projectsFundingGoal - this.projectsAnticipatedFunding;
      number = parseFloat(number.toFixed(2));
      // `this` points to the component instance
      return formatter.format(number);
    },
  },
});
</script>

<style scoped lang="scss">
@import "@/assets/syles.scss";
</style>
