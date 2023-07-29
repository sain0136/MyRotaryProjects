<template>
  <div
    class="relative overflow-x-auto shadow-md sm:rounded-lg"
    v-if="focusedProjects.length != 0"
  >
    <table
      :key="key"
      class="w-full text-left text-sm text-gray-500 dark:text-gray-400"
    >
      <thead
        class="t_head text-s bg-primary-black uppercase text-primary-white"
      >
        <tr>
          <th>Project Name</th>
          <th>Code</th>
          <th>Project Type</th>
          <th>Project Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="border-b bg-white"
          id="admin_info"
          v-for="project in focusedProjects"
          :key="project.project_id"
        >
          <th
            scope="row"
            class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
          >
            {{ project.project_name }}
          </th>
          <td class="px-6 py-4 text-primary-black">
            {{ project.project_code }}
          </td>
          <td class="px-6 py-4 text-primary-black">
            {{ project.grant_type }}
          </td>
          <td class="px-6 py-4 text-primary-black">
            {{ project.project_status }}
          </td>
          <td class="px-6 py-4 text-primary-black">
            <div class="buttons_container2 flex gap-2">
              <button
                v-if="
                  project.project_status === 'Approved' &&
                  project.grant_type === 'Club Project'
                "
                title="Project Complete"
                class="crud_buttons hover:text-primary-c"
                @click="completeClubProject(project.project_id)"
              >
                <font-awesome-icon
                  icon="fa-solid fa-check-to-slot"
                  class="hover:text-primary-color"
                />
              </button>
              <button
                v-else-if="
                  project.project_status === 'Approved' &&
                  (project.grant_type === 'District Simplified Project' ||
                    project.grant_type === 'District Matching Project')
                "
                title="Submit For Reports"
                class="crud_buttons hover:text-primary-c"
                @click="submitReports(project.project_id)"
              >
              <font-awesome-icon icon="fa-solid fa-file" />
              </button>
              <button
                title="Edit Project"
                class="crud_buttons hover:text-primary-c"
                @click="updateProject(project.project_id, project.grant_type)"
              >
                <font-awesome-icon
                  class="hover:text-primary-color"
                  icon="fa-solid fa-pen-to-square"
                />
              </button>
              <button
                v-if="
                  project.project_status === 'Fully Funded' &&
                  store.$state.focusedProjectsTableProps.tableViewProp ==
                    'MYPROJECTS'
                "
                title="Submit Project "
                class="crud_buttons hover:text-primary-c"
                @click="submitForApproval(project.project_id)"
              >
                <font-awesome-icon
                  icon="fa-solid fa-thumbs-up"
                  class="hover:text-primary-color"
                />
              </button>
              <button
                v-if="
                  store.$state.focusedProjectsTableProps.tableViewProp ==
                  'MYPROJECTS'
                "
                title="Delete Project"
                class="crud_buttons hover:text-primary-c"
                @click="
                  updateShowModal(
                    true,
                    project.project_name,
                    project.project_id as number
                  )
                "
              >
                <font-awesome-icon
                  class="hover:text-primary-color"
                  icon="fa-solid fa-trash-can"
                />
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div>
      <div class="flex flex-col items-center">
        <!-- Help text -->
        <span class="mt-1 text-sm text-gray-700">
          Showing Page
          <span class="font-semibold text-gray-900 dark:text-white">{{
            payload.current_page
          }}</span>
          of
          <span class="font-semibold text-gray-900 dark:text-white">{{
            payload.total
          }}</span>
          Results
        </span>
        <div class="xs:mt-0 my-2 inline-flex w-full justify-evenly">
          <!-- Buttons -->
          <button
            @click="alterpayload(-1)"
            v-if="payload.current_page != 1"
            class="inline-flex items-center rounded-l bg-gray-800 px-4 py-2 text-sm font-medium text-white hover:bg-primary-color"
          >
            Prev
          </button>
          <button
            v-if="payload.current_page !== payload.last_page"
            @click="alterpayload(1)"
            class="inline-flex items-center rounded-r border-0 border-l bg-gray-800 px-4 py-2 text-sm font-medium text-white hover:bg-primary-color"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <p class="text-center font-bold text-gray-700">{{ message }}</p>
  </div>
</template>

<script lang="ts">
import Utilities from "@/utils/frontend/classes/Utilities";
import type { ProjectPagination } from "@/utils/frontend/interfaces/Frontend";
import { defineComponent } from "vue";
import { ref } from "vue";
import type { SetupContext } from "vue";
import type {
  IClubProject,
  IDmProject,
  IDsgProject,
} from "@/utils/shared/interfaces/ProjectsInterface";
import ProjectsApi from "@/services/Projects";
import { useRotaryStore } from "@/stores/rotaryStore";
import {
  GrantType,
  ProjectStatus,
} from "@/utils/shared/interfaces/SharedInterface";

