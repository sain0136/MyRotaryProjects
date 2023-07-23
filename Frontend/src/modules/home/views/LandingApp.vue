<template>
  <Main
    class="landing_app flex min-h-screen w-full grow flex-col bg-primary-white"
  >
    <LandingHeader />
    <GenericlModal
      v-if="store.$state.showLogoutModal"
      title="Logged Out "
      message="You were logged out due to inactivity. Please login again."
    />
    <router-view></router-view> <LandingFooter />
  </Main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LandingHeader from "@/modules/home/components/LandingHeader.vue";
import LandingFooter from "@/modules/home/components/LandingFooter.vue";
import { useRotaryStore } from "@/stores/rotaryStore";
import GenericlModal from "@/components/common/modals/GenericlModal.vue";
export default defineComponent({
  name: "LandingApp",
  setup() {
    const store = useRotaryStore();
    return { store };
  },
  components: {
    LandingHeader,
    LandingFooter,
    GenericlModal,
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
