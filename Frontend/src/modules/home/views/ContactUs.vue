<template>
  <div class="container min-w-full gap-8" :class="tailwind.DIVCOL">
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
      <div class="container py-24 px-24">
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
            <form class="email_form flex flex-col gap-8" @submit.prevent="">
              <div class="mt-8 flex flex-col gap-8 md:flex-row">
                <div class="input_wraper">
                  <BaseInputsText v-model="name" label="Name" />
                  <ErrorValidation
                    v-if="v$.name.$error"
                    :errorMsg="v$.name.$errors[0].$message"
                  />
                </div>
                <div class="input_wraper">
                  <BaseInputsTextEmail v-model="senderEmail" label="Email" />
                  <ErrorValidation
                    v-if="v$.senderEmail.$error"
                    :errorMsg="v$.senderEmail.$errors[0].$message"
                  />
                </div>
              </div>
              <BaseTextArea v-model="emailBody" label="Message" />
              <ErrorValidation
                v-if="v$.emailBody.$error"
                :errorMsg="v$.emailBody.$errors[0].$message"
              />
              <RotaryButton
                @click="submitForm()"
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
                  <span class="text-primary-color">{{
                    mainAssets?.assets?.contentManagement?.myRotaryEmail || ""
                  }}</span>
                </div>
              </li>
              <li class="flex w-full">
                <font-awesome-icon class="icon" icon="fa-solid fa-phone" />
                <div class="mt-2">
                  <h3>Phone</h3>
                  <span class="text-primary-color"
                    >{{
                      mainAssets?.assets?.contentManagement?.myRotaryPhone || ""
                    }}
                  </span>
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
                    >{{
                      mainAssets?.assets?.contentManagement?.myRotaryAddress ||
                      ""
                    }}
                    {{
                      mainAssets?.assets?.contentManagement?.myRotaryCity || ""
                    }}{{ "," }}
                    {{
                      mainAssets?.assets?.contentManagement?.myRotaryProvince ||
                      ""
                    }}
                    {{
                      mainAssets?.assets?.contentManagement
                        ?.myRotaryPostalCode || ""
                    }}
                  </span>
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
  type MainAssets,
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
import toastController from "@/utils/composables/toastController";
import { useNotification, type NotificationType } from "naive-ui";
import AssetsApi from "@/services/Assets";
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
    const notification = useNotification();
    return { v$: useVuelidate(), notification };
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
      mainAssets: {} as MainAssets,
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
  async created() {
    try {
      this.mainAssets = (await AssetsApi.getMainAssets()) as MainAssets;
    } catch (error) {
      let er = error as Error;
      console.error(er.message);
      const useToast = toastController(
        this.notification,
        "error",
        "Error",
        er.message
      );
      useToast();
    }
  },
  methods: {
    async submitForm() {
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
      this.sendEmail();
    },
    async sendEmail() {
      this.v$.$reset();
      try {
        window.scroll(0, 0);
        const response = await MailerApi.contactMailer(
          this.senderEmail,
          this.name,
          this.emailBody
        );
        this.name = "";
        this.senderEmail = "";
        this.emailBody = "";
        this.toast.display = true;
        if (!Utilities.isAnApiError(response) && response === true) {
          this.toast.msg = "Email sent successfully";
        } else this.toast.msg = "Email not sent Contact Admin";
        setTimeout(() => {
          this.toast.display = false;
        }, 3000);
      } catch (error) {
        this.serverException = true;
        this.expectionObject = error as IApiException;
      }
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
