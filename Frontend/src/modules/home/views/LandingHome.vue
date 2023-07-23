<template>
  <div class="container mb-8 min-w-full">
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
    <div class="landing_header">
      <h1 class="header_h1">Our Projects</h1>
    </div>
    <div class="mt-8 mr-24 flex justify-end" id="viewButton">
      <RotaryButton
        :label="viewTypeString"
        :theme="buttonTheme"
        @click="toogleView"
      />
    </div>
    <div class="landing_grid mt-8 px-2 pb-1 md:px-24 md:pb-24">
      <div class="filter_tab pb-8">
        <h1 class="py-8 text-center text-2xl font-bold text-primary-gray">
          {{ headerFormatter("PROJECT SEARCH") }}
        </h1>
        <!-- Search input-->
        <div class="px-8">
          <BaseInputsText
            label="Search"
            :labelStyling="labelStyling"
            :inputStyling="inputStyling"
            v-model="filterText"
          />
        </div>
        <!-- Filter by district  -->
        <div class="px-8">
          <BaseSelect
            label="District"
            :labelStyling="labelStyling"
            :selectStyling="inputStyling"
            :options="districtNameList"
            v-model="districtChosen"
          />
        </div>
        <!-- Filter by club  -->
        <div class="px-8">
          <BaseSelect
            label="Club"
            :labelStyling="labelStyling"
            :selectStyling="inputStyling"
            :options="clubNameList"
            v-model="clubChosen"
          />
        </div>
        <!-- Filter by grantype  -->
        <div class="px-8">
          <BaseSelect
            label="Grant Type"
            :labelStyling="labelStyling"
            :selectStyling="inputStyling"
            :options="grantTypeList"
            v-model="filterGrantType"
          />
        </div>
        <!-- Filter by status  -->
        <div class="px-8">
          <BaseSelect
            label="Status"
            :labelStyling="labelStyling"
            :selectStyling="inputStyling"
            :options="statusList"
            v-model="filterStatus"
          />
        </div>
        <!-- Filter by year  -->
        <div class="px-8">
          <BaseSelect
            label="Year"
            :labelStyling="labelStyling"
            :selectStyling="inputStyling"
            :options="datesList"
            v-model="filterYear"
          />
        </div>
        <!-- Filter by areaOffocus  -->
        <div class="px-8">
          <BaseSelect
            label="Area of Focus"
            :labelStyling="labelStyling"
            :selectStyling="inputStyling"
            :options="areaOfFocus"
            v-model="filterAreaFocus"
          />
        </div>
        <!-- Filter by region  -->
        <div class="px-8">
          <BaseSelect
            label="Region"
            :labelStyling="labelStyling"
            :selectStyling="inputStyling"
            :options="regionList"
            v-model="filterRegion"
          />
        </div>
        <div class="button_row flex gap-2 px-8">
          <RotaryButton
            label="Search"
            :theme="buttonTheme"
            @click="filterProjectSearch()"
          />
          <RotaryButton
            label="Reset"
            :theme="buttonTheme2"
            @click="resetSearch()"
          />
        </div>
      </div>
      <div class="projects_container mr-4 flex flex-col sm:mr-0">
        <div
          v-if="projects.length > 0 && listView !== true"
          class="card_view_wrapper project_cards sm:m-auto"
        >
          <ProjectCard
            :project="project"
            v-for="project in projects"
            :key="project.project_id"
          />
        </div>
        <div
          class="list_view_wrapper mr-4"
          v-else-if="projects.length > 0 && listView == true"
        >
          <table class="w-full text-left text-sm text-gray-500">
            <thead
              class="t_head bg-primary-black text-lg uppercase text-primary-white"
            >
              <th scope="col" class="py-3 pl-2 pr-6 font-bold">Project Type</th>
              <th scope="col" class="py-3 pr-6 font-bold">Title</th>
              <th scope="col" class="py-3 pr-6 font-bold">Country</th>
              <th scope="col" class="py-3 pr-6 font-bold">Amount</th>
              <th scope="col" class="py-3 pr-6 font-bold">Status</th>
            </thead>
            <tbody>
              <tr
                v-for="project in projects"
                :key="project.project_id"
                @click="foward(project.project_id)"
                style="cursor: pointer"
              >
                <td class="py-4 pl-2 font-bold text-primary-black">
                  {{ project.grant_type }}
                </td>
                <td class="py-4 font-bold text-primary-black">
                  {{ project.project_name }}
                </td>
                <td class="py-4 font-bold text-primary-black">
                  {{ project.country }}
                </td>
                <td class="py-4 font-bold text-primary-black">
                  {{ currencyFormatter(project.funding_goal) }}
                </td>
                <td class="py-4 font-bold text-primary-black">
                  {{ project.project_status }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else class="flex justify-center">
          <h1 class="text-2xl font-bold text-primary-black">
            No Projects Found
          </h1>
        </div>
        <div class="pagination_nav mt-4">
          <div>
            <div class="flex flex-col items-center">
              <!-- Help text -->
              <span class="mt-1 text-lg font-bold text-gray-700">
                Showing Page
                <span class="font-semibold text-gray-900 dark:text-white">{{
                  paginationRequest.current_page
                }}</span>
                of
                <span class="font-semibold text-gray-900 dark:text-white">{{
                  paginationRequest.last_page
                }}</span>
                Results
              </span>
              <div class="xs:mt-0 my-2 inline-flex w-full justify-evenly">
                <!-- Buttons -->
                <button
                  @click="alterpayload(-1)"
                  v-if="paginationRequest.current_page != 1"
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
                  v-if="
                    paginationRequest.current_page !==
                    paginationRequest.last_page
                  "
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
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ResourceLists from "@/utils/frontend/classes/ResourceLists";
import Utilities from "@/utils/frontend/classes/Utilities";
import {
  TAILWIND_COMMON_CLASSES,
  type IApiException,
  type RotaryYearObject,
  type DistrictPagination,
  type ClubPagination,
  MyError,
} from "@/utils/frontend/interfaces/Frontend";
import type RotaryClub from "@/utils/shared/classes/RotaryClub";
import BaseInputsText from "@/components/common/baseformComponents/BaseInputsText.vue";
import BaseSelect from "@/components/common/baseformComponents/BaseSelect.vue";
import RotaryButton from "@/components/common/RotaryButton.vue";
import ProjectCard from "@/components/common/projectComponents/ProjectCard.vue";
import ExceptionModal from "@/components/common/modals/ExceptionModal.vue";
import Toast from "@/components/common/toast/Toast.vue";
import ProjectsApi from "@/services/Projects";
import type { ProjectPagination } from "@/utils/frontend/interfaces/Frontend";
import type {
  IClubProject,
  IDmProject,
  IDsgProject,
} from "@/utils/shared/interfaces/ProjectsInterface";
import DistrictsApi from "@/services/Districts";
import type IDistrict from "@/utils/shared/interfaces/DistrictInterface";
import type { IClub } from "@/utils/shared/interfaces/ClubInterface";
export default defineComponent({
  name: "LandingHome",
  components: {
    BaseInputsText,
    BaseSelect,
    RotaryButton,
    ProjectCard,
    ExceptionModal,
    Toast,
  },
  props: {},
  data() {
    return {
      windowWidth: 0,
      typeOfTable: "",
      projects: [] as Array<IDmProject | IDsgProject | IClubProject>,
      headerFormatter: Utilities.headerFormater,
      filterText: "",
      filterStatus: "",
      filterRegion: "",
      filterAreaFocus: "",
      filterYear: "",
      filterGrantType: "",
      paginationRequest: {
        current_page: 1,
        last_page: 0,
        total: 0,
      },
      paginationRequestLimit: 6,
      noSearch: true,
      areaOfFocus: ResourceLists.areaOfFocus,
      serverException: false,
      expectionObject: {} as IApiException,
      tailwind: TAILWIND_COMMON_CLASSES,
      toast: {
        display: false,
        msg: "",
        width: "w-1/2",
        closeTimer: 4000,
      },
      districtChosen: "",
      regionList: ResourceLists.regionList,
      statusList: ResourceLists.statusList,
      searchTermConversionMap: ResourceLists.searchTermConversionMap(),
      rotaryYearList: [] as Array<string>,
      districtNameList: [""] as Array<string>,
      districtMapChosenDistrictToID: new Map<string, number>(),
      clubNameList: [] as Array<string>,
      clubMapChosenDistrictToID: new Map<string, number>(),
      hasTheSearchButtonBeenPressed: false,
      datesList: [] as Array<string>,
      clubArray: [] as Array<RotaryClub>,
      listView: false,
      viewTypeString: "List View",
      grantType: "",
      grantTypeList: ResourceLists.grantTypeList,
      longYearToYear: new Map<string, string>(),
      year: "",
      districtId: 0,
      clubChosen: "",
      clubId: 0,
      buttonTheme:
        " py-2 px-4 font-medium text-primary-white  bg-primary-green text-primary-white hover:bg-primary-dark-green",
      buttonTheme2:
        "py-2 px-4 font-medium bg-primary-color text-primary-white  hover:bg-primary-dark-color h",
      labelStyling: "mb-1 block text-lg font-medium text-primary-gray",
      inputStyling:
        "block w-4/5   border-gray-300 bg-gray-50 p-1 text-sm text-primary-black",
      disableListView: false,
    };
  },
  watch: {
    districtChosen: {
      async handler() {
        if (this.districtChosen) {
          this.districtId = this.districtMapChosenDistrictToID.get(
            this.districtChosen
          ) as number;
          await this.setClubArray(this.districtId);
        } else {
          this.clubNameList = [];
          this.clubChosen = "";
          this.clubId = 0;
        }
      },
    },
    clubChosen: {
      async handler(): Promise<void> {
        this.clubId = this.clubMapChosenDistrictToID.get(
          this.clubChosen
        ) as number;
      },
    },
  },
  async created() {
    window.scrollTo(1, 1);
    window.addEventListener("resize", this.handleWindowResize);
    this.handleWindowResize();
    await this.populateTable();
    await this.setRotaryYears();
    await this.getAllDistricts();
  },
  mounted() {},
  unmounted() {
    window.removeEventListener("resize", this.handleWindowResize);
  },
  methods: {
    handleWindowResize() {
      const windowWidth = window.innerWidth;
      if (windowWidth === 768) {
        this.listView = false;
        this.paginationRequestLimit = this.listView ? 15 : 6;
        this.paginationRequest.current_page = 1;
        this.populateTable();
      }
    },
    alterpayload(pageAction: number) {
      this.paginationRequest.current_page =
        this.paginationRequest.current_page + pageAction;
      if (!this.hasTheSearchButtonBeenPressed) {
        this.populateTable();
      } else {
        this.fliterProjects();
      }
      window.scrollTo(1, 1);
    },
    async setRotaryYears() {
      try {
        const response = await ProjectsApi.getRotaryYear();
        if (
          !Utilities.isAnApiError(response) &&
          (response as RotaryYearObject).allRotaryYears.length > 0
        ) {
          (response as RotaryYearObject).allRotaryYears.forEach((ele) => {
            this.datesList.push(ele);
            this.longYearToYear.set(ele.replace(/-\d{4}$/, ""), ele);
          });
          this.year = this.datesList[this.datesList.length - 1];
        }
      } catch (error) {}
    },
    fowardToCardDetails() {
      this.$router.push({
        name: "CardDetails",
      });
    },
    async populateTable() {
      try {
        const response = await ProjectsApi.getAllProjectsPaginated(
          this.paginationRequest.current_page,
          this.paginationRequestLimit
        );
        if (!Utilities.isAnApiError(response)) {
          this.projects = (response as ProjectPagination).data;
          this.paginationRequest = (response as ProjectPagination).meta;
        }
      } catch (error) {
        this.serverException = true;
        this.expectionObject = error as IApiException;
      }
    },
    async getAllDistricts() {
      try {
        let response = await DistrictsApi.paginationAllDistricts(1, 10000000);
        if (
          !Utilities.isAnApiError(response) &&
          (response as DistrictPagination).data.length > 0
        ) {
          (response as DistrictPagination).data.forEach((ele: IDistrict) => {
            this.districtNameList.push(ele.district_name);
            this.districtMapChosenDistrictToID.set(
              ele.district_name,
              ele.district_id
            );
          });
        } else throw new Error("No districts found");
      } catch (error) {
        this.serverException = true;
        this.expectionObject = error as IApiException;
      }
    },
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
    async fliterProjects() {
      window.scrollTo(1, 1);
      try {
        const filterConverter = ResourceLists.searchTermConversionMap();
        let response = await ProjectsApi.getProjectsFilterdPaginated(
          this.paginationRequest.current_page,
          this.paginationRequestLimit,
          {
            rotary_year: this.filterYear.replace(/-\d{4}$/, ""),
            grant_type: this.filterGrantType,
            district_id: this.districtId,
            club_id: this.clubId,
            project_region: this.filterRegion,
            project_status: this.filterStatus,
            area_focus: filterConverter.get(this.filterAreaFocus)
              ? filterConverter.get(this.filterAreaFocus)
              : "",
            search_text: this.filterText,
          }
        );
        if (!Utilities.isAnApiError(response)) {
          this.projects = (response as ProjectPagination).data;
          this.paginationRequest = (response as ProjectPagination).meta;
        } else throw new MyError((response as IApiException).message);
      } catch (error) {
        this.serverException = true;
        this.expectionObject = error as IApiException;
      }
    },
    currencyFormatter(number: number) {
      const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      });
      return formatter.format(number);
    },
    filterProjectSearch() {
      window.scrollTo(1, 1);
      this.hasTheSearchButtonBeenPressed = true;
      this.fliterProjects();
    },
    resetSearch() {
      window.scrollTo(1, 1);
      this.districtChosen = "";
      this.clubChosen = "";
      this.hasTheSearchButtonBeenPressed = false;
      this.filterText = "";
      this.filterStatus = "";
      this.filterRegion = "";
      this.filterAreaFocus = "";
      this.filterGrantType = "";
      this.districtId = 0;
      this.clubId = 0;
      this.filterYear = "";
      this.populateTable();
    },
    toogleView() {
      this.listView = !this.listView;
      this.viewTypeString = this.listView ? "Grid View" : "List View";
      this.paginationRequestLimit = this.listView ? 15 : 6;
      this.paginationRequest.current_page = 1;
      this.populateTable();
    },
    foward(projectId: number) {
      this.$router.push({
        name: "CardDetails",
        params: { id: projectId },
      });
    },
  },

  computed: {},
});
</script>

