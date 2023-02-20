<template>
  <Main
    class="landing_app flex min-h-screen w-full grow flex-col bg-primary-white"
  >
    <LandingHeader /> <router-view></router-view> <LandingFooter />
  </Main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LandingHeader from "@/modules/home/components/LandingHeader.vue";
import LandingFooter from "@/modules/home/components/LandingFooter.vue";
export default defineComponent({
  name: "LandingApp",
  components: {
    LandingHeader,
    LandingFooter,
  },
  props: {},
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
