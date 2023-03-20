<template>
  <div class="container mt-8 min-w-full gap-8" :class="tailwind.DIVCOL">
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
    <div class="flex flex-col items-center gap-8">
      <h1 class="text-center font-bold" :class="tailwind.H1">
        Give User Access
      </h1>
      <BaseSelect :options="allClubMembersNameList" v-model="chosenUser" />
      <RotaryButton @click="addUserToProject()" label="Add User" />
      <table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
        <thead
          class="t_head text-s bg-primary-black uppercase text-primary-white"
        >
          <tr>
            <th class="text-center">Project Admins</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="border-b bg-white"
            id="admin_info"
            v-for="user in usersAllowed"
            :key="user"
          >
            <th
              scope="row"
              class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
            >
              Name: {{ user }}
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BaseSelect from "@/components/common/baseformComponents/BaseSelect.vue";
import ExceptionModal from "@/components/common/modals/ExceptionModal.vue";
import Toast from "@/components/common/toast/Toast.vue";
import RotaryButton from "@/components/common/RotaryButton.vue";
import {
  TAILWIND_COMMON_CLASSES,
  type IApiException,
  type UserPagination,
} from "@/utils/frontend/interfaces/Frontend";
import { useRotaryStore } from "@/stores/rotaryStore";
import ClubsApi from "@/services/Club";
import Utilities from "@/utils/frontend/classes/Utilities";
import type IUser from "@/utils/shared/interfaces/UserInterface";
import ProjectsApi from "@/services/Projects";

export default defineComponent({
  name: "AddUserProjectForm",
  setup() {
    const store = useRotaryStore();

    return { store };
  },
  components: {
    BaseSelect,
    RotaryButton,
    ExceptionModal,
    Toast,
  },
  props: {
    projectId: {
      type: Number,
      required: true,
    },
    projectAdminsProp: {
      type: Array<IUser>,
      required: true,
    },
  },
  data() {
    return {
      tailwind: TAILWIND_COMMON_CLASSES,
      serverException: false,
      expectionObject: {} as IApiException,
      toast: {
        display: false,
        msg: "",
        width: "w-1/2",
        closeTimer: 4000,
      },
      allClubMembersNameList: [] as string[],
      allClubMembers: [] as IUser[],
      usersAllowed: [] as string[],
      message: "",
      chosenUser: "",
    };
  },
  watch: {},
  async created() {
    this.usersAllowed = this.projectAdminsProp.map((user: IUser) => {
      return user.fullName;
    }) as string[];
    this.getAllClubMembers();
  },
  methods: {
    async getAllClubMembers() {
      try {
        const response = await ClubsApi.AllClubMembersPaginted(
          this.store.$state.loggedInUserData.club_id,
          1,
          1111111111
        );
        if (
          !Utilities.isAnApiError(response) &&
          (response as UserPagination).data.length > 0
        ) {
          this.allClubMembersNameList = (response as UserPagination).data
            .filter((member: IUser) => {
              return member.user_type === "CLUB";
            })
            .map((member: IUser) => {
              return member.fullName;
            });
          this.allClubMembers = (response as UserPagination).data.filter(
            (member: IUser) => {
              return member.user_type === "CLUB";
            }
          );
        } else {
          this.allClubMembersNameList = [];
          this.message = "No club members found";
        }
      } catch (error) {
        //   this.serverException = true;
        //   this.expectionObject = error as IApiException;
      }
    },
    async addUserToProject() {
      
      if (this.isUserAlreadyAdmin()) {
        return;
      }
      try {
        const memberID = this.allClubMembers.find((member: IUser) => {
          return member.fullName === this.chosenUser;
        })?.user_id;
        const response = await ProjectsApi.addProjectUser(
          this.projectId,
          memberID || 0
        );
        this.toast.display = true;
        setTimeout(() => {
          this.toast.display = false;
        }, 3000);
        if (!Utilities.isAnApiError(response) && response === true) {
          this.toast.msg = "User added successfully";
          this.usersAllowed.push(this.chosenUser);
          this.chosenUser = "";
        } else {
          this.toast.msg = "User not added. Contact admin";
        }
      } catch (error) {
        this.serverException = true;
        this.expectionObject = error as IApiException;
      }
    },
    isUserAlreadyAdmin() {
      if (this.usersAllowed.includes(this.chosenUser)) {
        this.toast.display = true;
        setTimeout(() => {
          this.toast.display = false;
        }, 3000);
        this.toast.msg = "User is already an admin";
        this.chosenUser = "";
        return true;
      }
      return false;
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
