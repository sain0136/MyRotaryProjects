<template>
  <div
    class="relative overflow-x-auto shadow-md sm:rounded-lg"
    v-if="focusedProjects.length != 0"
  >
    <table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
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
                @click=""
              >
                <font-awesome-icon
                  icon="fa-solid fa-thumbs-up"
                  class="hover:text-primary-color"
                />
              </button>
              <button
                v-if="
                  project.project_status === 'Reports Due' &&
                  store.$state.focusedProjectsTableProps.tableViewProp ==
                    'MYPROJECTS'
                "
                title="Submit Reports"
                class="crud_buttons hover:text-primary-c"
              >
                <font-awesome-icon
                  icon="fa-solid fa-flag"
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
            <svg
              aria-hidden="true"
              class="mr-2 h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
            Prev
          </button>
          <button
            v-if="payload.current_page !== payload.last_page"
            @click="alterpayload(1)"
            class="inline-flex items-center rounded-r border-0 border-l bg-gray-800 px-4 py-2 text-sm font-medium text-white hover:bg-primary-color"
          >
            Next
            <svg
              aria-hidden="true"
              class="ml-2 h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
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
import { GrantType } from "@/utils/shared/interfaces/SharedInterface";
export default defineComponent({
  name: "FocusedProjectsTable",
  setup(props, context: SetupContext) {
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
    return { store, updateShowModal };
  },
  components: {},
  props: {
    test: {
      type: String,
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
    updateProject(projectId: number, projectType: string) {
      switch (projectType) {
        case "DM":
          break;
        case "DSG":
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
          apiCondtional
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
