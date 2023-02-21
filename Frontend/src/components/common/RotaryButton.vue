<template>
  <div>
    <button :class="theme">
      {{ label }}
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "RotaryButton",
  components: {},
  props: {
    label: {
      type: String,
      required: true,
    },
    theme: {
      type: String,
      default:
        "rounded-lg py-2 px-4 font-medium bg-primary-black text-primary-white  hover:bg-primary-color hover:text-primary-black",
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
