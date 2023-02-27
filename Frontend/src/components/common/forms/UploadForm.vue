<template>
  <div class="my-8 flex min-w-full flex-col items-center">
    <div
      class="flex h-1/2 w-1/3 max-w-md flex-col gap-2 rounded-lg border border-primary-color bg-primary-white p-4"
    >
      <div class="mb-4">
        <h1 class="my-2 text-center font-bold" :class="tailwind.H1">
          Upload Cover Image
        </h1>
        <input
          class="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400"
          id="file_input"
          type="file"
          @change="handleFileChange($event)"
          accept="image/*"
        />
      </div>
      <ErrorValidation
        v-if="v$.coverImage.$error"
        :errorMsg="v$.coverImage.$errors[0].$message"
      />
      <span :class="tailwind.SUCCESS">{{ uploadResponse }}</span>
      <div class="flex justify-center gap-4">
        <RotaryButton @click="submit()" label="Submit" />
        <RotaryButton
          @click="clear()"
          label="Clear"
          data-modal-hide="popup-modal"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import RotaryButton from "@/components/common/RotaryButton.vue";
import ErrorValidation from "@/components/common/baseformComponents/ErrorValidation.vue";
import UploadsApi from "@/services/Uploads";
import {
  ErrorMessages,
  TAILWIND_COMMON_CLASSES,
} from "@/utils/frontend/interfaces/Frontend";
import useVuelidate from "@vuelidate/core";
import { helpers, required } from "@vuelidate/validators";
import { defineComponent } from "vue";
export default defineComponent({
  name: "MyComponent",
  setup() {
    const v$ = useVuelidate();
    return {
      v$,
    };
  },
  components: {
    RotaryButton,
    ErrorValidation,
  },
  props: {
    projectIdProp: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      toast: {
        display: false,
        msg: "",
        width: "w-1/2",
        closeTimer: 4000,
      },
      uploadResponse: "",
      tailwind: TAILWIND_COMMON_CLASSES,
      currentFormChoice: "",
      coverImage: null,
    };
  },
  validations() {
    return {
      coverImage: {
        required: helpers.withMessage(
          ErrorMessages.IMAGE_NOT_UPLOADED,
          (value: any) => {
            return value !== null;
          }
        ),
      },
    };
  },
  watch: {},
  async created() {},
  methods: {
    async handleFileChange(event: Event): Promise<void> {
      const target = event.target as HTMLInputElement;
      const files = target.files;
      if (!files || !files[0]) return;
      let file = files[0] as any;
      file = files[0] as any;
      this.coverImage = file;
    },
    async submit() {
      await this.v$.$validate();
      if (this.v$.$error) return;
      try {
        const response = await UploadsApi.fileUpload({
          image_cover: this.coverImage as unknown as File,
          project_id: this.projectIdProp,
        });
        if (typeof response === "object") {
          this.uploadResponse = "Upload Successful";
          setTimeout(() => {
            this.uploadResponse = "";
          }, 3000);
          this.clear();
        } else {
          this.uploadResponse = "Upload Failed Try Again";
          this.clear();
        }
      } catch (error) {
        this.toast.display = true;
        this.toast.msg = "Server Error Contact Admin";
        setTimeout(() => {
          this.toast.display = false;
        }, 4000);
      }
    },
    clear() {
      const fileInput = document.getElementById(
        "file_input"
      ) as HTMLInputElement;
      fileInput.value = "";
    },
  },
  computed: {},
});
</script>

<style scoped lang="scss"></style>
