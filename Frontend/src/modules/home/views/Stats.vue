<template>
  <!-- <div class="container min-w-full gap-8 pb-24" :class="tailwind.DIVCOL">
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
  </div> -->
</template>

<!-- <script lang="ts">
import { PieChart, BarChart } from "vue-chart-3";

import ExceptionModal from "@/components/common/modals/ExceptionModal.vue";
import Toast from "@/components/common/toast/Toast.vue";
import {
  TAILWIND_COMMON_CLASSES,
  type IApiException,
} from "@/utils/frontend/interfaces/Frontend";

import { defineComponent } from "vue";
import type { IClub } from "@/utils/shared/interfaces/ClubInterface";
import type IDistrict from "@/utils/shared/interfaces/DistrictInterface";
import type { IClubProject, IDmProject, IDsgProject } from "@/utils/shared/interfaces/ProjectsInterface";
export default defineComponent({
  name: "Stats",
  components: {
    ExceptionModal,
    Toast,
    BarChart,
    PieChart,
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
      default: 400,
    },
    height: {
      type: Number,
      default: 400,
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
          "District Simplified Project",
          "District Matching Project",
          "Global Project",
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
      districtNameList: [] as string[],
      districtMapChosenDistrictToID: new Map<string, number>(),
      clubsByDistrict: [] as IClub[],
      clubs: [] as IClub[],
      alldistricts: [] as IDistrict[],
      allProjects: [] as IDsgProject | IDmProject | IClubProject[],
      computed: [] as number[],
      computed2: [] as number[],
      districtList: [] as string[],
      datesList: [] as string[],
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


  },
  methods: {
    getDistricts(){},
    getAllProjects(){},
    getYears(){},
  },
  computed: {
    totalBuget() {
      let fundingGoaltotal = 0;
      let currentFundingtotal = 0;
      let pledgeAmount = 0;
      let grantypeArrayNumberTotal: number[] = [0, 0, 0, 0];
      let grantypeArrayNumberTotalByDistrict: number[] = [0, 0, 0, 0];
      let allProjectsCalculation = this.allProjects.length;
      if (this.year) {
        allProjectsCalculation = 0;
      }
      this.allProjects.forEach(
        (el: {
          anticipated_funding: number;
          funding_goal: number;
          pledge_amount: number;
          grant_type: string;
          district_id: number;
          rotary_year: string;
        }) => {
          let yearFilter = "";
          if (this.year) {
            yearFilter = this.longYearToYear.get(this.year) as string;
          }
          if (yearFilter === el.rotary_year) {
            fundingGoaltotal += el.funding_goal;
            currentFundingtotal += el.anticipated_funding;
            pledgeAmount += el.pledge_amount;
            allProjectsCalculation += 1;
          } else if (!this.year) {
            fundingGoaltotal += el.funding_goal;
            currentFundingtotal += el.anticipated_funding;
            pledgeAmount += el.pledge_amount;
          }

          switch (el.grant_type) {
            case "Club Project":
              if (this.districtId > 0 && el.district_id == this.districtId) {
                grantypeArrayNumberTotalByDistrict[0] += 1;
              }
              if (yearFilter === el.rotary_year) {
                grantypeArrayNumberTotal[0] += 1;
              } else if (!yearFilter) {
                grantypeArrayNumberTotal[0] += 1;
              }

              break;
            case "District Simplified Project":
              if (this.districtId > 0 && el.district_id == this.districtId) {
                grantypeArrayNumberTotalByDistrict[1] += 1;
              }
              if (yearFilter === el.rotary_year) {
                grantypeArrayNumberTotal[1] += 1;
              } else if (!yearFilter) {
                grantypeArrayNumberTotal[1] += 1;
              }
              break;
            case "District Matching Project":
              if (this.districtId > 0 && el.district_id == this.districtId) {
                grantypeArrayNumberTotalByDistrict[2] += 1;
              }
              if (yearFilter === el.rotary_year) {
                grantypeArrayNumberTotal[2] += 1;
              } else if (!yearFilter) {
                grantypeArrayNumberTotal[2] += 1;
              }
              break;
            case "Global Project":
              if (this.districtId > 0 && el.district_id == this.districtId) {
                grantypeArrayNumberTotalByDistrict[3] += 1;
              }
              if (yearFilter === el.rotary_year) {
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
        totalCurrentFunds: formatter.format(currentFundingtotal),
        totalBudget: formatter.format(fundingGoaltotal),
        totalProjects: allProjectsCalculation,
        pledgeAmount: formatter.format(pledgeAmount),
        grantypeArrayNumberTotal: grantypeArrayNumberTotal,
        grantypeArrayNumberTotalByDistrict: grantypeArrayNumberTotalByDistrict,
      };
    },
  },
});
</script> -->
<script lang="ts">
</script>
<style scoped lang="scss">
@import "@/assets/syles.scss";
</style>
