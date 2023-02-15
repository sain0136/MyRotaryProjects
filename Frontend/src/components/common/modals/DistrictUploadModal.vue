<template>
  <!-- Main modal -->
  <div id="modal" class="m fixed inset-0 z-10 overflow-y-auto">
    <div class="min-w-screen flex min-h-screen items-center justify-center p-4">
      <div class="h-1/2 w-1/3 max-w-md rounded-lg bg-white p-4 shadow-lg">
        <div class="mb-4">
          <h1 class="text-center font-bold" :class="tailwind.H1">
            Upload Districts Reports
          </h1>
          <h1 class="mt-4 text-center font-bold" :class="tailwind.H1">
            <span class="">*Choose A Form Type To Upload</span>
          </h1>
          <BaseSelect
            label="Project Report Forms"
            v-model="currentFormChoice"
            :options="formTypesList"
          />
          <input
            v-if="currentFormChoice"
            class="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400"
            id="file_input"
            type="file"
            @change="handleFileChange($event)"
            accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.pdf,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          />
        </div>
        <span :class="tailwind.SUCCESS">{{ uploadResponse }}</span>
        <div class="flex justify-end gap-4">
          
          <RotaryButton
            v-if="currentFormChoice && file !== null"
            @click="submit()"
            label="Submit"
          />
          <RotaryButton
            @click="$emit('update:modelValue', false)"
            label="Cancel"
            data-modal-hide="popup-modal"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import RotaryButton from "@/components/common/RotaryButton.vue";
import BaseSelect from "@/components/common/baseformComponents/BaseSelect.vue";
import UploadsApi from "@/services/Uploads";
import {
  TAILWIND_COMMON_CLASSES,
  type DistricReportFileUpload,
} from "@/utils/frontend/interfaces/Frontend";
import DistrictObject from "@/utils/shared/classes/DistrictObject";
import { defineComponent } from "vue";
export default defineComponent({
  name: "DistrictUploadModal",
  components: {
    RotaryButton,
    BaseSelect,
  },
  props: {
    districtIdProp: {
      type: Number,
      required: true,
    },
    formTypesListProp: {
      type: Array,
      required: true,
    },
    modelValue: {
      type: Boolean,
      default: false,
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
      file: null,
      formTypesList: this.formTypesListProp,
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
      this.file = file;
    },
    async submit() {
      try {
        const response = await UploadsApi.fileUpload({
          file_report: [this.file as unknown as File],
          districtId: this.districtIdProp,
          extraLabel: this.currentFormChoice,
        });
        if (typeof response === "object") {
          this.formTypesList.splice(
            this.formTypesList.indexOf(this.currentFormChoice),
            1
          );
          this.uploadResponse = "Upload Successful";
          setTimeout(() => {
            this.uploadResponse = "";
          }, 2000);
          const fileInput = document.getElementById(
            "file_input"
          ) as HTMLInputElement;
          fileInput.value = "";
          this.currentFormChoice = "";
        } else {
          this.uploadResponse = "Upload Failed";
          const fileInput = document.getElementById(
            "file_input"
          ) as HTMLInputElement;

          fileInput.value = "";
          this.currentFormChoice = "";
        }
      } catch (error) {
        this.toast.display = true;
        this.toast.msg = "Server Error";
        setTimeout(() => {
          this.toast.display = false;
        }, 4000);
      }
    },
  },
  computed: {},
});
</script>

<style scoped lang="scss"></style>
