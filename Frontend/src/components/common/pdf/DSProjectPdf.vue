<template>
  <div class="my-8 flex flex-col items-center gap-8">
    <RotaryButton @click="downloadPdf()" label="Export To PDF" />
    <div class="pdf flex flex-col gap-4 px-48 py-24" id="element-to-print">
      <div class="print_format">
        <h1 class="text-center font-extrabold">
          District Simplified Grants Club Application Form Criteria
        </h1>
        <ul class="my-8 list-disc">
          <li v-for="listItem in criteriaList" :key="listItem">
            {{ listItem }}
          </li>
        </ul>
        <hr class="my-4 h-px w-full border-0 bg-gray-500" />

        <h2>Project Code:</h2>
        <p>{{ dsgProject.project_code }}</p>
      </div>
      <div class="print_format">
        <h2>Project Name:</h2>
        <p>{{ dsgProject.project_name }}</p>
      </div>
      <div class="print_format">
        <h2>Project Description:</h2>
        <p class="mb-4 text-sm">{{ dsgProject.project_description }}</p>
      </div>
      <div class="print_format">
        <h2>Project Country:</h2>
        <p>{{ dsgProject.country }}</p>
      </div>
      <div class="print_format">
        <h2>Project Region:</h2>
        <p>{{ dsgProject.region }}</p>
      </div>
      <div class="print_format">
        <h2>Start Date:</h2>
        <p>{{ dsgProject.start_date }}</p>
      </div>
      <div class="print_format">
        <h2>Estimated Completion Date:</h2>
        <p>{{ dsgProject.completion_date }}</p>
      </div>
      <div class="print_format">
        <h2>Funding Goal :</h2>
        <p>{{ formatter(dsgProject.funding_goal) }}</p>
      </div>
      <div class="print_format">
        <h2>Anticipated Funding :</h2>
        <p>{{ formatter(dsgProject.anticipated_funding) }}</p>
      </div>
      <div class="print_format">
        <h2>Project Status:</h2>
        <p>{{ dsgProject.project_status }}</p>
      </div>
      <div class="print_format">
        <h2>Areas Of Focus:</h2>
        <p class="flex gap-2" v-for="area in chosenAreaOfFocus" :key="area">
          <font-awesome-icon class="mt-1" icon="fa-solid fa-arrow-right" />
          {{ area.replace(/_/g, " ") }}
        </p>
      </div>
      <hr class="my-4 h-px w-full border-0 bg-gray-500" />

      <div class="print_format flex flex-col gap-4">
        <h3>
          1. Describe how the project will benefit the community or address a
          community need.*
        </h3>
        <p>{{ dsgProject.extra_descriptions.benefit_community_description }}</p>
        <h3>
          2. Describe the non-financial participation by Rotarians in the
          project.
        </h3>
        <p>{{ dsgProject.extra_descriptions.benefit_community_description }}</p>
        <h3>
          3. If a co-operating organisation will be involved in the project,
          provide a letter stating its role in the project and how Rotarians
          will interface with the organisation.
        </h3>
        <p>{{ dsgProject.extra_descriptions.benefit_community_description }}</p>
      </div>
      <hr class="my-4 h-px w-full border-0 bg-gray-500" />
      <div class="contacts">
        <div class="print_format">
          <h2>Primary Contact Name:</h2>
          <p>{{ dsgProject.extra_descriptions.primary_contact.name }}</p>
        </div>
        <div class="print_format">
          <h2>Primary Contact Address:</h2>
          <p>{{ dsgProject.extra_descriptions.primary_contact.address }}</p>
        </div>
        <div class="print_format">
          <h2>Primary Contact Email:</h2>
          <p>{{ dsgProject.extra_descriptions.primary_contact.email }}</p>
        </div>
        <div class="print_format">
          <h2>Primary Contact Phone:</h2>
          <p>{{ dsgProject.extra_descriptions.primary_contact.phone }}</p>
        </div>
        <hr class="my-4 h-px w-full border-0 bg-gray-500" />
        <div class="print_format">
          <h2>Secondary Contact Name:</h2>
          <p>{{ dsgProject.extra_descriptions.secondary_contact.name }}</p>
        </div>
        <div class="print_format">
          <h2>Secondary Contact Address:</h2>
          <p>{{ dsgProject.extra_descriptions.secondary_contact.address }}</p>
        </div>
        <div class="print_format">
          <h2>Secondary Contact Email:</h2>
          <p>{{ dsgProject.extra_descriptions.secondary_contact.email }}</p>
        </div>
        <div class="print_format">
          <h2>Secondary Contact Phone:</h2>
          <p>{{ dsgProject.extra_descriptions.secondary_contact.phone }}</p>
        </div>
      </div>
      <div class="print_format">
        <hr class="my-4 h-px w-full border-0 bg-gray-500" />
        <h2>
          Provide a complete, detailed and itemised budget for the entire
          project. ( Supporting documents may be requested )
        </h2>
      </div>
      <div class="print_format">
        <h2>All Budget Items and Funding Sources will be recorded in USD!</h2>
      </div>
      <!-- Budget table -->
      <table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
        <thead
          class="t_head text-s bg-primary-black uppercase text-primary-white"
        >
          <tr>
            <th>Item Name</th>
            <th>Cost</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="border bg-white"
            v-for="(item, index) in dsgProject.itemized_budget"
            :key="index"
          >
            <td class="px-6 py-4 text-primary-black">{{ item.itemName }}</td>
            <td class="px-6 py-4 text-primary-black">{{ item.itemCost }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr class="">
            <th
              class="border-2 border-primary-color px-6 py-4 font-bold text-primary-black"
            >
              Total Budget:
            </th>
            <th
              class="whitespace-nowrap border-2 border-primary-color px-6 py-4 font-bold text-primary-black"
            >
              USD {{ sumOfItemsCost }}
            </th>
          </tr>
        </tfoot>
      </table>
      <div class="print_format">
        <h2>
          Your District will match District club contributions ({{
            store.loggedInUsersDistrict.district_details.ddfCapes.dsgFraction
          }}
          : 1) up to a maximum of ${{
            store.loggedInUsersDistrict.district_details.ddfCapes.dsgCap
          }}
          USD. on a first come basis depending upon availability of DDF.
        </h2>
      </div>
      <div class="print_format">
        <h2>
          Your District calculates District Designated Funds from these funding
          sources:
          <strong class="text-center text-primary-green">{{
            fundingSourcesArrary
          }}</strong>
        </h2>
      </div>

      <div class="print_format">
        <h2>
          Your current DDF request limit: $
          {{ districtSimplifiedGrantRequestLimit }} USD
        </h2>
      </div>
      <table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
        <thead
          class="t_head text-s bg-primary-black uppercase text-primary-white"
        >
          <th>#</th>
          <th>Source</th>
          <th>Details</th>
          <th>Amount</th>
        </thead>
        <tbody>
          <tr
            class="border bg-white"
            v-for="(item, index) in dsgProject.extra_descriptions.fundingSourceArray"
            :key="index"
          >
            <td class="px-6 py-4 text-primary-black">{{ index + 1 }}</td>
            <td class="px-6 py-4 text-primary-black">{{ item.sourceName }}</td>
            <td class="px-6 py-4 text-primary-black">
              {{ item.typeOfFunding }}
            </td>
            <td class="px-6 py-4 text-primary-black">{{ item.amount }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr class="">
           
            <th
              class="border-2 border-primary-color px-6 py-4 font-bold text-primary-black"
            >
              Total Funding:
            </th>
            <th
              class="whitespace-nowrap border-2 border-primary-color px-6 py-4 font-bold text-primary-black"
            >
              USD {{ sumOfAnticipatedFunding }}
            </th>
          </tr>
        </tfoot>
      </table>
      <div class="print_format">
        <h2>Your Current Anticipated Funding: {{ sumOfAnticipatedFunding }}</h2>
      </div>
      <div class="print_format">
        <h2>
          Your Current Funding Goal:
          {{ formatter(dsgProject.funding_goal) }}
        </h2>
      </div>
      <div class="print_format">
        <h2>
          Pledge Amount To Date:
          {{ formatter(dsgProject.total_pledges) }}
        </h2>
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
import ResourceLists from "@/utils/frontend/classes/ResourceLists";
import { useRotaryStore } from "@/stores/rotaryStore";
export default defineComponent({
  name: "DSProjectPdf",
  setup() {
    return {
      store: useRotaryStore(),
    };
  },
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
      dsgProject: {} as IDsgProject,
      chosenAreaOfFocus: [] as string[],
      criteriaList: ResourceLists.districtSimplifiedCriteria,
    };
  },
  watch: {},
  async created() {
    this.dsgProject = this.projectProp as IDsgProject;
    Object.entries(this.dsgProject.area_focus).forEach((key) => {
      if (key[1] === true) {
        this.chosenAreaOfFocus.push(key[0]);
      }
    });
  },
  methods: {
    downloadPdf() {
      let element = document.getElementById("element-to-print");

      html2pdf(/* this.$refs.document, */ element, {
        margin: 0,
        format: "letter",
        scale: 2,
        filename: `DSGProject-${this.dsgProject.project_code}.pdf`,
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
  computed: {
    sumOfAnticipatedFunding() {
      let sum: number = 0;
      this.dsgProject.extra_descriptions.fundingSourceArray.forEach(
        (el) => {
          sum = sum + parseFloat(el.amount.toString());
        }
      );
      const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      });
      this.dsgProject.anticipated_funding =
        sum + parseFloat(this.dsgProject.total_pledges.toString());
      return formatter.format(
        parseFloat(this.dsgProject.anticipated_funding.toFixed(2))
      );
    },
    sumOfItemsCost() {
      let sum = 0;
      this.dsgProject.itemized_budget.forEach((item: { itemCost: number }) => {
        sum = sum + item.itemCost;
      });
      return this.formatter(parseFloat(sum.toFixed(2)));
    },
    fundingSourcesArrary() {
      let sourcesArray = [] as string[];
      this.store.loggedInUsersDistrict.district_details.ddfCalculation.forEach(
        (ele: { toString: () => string }) => {
          sourcesArray.push(" " + ele.toString());
        }
      );

      return sourcesArray.toString();
    },
    districtSimplifiedGrantRequestLimit() {
      const cap = this.store.loggedInUsersDistrict.district_details.ddfCapes
        .dsgCap as number;
      const fraction = this.store.loggedInUsersDistrict.district_details
        .ddfCapes.dsgFraction as number;
      let limit: number = 0;
      let total: number = 0;
      this.store.loggedInUsersDistrict.district_details.ddfCalculation.forEach(
        (ele) => {
          this.dsgProject.extra_descriptions.fundingSourceArray.forEach(
            (el) => {
              if (el.sourceName === ele) {
                total = total + parseFloat(el.amount.toString());
              }
            }
          );
        }
      );
      if (total < parseFloat(cap.toString())) {
        limit = total * parseFloat(fraction.toString());
      } else {
        limit = parseFloat(cap.toString());
      }
      return parseFloat(limit.toFixed(2));
    },
  },
});
</script>

<style scoped lang="scss">
@import "@/assets/syles.scss";
.print_format {
  h2,
  h3 {
    font-size: 1.5rem;
    font-weight: 600;
  }
}
.t_head {
  height: 50px;
  th {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
</style>
