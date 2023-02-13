<template>
  <div
    id="popup-modal"
    tabindex="-1"
    class="fixed flex items-center justify-center z-50  h-modal overflow-y-auto overflow-x-hidden p-4 md:inset-0 md:h-full"
  >
    <div class="relative h-full w-full max-w-md md:h-auto">
      <div class="relative rounded-lg bg-white shadow">
        <div class="p-6 text-center">
          <svg
            aria-hidden="true"
            class="mx-auto mb-4 h-14 w-14 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            {{ question }}
          </h3>
          <button
            @click="$emit('update:modelValue', true)"
            data-modal-hide="popup-modal"
            type="button"
            class="mr-2 inline-flex items-center rounded-lg bg-red-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:focus:ring-red-800"
          >
            Yes, I'm sure
          </button>
          <button
          @click="$emit('update:modelValue', false)"
            data-modal-hide="popup-modal"
            type="button"
            class="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-600"
          >
            No, cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "MyComponent",
  components: {},
  props: {
    question: {
      type: String,
      required: true,
    },
    modelValue: {
      type: Boolean,
      required: true,
    },

  },
  data() {
    return {};
  },
  watch: {},
  async created() {},
  methods: {},
  computed: {},
});
</script>

<style scoped lang="scss"></style>
