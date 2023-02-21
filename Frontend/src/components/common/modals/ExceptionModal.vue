<template>
  <div
    id="defaultModal"
    tabindex="-1"
    :class="hidden"
    class="fixed top-0 left-0 right-0 z-50 flex h-modal w-full justify-center overflow-y-auto overflow-x-hidden p-4 md:inset-0 md:h-full"
  >
    <div class="relative mt-auto mb-auto h-full w-full max-w-2xl md:h-auto">
      <!-- Modal content -->
      <div class="relative rounded-lg bg-gray-500 shadow dark:bg-gray-700">
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
            Error message: {{ message }}
          </p>
          <p
            class="text-center text-base leading-relaxed text-gray-900 dark:text-gray-400"
          >
            Stack Trace: {{ stackTrace }}
          </p>
          <p
            class="text-center text-base font-semibold leading-relaxed text-primary-error dark:text-gray-400"
          >
            Contact us at rotary@gmail.com with above errors!
          </p>
        </div>
        <!-- Modal footer -->
        <div
          class="flex justify-center space-x-2 rounded-b border-t border-gray-200 p-6 dark:border-gray-600"
        >
          <RotaryButton @click="redirect()" label="Return Home" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import RotaryButton from "@/components/common/RotaryButton.vue";
export default defineComponent({
  name: "ExceptionModal",
  components: {
    RotaryButton,
  },
  props: {
    title: {
      type: String,
      default: "Error",
    },
    message: {
      type: String,
      default: "Something went wrong",
    },
    stackTrace: {
      type: String,
      default: "No stack trace available",
    },
    toggleModal: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      toggle: this.toggleModal,
      hidden: "",
    };
  },
  watch: {},
  async created() {
    this.toggle = true;
  },
  methods: {
    redirect() {
      this.hidden = "";
      this.$router.go(0);
    },
  },
  computed: {},
});
</script>

<style scoped lang="scss"></style>
