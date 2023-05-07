<template>
  <div class="container mt-8 min-w-full gap-8" :class="tailwind.DIVCOL">
    <div class="container mt-8 min-w-full gap-8" :class="tailwind.DIVCOL">
      <ExceptionModal
        v-if="serverException"
        :message="expectionObject.message"
        :stackTrace="expectionObject.stack"
        :toggleModel="true"
      />
      <ConfirmModal
        v-if="showConfirmModal.showConfirmModal"
        :modelValue="deleteConfirm"
        :question="showConfirmModal.confirmModalMessage"
        @update:modelValue="updateDeleteConfirm"
      />
      <Toast
        v-if="toast.display"
        :msg="toast.msg"
        :width="toast.width"
        :closeTimer="toast.closeTimer"
      />
      
      <section :class="tailwind.DIVCOL" class="gap-8">
        <h1 class="text-center font-bold" :class="tailwind.H1">
          All Districts
        </h1>
        <DistrictsTable @update:showConfirmModal="updateShowModal" :key="key"/>
        <hr class="mt-2 h-px w-full border-0 bg-gray-500" />
        <h1 class="text-center font-bold" :class="tailwind.H1">
          {{headerFormatter("Create a new District")}}
        </h1>
      </section>
      <div class="button_wrapper">
        <RotaryButton label="Create" @click="createRoute()" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  TAILWIND_COMMON_CLASSES,
  type IApiException,
  type DistrictPagination,
  FORM_MODE_PROP,
} from "@/utils/frontend/interfaces/Frontend";
import { defineComponent, ref } from "vue";
import RotaryButton from "@/components/common/RotaryButton.vue";
import DistrictsApi from "@/services/Districts";
import Utilities from "@/utils/frontend/classes/Utilities";
import type IDistrict from "@/utils/shared/interfaces/DistrictInterface";
import DistrictsTable from "@/components/common/tables/DistrictTables.vue";
import ConfirmModal from "@/components/common/modals/ConfirmModal.vue";
import ExceptionModal from "@/components/common/modals/ExceptionModal.vue";
import Toast from "@/components/common/toast/Toast.vue";
import { useRotaryStore } from "@/stores/rotaryStore";
export default defineComponent({
  name: "AllDistricts",
  components: {
    RotaryButton,
    DistrictsTable,
    ConfirmModal,
    ExceptionModal,
    Toast,
  },
  setup() {
    const store = useRotaryStore();
    const showConfirmModal = ref({
      showConfirmModal: false,
      confirmModalMessage: "",
      idTobeDeleted: 0,
    });
    function updateShowModal(newValue: any) {
      showConfirmModal.value = newValue;
    }
    return {
      showConfirmModal,
      updateShowModal,
      store,
    };
  },
  data() {
    return {
      headerFormatter:Utilities.headerFormater,
      formMode: FORM_MODE_PROP,
      tailwind: TAILWIND_COMMON_CLASSES,
      serverException: false,
      expectionObject: {} as IApiException,
      deleteConfirm: null as any,
      toast: {
        display: false,
        msg: "",
        width: "w-1/2",
        closeTimer: 4000,
      },
      key: 0,
    };
  },
  watch: {
    deleteConfirm: {
      async handler() {
        if (this.deleteConfirm) {
          //   this.deleteDistrictConfirm();
        } else {
          this.deleteConfirm = null;
          this.resetSet();
        }
      },
    },
  },
  created() {},
  methods: {
    async updateDeleteConfirm(value: boolean) {
      if (value) {
        this.deleteConfirm = value;
        await this.deleteDistrict();
      } else {
        this.deleteConfirm = value;
      }
    },
    async deleteDistrict() {
      try {
        let response = await DistrictsApi.deleteDistrict(
          (this.showConfirmModal as any).idTobeDeleted
        );
        if (response === true) {
          this.resetSet();
        } else {
          this.resetSet();
          this.deleteConfirm = false;
          this.toast.display = true;
          this.toast.msg = "Cannot delete districts that have clubs";
          setTimeout(() => {
            this.toast.display = false;
          }, 4000);
        }
      } catch (error) {
        this.serverException = true;
        this.expectionObject = error as IApiException;
      }
    },
    resetSet() {
      this.key++;
      (this.showConfirmModal as any) = {
        showConfirmModal: false,
        confirmModalMessage: "",
        idTobeDeleted: 0,
      };
    },
    createRoute() {
      this.store.setDistrictFormProps({
        formModeProp: this.formMode.CREATE,
      });
      this.$router.push({
        name: "SiteAdminDistrictForm",
      });
    },
  },
});
</script>

<style scoped lang="scss"></style>
