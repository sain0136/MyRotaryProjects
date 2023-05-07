<template>
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
      <h1 class="text-center" :class="tailwind.H1">
        {{ headerFormatter("Choose a District") }}
      </h1>
      <h3 class="text-center font-bold" :class="tailwind.H3">
        {{ headerFormatter("All Districts") }}
      </h3>
      <BaseSelect v-model="districtChosen" :options="districtNameList" />    
      <DistrictAdminsTable
      :districtIdProp="districtId"
      @update:showConfirmModal="updateShowModal"
      :keyProp="keyProp"
    />
      <hr class="mt-2 h-px w-full border-0 bg-gray-500" />
      <h1 class="text-center" :class="tailwind.H1">
        {{ headerFormatter("Create a new admin") }}
      </h1>
    </section>

    <div class="button_wrapper">
      <RotaryButton label="Create" @click="createNewAdmin()" />
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
import BaseSelect from "@/components/common/baseformComponents/BaseSelect.vue";
import RotaryButton from "@/components/common/RotaryButton.vue";
import DistrictsApi from "@/services/Districts";
import Utilities from "@/utils/frontend/classes/Utilities";
import type IDistrict from "@/utils/shared/interfaces/DistrictInterface";
import DistrictAdminsTable from "@/components/common/tables/DistrictAdminsTable.vue";
import UserApi from "@/services/User";
import ConfirmModal from "@/components/common/modals/ConfirmModal.vue";
import ExceptionModal from "@/components/common/modals/ExceptionModal.vue";
import Toast from "@/components/common/toast/Toast.vue";
import { useRotaryStore } from "@/stores/rotaryStore";
export default defineComponent({
  name: "DistrictAdmins",
  components: {
    BaseSelect,
    RotaryButton,
    DistrictAdminsTable,
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
    const keyProp = ref(0);
    function keyPropRefresh() {
      keyProp.value = keyProp.value + 1;
    }
    return {
      showConfirmModal,
      updateShowModal,
      store,
      keyProp,
      keyPropRefresh,
    };
  },
  props: {},
  data() {
    return {
      tailwind: TAILWIND_COMMON_CLASSES,
      serverException: false,
      expectionObject: {} as IApiException,
      districtId: 0,
      districtChosen: "",
      districtNameList: [] as string[],
      districtMapChosenDistrictToID: new Map<string, number>(),
      headerFormatter: Utilities.headerFormater,
      deleteConfirm: null as any,
      toast: {
        display: false,
        msg: "",
        width: "w-1/2",
        closeTimer: 4000,
      },
      formMode: FORM_MODE_PROP,
    };
  },
  watch: {
    districtChosen: {
      handler(): void {
        this.districtId = this.districtMapChosenDistrictToID.get(
          this.districtChosen
        ) as number;
      },
    },
    deleteConfirm: {
      async handler() {
        if (this.deleteConfirm) {
          //   this.deleteAdminConfirm();
        } else {
          this.deleteConfirm = null;
          this.resetSet();
        }
      },
    },
  },
  async created() {
    try {
      const response = await DistrictsApi.paginationAllDistricts(1, 10);
      if (!Utilities.isAnApiError(response)) {
        if ((response as DistrictPagination).data.length >= 0) {
          (response as DistrictPagination).data.forEach((ele: IDistrict) => {
            this.districtNameList.push(ele.district_name);
            this.districtMapChosenDistrictToID.set(
              ele.district_name,
              ele.district_id
            );
          });
        }
      } else throw new Error("No districts found");
    } catch (error) {
      this.serverException = true;
      this.expectionObject = error as IApiException;
    }
  },
  methods: {
    createNewAdmin() {
      this.store.setUserFormProps({
        formModeProp: "CREATE",
        userCreationTypeProp: "DISTRICT_ADMIN",
      });
      this.$router.push({
        name: "SiteAdminUserForm",
      });
    },
    updateDeleteConfirm(value: boolean) {
      if (value) {
        this.deleteConfirm = value;
        this.deleteAdminConfirm();
      } else {
        this.deleteConfirm = value;
      }
    },
    async deleteAdminConfirm() {
      try {
        let response = await UserApi.delete(
          (this.showConfirmModal as any).idTobeDeleted
        );
        if (response === true) {
          this.resetSet();
          this.deleteConfirm = false;
          this.toast.display = true;
          this.toast.msg = this.headerFormatter("District admin deleted successfully");
        } else {
          this.resetSet();
          this.deleteConfirm = false;
          this.toast.display = true;
          this.toast.msg = this.headerFormatter("Cannot delete this district admin");
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
      this.keyPropRefresh();
      (this.showConfirmModal as any) = {
        showConfirmModal: false,
        confirmModalMessage: "",
        idTobeDeleted: 0,
      };
    },
  },
  computed: {},
});
</script>

<style scoped lang="scss"></style>
