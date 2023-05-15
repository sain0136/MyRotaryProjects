<template>
  <div class="landing_header w-full">
    <h1 class="header2_h1">District Clubs</h1>
  </div>
  <div class="admin_container flex flex-col items-center gap-8 py-24 px-24">
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
      District Club Admin
    </h1>

    <hr class="mt-2 h-px w-full border-0 bg-gray-500" />
    <DistrictClubsTable
      @update:showConfirmModal="updateShowModal"
      @update:clubId="updateClubId"
      :districtAdminIdViewProp="store.loggedInUsersDistrict.district_id" 
      />
    <div class="button_wrapper">
      <RotaryButton label="Create" @click="createNewClub()" />
    </div>
    <AllClubMembersTable
      v-if="clubId !== 0"
      :clubIdProp="clubId"
      @update:showConfirmModal="updateShowModal"
      :key="clubId"
    />
    <RotaryButton
      v-if="clubId !== 0"
      label="Create New Member"
      @click="createNewClubMember()"
    />
  </div>
</template>

<script lang="ts">
import AllClubMembersTable from "@/components/common/tables/AllClubMembersTable.vue";
import { defineComponent, ref } from "vue";
import DistrictClubsTable from "@/components/common/tables/AllClubsInDisctrictTable.vue";
import { useRotaryStore } from "@/stores/rotaryStore";
import {
  TAILWIND_COMMON_CLASSES,
  type IApiException,
} from "@/utils/frontend/interfaces/Frontend";
import ClubsApi from "@/services/Club";
import ConfirmModal from "@/components/common/modals/ConfirmModal.vue";
import ExceptionModal from "@/components/common/modals/ExceptionModal.vue";
import Toast from "@/components/common/toast/Toast.vue";
import RotaryButton from "@/components/common/RotaryButton.vue";

export default defineComponent({
  name: "DistrictAdminClubs",
  setup() {
    const clubId = ref(0);
    const updateClubId = (newValue: number) => {
      clubId.value = newValue;
    };
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
      clubId,
      store,
      showConfirmModal,
      updateShowModal,
      updateClubId,
    };
  },
  components: {
    AllClubMembersTable,
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
  },
  methods: {
    updateDeleteConfirm(value: boolean) {
      if (value) {
        this.deleteConfirm = value;
        this.deleteMemberConfirm();
      } else {
        this.showConfirmModal.showConfirmModal = value;
      }
    },
    async deleteMemberConfirm() {
      try {
        let response = await ClubsApi.deleteClub(
          (this.showConfirmModal as any).idTobeDeleted
        );
        this.toast.display = true;
        if (response === true) {
          this.toast.msg = "Member deleted successfully";
        } else {
          this.deleteConfirm = false;
          this.toast.msg = "Cannot delete member with projects";
        }
        setTimeout(() => {
          this.toast.display = false;
          this.resetSet();
        }, 4000);
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
        districtIdProp: this.store.$state.loggedInUserData.district_id || 0,
      });
      this.$router.push({ name: "DistrictAdminClubForm" });
    },
    createNewClubMember() {
      this.store.setUserFormProps({
        formModeProp: "CREATE",
        userCreationTypeProp: "CLUB_MEMBER",
        clubIdProp: this.clubId,
      });
      this.$router.push({ name: "UserFormForAdmins" });
    },
  },

  computed: {},
});
</script>

<style scoped lang="scss">
@import "@/assets/syles.scss";
</style>
