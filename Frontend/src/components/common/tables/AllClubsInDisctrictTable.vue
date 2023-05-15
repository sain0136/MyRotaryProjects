<template>
  <div
    id="all_clubs_in_district_table"
    class="relative overflow-x-auto shadow-md sm:rounded-lg"
    v-if="allClubs.length != 0"
  >
    <table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
      <thead class="text-s bg-primary-black uppercase text-primary-white">
        <tr>
          <th scope="col" class="px-6 py-3">
            Club Name
            <div class="question-mark">
              <font-awesome-icon
                class="ml-2 cursor-pointer text-primary-color"
                data-te-toggle="tooltip"
                data-te-placement="top"
                data-te-ripple-init
                data-te-ripple-color="light"
                title="Click a row to view and add club memebers"
                icon="fa-solid fa-question"
              />
            </div>
          </th>
          <th scope="col" class="px-6 py-3">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="border-b bg-white"
          id="admin_info"
          v-for="club in allClubs"
          :key="club.user_id"
          @click="viewClubMembers(club.club_id as number)"
        >
          <th
            id="table_header"
            scope="row"
            class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
          >
            {{ club.club_name }}
          </th>
          <td class="px-6 py-4 text-primary-black">
            <div class="buttons_container2 flex gap-2">
              <button
                v-if="!districtAdminIdViewProp"
                title="Edit Club"
                class="crud_buttons hover:text-primary-c"
                @click="updateClub(club.club_id as number)"
              >
                <font-awesome-icon
                  class="hover:text-primary-color"
                  icon="fa-solid fa-pen-to-square"
                />
              </button>
              <button
                v-else
                title="Edit Club"
                class="crud_buttons hover:text-primary-c"
                @click="updateClubAsDistrictAdmin(club.club_id as number)"
              >
                <font-awesome-icon
                  class="hover:text-primary-color"
                  icon="fa-solid fa-pen-to-square"
                />
              </button>
              <button
                title="Delete Club"
                class="crud_buttons hover:text-primary-c"
                @click="
                  updateShowModal(true, club.club_name, club.club_id as number)
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
    <p class="text-center font-bold text-gray-700">
      {{ headerFormatter(message) }}
    </p>
  </div>
</template>

<script lang="ts">
import DistrictsApi from "@/services/Districts";
import Utilities from "@/utils/frontend/classes/Utilities";

import type { ClubPagination } from "@/utils/frontend/interfaces/Frontend";
import { defineComponent } from "vue";
import { ref } from "vue";
import type { SetupContext } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import type { IClub } from "@/utils/shared/interfaces/ClubInterface";
import { useRotaryStore } from "@/stores/rotaryStore";

export default defineComponent({
  name: "AllClubsInDisctrictTable",
  setup(props, context: SetupContext) {
    function updateShowModal(show: boolean, clubName: string, clubId: number) {
      context.emit("update:showConfirmModal", {
        showConfirmModal: show,
        confirmModalMessage: `Are you sure you want to delete ${clubName} this club?`,
        idTobeDeleted: clubId,
      });
    }
    const store = useRotaryStore();
    const key = ref(0);
    return { key, updateShowModal, store };
  },
  components: {},
  emits: ["update:clubId"],
  props: {
    districtIdProp: Number,
    districtAdminIdViewProp: Number,
  },
  data() {
    return {
      headerFormatter: Utilities.headerFormater,
      allClubs: [] as IClub[],
      payload: {
        current_page: 1,
        limit: 5,
        last_page: 1,
        total: 0,
      },
      message: "Choose a district from the dropdown",
    };
  },
  watch: {
    districtIdProp: {
      async handler() {
        this.getAllClubsInDistrict();
      },
    },
  },
  async created() {
    if (this.districtAdminIdViewProp) {
      this.getAllClubsInDistrict(this.districtAdminIdViewProp || 0);
    } else {
      this.getAllClubsInDistrict(
        this.store.$state.loggedInUsersDistrict.district_id
      );
    }
  },
  methods: {
    alterpayload(pageAction: number) {
      this.payload.current_page = this.payload.current_page + pageAction;
      if (this.districtAdminIdViewProp) {
        this.getAllClubsInDistrict();
      } else {
        this.getAllClubsInDistrict(
          this.store.$state.loggedInUsersDistrict.district_id
        );
      }
    },
    async getAllClubsInDistrict(id?: number) {
      try {
        const districtId = id ? id : this.districtIdProp;
        let response = await DistrictsApi.getAllClubsInDistrictPagination(
          districtId as number,
          this.payload.current_page,
          this.payload.limit
        );
        if (
          !Utilities.isAnApiError(response) &&
          (response as ClubPagination).data.length > 0
        ) {
          this.allClubs = (response as ClubPagination).data;
          this.payload.total = (response as ClubPagination).meta.total;
          this.payload.last_page = (response as ClubPagination).meta.last_page;
        } else {
          this.allClubs = [];
          this.message = "No clubs found";
        }
      } catch (error) {
        //   this.serverException = true;
        //   this.expectionObject = error as IApiException;
      }
    },
    updateClub(clubId: number) {
      this.store.setClubFormProps({
        formModeProp: "UPDATE",
        clubIdProp: clubId,
      });
      this.$router.push({ name: "SiteAdminClubForm" });
    },
    updateClubAsDistrictAdmin(clubId: number) {
      this.store.setClubFormProps({
        formModeProp: "UPDATE",
        clubIdProp: clubId,
      });
      this.$router.push({ name: "DistrictAdminClubForm" });
    },
    async viewClubMembers(clubId: number) {
      this.$emit("update:clubId", clubId);
    },
  },
  computed: {},
});
</script>

<style scoped lang="scss">
@import "@/assets/syles.scss";

#all_clubs_in_district_table {
  min-width: 25%;
}

#admin_info {
  &:hover {
    cursor: pointer;
    background-color: #5cb85c !important;
  }
}
.question-mark {
  display: inline-block;
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.3);
  }
  100% {
    transform: scale(1);
  }
}

</style>
