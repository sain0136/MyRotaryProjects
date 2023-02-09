<template>
  <div>
    <div class="font-style: text-3xl italic text-red-400">
      <h1 class="mb-4 text-center">Hi this is a test!</h1>
      <h2 class="text-primary-white">Sup</h2>
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

    <div
      id="modal"
      tabindex="-1"
      aria-hidden="true"
      class="fixed top-0 left-0 right-0 z-50 hidden h-modal w-full overflow-y-auto overflow-x-hidden p-4 md:inset-0 md:h-full"
    >
      <div class="relative h-full w-full max-w-2xl md:h-auto">
        <!-- Modal content -->
        <div class="relative rounded-lg bg-white shadow dark:bg-gray-700">
          <!-- Modal header -->
          <div
            class="flex items-start justify-between rounded-t border-b p-5 dark:border-gray-600"
          >
            <h3
              class="text-xl font-semibold text-gray-900 dark:text-white lg:text-2xl"
            >
              Terms of Service
            </h3>
            <button
              id="closeButton"
              type="button"
              class="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
                class="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <!-- Modal body -->
          <div class="space-y-6 p-6">
            <p
              class="text-base leading-relaxed text-gray-500 dark:text-gray-400"
            >
              With less than a month to go before the European Union enacts new
              consumer privacy laws for its citizens, companies around the world
              are updating their terms of service agreements to comply.
            </p>
            <p
              class="text-base leading-relaxed text-gray-500 dark:text-gray-400"
            >
              The European Union’s General Data Protection Regulation (G.D.P.R.)
              goes into effect on May 25 and is meant to ensure a common set of
              data rights in the European Union. It requires organizations to
              notify users as soon as possible of high-risk data breaches that
              could personally affect them.
            </p>
          </div>
          <!-- Modal footer -->
          <div
            class="flex items-center space-x-2 rounded-b border-t border-gray-200 p-6 dark:border-gray-600"
          >
            <button
              type="button"
              class="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              I accept
            </button>
            <button
              type="button"
              class="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Decline
            </button>
          </div>
        </div>
      </div>
    </div>
    <Form
      class="mt-12 flex justify-center gap-12"
      @submit="onSubmit"
      :validation-schema="simpleSchema"
    >
      <Field name="email" type="email" />
      <ErrorMessage name="email" />
      <Field name="name" type="text" />
      <ErrorMessage name="name" />

      <button>Sign up for newsletter</button>
    </Form>
    <font-awesome-icon icon="fa-solid fa-wallet" />

  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { initModals } from "flowbite";
import { Modal } from "flowbite";
import { Field, Form, ErrorMessage } from "vee-validate";
import { required, email, min } from "@vee-validate/rules";
import { ref } from "vue";

export default defineComponent({
  setup() {
    const count = ref(0);

    // expose to template and other options API hooks
    return {
      count,
    };
  },
  name: "Test",
  props: {},
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    return {
      validateName: (value: string) => {
        if (value.length > 2) {
          debugger;
          return "yo";
        }
        if (!value) {
          return "This field is required";
        }
      },
      simpleSchema: {
        name(value: string) {
          if (!value) {
            return "This field is required";
          }
          return true;
        },
        email(value: any) {
          // if the field is empty
          if (!value) {
            return "This field is required";
          }
          // if the field is not a valid email
          const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
          if (!regex.test(value)) {
            return "This field must be a valid email";
          }
          // All is good
          return true;
        },
      },
      districts: "",
    };
  },
  watch: {},
  async mounted() {
    initModals();
    const $buttonElement = document.querySelector("#button");
    const $modalElement = document.querySelector("#modal");
    const $closeButton = document.querySelector("#closeButton");

    const modalOptions = {
      backdropClasses:
        "bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40",
    };

    if ($modalElement && $buttonElement && $closeButton) {
      const modal = new Modal($modalElement as HTMLElement, modalOptions);
      $buttonElement.addEventListener("click", () => modal.toggle());
      $closeButton.addEventListener("click", () => modal.hide());
    }
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
    onSubmit(values: any) {
      console.log(JSON.stringify(values, null, 2));
    },
  },

  computed: {},
});
</script>

<style scoped lang="scss"></style>
