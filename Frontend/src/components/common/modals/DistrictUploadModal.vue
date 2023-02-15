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
            class="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400"
            id="file_input"
            type="file"
          />
        </div>
        <div class="flex justify-end gap-4">
          <RotaryButton label="Cancel" />
          <RotaryButton label="Save" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import RotaryButton from "@/components/common/RotaryButton.vue";
import BaseSelect from "@/components/common/baseformComponents/BaseSelect.vue";
import {
  TAILWIND_COMMON_CLASSES,
  type DistricReportFileUpload,
} from "@/utils/frontend/interfaces/Frontend";
import { defineComponent } from "vue";
export default defineComponent({
  name: "DistrictUploadModal",
  components: {
    RotaryButton,
    BaseSelect,
  },
  props: {
    districReportFileUpload: {
      type: Object as () => DistricReportFileUpload,
    },
  },
  data() {
    return {
      formTypesList: [
        "",
        "Dsg English",
        "Dsg French",
        "DM English",
        "DM French",
      ],
      tailwind: TAILWIND_COMMON_CLASSES,
      currentFormChoice: "",
      file: null,
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
  },
  computed: {},
});
</script>

<style scoped lang="scss"></style>
