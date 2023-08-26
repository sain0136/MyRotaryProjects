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
    <section :class="tailwind.DIVCOL " class="my-8 gap-8">
      <h1 class="text-center" :class="tailwind.H1">
        {{ headerFormatter("Choose a District") }}
      </h1>
      <BaseSelect v-model="districtChosen" :options="districtNameList" />
      <h3 class="text-center font-bold" :class="tailwind.H3" v-if="districtId !== 0">
        *Click the edit button on a row to fully administer the club!
      </h3>
      <AllClubsInDisctrictTable
        :key="key"
        v-if="districtId !== 0"
        :districtIdProp="districtId"
        @update:showConfirmModal="updateShowModal"
        @update:clubId="updateClubId"
      />
     <!--  <RotaryButton
        v-if="clubId !== 0"
        label="Create New Member"
        @click="createNewClubMember()"
      />
      <AllClubMembersTable
        v-if="clubId !== 0"
        :clubIdProp="clubId"
        @update:showConfirmModal="updateShowModal"
        :key="clubId"
        tableViewProp="SITEADMIN"
      />
      <hr class="mt-2 h-px w-full border-0 bg-gray-500" />-->
      <h1 class="text-center" :class="tailwind.H1">
        {{ headerFormatter("Create a new club") }}
      </h1>
      <div class="button_wrapper">
        <RotaryButton label="Create" @click="createNewClub()" />
      </div> 
    </section>
  </div>
</template>

<script lang="ts">
import {
  TAILWIND_COMMON_CLASSES,
  type IApiException,
  type DistrictPagination,
} from "@/utils/frontend/interfaces/Frontend";
import { defineComponent, ref } from "vue";
import AllClubMembersTable from "@/components/common/tables/AllClubMembersTable.vue";
import BaseSelect from "@/components/common/baseformComponents/BaseSelect.vue";
import RotaryButton from "@/components/common/RotaryButton.vue";
import DistrictsApi from "@/services/Districts";
import Utilities from "@/utils/frontend/classes/Utilities";
import type IDistrict from "@/utils/shared/interfaces/DistrictInterface";
import AllClubsInDisctrictTable from "@/components/common/tables/AllClubsInDisctrictTable.vue";
import ConfirmModal from "@/components/common/modals/ConfirmModal.vue";
import ExceptionModal from "@/components/common/modals/ExceptionModal.vue";
import Toast from "@/components/common/toast/Toast.vue";
import ClubsApi from "@/services/Club";
import { useRotaryStore } from "@/stores/rotaryStore";
export default defineComponent({
  name: "ClubAdmin",
  components: {
    AllClubMembersTable,
    BaseSelect,
    RotaryButton,
    AllClubsInDisctrictTable,
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
    const clubId = ref(0);
    const updateClubId = (newValue: number) => {
      clubId.value = newValue;
    };
    return {
      clubId,
      store,
      showConfirmModal,
      updateShowModal,
      updateClubId,
    };
  },
  props: {},
  data() {
    return {
      headerFormatter: Utilities.headerFormater,
      tailwind: TAILWIND_COMMON_CLASSES,
      serverException: false,
      expectionObject: {} as IApiException,
      districtId: 0,
      districtChosen: "",
      districtNameList: [] as string[],
      districtMapChosenDistrictToID: new Map<string, number>(),
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
    createNewClub() {
      this.store.setClubFormProps({
        formModeProp: "CREATE",
      });
      this.$router.push({ name: "SiteAdminClubForm" });
    },
    resetSet() {
      this.key++;
      (this.showConfirmModal as any) = {
        showConfirmModal: false,
        confirmModalMessage: "",
        idTobeDeleted: 0,
      };
    },
    createNewClubMember() {
      this.store.setUserFormProps({
        formModeProp: "CREATE",
        userCreationTypeProp: "CLUB_MEMBER",
        clubIdProp: this.clubId,
      });
      this.$router.push({ name: "UserFormForSiteAdmin" });
    },
  },
  computed: {},
});
</script>

<style scoped lang="scss"></style>
