<script lang="ts">
export default {
  name: "AdminConfigForm",
};
</script>

<script setup lang="ts">
import BaseInputsText from "@/components/common/baseformComponents/BaseInputsText.vue";
import BaseInputsTextEmail from "@/components/common/baseformComponents/BaseInputsTextEmail.vue";
import BaseTextArea from "@/components/common/baseformComponents/BaseTextArea.vue";
import { ref, onMounted, onBeforeMount, reactive } from "vue";
import type { MainAssets } from "@/utils/frontend/interfaces/Frontend";
import AssetsApi from "@/services/Assets";
import RotaryButton from "@/components/common/RotaryButton.vue";
import { useNotification, type NotificationType } from "naive-ui";
import { MainAssetsClass } from "@/utils/frontend/classes/MainAssetsClass";
// Data
const notification = useNotification();
let mainAssets = reactive(new MainAssetsClass() as MainAssets);
const emit = defineEmits(["submit"]);

// On Mount
onMounted(async () => {
  try {
    const response = (await AssetsApi.getMainAssets()) as MainAssets;
    if (response) {
      for (const [key, value] of Object.entries(
        response.assets.contentManagement
      )) {
        if (
          mainAssets.assets.contentManagement[key] !== undefined &&
          mainAssets.assets.contentManagement[key] !== null
        ) {
          mainAssets.assets.contentManagement[key] = value;
        }
      }
    }
  } catch (error) {
    console.error(error);
    toastController("error", "Error", "Error while fetching data");
  }
});
// Method
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
  try {
    const response = await AssetsApi.updateMainAssets(
      mainAssets as MainAssets
    );
    if (response) {
      toastController("success", "Success", "Data updated successfully");
      for (const [key, value] of Object.entries(
        response.assets.contentManagement
      )) {
        if (
          mainAssets.assets.contentManagement[key] !== undefined &&
          mainAssets.assets.contentManagement[key] !== null
        ) {
          mainAssets.assets.contentManagement[key] = value;
        }
      }
      emit("submit");
    }
  } catch (error) {
    console.error(error);
    toastController("error", "Error", "Error while updating data");
  }
};
</script>

<template>
  <form class="form_container" @submit.prevent="submit()" v-if="mainAssets">
    <div class="form_item">
      <BaseInputsTextEmail
        v-model="mainAssets.assets.contentManagement.myRotaryEmail"
        label="MyRotary Email"
      />
    </div>
    <div class="form_item">
      <BaseInputsText
        v-model="mainAssets.assets.contentManagement.myRotaryPhone"
        label="MyRotary Phone Contact"
      />
    </div>
    <div class="form_item">
      <BaseInputsText
        v-model="mainAssets.assets.contentManagement.myRotaryAdminFullName"
        label="Site Admin Full Name"
      />
    </div>
    <div class="form_item">
      <BaseInputsTextEmail
        v-model="mainAssets.assets.contentManagement.myRotaryAdminEmail"
        label="Site Admin Email"
      />
    </div>
    <div class="form_item">
      <BaseInputsText
        v-model="mainAssets.assets.contentManagement.myRotaryAddress"
        label="MyRotary Address"
      />
    </div>
    <div class="form_item">
      <BaseInputsText
        v-model="mainAssets.assets.contentManagement.myRotaryCity"
        label="MyRotary City"
      />
    </div>
    <div class="form_item">
      <BaseInputsText
        v-model="mainAssets.assets.contentManagement.myRotaryProvince"
        label="MyRotary State"
      />
    </div>
    <div class="form_item">
      <BaseInputsText
        v-model="mainAssets.assets.contentManagement.myRotaryCountry"
        label="MyRotary Country"
      />
    </div>
    <div class="form_item half_width">
      <BaseInputsText
        v-model="mainAssets.assets.contentManagement.myRotaryPostalCode"
        label="MyRotary Postal Code"
      />
    </div>
    <div class="form_item full_width">
      <BaseTextArea
        v-model="mainAssets.assets.contentManagement.myRotaryAbout"
        label="MyRotary About"
      />
    </div>
    <div class="form_item full_width">
      <BaseTextArea
        v-model="mainAssets.assets.contentManagement.myRotaryfooterDescription"
        label="MyRotary Footer Description"
      />
    </div>
    <div class="form_item full_width text-center">
      <RotaryButton label="Save" />
    </div>
  </form>
</template>

<style lang="scss" scoped>
@import "@/assets/syles.scss";
</style>
