<template>
  <div class="landing_header">
    <h1 class="header2_h1">District Projects</h1>
  </div>
  <div class="container min-w-full gap-8" :class="tailwind.DIVCOL">
    <FocusedProjectsTable class="my-12" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  TAILWIND_COMMON_CLASSES,
  type IApiException,
} from "@/utils/frontend/interfaces/Frontend";
import { useRotaryStore } from "@/stores/rotaryStore";
import FocusedProjectsTable from "@/components/common/tables/FocusedProjectsTable.vue";
export default defineComponent({
  name: "DistrictProjects",
  setup() {
    const store = useRotaryStore();
    return { store };
  },
  components: {
    FocusedProjectsTable,
  },
  props: {},
  data() {
    return {
      tailwind: TAILWIND_COMMON_CLASSES,
    };
  },
  watch: {},
  async created() {
    this.store.setFocusedProjectsTableProps({
      tableViewProp: "CLUB",
      conditionalIdProp: this.store.$state.loggedInUserData
        .district_id as number,
    });
  },
  methods: {},
  computed: {},
});
</script>

<style scoped lang="scss">
@import "@/assets/syles.scss";
</style>
