<script lang="ts">
export default {
  name: "AdminHome",
};
</script>

<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import RotaryButton from "@/components/common/RotaryButton.vue";
import Utilities from "@/utils/frontend/classes/Utilities";
import { useVuelidate } from "@vuelidate/core";
import { requiredIf } from "@vuelidate/validators";
import ErrorValidation from "@/components/common/baseformComponents/ErrorValidation.vue";
import { useRotaryStore } from "@/stores/rotaryStore";
import { useNotification, type NotificationType } from "naive-ui";
import HeadingH1 from "@/components/common/headings/HeadingH1.vue";
import AdminConfigForm from "@/modules/administration/components/AdminConfigForm.vue";
import {
  TAILWIND_COMMON_CLASSES,
  type MainAssets,
} from "@/utils/frontend/interfaces/Frontend";
import UploadsApi from "@/services/Uploads";
// Data
interface ValidationData {
  image: string | null;
}
const logo = ref("");
const notification = useNotification();
const validationData: ValidationData = reactive({
  image: null,
});
const headerFormater = Utilities.headerFormater;
const store = useRotaryStore();
const tailwind = TAILWIND_COMMON_CLASSES;
const activeTab = ref(
  store.$state.lastActiveTabAdminHomeComponent || "welcome"
);
const tabs = ref([
  { name: "welcome", label: "Welcome" },
  { name: "logo", label: "Logo" },
  { name: "setting", label: "Settings" },
]);
const validationRules = {
  image: {
    requiredIfFuction: requiredIf("imageValidation"),
  },
};
const v$ = useVuelidate(validationRules, validationData);
logo.value = store.$state.mainLogoUrl ?? "";
// Computed
const imageValidation = computed(() => {
  return validationData.image !== null;
});
// Methods
const toastController = (
  type: NotificationType,
  title?: string,
  content?: string,
  duration?: number,
  closable?: boolean
) => {
  notification[type]({
    title: title || "Error",
    duration: duration || 3000,
    closable: closable || false,
    content: content || "",
  });
};

const submit = async () => {
  v$.value.$validate();
  if (!v$.value.$error) {
    try {
      v$.value.$reset();
      const response = await UploadsApi.fileUpload({
        image_assets: validationData.image as unknown as File,
      });
      validationData.image = null;
      const fileInput = document.getElementById(
        "file_input"
      ) as HTMLInputElement;
      fileInput.value = "";
      if (response) {
        toastController("success", "Success", "Logo Uploaded Successfully");
        console.log((response as MainAssets).assets.main_logo.url);
        store.$state.mainLogoUrl =
          (response as MainAssets).assets.main_logo.url ?? "";
        logo.value = store.$state.mainLogoUrl ?? "";
        activeTab.value = "welcome";
      } else throw new Error("Something went wrong");
    } catch (error) {
      toastController("error", "Error", (error as Error).message);
    }
  }
};

const setActiveTab = (tabName: string) => {
  activeTab.value = tabName;
  store.$state.lastActiveTabAdminHomeComponent = tabName;
};

const handleFileChange = async (event: Event): Promise<void> => {
  const target = event.target as HTMLInputElement;
  const files = target.files;
  if (!files || !files[0]) return;
  let imageFile = files[0] as any;
  imageFile = files[0] as any;
  validationData.image = imageFile;
};
</script>

<template>
  <!-- tabs -->
  <nav class="tabs">
    <ul
      class="flex flex-wrap justify-center border-b border-gray-200 text-center text-sm font-medium text-gray-500 dark:border-gray-700 dark:text-gray-400"
    >
      <li class="mr-2" v-for="tab in tabs" :key="tab.name">
        <a
          @click="setActiveTab(tab.name)"
          class="inline-block cursor-pointer rounded-t-lg p-4 text-2xl hover:bg-gray-50 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300"
          :class="{
            ' active  bg-gray-100 text-primary-dark-color dark:bg-gray-800 dark:text-blue-500':
              tab.name === activeTab,
          }"
        >
          {{ tab.label }}
        </a>
      </li>
    </ul>
  </nav>
  <section class="base_container flex-col items-center">
    <!-- Welcome Tab -->
    <section class="welcome flex flex-col gap-8" v-if="activeTab === 'welcome'">
      <div class="image_wrapper m-auto">
        <img :src="logo || ''" alt="admin logo" />
      </div>
      <HeadingH1
        header-tailwind-classes="text-center"
        header-text="Welcome to the admin portal"
        :capitalize="true"
        sub-header-text="From this web portal you can manage the Rotary Projects website."
      />
    </section>
    <!-- Logo -->
    <section
      class="logo base_container flex-col items-center"
      v-if="activeTab === 'logo'"
    >
      <label :class="tailwind.LABEL" for="file_input">
        <HeadingH1 header-text="Upload Main Rotary Logo" />
      </label>
      <ErrorValidation v-if="v$.image.$error" errorMsg="Must Upload an image" />
      <input
        class="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400"
        aria-describedby="file_input_help"
        id="file_input"
        type="file"
        @change="handleFileChange($event)"
        accept="image/png, image/jpeg, image/gif"
      />
      <p :class="tailwind.PARAGRAPHS" class="font-bold" id="file_input_help">
        {{ headerFormater("PNG, JPG or GIF (MAX. 10 GB).") }}
      </p>
      <div :class="tailwind.DIVCOL">
        <RotaryButton label="Submit" @click="submit()" />
      </div>
    </section>
    <!-- Settings -->
    <section
      class="settings base_container flex-col items-center"
      v-if="activeTab === 'setting'"
    >
      <h2 class="text-xl font-bold">Content Management</h2>
      <AdminConfigForm @submit="setActiveTab('welcome')" />
    </section>
  </section>
</template>

<style scoped lang="scss">
@import "@/assets/syles.scss";

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
