<template>
  <div>
    <div class="font-style: text-3xl italic text-red-400">
      <h1 class="mb-4 text-center">Hi this is a test!</h1>
      <h2 class=" text-primary-white">Sup</h2>
      <p>{{ districts }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Test",
  props: {},
  data() {
    return {
      districts: "",
    };
  },
  watch: {},
  async created() {
    this.districts = await this.index();
  },
  methods: {
    async index() {
      const res = await fetch(import.meta.env.VITE_API_URL + "district", {
        method: "GET",
      });
      const response = await res.json();
      if (res.ok) {
        return response;
      }
    },
  },
  computed: {},
});
</script>

<style scoped lang="scss">

</style>
