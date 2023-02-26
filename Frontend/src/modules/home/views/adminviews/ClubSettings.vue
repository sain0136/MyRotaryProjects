<template>
  <div class="admin_container">
    <div class="landing_header w-full">
      <h1 class="header2_h1">District Settings</h1>
    </div>
    <ClubForm />
  </div>
</template>

<script lang="ts">
import ClubForm from "@/components/common/forms/ClubForm.vue";
import { defineComponent } from "vue";
import { useRotaryStore } from "@/stores/rotaryStore";
export default defineComponent({
  name: "ClubSettings",
  setup() {
    const store = useRotaryStore();
    return { store };
  },
  components: {
    ClubForm,
  },
  props: {},
  data() {
    return {};
  },
  watch: {},
  async created() {
    this.store.setClubFormProps({
      formModeProp: "UPDATE",
      clubIdProp: this.store.$state.loggedInUserData.club_id,
    });
  },
  methods: {},
  computed: {},
});
</script>

<style scoped lang="scss">
@import "@/assets/syles.scss";
</style>
