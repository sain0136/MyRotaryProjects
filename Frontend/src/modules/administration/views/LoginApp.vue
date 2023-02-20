<template>
  <Main class="Web_Portal_Login h-screen bg-purple-400">
    <div class="flex h-screen w-screen items-center justify-center">
      <AdminloginForm />
    </div>
  </Main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AdminloginForm from "@/modules/administration/components/AdminloginForm.vue";
import { useRotaryStore } from "@/stores/rotaryStore";
export default defineComponent({
  name: "LoginApp",
  components: {
    AdminloginForm,
  },
  setup(props, ctx) {
    const store = useRotaryStore();
    return { store };
  },
  props: {},
  data() {
    return {};
  },
  watch: {},
  async created() {
    if (this.store.$state.isSiteAdminLoggedIn) {
      this.$router.push({
        name: "AdminHome",
      });
    }
  },
  methods: {},
  computed: {},
});
</script>

<style scoped lang="scss"></style>