<style scoped lang="scss">
@import "@/assets/syles.scss";
.landing_grid {
  display: grid;
  grid-template-columns: [first] 100%;
  grid-template-rows: [row1-start] 100%;
  @media screen and (min-width: $tabletMinScreen) {
    column-gap: 1rem;
    display: grid;
    grid-template-columns: [first] 25% [second] 75%;
    grid-template-rows: [row1-start] 100%;
  }
  @media screen and (max-width: $mobileScreen) {
    grid-column: first;
    grid-row: row1-start;
  }
}
.filter_tab {
  background-color: #dedede;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  @media screen and (max-width: $mobileScreen) {
    display: none;
  }
}

.project_cards {
  height: 95%;
  margin-right: 0.5rem;
  @media screen and (max-width: $mobileScreen) {
    display: grid;
    grid-column: first;
    grid-row: row1-start;
    margin: auto;
    row-gap: 1rem;
  }
  @media screen and (min-width: $tabletMinScreen) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    row-gap: 1rem;
    column-gap: 1rem;
  }
  @media screen and (min-width: $desktopScreen) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    row-gap: 4rem;
    column-gap: 1rem;
  }
}
table {
  tr:hover {
    background-color: #398439;
  }
}
.pagination_nav {
  height: 5%;
  @media screen and (max-width: $mobileScreen) {
    margin-top: 5rem;
  }
}

#viewButton {
  @media screen and (max-width: $mobileScreen) {
    display: none !important;
  }
}
</style>
