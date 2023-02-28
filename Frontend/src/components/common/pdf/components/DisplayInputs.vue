<template>
  <div class="my-2" :class="divStyling">
    <label
      class="mb-2 block text-sm font-medium text-primary-black"
      :for="label"
      >{{ label }}</label
    >
    <input
      :value="modelValue"
      :type="formType"
      :id="randomId"
      disabled
      :class="inputStyling"
      class="mb-8 py-4"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "DisplayInputs",
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
    formType: {
      type: String,
      default: "text",
    },
    inputMode: {
      type: String,
      default: "text",
    },
    step: {
      type: String,
      default: "1",
    },
    autoComplete: {
      type: String,
      default: "off",
    },
    nameHtml: {
      type: String,
      default: "",
    },
    labelStyling: {
      type: String,
      default: "mb-2 block text-sm font-medium text-primary-black ",
    },
    inputStyling: {
      type: String,
      default:
        "mb-4 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-primary-black",
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
