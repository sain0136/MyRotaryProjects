<template>
  <div class="my-8 flex flex-col items-center gap-8">
    <RotaryButton @click="downloadPdf()" label="Export To PDF" />
    <div class="pdf flex flex-col gap-4 px-48 py-24" id="element-to-print">
      <div class="print_format">
        <h1>Project Code:</h1>
        <p>{{ clubProject.project_code }}</p>
      </div>
      <div class="print_format">
        <h1>Project Name:</h1>
        <p>{{ clubProject.project_name }}</p>
      </div>
      <div class="print_format">
        <h1>Project Description:</h1>
        <p class="mb-4 text-sm">{{ clubProject.project_description }}</p>
      </div>
      <div class="print_format">
        <h1>Project Country:</h1>
        <p>{{ clubProject.country }}</p>
      </div>
      <div class="print_format">
        <h1>Project Region:</h1>
        <p>{{ clubProject.region }}</p>
      </div>
      <div class="print_format">
        <h1>Start Date:</h1>
        <p>{{ clubProject.start_date }}</p>
      </div>
      <div class="print_format">
        <h1>Estimated Completion Date:</h1>
        <p>{{ clubProject.completion_date }}</p>
      </div>
      <div class="print_format">
        <h1>Funding Goal :</h1>
        <p>{{ formatter(clubProject.funding_goal )}}</p>
      </div>
      <div class="print_format">
        <h1>Anticipated Funding :</h1>
        <p>{{ formatter(clubProject.anticipated_funding) }}</p>
      </div>
      <div class="print_format">
        <h1>Project Status:</h1>
        <p>{{ clubProject.project_status }}</p>
      </div>

      <div class="print_format">
        <h1>Areas Of Focus:</h1>
        <p class="flex gap-2" v-for="area in chosenAreaOfFocus" :key="area">
          <font-awesome-icon class="mt-1" icon="fa-solid fa-arrow-right" />
          {{ area.replace(/_/g, " ") }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import html2pdf from "html2pdf.js";
import DisplayInputs from "@/components/common/pdf/components/DisplayInputs.vue";
import type {
  IClubProject,
  IDmProject,
  IDsgProject,
} from "@/utils/shared/interfaces/ProjectsInterface";
import RotaryButton from "@/components/common/RotaryButton.vue";
import { defineComponent } from "vue";
export default defineComponent({
  name: "ClubProjectPdf",
  components: {
    RotaryButton,
    DisplayInputs,
  },
  props: {
    projectProp: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      clubProject: {} as IClubProject,
      chosenAreaOfFocus: [] as string[],
    };
  },
  watch: {},
  async created() {
    this.clubProject = this.projectProp as IClubProject;
    Object.entries(this.clubProject.area_focus).forEach((key) => {
      if (key[1] === true) {
        this.chosenAreaOfFocus.push(key[0]);
      }
    });
  },
  methods: {
    downloadPdf() {
      let element = document.getElementById("element-to-print");

      html2pdf(/* this.$refs.document, */ element, {
        margin: 1,
        format: "letter",
        scale: 1.8,
        filename: `ClubProject-${this.clubProject.project_code}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { dpi: 280 },
        jsPDF: { unit: "in", format: "letter", orientation: "landscape" },
        pagebreak: { mode: "avoid-all" },
      });
    },
    formatter(amount: number) {
      const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      });
      return formatter.format(amount);
    },
  },
  computed: {},
});
</script>

<style scoped lang="scss">
@import "@/assets/syles.scss";
.print_format {
  h1 {
    font-size: 1.5rem;
    font-weight: 600;
  }
}
</style>