export default defineComponent({
  name: "FocusedProjectsTable",
  setup(props, context: SetupContext) {
    const key = ref(0);
    const increment = () => {
      key.value++;
    };

    const store = useRotaryStore();
    function updateShowModal(
      show: boolean,
      projectName: string,
      projectId: number
    ) {
      context.emit("update:showConfirmModal", {
        showConfirmModal: show,
        confirmModalMessage: `Are you sure you want to delete ${projectName} ?`,
        idTobeDeleted: projectId,
      });
    }
    return { store, updateShowModal, key, increment };
  },
  components: {},
  props: {
    showProjectsWhereAdminProp: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      focusedProjects: [] as IDmProject[] | IDsgProject[] | IClubProject[],
      payload: {
        current_page: 1,
        limit: 10,
        last_page: 1,
        total: 0,
      },
      message: "",
    };
  },
  watch: {},
  async created() {
    this.getFocusedProjects();
  },
  methods: {
    async completeClubProject(projectId: number) {
      try {
        const response = await ProjectsApi.updateProjectStatus(
          projectId as number,
          ProjectStatus.COMPLETED
        );
        if (!Utilities.isAnApiError(response) && response === true) {
          this.$router.go(0);
          //  Not optimal but works for now fix later
        } else {
        }
      } catch (error) {}
      // Fix error catching this later
    },
    async submitReports(projectId: number) {
      try {
        const response = await ProjectsApi.updateProjectStatus(
          projectId as number,
          ProjectStatus.REPORTSDUE
        );
        if (!Utilities.isAnApiError(response) && response === true) {
          this.$router.go(0);
          //  Not optimal but works for now fix later
        } else {
        }
      } catch (error) {}
      // Fix error catching this later
    },
    async submitForApproval(projectId: number) {
      try {
        const response = await ProjectsApi.updateProjectStatus(
          projectId as number,
          ProjectStatus.PENDINGAPPROVAL
        );
        if (!Utilities.isAnApiError(response) && response === true) {
          this.$router.go(0);
          //  Not optimal but works for now fix later
        } else {
        }
      } catch (error) {}
      // Fix error catching this later
    },
    updateProject(projectId: number, projectType: string) {
      switch (projectType) {
        case `${GrantType.DISTRICTMATCHINGPROJECT}`:
          this.store.setDSGOrDMFormProps({
            formModeProp: "UPDATE",
            porjectIdProp: projectId,
          });
          this.$router.push({
            name: "DistrictMatchingProjectForm",
          });
          break;
        case `${GrantType.DISTRICTSIMPLIFIEDPROJECT}`:
          this.store.setDSGOrDMFormProps({
            formModeProp: "UPDATE",
            porjectIdProp: projectId,
          });
          this.$router.push({
            name: "DistrictSimplifiedProjectForm",
          });

          break;
        case `${GrantType.CLUBPROJECT}`:
          this.store.setClubProjectFormProps({
            formModeProp: "UPDATE",
            porjectIdProp: projectId,
          });
          this.$router.push({
            name: "ClubProjectFormLandingView",
          });
          break;
      }
    },
    alterpayload(pageAction: number) {
      this.payload.current_page = this.payload.current_page + pageAction;
      this.getFocusedProjects();
    },
    async getFocusedProjects() {
      let apiCondtitionalMap = new Map();
      apiCondtitionalMap.set("MYPROJECTS", "created_by");
      apiCondtitionalMap.set("CLUB", "club_id");
      apiCondtitionalMap.set("DISTRICT", "district_id");
      let apiCondtional = apiCondtitionalMap.get(
        this.store.$state.focusedProjectsTableProps.tableViewProp
      );
      try {
        const response = await ProjectsApi.getProjectsByConditional(
          this.store.$state.focusedProjectsTableProps
            .conditionalIdProp as number,
          this.payload.current_page,
          this.payload.limit,
          apiCondtional,
          this.showProjectsWhereAdminProp  
        );
        if (
          !Utilities.isAnApiError(response) &&
          (response as ProjectPagination).data.length > 0
        ) {
          this.focusedProjects = (response as ProjectPagination).data as
            | IDmProject[]
            | IDsgProject[]
            | IClubProject[];
          this.payload.total = (response as ProjectPagination).meta.total;
          this.payload.last_page = (
            response as ProjectPagination
          ).meta.last_page;
        } else {
          this.focusedProjects = [];
          this.message = "No Projects Found";
        }
      } catch (error) {}
    },
  },
  computed: {},
});
</script>

<style scoped lang="scss">
@import "@/assets/syles.scss";
.t_head {
  height: 50px;
  th {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
</style>
