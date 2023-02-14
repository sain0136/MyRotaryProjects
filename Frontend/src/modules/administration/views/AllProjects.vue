<template>
  <div class="container mt-8 min-w-full gap-8" :class="tailwind.DIVCOL">
    <ExceptionModal
      v-if="serverException"
      :message="expectionObject.message"
      :stackTrace="expectionObject.stack"
      :toggleModel="true"
    />
    <Toast
      v-if="toast.display"
      :msg="toast.msg"
      :width="toast.width"
      :closeTimer="toast.closeTimer"
    />
    <section :class="tailwind.DIVCOL" class="gap-4">
      <h1 class="text-center" :class="tailwind.H1">Choose a District</h1>
      <BaseSelect v-model="districtChosen" :options="districtNameList" />
      <hr class="h-px w-full border-0 bg-gray-500" />
      <h1 class="text-center" :class="tailwind.H1">Choose a Club</h1>
      <BaseSelect v-model="clubChosen" :options="clubNameList" />
    </section>
    <ProjectsTable
      v-if="clubId !== 0"
      :findProjectsForClubProp="clubId"
      :siteAdminViewProp="true"
      @update:showConfirmModal="updateShowModal"
      :key="myKey"
    />
  </div>
</template>

<script lang="ts">
import {
  TAILWIND_COMMON_CLASSES,
  type IApiException,
  type DistrictPagination,
  type ClubPagination,
} from "@/utils/frontend/interfaces/Frontend";
import { defineComponent, ref } from "vue";
import BaseSelect from "@/components/common/baseformComponents/BaseSelect.vue";
import RotaryButton from "@/components/common/RotaryButton.vue";
import DistrictsApi from "@/services/Districts";
import Utilities from "@/utils/frontend/classes/Utilities";
import type IDistrict from "@/utils/shared/interfaces/DistrictInterface";
import DistrictAdminsTable from "@/components/common/tables/DistrictAdminsTable.vue";
import ConfirmModal from "@/components/common/modals/ConfirmModal.vue";
import ExceptionModal from "@/components/common/modals/ExceptionModal.vue";
import Toast from "@/components/common/toast/Toast.vue";
import type { ProjectPagination } from "@/utils/frontend/interfaces/Frontend";
import type { IClub } from "@/utils/shared/interfaces/ClubInterface";
import ProjectsTable from "@/components/common/tables/AllProjectsTable.vue";
export default defineComponent({
  name: "AllProjects",
  components: {
    BaseSelect,
    RotaryButton,
    DistrictAdminsTable,
    ConfirmModal,
    ExceptionModal,
    Toast,
    ProjectsTable,
  },
  setup() {
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
    };
  },
  props: {},
  data() {
    return {
      myKey: 0,
      tailwind: TAILWIND_COMMON_CLASSES,
      serverException: false,
      expectionObject: {} as IApiException,
      districtChosen: "",
      districtNameList: [] as string[],
      districtMapChosenDistrictToID: new Map<string, number>(),
      clubId: 0,
      districtId: 0,
      clubChosen: "",
      clubNameList: [] as string[],
      clubArray: [] as Array<ProjectPagination>,
      clubMapChosenDistrictToID: new Map<string, number>(),
      deleteConfirm: null as any,
      toast: {
        display: false,
        msg: "",
        width: "w-1/2",
        closeTimer: 4000,
      },
    };
  },
  watch: {
    districtChosen: {
      async handler() {
        this.myKey += 1;
        this.districtId = this.districtMapChosenDistrictToID.get(
          this.districtChosen
        ) as number;
        await this.setClubArray(this.districtId);
      },
    },
    clubChosen: {
      async handler(): Promise<void> {
        this.clubId = this.clubMapChosenDistrictToID.get(
          this.clubChosen
        ) as number;
      },
    },
    clubId: {
      async handler(): Promise<void> {
        this.myKey += 1;
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
    async setClubArray(districtId: number) {
      this.clubId = 0;
      this.clubNameList = [];
      try {
        let response = await DistrictsApi.getAllClubsInDistrictPagination(
          districtId,
          1,
          10000000
        );
        if (
          !Utilities.isAnApiError(response) &&
          (response as ClubPagination).data.length > 0
        ) {
          (response as ClubPagination).data.forEach((el: IClub) => {
            this.clubNameList.push(el.club_name);
            this.clubMapChosenDistrictToID.set(
              el.club_name,
              el.club_id as number
            );
          });
        } else {
          this.toast.display = true;
          this.toast.msg = "No clubs found";
        }
      } catch (error) {
        this.serverException = true;
        this.expectionObject = error as IApiException;
      }
    },
  },
  computed: {},
});
</script>

<style scoped lang="scss"></style>
