<template>
  <div>   
    <ExceptionModal v-if="showModal" />
    <Toast v-if="turn" msg="Timmy Turners" width="w-1/3" :closeTimer="5000" />
    <div class="font-style: text-3xl italic text-red-400">
      <h1 class="mb-4 text-center">Hi this is a test!</h1>
      <h2>Sup</h2>
    </div>
    <div class="flex justify-center p-4">
      <button
        id="button"
        type="button"
        class="mr-2 mb-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Show modal
      </button>
    </div>
    <form @submit.prevent="onSubmit">
      <div class="w-1/2 flex-col">
        <BaseInputsText label="First Name" v-model="name" />
        <ErrorValidation
          v-if="v$.name.$error"
          :errorMsg="v$.name.required.$message"
        />
        <BaseInputsTextEmail label="Email" v-model="email" />
        <ErrorValidation
          v-if="v$.email.$error"
          :errorMsg="v$.name.required.$message"
        />
        <BaseTextArea label="Description" v-model="desc" />
        <ErrorValidation
          v-if="v$.desc.$error"
          :errorMsg="ErrorMessages.REQURIED_FIELD"
        />
        <BaseSelect label="District" v-model="listchoice" :options="list" />
        <ErrorValidation
          v-if="v$.listchoice.$error"
          :errorMsg="ErrorMessages.REQURIED_FIELD"
        />
        <BaseCheckbox label="Check me" v-model="checked" />
        <BaseInputsPassword label="Password" v-model="password" />
        <ErrorValidation
          v-if="v$.password.$error"
          :errorMsg="passwordValidatonMessage()"
        />

        <button>Sign up for nfdewsletter</button>
      </div>
    </form>
    <font-awesome-icon icon="fa-solid fa-wallet" />
  </div>
  <button @click="(turn = turn ? false : true), key++">Turn on</button>
  <div></div>
  <RotaryButton @click="showModal = true" label="Open Modal"/>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { initModals } from "flowbite";
import { Modal } from "flowbite";

import { ref } from "vue";
import ValidationApi from "@/services/Validation";
import Toast from "../common/toast/Toast.vue";
import BaseInputsText from "../common/baseformComponents/BaseInputsText.vue";
import BaseInputsTextEmail from "../common/baseformComponents/BaseInputsTextEmail.vue";
// import the text area component
import BaseTextArea from "../common/baseformComponents/BaseTextArea.vue";
// import the BaseSelect component
import BaseSelect from "../common/baseformComponents/BaseSelect.vue";

import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength, helpers } from "@vuelidate/validators";
import ErrorValidation from "../common/baseformComponents/ErrorValidation.vue";
import { ErrorMessages } from "@/utils/frontend/interfaces/Frontend";
import BaseCheckbox from "../common/baseformComponents/BaseCheckBox.vue";
import BaseInputsPassword from "../common/baseformComponents/BaseInputsPassword.vue";
import ExceptionModal from "../common/modals/ExceptionModal.vue"
// imporrt RotaryButton in same format as above components
import RotaryButton from "../common/RotaryButton.vue";
export default defineComponent({
  setup() {
    return { v$: useVuelidate() };
  },
  name: "Test",
  props: {},
  components: {
    ErrorValidation,
    Toast,
    BaseInputsText,
    BaseInputsTextEmail,
    BaseTextArea,
    BaseSelect,
    BaseCheckbox,
    BaseInputsPassword,
    RotaryButton,
    ExceptionModal
},
  data() {
    return {
      ErrorMessages: ErrorMessages,
      validateName: (value: string) => {
        if (value.length > 2) {
          debugger;
          return "yo";
        }
        if (!value) {
          return "This field is required";
        }
      },
      name: "",
      email: "",
      desc: "",
      list: ["a", "b", "c"],
      listchoice: "",
      checked: false,
      district: "tIMMY",
      password: "",
      turn: false,
      key: 0,
      showModal: false,
    };
  },
  validations() {
    return {
      name: {
        required: helpers.withMessage(ErrorMessages.REQURIED_FIELD, required),
      }, // Matches this.firstName
      desc: { required }, // Matches this.lastName
      email: {
        required: helpers.withMessage(ErrorMessages.REQURIED_FIELD, required),
        email: helpers.withMessage(ErrorMessages.INVALID_EMAIL, email),
      },
      listchoice: { required },
      password: { required, minLength: minLength(6) },
    };
  },
  watch: {},
  async mounted() {
  this.showModal = false
  },
  methods: {
    async index() {
      const res = await fetch(import.meta.env.VITE_API_URL + "district", {
        method: "GET",
      });
      const response = await res.json();
      if (res.ok) {
        return response;
      }
    },
    determine(): string {
      let message = "ErrorMessages.REQURIED_FIELD";
      (this.v$.email.$errors as []).forEach((element: any) => {
        if (element.$uid === "email-required") {
          message = ErrorMessages.REQURIED_FIELD;
          return;
        }
        if (element.$uid === "email-email") {
          message = ErrorMessages.INVALID_EMAIL;
          return;
        }
      });
      return message;
    },
    passwordValidatonMessage(): string {
      let message = ""; //"ErrorMessages.REQURIED_FIELD"";
      (this.v$.password.$errors as []).forEach((element: any) => {
        if (element.$uid === "password-required") {
          message = ErrorMessages.REQURIED_FIELD;
          return;
        }
        if (element.$uid === "password-minLength") {
          message = ErrorMessages.PASSWORD_MIN_LENGTH;
          return;
        }
      });
      return message;
    },
    async onSubmit() {
      const isFormCorrect = await this.v$.$validate();
      if (!isFormCorrect) console.log("Form is not correct");
      else console.log("Form is correct");
    },
  },

  computed: {},
});
</script>

<style scoped lang="scss"></style>
