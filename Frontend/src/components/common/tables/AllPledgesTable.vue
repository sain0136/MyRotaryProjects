<template>
  <div
    class="relative overflow-x-auto py-48 px-24 shadow-md sm:rounded-lg"
    v-if="allPledges.length != 0"
  >
    <h1 class="my-4 text-center font-bold" :class="tailwind.H1">
      Total Pledges Amount: {{ formatter(totalPledgesAmount) }}
    </h1>
    <table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
      <thead
        class="t_head text-s bg-primary-black uppercase text-primary-white"
      >
        <tr>
          <th>Amount</th>
          <th>Pledgee</th>
          <th>Email</th>
          <th>Phone</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="border-b bg-white"
          id="admin_info"
          v-for="pledge in allPledges"
          :key="pledge.email"
        >
          <th
            scope="row"
            class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
          >
            {{ formatter(pledge.pledge_amount) }}
          </th>
          <td class="px-6 py-4 text-primary-black">
            {{ pledge.firstname }} {{ pledge.lastname }}
          </td>
          <td class="px-6 py-4 text-primary-black">
            {{ pledge.email || "N/A" }}
          </td>
          <td class="px-6 py-4 text-primary-black">
            {{ pledge.phone || "N/A" }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div v-else>
    <p class="text-center font-bold text-gray-700">{{ message }}</p>
  </div>
</template>

<script lang="ts">
import { TAILWIND_COMMON_CLASSES } from "@/utils/frontend/interfaces/Frontend";
import type { Pledge } from "@/utils/shared/interfaces/ProjectsInterface";
import { defineComponent } from "vue";
export default defineComponent({
  name: "AllPledgesTable",
  components: {},
  props: {
    pledgesProp: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      tailwind: TAILWIND_COMMON_CLASSES,
      message: "No pledges found",
      allPledges: [] as Pledge[],
    };
  },
  watch: {},
  async created() {
    this.allPledges = this.pledgesProp as Pledge[];
  },
  methods: {
    formatter(amount: number) {
      const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      });
      return formatter.format(amount);
    },
  },
  computed: {
    totalPledgesAmount() {
      let total = 0;
      this.allPledges.forEach((pledge) => {
        total += pledge.pledge_amount;
      });
      return total;
    },
  },
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
