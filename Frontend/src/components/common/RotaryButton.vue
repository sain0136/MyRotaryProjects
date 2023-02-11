<template>
<button class="bg-primary-black rounded-lg  hover:bg-primary-white hover:text-primary-black py-2 px-4 font-medium text-white">
    {{ label }}
</button>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'MyComponent',
  components: {},
  props: {
    label: {
      type: String,
      required: true,
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

<style scoped lang='scss'>
</style>