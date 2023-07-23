<template>
  <div
    class="login_container flex w-11/12 flex-col items-center rounded-md bg-white py-8 px-4 sm:w-9/12 md:w-6/12 lg:w-4/12 xl:w-1/4 2xl:w-1/5"
  >
    <div class="mb-8 h-60">
      <img class="h-full rounded-lg object-contain" :src="logo" alt="error" />
    </div>
    <form class="w-full flex-col" @submit.prevent="submittFrmHandler()">
      <div class="flex flex-col">
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
      </div>
      <ErrorValidation v-if="apiErrrorMessage" :errorMsg="apiErrrorMessage" />
      <div class="mt-2 flex flex-col">
        <RotaryButton
          type="submit"
          label="Login"
          theme="rounded-lg py-2 px-4 bg-primary-color text-primary-white hover:bg-primary-black "
        />
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import AssetsApi from "@/services/Assets";
import {
  ErrorMessages,
  type IApiException,
  type MainAssets,
} from "@/utils/frontend/interfaces/Frontend";
import { defineComponent } from "vue";
import BaseInputsText from "@/components/common/baseformComponents/BaseInputsText.vue";
import RotaryButton from "@/components/common/RotaryButton.vue";
import useVuelidate from "@vuelidate/core";
import { helpers, required, email, minLength } from "@vuelidate/validators";
import ErrorValidation from "@/components/common/baseformComponents/ErrorValidation.vue";
import BaseInputsTextEmail from "@/components/common/baseformComponents/BaseInputsTextEmail.vue";
import BaseInputsPassword from "@/components/common/baseformComponents/BaseInputsPassword.vue"
import { useRotaryStore } from "@/stores/rotaryStore";
import Utilities from "@/utils/frontend/classes/Utilities";
export default defineComponent({
  name: "AdminloginForm",
  components: {
    BaseInputsText,
    BaseInputsPassword,
    RotaryButton,
    ErrorValidation,
    BaseInputsTextEmail,
  },
  props: {
    test: {
      type: String,
      default: "true",
    },
  },
  setup() {
    const store = useRotaryStore();
    return { v$: useVuelidate(), store };
  },
  data() {
    return {
      email: "",
      password: "",
      apiErrrorMessage: "",
      serverException: false,
      expectionObject: {},
      logo: "",
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
  async created() {
    this.logo = this.store.$state.mainLogoUrl ?? "";
  },
  methods: {
    async submittFrmHandler() {
      this.v$.$validate();
      if (!this.v$.$error) {
        try {
          const response = await this.store.validateUserLogin(
            this.email,
            this.password
          );
          if (response === true) {
            this.$router.push({ name: "AdminHome" });
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
    passwordValidatonMessage(): string {
      return Utilities.passwordValidatonMessage(this.v$);
    },
    emaildValidatonMessage(): string {
      return Utilities.emailValidatonMessage(this.v$);
    },
  },
  computed: {},
});
</script>

<style scoped lang="scss">
.w-90 {
  width: 90%;
}

.mw-70 {
  width: 70%;
}
</style>
