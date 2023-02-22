<template>
  <div class="container min-w-full gap-8 pb-24" :class="tailwind.DIVCOL">
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
    <div class="landing_header w-full">
      <h1 class="header_h1">Contact Us</h1>
    </div>
    <section>
      <div class="container py-16">
        <div class="contact_us flex flex-col gap-8 md:flex-row md:gap-16">
          <div class="email_section flex flex-1 flex-col">
            <h1 class="mb-4 text-5xl font-bold" :class="tailwind.H1">
              {{ headerFormatter("Send Us a Message") }}
            </h1>
            <div class="text-gray-400">
              Do you have any questions about joining Rotary or making pledges?
              Fill out the form below to ask any questions about Rotary,how to
              make a pledge or how to use/navigate this site. We are excited to
              hear from you.
            </div>
            <form class="email_form flex flex-col gap-8">
              <div class="mt-8 flex flex-col gap-8 md:flex-row">
                <div class="input_wraper">
                  <BaseInputsText v-model="name" label="Name" />
                  <ErrorValidation
                    v-if="v$.name.$error"
                    :error="v$.name.$errors"
                  />
                </div>
                <div class="input_wraper">
                  <BaseInputsTextEmail v-model="senderEmail" label="Email" />
                  <ErrorValidation
                    v-if="v$.senderEmail.$error"
                    :error="v$.senderEmail.$errors"
                  />
                </div>
              </div>
              <BaseTextArea v-model="emailBody" label="Your Email" />
              <ErrorValidation
                v-if="v$.emailBody.$error"
                :error="v$.emailBody.$errors"
              />
              <RotaryButton
                @click="sendEmail"
                theme="rounded-lg py-2 px-4 bg-primary-color text-primary-white hover:bg-primary-black "
                label="Send Message"
              />
            </form>
          </div>
          <div class="contact_info flex flex-1 flex-col items-center gap-8">
            <h1 class="mb-4 text-5xl font-bold" :class="tailwind.H1">
              Contact Info
            </h1>
            <ul class="info flex flex-col items-center gap-4">
              <li class="flex w-full">
                <font-awesome-icon class="icon" icon="fa-solid fa-envelope" />
                <div class="mt-2">
                  <h3>E-mail</h3>
                  <span class="text-primary-color"
                    >info@cornwallrotary.com</span
                  >
                </div>
              </li>
              <li class="flex w-full">
                <font-awesome-icon class="icon" icon="fa-solid fa-phone" />
                <div class="mt-2">
                  <h3>Phone</h3>
                  <span class="text-primary-color">613-555-5555 </span>
                </div>
              </li>
              <li class="flex w-full">
                <font-awesome-icon
                  class="icon"
                  icon="fa-sharp  fa-location-dot"
                />
                <div class="mt-2">
                  <h3>Address</h3>
                  <span class="text-primary-color"
                    >P.O. Box 411, Cornwall ON K6H 5T1</span
                  >
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import MailerApi from "@/services/Mailer";
import {
  TAILWIND_COMMON_CLASSES,
  type IApiException,
  ErrorMessages,
} from "@/utils/frontend/interfaces/Frontend";
import { defineComponent } from "vue";
import ErrorValidation from "@/components/common/baseformComponents/ErrorValidation.vue";
import ExceptionModal from "@/components/common/modals/ExceptionModal.vue";
import Toast from "@/components/common/toast/Toast.vue";
import Utilities from "@/utils/frontend/classes/Utilities";
import BaseInputsTextEmail from "@/components/common/baseformComponents/BaseInputsTextEmail.vue";
import BaseInputsText from "@/components/common/baseformComponents/BaseInputsText.vue";
import BaseTextArea from "@/components/common/baseformComponents/BaseTextArea.vue";
import useVuelidate from "@vuelidate/core";
import { helpers, required, email, maxLength } from "@vuelidate/validators";
import RotaryButton from "@/components/common/RotaryButton.vue";
export default defineComponent({
  name: "ContactUs",
  components: {
    ExceptionModal,
    Toast,
    BaseInputsTextEmail,
    BaseInputsText,
    BaseTextArea,
    ErrorValidation,
    RotaryButton,
  },
  setup() {
    return { v$: useVuelidate() };
  },
  props: {},
  data() {
    return {
      headerFormatter: Utilities.headerFormater,
      address: "ADDRESS P.O. Box 411, ",
      cityState: "Cornwall ON K6H 5T1",
      email: "myProjects@rotary.com",
      phone: "613-555-5555",
      city: "",
      name: "",
      senderEmail: "",
      emailBody: "",
      serverException: false,
      expectionObject: {} as IApiException,
      tailwind: TAILWIND_COMMON_CLASSES,
      toast: {
        display: false,
        msg: "",
        width: "w-1/2",
        closeTimer: 4000,
      },
    };
  },
  watch: {},
  validations() {
    return {
      name: {
        required: helpers.withMessage(ErrorMessages.REQURIED_FIELD, required),
        maxLength: maxLength(20),
      },
      emailBody: {
        required: helpers.withMessage(ErrorMessages.REQURIED_FIELD, required),
        maxLength: maxLength(1000),
      },
      senderEmail: {
        required: helpers.withMessage(ErrorMessages.REQURIED_FIELD, required),
        email: helpers.withMessage(ErrorMessages.INVALID_EMAIL, email),
      },
    };
  },

  async created() {},
  methods: {
    async sendEmail() {
      try {
        const response = await MailerApi.contactMailer(
          this.senderEmail,
          this.name,
          this.emailBody
        );
        if (!Utilities.isAnApiError(response)) this.toast.display = true;
        this.toast.msg = "Email sent successfully";
        setTimeout(() => {
          window.scroll(0, 0);
          this.toast.display = false;
        }, 3000);
      } catch (error) {
        this.serverException = true;
        this.expectionObject = error as IApiException;
      }
      this.redirect();
    },
    redirect() {
      this.$router.go(0);
    },
  },
  computed: {},
});
</script>

<style scoped lang="scss">
@import "@/assets/syles.scss";

.icon {
  padding: 1rem;
  width: 2rem;
  height: 2rem;
  font-size: 1rem;
  color: #cdcdcd;
  border-radius: 50%;
  text-align: center;
  border: 0.1rem solid #a7a7a7;
  margin-right: 2rem;
}
</style>
