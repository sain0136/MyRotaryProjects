<template>
  <div class="my-2 flex items-center">
    <input
      :checked="modelValue"
      @change="handleChange"
      id="default-checkbox"
      type="checkbox"
      value=""
      class="h-4 w-4 rounded border-gray-300 bg-gray-100"
    />
    <label
      for="default-checkbox"
      class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >{{ label }}</label
    >
  </div>
</template>

<script lang="ts">
export default {
  name: "BaseCheckBox",
  setup(props, { emit }) {
    const handleChange = (event: Event) => {
      const isChecked = (event.target as HTMLInputElement).checked;
      emit("update:modelValue", isChecked);
    };
    return {
      handleChange,
    };
  },
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

<style scoped lang="scss"></style>
