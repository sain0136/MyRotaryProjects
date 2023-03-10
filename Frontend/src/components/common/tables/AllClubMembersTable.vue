<template>
  <div
    id="all_club_members"
    class="relative overflow-x-auto shadow-md sm:rounded-lg"
    v-if="allClubMemebers.length != 0"
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
          v-for="clubMember in allClubMemebers"
          :key="clubMember.user_id"
        >
          <th
            scope="row"
            class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
          >
            {{ clubMember.fullName }}
          </th>
          <td
            class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
          >
            {{ clubMember.role[0].club_role }}
          </td>
          <td class="px-6 py-4 text-primary-black">
            <div class="buttons_container2 flex gap-2">
              <button
                title="Edit Member"
                class="crud_buttons hover:text-primary-c"
                @click="editClubMember(clubMember.user_id as number)"
              >
                <font-awesome-icon
                  class="hover:text-primary-color"
                  icon="fa-solid fa-pen-to-square"
                />
              </button>
              <button
                title="Delete Member"
                class="crud_buttons hover:text-primary-c"
                @click="
                  updateShowModal(
                    true,
                    clubMember.fullName,
                    clubMember.user_id as number
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
            allClubMemebers.length
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
import ClubsApi from "@/services/Club";
import { useRotaryStore } from "@/stores/rotaryStore";
import Utilities from "@/utils/frontend/classes/Utilities";
import type {
  IApiException,
  UserPagination,
} from "@/utils/frontend/interfaces/Frontend";
import type IUser from "@/utils/shared/interfaces/UserInterface";
import { defineComponent, type SetupContext } from "vue";
export default defineComponent({
  name: "AllClubMembersTable",
  setup(props, context: SetupContext) {
   const store = useRotaryStore()
    function updateShowModal(
      show: boolean,
      memberName: string,
      userId: number
    ) {
      context.emit("update:showConfirmModal", {
        showConfirmModal: show,
        confirmModalMessage: `Are you sure you want to delete member ${memberName}?`,
        idTobeDeleted: userId,
      });
    }
    return { updateShowModal, store };
  },
  components: {},
  props: {
    clubIdProp: Number,
  },
  data() {
    return {
      headerFormatter: Utilities.headerFormater,
      message: "",
      allClubMemebers: [] as UserPagination["data"],
      payload: {
        current_page: 1,
        limit: 10,
        last_page: 1,
        total: 0,
      },
      serverException: false,
      expectionObject: {} as IApiException,
    };
  },
  watch: {},
  async created() {
    this.getAllClubMemebers(this.clubIdProp || 0);
  },
  methods: {
    alterpayload(pageAction: number) {
      this.payload.current_page = this.payload.current_page + pageAction;
      this.getAllClubMemebers(this.clubIdProp || 0);
    },
    async getAllClubMemebers(clubId: number) {
      try {
        const response = await ClubsApi.AllClubMembersPaginted(
          clubId,
          this.payload.current_page,
          this.payload.limit
        );
        if (
          !Utilities.isAnApiError(response) &&
          (response as UserPagination).data.length > 0
        ) {
          this.allClubMemebers = (response as UserPagination).data.filter(
            (member: IUser) => {
              return member.user_type === "CLUB";
            }
          );
          this.payload.total = (response as UserPagination).meta.total;
          this.payload.last_page = (response as UserPagination).meta.last_page;
        } else {
          this.allClubMemebers = [];
          this.message = "No club members found";
        }
      } catch (error) {
        //   this.serverException = true;
        //   this.expectionObject = error as IApiException;
      }
    },
    editClubMember(memberId: number) {
      this.store.setUserFormProps({
        formModeProp: "UPDATE",
        userIdProp: memberId,
        userCreationTypeProp: "CLUB_MEMBER",
      });
      this.$router.push({ name: 'UserFormForAdmins'})
    },
  },
  computed: {},
});
</script>

<style scoped lang="scss"></style>
