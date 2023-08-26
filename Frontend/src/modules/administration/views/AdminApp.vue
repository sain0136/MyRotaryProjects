<template>
  <Main
    class="Admin_Portal flex min-h-screen w-full grow flex-col bg-primary-white"
  >
    <AdminHeader />
    <GenericlModal
      v-if="store.$state.showLogoutModal"
      title="Logged Out "
      message="You were logged out due to inactivity. Please login again."
    />
    <router-view/> 
    <AdminFooter />
  </Main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AdminHeader from "@/modules/administration/components/AdminHeader.vue";
import AdminFooter from "@/modules/administration/components/AdminFooter.vue";
import { useRotaryStore } from "@/stores/rotaryStore";
import GenericlModal from "@/components/common/modals/GenericlModal.vue";
export default defineComponent({
  name: "AdminApp",
  setup() {
    const store = useRotaryStore();
    return { store };
  },
  components: {
    AdminHeader,
    AdminFooter,
    GenericlModal,
  },
  props: {},
  created() {
    this.store.$state.currentRoute = "SITEADMINISTRATION";
  },
});
</script>

<style scoped lang="scss"></style>
