<template>
  <div class="mb-4 flex items-center">
    <input
      :checked="modelValue"
      id="default-checkbox"
      @change="$emit('update:modelValue', $event.target.checked)"
      type="checkbox"
      value=""
      class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
    />
    <label
      for="default-checkbox"
      class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >{{ label }}</label
    >
  </div>
</template>

<script>
export default {
  name: "BaseCheckBox",
  props: {
    label: {
      type: String,
      default: "",
    },
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped lang="scss">
</style>
