<template>
  <div class=" my-2">
    <label
      class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
      for="file_input"
      >Upload file</label
    >
    <input
      class="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400"
      aria-describedby="file_input_help"
      id="file_input"
      type="file"
    />
    <p
      class="mt-1 text-sm text-gray-500 dark:text-gray-300"
      id="file_input_help"
    >
      SVG, PNG, JPG or GIF (MAX. 800x400px).
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "MyComponent",
  components: {},
  props: {},
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
