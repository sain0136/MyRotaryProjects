<template>
  <div class="login_container flex-col items-center rounded-md bg-white">
    <div class="landing_header w-full">
      <h1 class="header_h1">Log In</h1>
    </div>
    <form
      class="flex justify-center px-48 py-24"
      @submit.prevent="submitFormHandler()"
    >
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
      <div class="mx-auto flex flex-col border border-primary-color px-6 py-8">
        <h1
          class="mb-4 text-xl font-bold leading-tight tracking-tight text-primary-black md:text-2xl"
        >
          Sign in to your account
        </h1>
        <BaseInputsTextEmail v-model="email" label="Email" />
        <ErrorValidation
          v-if="v$.email.$error && v$.email.required.$invalid"
          :errorMsg="v$.email.required.$message"
        />
        <ErrorValidation
          v-if="
            v$.email.$error &&
            !v$.email.required.$invalid &&
            v$.email.email.$invalid
          "
          :errorMsg="v$.email.email.$message"
        />
        <BaseInputsPassword v-model="password" label="Password" />
        <ErrorValidation
          v-if="v$.password.$error && v$.password.required.$invalid"
          :errorMsg="v$.password.required.$message"
        />
        <ErrorValidation
          v-if="
            v$.password.$error &&
            !v$.password.required.$invalid &&
            v$.password.minLength.$invalid
          "
          :errorMsg="v$.password.minLength.$message"
        />

        <ErrorValidation v-if="apiErrrorMessage" :errorMsg="apiErrrorMessage" />
        <div class="mt-2 flex flex-col">
          <RotaryButton
            type="submit"
            label="Login"
            theme="rounded-lg py-2 px-4 bg-primary-color text-primary-white hover:bg-primary-black "
          />
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { useRotaryStore } from "@/stores/rotaryStore";
import {
  ErrorMessages,
  type IApiException,
} from "@/utils/frontend/interfaces/Frontend";
import useVuelidate from "@vuelidate/core";
import { helpers, required, email, minLength } from "@vuelidate/validators";
import { defineComponent } from "vue";
import BaseInputsText from "@/components/common/baseformComponents/BaseInputsText.vue";
import RotaryButton from "@/components/common/RotaryButton.vue";
import ErrorValidation from "@/components/common/baseformComponents/ErrorValidation.vue";
import BaseInputsTextEmail from "@/components/common/baseformComponents/BaseInputsTextEmail.vue";
import BaseInputsPassword from "@/components/common/baseformComponents/BaseInputsPassword.vue";
import ExceptionModal from "@/components/common/modals/ExceptionModal.vue";
import Toast from "@/components/common/toast/Toast.vue";
export default defineComponent({
  name: "UserLogin",
  setup() {
    const store = useRotaryStore();
    return { v$: useVuelidate(), store };
  },
  components: {
    BaseInputsText,
    BaseInputsPassword,
    RotaryButton,
    ErrorValidation,
    BaseInputsTextEmail,
    ExceptionModal,
    Toast,
  },
  props: {
    test: {
      type: String,
      default: "true",
    },
  },
  data() {
    return {
      email: "",
      password: "",
      apiErrrorMessage: "",
      serverException: false,
      expectionObject: {} as IApiException,
      toast: {
        display: false,
        msg: "",
        width: "w-1/2",
        closeTimer: 4000,
      },
    };
  },
  validations() {
    return {
      email: {
        required: helpers.withMessage(ErrorMessages.REQURIED_FIELD, required),
        email: helpers.withMessage(ErrorMessages.INVALID_EMAIL, email),
      },
      password: {
        required: helpers.withMessage(ErrorMessages.REQURIED_FIELD, required),
        minLength: helpers.withMessage(
          ErrorMessages.PASSWORD_MIN_LENGTH,
          minLength(6)
        ),
      },
    };
  },
  watch: {},
  async created() {},
  methods: {
    async submitFormHandler() {
      this.v$.$validate();
      if (!this.v$.$error) {
        try {
          const response = await this.store.validateUserLogin(
            this.email,
            this.password
          );
          if (response === true) {
            this.toast.msg = "Login Successfull";
            this.toast.display = true;
            setTimeout(() => {
              window.scroll(0, 0);
              this.toast.display = false;
              this.$router.push("/");
            }, 3000);
          } else {
            setTimeout(() => {
              this.apiErrrorMessage = "";
            }, 3000);
            this.apiErrrorMessage = response.message;
          }
        } catch (error) {
          this.serverException = true;
          this.expectionObject = error as IApiException;
        }
      }
    },
  },
  computed: {},
});
</script>

<style scoped lang="scss">
@import "@/assets/syles.scss";
</style>
