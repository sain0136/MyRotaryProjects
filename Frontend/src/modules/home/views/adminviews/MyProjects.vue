<template>
  <div class="landing_header">
    <h1 class="header2_h1">My Projects</h1>
  </div>
  <div class="container my-16 min-w-full gap-8" :class="tailwind.DIVCOL">
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
    <h1 class="text-center font-bold" :class="tailwind.H1">Created Projects</h1>
    <FocusedProjectsTable
      class="my-12"
      :key="myKey"
      @update:showConfirmModal="updateShowModal"
    />
    <h1 class="text-center font-bold" :class="tailwind.H1">Other Projects</h1>
    <FocusedProjectsTable
      class="my-12"
      :key="myKey"
      @update:showConfirmModal="updateShowModal"
      :showProjectsWhereAdminProp="true"
    />
    <div class="new_projects flex flex-col gap-8">
      <h1 class="text-center font-bold" :class="tailwind.H1">
        District Club Admin
      </h1>
      <h3
        v-if="isProjectsOpen == true"
        class="text-center text-lg font-semibold"
      >
        DM and DSG Projects will be open for submission from
        <strong class="text-primary-green">{{ startDate }}</strong> to
        <strong class="text-primary-green">{{ closeDate }}</strong>
      </h3>
      <h3
        v-if="isProjectsOpen == false"
        class="text-center text-lg font-semibold"
      >
        Your District is not currently accepting District Simplified Projects or
        District Matching projects. Please check back later.
      </h3>
      <div class="my flex justify-evenly gap-8">
        <RotaryButton
          label="Create Club Project"
          @click="createNewProject('CLUB')"
        />
        <RotaryButton
          v-if="isProjectsOpen === true && !store.$state.loggedInUsersClub.settings?.disableDsg"
          label="Create Dsg Project"
          @click="createNewProject('DSG')"
        />
        <RotaryButton
          v-if="isProjectsOpen === true && !store.$state.loggedInUsersClub.settings?.disableDM"
          label="Create Dm Project"
          @click="createNewProject('DM')"
        />
        <RotaryButton label="Create Global Project" @click="" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import {
  TAILWIND_COMMON_CLASSES,
  type IApiException,
} from "@/utils/frontend/interfaces/Frontend";
import FocusedProjectsTable from "@/components/common/tables/FocusedProjectsTable.vue";
import { useRotaryStore } from "@/stores/rotaryStore";
import ConfirmModal from "@/components/common/modals/ConfirmModal.vue";
import ExceptionModal from "@/components/common/modals/ExceptionModal.vue";
import Toast from "@/components/common/toast/Toast.vue";
import RotaryButton from "@/components/common/RotaryButton.vue";
import ProjectsApi from "@/services/Projects";
import Utilities from "@/utils/frontend/classes/Utilities";
import { DateTime } from "luxon";

export default defineComponent({
  name: "MyProjects",
  setup() {
    const myKey = ref(0);
    const store = useRotaryStore();
    const showConfirmModal = ref({
      showConfirmModal: false,
      confirmModalMessage: "",
      idTobeDeleted: 0,
    });
    function updateShowModal(newValue: any) {
      showConfirmModal.value = newValue;
    }
    return { store, showConfirmModal, updateShowModal, myKey };
  },
  components: {
    FocusedProjectsTable,
    ConfirmModal,
    ExceptionModal,
    Toast,
    RotaryButton,
  },
  props: {},
  data() {
    return {
      headerFormatter: Utilities.headerFormater,
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
      startDate: "",
      closeDate: "",
      isProjectsOpen: true,
    };
  },
  watch: {},
  async created() {
    this.store.setFocusedProjectsTableProps({
      tableViewProp: "MYPROJECTS",
      conditionalIdProp: this.store.$state.loggedInUserData.user_id as number,
    });
    this.store.reloadDistrictDates();
    this.closeDate =
      this.store.$state.loggedInUsersDistrict.district_details.dates.grant_submission_closedate;
    this.startDate =
      this.store.$state.loggedInUsersDistrict.district_details.dates.grant_submission_startdate;
      if (!this.startDate || !this.closeDate) {
      this.isProjectsOpen = false;
      }
    const todaysDate = new Date(DateTime.now().toLocaleString());
    const closeDate = new Date(this.closeDate);
    const startDate = new Date(this.startDate);
    if (todaysDate < startDate || todaysDate > closeDate) {
      this.isProjectsOpen = false;
    } 

  },
  async updated() {
    await this.store.reloadDistrictDates();
  },
  methods: {
    async createNewProject(projectType: string) {
      switch (projectType) {
        case "DM":
          this.store.setDSGOrDMFormProps({
            formModeProp: "CREATE",
          });
          this.$router.push({
            name: "DistrictMatchingProjectForm",
          });
          break;
        case "DSG":
          this.store.setDSGOrDMFormProps({
            formModeProp: "CREATE",
          });
          this.$router.push({
            name: "DistrictSimplifiedProjectForm",
          });
          break;
        case "CLUB":
          this.store.setClubProjectFormProps({
            formModeProp: "CREATE",
          });
          this.$router.push({
            name: "ClubProjectFormLandingView",
          });
          break;
      }
    },
    updateDeleteConfirm(value: boolean) {
      if (value) {
        this.deleteConfirm = value;
        this.deleteProject();
      } else {
        this.resetSet();
      }
    },
    async deleteProject() {
      try {
        const response = await ProjectsApi.deleteProject(
          (this.showConfirmModal as any).idTobeDeleted
        );
        this.toast.display = true;
        if (response === true) {
          this.toast.msg = this.headerFormatter("Project deleted successfully");
          this.myKey = this.myKey + 1;
          this.resetSet();
        } else {
          this.toast.msg = this.headerFormatter(
            "Unable to delete project. It contains pledges or is currently in progress."
          );
        }
        this.resetSet();
        setTimeout(() => {
          this.toast.display = false;
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
  },
  computed: {},
});
</script>

<style scoped lang="scss">
@import "@/assets/syles.scss";
</style>
