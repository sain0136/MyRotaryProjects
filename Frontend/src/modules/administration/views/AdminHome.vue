<template>
  <div class="container mb-8 min-w-full">
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
    <div class="mt-8 flex flex-col items-center gap-8">
      <h1 class="text-center" :class="tailwind.H1">
        {{ headerFormatter("Welcome to the admin portal!") }}
      </h1>
      <div class="image_wrapper flex justify-center">
        <img :src="logo" alt="admin logo" />
      </div>
      <p class="text-center font-bold" :class="tailwind.PARAGRAPHS">
        {{
          headerFormatter(
            "From this web portal you can manage the Rotary Projects website."
          )
        }}
        <br />
      </p>
      <div class="gap-4" :class="tailwind.DIVCOL">
        <label :class="tailwind.LABEL" for="file_input">{{
          headerFormatter("Upload Main Rotary Logo")
        }}</label>
        <ErrorValidation
          v-if="v$.image.$error"
          errorMsg="Must Upload an image"
        />
        <input
          class="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400"
          aria-describedby="file_input_help"
          id="file_input"
          type="file"
          @change="handleFileChange($event)"
          accept="image/png, image/jpeg, image/gif"
        />
        <p :class="tailwind.PARAGRAPHS" class="font-bold" id="file_input_help">
          {{ headerFormatter("PNG, JPG or GIF (MAX. 10 GB).") }}
        </p>
      </div>
      <div :class="tailwind.DIVCOL">
        <RotaryButton label="Submit" @click="submit()" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  TAILWIND_COMMON_CLASSES,
  type IApiException,
  type MainAssets,
} from "@/utils/frontend/interfaces/Frontend";
import { defineComponent } from "vue";
import RotaryButton from "@/components/common/RotaryButton.vue";
import Toast from "@/components/common/toast/Toast.vue";
import UploadsApi from "@/services/Uploads";
import useVuelidate from "@vuelidate/core";
import ErrorValidation from "@/components/common/baseformComponents/ErrorValidation.vue";
import { requiredIf } from "@vuelidate/validators";
import ExceptionModal from "@/components/common/modals/ExceptionModal.vue";
import Utilities from "@/utils/frontend/classes/Utilities";
import AssetsApi from "@/services/Assets";
import { useRotaryStore } from "@/stores/rotaryStore";
export default defineComponent({
  name: "AdminHome",
  components: {
    RotaryButton,
    Toast,
    ErrorValidation,
    ExceptionModal,
  },
  setup() {
    return { v$: useVuelidate(), store: useRotaryStore() };
  },
  props: {},
  data() {
    return {
      headerFormatter: Utilities.headerFormater,
      tailwind: TAILWIND_COMMON_CLASSES,
      toast: {
        display: false,
        msg: "",
        width: "w-1/2" as string,
        closeTimer: 4000 as number,
      },
      image: null,
      serverException: false,
      expectionObject: {} as IApiException,
      logo: "",
    };
  },
  validations: {
    image: {
      requiredIfFuction: requiredIf("imageValidation"),
    },
  },
  watch: {},
  async created() {
    this.logo = this.store.$state.mainLogoUrl ?? "";
  },
  methods: {
    async submit() {
      this.v$.$validate();
      if (!this.v$.$error) {
        try {
          this.v$.$reset();
          const response = await UploadsApi.fileUpload({
            image_assets: this.image as unknown as File,
          });
          if (!Utilities.isAnApiError(response)) {
            this.toast.display = true;
            this.toast.msg = "Image Uploaded Successfully";
            this.image = null;
          } else {
            const fileInput = document.getElementById(
              "file_input"
            ) as HTMLInputElement;
            this.image = null;
            fileInput.value = "";
            this.toast.display = true;
            this.toast.msg = "Image Upload Failed";
            setTimeout(() => {
              this.toast.display = false;
            }, 4000);
          }
        } catch (error) {
          this.serverException = true;
          this.expectionObject = error as IApiException;
        }
      }
    },
    async handleFileChange(event: Event): Promise<void> {
      const target = event.target as HTMLInputElement;
      const files = target.files;
      if (!files || !files[0]) return;
      let image = files[0] as any;
      image = files[0] as any;
      this.image = image;
    },
  },
  computed: {
    imageValidation() {
      return this.image === null;
    },
  },
});
</script>

<style scoped lang="scss">
.image_wrapper {
  width: 100%;
  height: 100%;
  max-width: 300px;
  max-height: 300px;
  img {
    width: 80%;
    height: 80%;
    object-fit: contain;
  }
}
</style>
