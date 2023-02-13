<template>
  <div class="relative text-left">
    <div>
      <div
        class="absolute left-0 top-0 h-[100vh] w-[100vw] rounded-sm bg-gradient-to-r from-primary-color to-primary-black"
      />
    </div>
    <div class="flex h-screen items-center justify-center">
      <div class="text-center">
        <h6 class="text-3xl font-medium">
          The page you are looking for couldn’t be found
        </h6>
        <p class="text-6xl font-bold">404</p>
        <p class="text-lg font-medium">oops!</p>
        <div class="mt-10 flex justify-center gap-8">
          <RotaryButton label="Home" @click="redirect()" />
          <RotaryButton label="Contact us" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import RotaryButton from "@/components/common/RotaryButton.vue";

export default defineComponent({
  name: "fourzzerofour",
  components: {
    RotaryButton,
  },
  props: {},
  data() {
    return {};
  },
  watch: {},
  async created() {},
  methods: {
    redirect() {
      this.$router.push("/");
    },
  },
  computed: {},
});
</script>

<style scoped lang="scss"></style>
