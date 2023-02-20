<template>
  <Main
    class="Admin_Portal flex min-h-screen w-full grow flex-col bg-primary-white"
  >
    <AdminHeader />
    <router-view></router-view>
    <AdminFooter />
  </Main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AdminHeader from "@/modules/administration/components/AdminHeader.vue";
import AdminFooter from "@/modules/administration/components/AdminFooter.vue";
import { useRotaryStore } from "@/stores/rotaryStore";
export default defineComponent({
  name: "AdminApp",
  setup(props, ctx) {
    const store = useRotaryStore();
    return { store };
  },
  components: {
    AdminHeader,
    AdminFooter,
  },
  props: {},
  created() {
    this.store.$state.currentRoute = "SITEADMINISTRATION";
  },
});
</script>

<style scoped lang="scss"></style>
