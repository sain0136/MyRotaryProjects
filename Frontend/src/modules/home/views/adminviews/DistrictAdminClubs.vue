<template>
  <div
    class="admin_container flex flex-col items-center gap-8 border-t-2 py-24 px-24"
  >
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
    <h1 class="text-center font-bold" :class="tailwind.H1">
      Distrct Club Admin
    </h1>

    <hr class="mt-2 h-px w-full border-0 bg-gray-500" />
    <DistrictClubsTable
      class="w-1/2"
      :districtAdminViewProp="districtAdminViewProp"
      @update:showConfirmModal="updateShowModal"
    />
    <div class="button_wrapper">
      <RotaryButton label="Create" @click="createNewClub()" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import DistrictClubsTable from "@/components/common/tables/AllClubsInDisctrictTable.vue";
import { useRotaryStore } from "@/stores/rotaryStore";
import { TAILWIND_COMMON_CLASSES, type IApiException } from "@/utils/frontend/interfaces/Frontend";
import ClubsApi from "@/services/Club";
import ConfirmModal from "@/components/common/modals/ConfirmModal.vue";
import ExceptionModal from "@/components/common/modals/ExceptionModal.vue";
import Toast from "@/components/common/toast/Toast.vue";
import RotaryButton from "@/components/common/RotaryButton.vue";

export default defineComponent({
  name: "DistrictAdminClubs",
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
      store,
      showConfirmModal,
      updateShowModal,
    };
  },
  components: {
    DistrictClubsTable,
    ConfirmModal,
    ExceptionModal,
    Toast,
    RotaryButton,
  },
  props: {},
  data() {
    return {
      tailwind: TAILWIND_COMMON_CLASSES,
      deleteConfirm: null as any,
      districtAdminViewProp: 0,
      serverException: false,
      expectionObject: {} as IApiException,
      toast: {
        display: false,
        msg: "",
        width: "w-1/2",
        closeTimer: 4000,
      },
    };
  },
  watch: {},
  async created() {
    this.districtAdminViewProp =
      this.store.$state.loggedInUserData.district_id || 0;
  },
  methods: {
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
        let response = await ClubsApi.deleteClub(
          (this.showConfirmModal as any).idTobeDeleted
        );
        if (response === true) {
          this.resetSet();
        } else {
          this.resetSet();
          this.deleteConfirm = false;
          this.toast.display = true;
          this.toast.msg = "Cannot delete clubs with projects";
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
      (this.showConfirmModal as any) = {
        showConfirmModal: false,
        confirmModalMessage: "",
        idTobeDeleted: 0,
      };
    },
    createNewClub() {
      this.store.setClubFormProps({
        formModeProp: "CREATE",
      });
      this.$router.push({ name: "DistrictAdminClubForm" });
    },
  },

  computed: {},
});
</script>

<style scoped lang="scss"></style>
