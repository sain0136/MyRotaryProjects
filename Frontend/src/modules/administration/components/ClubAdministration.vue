<script lang="ts">
export default {
  name: "ClubAdministration",
};
</script>

<script setup lang="ts">
import { ref } from "vue";
import ProjectsTable from "@/components/common/tables/AllProjectsTable.vue";
import ClubForm from "@/components/common/forms/ClubForm.vue";
import RotaryButton from "@/components/common/RotaryButton.vue";
import AllClubMembersTable from "@/components/common/tables/AllClubMembersTable.vue";
import { useRouter } from "vue-router";
import { useRotaryStore } from "@/stores/rotaryStore";
import {
  TAILWIND_COMMON_CLASSES,
} from "@/utils/frontend/interfaces/Frontend";

// data
const expectionObject = ref({ message: "", stack: "" });
const showModal = ref(false);
const tabs = ref([
  { name: "club", label: "Club Settings" },
  { name: "members", label: "Members" },
  { name: "projects", label: "Projects" },
]);
const activeTab = ref("club");
const router = useRouter();
const store = useRotaryStore();
const tailwind = TAILWIND_COMMON_CLASSES;
const isProjectsOpen = ref(false);
// methods 
const createNewClubMember = () => {
  store.setUserFormProps({
    formModeProp: "CREATE",
    userCreationTypeProp: "CLUB_MEMBER",
    clubIdProp: store.clubFormProps.clubIdProp,
  });
  router.push({ name: "UserFormForSiteAdmin" });
};

const createNewProject = async(projectType: string)=> {
      switch (projectType) {
        case "DM":
          store.setDSGOrDMFormProps({
            formModeProp: "CREATE",
            isAdminOverrideClubIdProp: store.clubFormProps.clubIdProp,
          });
          router.push({
            name: "DistrictMatchingProjectForm",
          });
          break;
        case "DSG":
          store.setDSGOrDMFormProps({
            formModeProp: "CREATE",
            isAdminOverrideClubIdProp: store.clubFormProps.clubIdProp,
          });
          router.push({
            name: "DistrictSimplifiedProjectForm",
          });
          break;
        case "CLUB":
          store.setClubProjectFormProps({
            formModeProp: "CREATE",
            isAdminOverrideClubIdProp: store.clubFormProps.clubIdProp,
          });
          router.push({
            name: "ClubProjectFormLandingView",
          });
          break;
      }
    }
</script>

<template>
  <n-modal v-model:show="showModal">
    <ErrorModal
      title="Server Error"
      :message="expectionObject.message"
      :stackTrace="expectionObject.stack"
    />
  </n-modal>
  <ul
    class="flex flex-wrap justify-center border-b border-gray-200 text-center text-sm font-medium text-gray-500 dark:border-gray-700 dark:text-gray-400"
  >
    <li class="mr-2" v-for="tab in tabs" :key="tab.name">
      <a
        @click="activeTab = tab.name"
        class="inline-block cursor-pointer rounded-t-lg p-4 text-2xl hover:bg-gray-50 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300"
        :class="{
          ' active  bg-gray-100 text-primary-dark-color dark:bg-gray-800 dark:text-blue-500':
            tab.name === activeTab,
        }"
      >
        {{ tab.label }}
      </a>
    </li>
  </ul>
  <div class="base_container">
    <!-- Form Tab -->
    <div class="w-full" v-if="activeTab === 'club'">
      <ClubForm />
    </div>
    <!-- Members Tab -->
    <div
      class="flex w-full flex-col items-center gap-4"
      v-if="activeTab === 'members'"
    >
      <RotaryButton label="Create New Member" @click="createNewClubMember()" />
      <AllClubMembersTable
        :clubIdProp="store.clubFormProps.clubIdProp"
        tableViewProp="SITEADMIN"
      />
    </div>
    <!-- Projects Tab -->
    <div
      class="flex w-full flex-col items-center gap-4"
      v-if="activeTab === 'projects'"
    >
    <div class=" flex gap-2" >
      <RotaryButton
        label="Create Club Project"
        @click="createNewProject('CLUB')"
      />
      <RotaryButton
        label="Create Dsg Project"
        @click="createNewProject('DSG')"
      />
      <RotaryButton
        label="Create Dm Project"
        @click="createNewProject('DM')"
      />
      <RotaryButton label="Create Global Project" @click="" />
    </div>
      <h1 class="text-center" :class="tailwind.H1">Club Projects</h1>
      <ProjectsTable
      :findProjectsForClubProp="store.clubFormProps.clubIdProp"
      :siteAdminViewProp="true"
    />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/syles.scss";
</style>
