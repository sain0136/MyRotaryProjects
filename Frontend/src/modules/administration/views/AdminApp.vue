<template>
  <Main
    class="Admin_Portal flex min-h-screen w-full flex-col grow bg-primary-white"
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
export default defineComponent({
  name: "AdminApp",
  components: {
    AdminHeader,
    AdminFooter,
  },
  props: {},
  created() {},
});
</script>

<style scoped lang="scss"></style>
