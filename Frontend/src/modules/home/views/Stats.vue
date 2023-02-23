<template>
  <div class="container min-w-full gap-8" :class="tailwind.DIVCOL">
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
    <div class="landing_header w-full">
      <h1 class="header_h1">Stats</h1>
    </div>

  <div class="container flex flex-col items-center gap-16 py-24 px-24">
    <div class="top_options flex flex-col items-center gap-4">
      <h1 class="mb-4 text-5xl font-bold" :class="tailwind.H1">
        {{ headerFormatter("My Rotary Projects Statistics") }}
      </h1>
      <BaseSelect
        v-model="year"
        :options="rotaryYearsList"
        :label="headerFormatter('Select Rotary Year')"
      />
    </div>
    <div class="flex flex-col items-center gap-4">
      <h3 class="mb-5 text-lg font-bold text-primary-black">
        Total Projects: <span class=" text-primary-dark-color font-bold">{{ totalBuget.totalProjects }}</span>
      </h3>
      <h3 class="mb-5 text-lg font-bold text-primary-black">
        Total budget:
        <span class=" text-primary-dark-color font-bold">{{ totalBuget.totalBudget }}</span>
      </h3>
      <h3 class="mb-5 text-lg font-bold text-primary-black">
        Total Funds Raised:
        <span class=" text-primary-dark-color font-bold">{{ totalBuget.totalCurrentFunds }}</span>
      </h3>
      <h3 class="mb-5 text-lg font-bold text-primary-black">
        Total Pledges: <span class=" text-primary-dark-color font-bold">{{ totalBuget.pledgeAmount }}</span>
      </h3>
    </div>
    <div class="chart_container flex flex-col gap-4">
      <h1 class="mb-4 text-5xl font-bold text-center" :class="tailwind.H1">
        {{ headerFormatter("All Time Project Types") }}
      </h1>
      <div class="pie">
        <PieChart
          :chart-options="chartOptions"
          :chart-data="chartData"
          :chart-id="chartId"
          :dataset-id-key="datasetIdKey"
          :css-classes="cssClasses"
          :styles="styles"
          :width="width"
          :height="height"
        />
      </div>
    </div>
    <div class="chart_container flex flex-col gap-4">
      <h1 class="mb-4 text-5xl font-bold text-center" :class="tailwind.H1">
        {{ headerFormatter("Project Types District") }}
      </h1>
      <BaseSelect
        v-model="districtChosen"
        :options="districtNameList"
        :label="headerFormatter('Select District')"
      />
      <div class="bar">
        <BarChart
        class="bar"
        :chart-options="chartOptions2"
        :chart-data="chartData2"
        :chart-id="chartId"
        :dataset-id-key="datasetIdKey"
        :css-classes="cssClasses"
        :styles="styles"
        :width="width"
        :height="height"
      />
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import { PieChart, BarChart } from "vue-chart-3";
import ExceptionModal from "@/components/common/modals/ExceptionModal.vue";
import Toast from "@/components/common/toast/Toast.vue";
import {
  TAILWIND_COMMON_CLASSES,
  type IApiException,
  type ProjectPagination,
  type RotaryYearObject,
} from "@/utils/frontend/interfaces/Frontend";

import { defineComponent } from "vue";
import type { IClub } from "@/utils/shared/interfaces/ClubInterface";
import type IDistrict from "@/utils/shared/interfaces/DistrictInterface";
import type {
  IClubProject,
  IDmProject,
  IDsgProject,
} from "@/utils/shared/interfaces/ProjectsInterface";
import DistrictsApi from "@/services/Districts";
import Utilities from "@/utils/frontend/classes/Utilities";
import ProjectsApi from "@/services/Projects";
import BaseSelect from "@/components/common/baseformComponents/BaseSelect.vue";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);
Chart.defaults.plugins.legend.display = false;

