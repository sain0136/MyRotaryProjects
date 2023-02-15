<template>
  <p id="filled_error_help" class=" text-xs text-red-600 dark:text-red-400 mb-8">
    <span class="font-medium">{{ errorMsg }}</span> 
  </p>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "MyComponent",
  components: {},
  props: {
    errorMsg: {
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
