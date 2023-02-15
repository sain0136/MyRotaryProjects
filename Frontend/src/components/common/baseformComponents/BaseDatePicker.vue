<template>
    <div class=" my-2" :class="divStyling">
      <label
        :for="label"
        class="mb-2 block text-sm font-medium text-primary-black dark:text-white"
        >{{ label }}</label
      >
      <input
        :value="modelValue"
        type="date"
        id="input_text"
        @input="
          $emit('update:modelValue', ($event.target as HTMLInputElement).value)
        "
        class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
      />
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from "vue";
  export default defineComponent({
    name: "BaseDatePicker",
    components: {},
    props: {
      label: {
        type: String,
        default: "",
      },
      modelValue: {
        type: [String, Number],
        default: "",
      },
      divStyling: {
        type: String,
        default: "",
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
  