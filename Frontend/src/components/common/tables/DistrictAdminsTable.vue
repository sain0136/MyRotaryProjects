<template>
  <div
    class="relative overflow-x-auto shadow-md sm:rounded-lg"
    v-if="admins.length !== 0"
    :key="keyProp"
  >
    <table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
      <thead class="text-s bg-primary-black uppercase text-primary-white">
        <tr>
          <th scope="col" class="px-6 py-3">Name</th>
          <th scope="col" class="px-6 py-3">Role</th>
          <th scope="col" class="px-6 py-3">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="border-b bg-white"
          id="admin_info"
          v-for="admin in admins"
          :key="admin.user_id"
        >
          <th
            scope="row"
            class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
          >
            {{ admin.fullName }}
          </th>
          <td class="px-6 py-4 text-primary-black">
            {{ admin.role[0] ? admin.role[0].district_role : "N/A" }}
          </td>
          <td class="px-6 py-4 text-primary-black">
            <div class="buttons_container2 flex gap-2">
              <button
                title="Edit Admin"
                class="crud_buttons hover:text-primary-c"
                @click="updateAdmin(admin)"
              >
                <font-awesome-icon
                  class="hover:text-primary-color"
                  icon="fa-solid fa-pen-to-square"
                />
              </button>
              <button
                title="Delete Admin"
                class="crud_buttons hover:text-primary-c"
                @click="
                  updateShowModal(true, admin.fullName, admin.user_id as number)
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

import {
  FORM_MODE_PROP,
  type UserPagination,
} from "@/utils/frontend/interfaces/Frontend";
import { defineComponent } from "vue";
import { ref } from "vue";
import type { defineEmits, SetupContext } from "vue";
import type IUser from "@/utils/shared/interfaces/UserInterface";
import { useRotaryStore } from "@/stores/rotaryStore";

export default defineComponent({
  name: "DistrictAdminsTable",
  // emits: ["update-refresh"],
  setup(emit, context: SetupContext) {
    const store = useRotaryStore();
    function updateShowModal(
      show: boolean,
      adminName: string,
      adminId: number
    ) {
      context.emit("update:showConfirmModal", {
        showConfirmModal: show,
        confirmModalMessage: `Are you sure you want to delete ${adminName} district admin?`,
        idTobeDeleted: adminId,
      });
    }
    return { updateShowModal, store };
  },
  components: {},
  props: {
    districtIdProp: Number,
    keyProp: Number,
  },
  data() {
    return {
      headerFormatter: Utilities.headerFormater,
      admins: [] as IUser[],
      payload: {
        current_page: 1,
        limit: 10,
        last_page: 1,
        total: 0,
      },
      formMode: FORM_MODE_PROP,
      message: "Choose a district from the dropdown",
    };
  },
  watch: {
    keyProp: {
      async handler() {
        await this.getAllAdmins();
      },
    },
    districtIdProp: {
      async handler() {
        await this.getAllAdmins();
      },
    },
  },
  async created() {},
  methods: {
    updateAdmin(admin: IUser) {
      this.store.setUserFormProps({
        formModeProp: "UPDATE",
        userIdProp: admin.user_id,
        userCreationTypeProp: "DISTRICT_ADMIN",
      });
      this.$router.push({
        name: "SiteAdminUserForm",
      });
    },
    alterpayload(pageAction: number) {
      this.payload.current_page = this.payload.current_page + pageAction;
      this.getAllAdmins();
    },
    async getAllAdmins() {
      try {
        let response = await DistrictsApi.allDistrictAdmins(
          this.districtIdProp as number,
          this.payload.current_page,
          this.payload.limit
        );
        if (
          !Utilities.isAnApiError(response) &&
          (response as UserPagination).data.length > 0
        ) {
          this.admins = (response as UserPagination).data;
          this.payload.total = (response as UserPagination).meta.total;
          this.payload.last_page = (response as UserPagination).meta.last_page;
        } else {
          this.admins = [];
          this.message = "No district admins found";
        }
      } catch (error) {
        //   this.serverException = true;
        //   this.expectionObject = error as IApiException;
      }
    },
  },
  computed: {},
});
</script>

<style scoped lang="scss">
@import "@/assets/syles.scss";
</style>
