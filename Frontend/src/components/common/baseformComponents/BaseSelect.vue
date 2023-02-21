<template>
  <div class="my-2">
    <label :for="label" :class="labelStyling">{{ label }}</label>
    <select
      :value="modelValue"
      :id="randomId"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
      :class="selectStyling"
    >
      <option
        v-for="option in options"
        :value="option"
        :key="(option as number)"
        :selected="option === modelValue"
      >
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "BaseSelect",
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
    options: {
      type: Array,
      required: true,
    },
    selectStyling: {
      type: String,
      default:
        "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900",
    },
    labelStyling: {
      type: String,
      default: "mb-2 block text-sm font-medium text-primary-black",
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
