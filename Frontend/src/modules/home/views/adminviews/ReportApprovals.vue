<template>
  <div class="container min-w-full gap-8" :class="tailwind.DIVCOL">
    <Toast
      v-if="toast.display"
      :msg="toast.msg"
      :width="toast.width"
      :closeTimer="toast.closeTimer"
    />
    <ExceptionModal
      v-if="serverException"
      :message="expectionObject.message"
      :stackTrace="expectionObject.stack"
      :toggleModel="true"
    />
    <div class="landing_header w-full">
      <h1 class="header2_h1">Report Approvals</h1>
    </div>
    <AllProjectsTable :forApprovalViewProp="true" :reportApprovalProp="true" />
  </div>
</template>

<script lang="ts">
import {
  TAILWIND_COMMON_CLASSES,
  type IApiException,
} from "@/utils/frontend/interfaces/Frontend";
import { defineComponent } from "vue";
import ExceptionModal from "@/components/common/modals/ExceptionModal.vue";
import Toast from "@/components/common/toast/Toast.vue";
import AllProjectsTable from "@/components/common/tables/AllProjectsTable.vue";
export default defineComponent({
  name: "ReportApprovals",
  components: {
    ExceptionModal,
    Toast,
    AllProjectsTable,
  },
  props: {},
  data() {
    return {
      serverException: false,
      expectionObject: {} as IApiException,
      tailwind: TAILWIND_COMMON_CLASSES,
      toast: {
        display: false,
        msg: "",
        width: "w-1/2",
        closeTimer: 4000,
      },
    };
  },
  watch: {},
  async created() {},
  methods: {},
  computed: {},
});
</script>

<style scoped lang="scss">
@import "@/assets/syles.scss";
</style>
