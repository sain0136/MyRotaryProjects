<template>
  <div class=" my-2">
    <label
      :for="label"
      class="mb-2 block text-sm font-medium text-primary-black dark:text-white"
      >{{ label }}</label
    >
    <textarea
      :value="modelValue"
      rows="5"
      cols="15"
      :id="randomId"
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
  name: "BaseTextArea",
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
  },
  data() {
    return {
      randomId:
        String.fromCharCode(97 + Math.floor(Math.random() * 26)) +
        String(Math.floor(Math.random() * 5000) + 5000),
    };
  },
  watch: {},
  async created() {},
  methods: {},
  computed: {},
});
</script>

<style scoped lang="scss"></style>
