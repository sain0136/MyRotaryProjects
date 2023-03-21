<template>
  <div
    id="genericModal"
    tabindex="-1"
    :class="hidden"
    class="fixed top-0 left-0 right-0 z-50 flex h-modal w-full justify-center overflow-y-auto overflow-x-hidden p-4 md:inset-0 md:h-full"
  >
    <div class="relative mt-auto mb-auto h-full w-full max-w-2xl md:h-auto">
      <!-- Modal content -->
      <div :class="`relative rounded-lg ${style} shadow`">
        <!-- Modal header -->
        <div
          class="flex justify-center rounded-t border-b p-4 dark:border-gray-600"
        >
          <h3
            class="text-center text-xl font-semibold text-gray-900 dark:text-white"
          >
            {{ title }}
          </h3>
        </div>
        <!-- Modal body -->
        <div class="space-y-6 break-all p-6">
          <p
            class="text-center text-base leading-relaxed text-gray-900 dark:text-gray-400"
          >
            {{ message }}
          </p>
        </div>
        <!-- Modal footer -->
        <div
          class="flex justify-center space-x-2 rounded-b border-t border-gray-200 p-6 dark:border-gray-600"
        >
          <RotaryButton @click="closeModal()" label="OK" />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import RotaryButton from "@/components/common/RotaryButton.vue";
import { useRotaryStore } from "@/stores/rotaryStore";
import router from "@/router";

export default defineComponent({
  name: "GenericModal",
  setup() {
    const store = useRotaryStore();
    return { store };
  },
  components: {
    RotaryButton,
  },
  props: {
    title: {
      type: String,
      default: "Modal Title",
    },
    message: {
      type: String,
      default: "Modal message",
    },
    style: {
      type: String,
      default: "bg-gray-500",
    },
    apiStoreCall: {
      type: Function,
      default: () => {
        router.push({ name: "UserLogin" });
      },
    },
  },
  data() {
    return {
      hidden: "",
    };
  },
  methods: {
    closeModal() {
      this.hidden = "hidden";
      this.store.$state.showLogoutModal = false;
      if (this.apiStoreCall) {
        this.apiStoreCall();
      }
    },
  },
});
</script>
<style scoped lang="scss"></style>