export default defineComponent({
  name: "Stats",
  components: {
    ExceptionModal,
    Toast,
    BarChart,
    PieChart,
    BaseSelect,
  },
  props: {
    chartId: {
      type: String,
      default: "bar-chart",
    },
    datasetIdKey: {
      type: String,
      default: "label",
    },
    width: {
      type: Number,
      default: 500  ,
    },
    height: {
      type: Number,
      default: 500,
    },
    cssClasses: {
      default: "",
      type: String,
    },
    styles: {
      type: Object,
      default: () => {},
    },
    plugins: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      chartData2: {
        labels: [
          "Club Projects",
          "District Simplified Projects",
          "District Matching Projects",
          "Global Projects",
        ],
        datasets: [
          {
            backgroundColor: ["#ffb607", "#00000", "#41B883", "#881a8f"],
            data: [] as number[],
          },
        ],
      },
      chartOptions2: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
      },
      chartData: {
        labels: [
          "Club Projects",
          "District Simplified Project",
          "District Matching Project",
          "Global Project",
        ],
        datasets: [
          {
            label: "Data One",
            backgroundColor: ["#ffb607", "#00000", "#41B883", "#881a8f"],
            data: [] as number[],
          },
        ],
      },
      chartOptions: {
        responsive: true,
      },
      districtId: 0,
      districtChosen: "",
      districtNameList: [""] as string[],
      districtMapChosenDistrictToID: new Map<string, number>(),
      clubsByDistrict: [] as IClub[],
      clubs: [] as IClub[],
      alldistricts: [] as IDistrict[],
      allProjects: [] as Array<IDsgProject | IDmProject | IClubProject>,
      computed: [] as number[],
      computed2: [] as number[],
      rotaryYearsList: ["Any Year"] as string[],
      longYearToYear: new Map<string, string>(),
      year: "",
      serverException: false,
      expectionObject: {} as IApiException,
      tailwind: TAILWIND_COMMON_CLASSES,
      toast: {
        display: false,
        msg: "",
        width: "w-1/2",
        closeTimer: 4000,
      },
      headerFormatter: Utilities.headerFormater,
    };
  },
  watch: {
    districtChosen: {
      handler() {
        this.districtId = this.districtMapChosenDistrictToID.get(
          this.districtChosen as string
        ) as number;
        this.chartData2.datasets[0].data =
          this.totalBuget.grantypeArrayNumberTotalByDistrict;
      },
    },
    computed: {
      handler() {
        this.chartData.datasets[0].data =
          this.totalBuget.grantypeArrayNumberTotal;
      },
    },
    computed2: {
      handler() {
        this.chartData2.datasets[0].data =
          this.totalBuget.grantypeArrayNumberTotalByDistrict;
      },
    },
  },
  async created() {
    await this.getAllDistricts();
    await this.getAllProjects();
    await this.getYears();
    this.computed = this.totalBuget.grantypeArrayNumberTotal;
    this.computed2 = this.totalBuget.grantypeArrayNumberTotal;
  },
  methods: {
    async getAllDistricts() {
      try {
        const response = await DistrictsApi.index();
        if (!Utilities.isAnApiError(response)) {
          if ((response as Array<IDistrict>).length >= 0) {
            (response as Array<IDistrict>).forEach((ele: IDistrict) => {
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
    async getAllProjects() {
      try {
        const response = await ProjectsApi.getAllProjectsPaginated(
          1,
          100000000
        );
        if (!Utilities.isAnApiError(response)) {
          this.allProjects = (response as ProjectPagination).data;
        } else throw new Error("No projects found");
      } catch (error) {
        this.serverException = true;
        this.expectionObject = error as IApiException;
      }
    },
    async getYears() {
      try {
        const response = await ProjectsApi.getRotaryYear();
        if (
          !Utilities.isAnApiError(response) &&
          (response as RotaryYearObject).allRotaryYears.length > 0
        ) {
          (response as RotaryYearObject).allRotaryYears.forEach((ele) => {
            this.rotaryYearsList.push(ele);
            this.longYearToYear.set(ele, ele.replace(/-\d{4}$/, ""));
          });
          this.year = this.rotaryYearsList[this.rotaryYearsList.length - 1];
        }
      } catch (error) {}
    },
  },
  computed: {
    totalBuget() {
      let fundingGoalSumAllProjects = 0;
      let currentFundingSumAllProjects = 0;
      let pledgeSumForAllProjects = 0;
      let grantypeArrayNumberTotal: number[] = [0, 0, 0, 0];
      let grantypeArrayNumberTotalByDistrict: number[] = [0, 0, 0, 0];
      let allProjectsCalculation = this.allProjects.length;
      if (this.year && this.year !== "Any Year") {
        allProjectsCalculation = 0;
      }
      this.allProjects.forEach(
        (project: IClubProject | IDmProject | IDsgProject) => {
          let yearFilter = "";
          if (this.year && this.year !== "Any Year") {
            yearFilter = this.longYearToYear.get(this.year) as string;
          }
          if (yearFilter === project.rotary_year) {
            fundingGoalSumAllProjects += project.funding_goal;
            currentFundingSumAllProjects += project.anticipated_funding;
            pledgeSumForAllProjects += project.total_pledges;
            allProjectsCalculation += 1;
          } else if (!this.year || this.year === "Any Year") {
            fundingGoalSumAllProjects += project.funding_goal;
            currentFundingSumAllProjects += project.anticipated_funding;
            pledgeSumForAllProjects += project.total_pledges;
          }

          switch (project.grant_type) {
            case "Club Project":
              if (
                this.districtId > 0 &&
                project.district_id == this.districtId
              ) {
                grantypeArrayNumberTotalByDistrict[0] += 1;
              }
              if (yearFilter === project.rotary_year) {
                grantypeArrayNumberTotal[0] += 1;
              } else if (!yearFilter) {
                grantypeArrayNumberTotal[0] += 1;
              }

              break;
            case "District Simplified Project":
              if (
                this.districtId > 0 &&
                project.district_id == this.districtId
              ) {
                grantypeArrayNumberTotalByDistrict[1] += 1;
              }
              if (yearFilter === project.rotary_year) {
                grantypeArrayNumberTotal[1] += 1;
              } else if (!yearFilter) {
                grantypeArrayNumberTotal[1] += 1;
              }
              break;
            case "District Matching Project":
              if (
                this.districtId > 0 &&
                project.district_id == this.districtId
              ) {
                grantypeArrayNumberTotalByDistrict[2] += 1;
              }
              if (yearFilter === project.rotary_year) {
                grantypeArrayNumberTotal[2] += 1;
              } else if (!yearFilter) {
                grantypeArrayNumberTotal[2] += 1;
              }
              break;
            case "Global Project":
              if (
                this.districtId > 0 &&
                project.district_id == this.districtId
              ) {
                grantypeArrayNumberTotalByDistrict[3] += 1;
              }
              if (yearFilter === project.rotary_year) {
                grantypeArrayNumberTotal[3] += 1;
              } else if (!yearFilter) {
                grantypeArrayNumberTotal[3] += 1;
              }
              break;
            default:
              break;
          }
        }
      );

      const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      });

      return {
        totalCurrentFunds: formatter.format(currentFundingSumAllProjects),
        totalBudget: formatter.format(fundingGoalSumAllProjects),
        totalProjects: allProjectsCalculation,
        pledgeAmount: formatter.format(pledgeSumForAllProjects),
        grantypeArrayNumberTotal: grantypeArrayNumberTotal,
        grantypeArrayNumberTotalByDistrict: grantypeArrayNumberTotalByDistrict,
      };
    },
  },
});
</script>

<style scoped lang="scss">
@import "@/assets/syles.scss";
</style>
