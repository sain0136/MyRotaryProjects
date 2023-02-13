<template>
  <div>
    <button class="rounded-lg py-2 px-4 font-medium" :class="theme">
      {{ label }}
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "MyComponent",
  components: {},
  props: {
    label: {
      type: String,
      required: true,
    },
    theme: {
      type: String,
      default:
        "bg-primary-black text-primary-white  hover:bg-primary-color hover:text-primary-black",
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
