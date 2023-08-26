<template>
    <div class="container mt-8 min-w-full gap-8" :class="tailwind.DIVCOL">
      <ExceptionModal
        v-if="serverException"
        :message="expectionObject.message"
        :stackTrace="expectionObject.stack"
        :toggleModel="true"
      />
      <ConfirmModal
        v-if="showConfirmModal.showConfirmModal"
        :modelValue="deleteConfirm"
        :question="showConfirmModal.confirmModalMessage"
        @update:modelValue="updateDeleteConfirm"
      />
      <Toast
        v-if="toast.display"
        :msg="toast.msg"
        :width="toast.width"
        :closeTimer="toast.closeTimer"
      />
      <section :class="tailwind.DIVCOL " class="my-8 gap-8">
        <h1 class="text-center" :class="tailwind.H1">
          {{ headerFormatter("Choose a District") }}
        </h1>
        <BaseSelect v-model="districtChosen" :options="districtNameList" />
        <h3 class="text-center font-bold" :class="tailwind.H3" v-if="districtId !== 0">
          *Click the edit button on a row to fully administer the club!
        </h3>
        <AllClubsInDisctrictTable
          :key="key"
          v-if="districtId !== 0"
          :districtIdProp="districtId"
          @update:showConfirmModal="updateShowModal"
          @update:clubId="updateClubId"
        />
        <!-- <RotaryButton
          v-if="clubId !== 0"
          label="Create New Member"
          @click="createNewClubMember()"
        />
        <AllClubMembersTable
          v-if="clubId !== 0"
          :clubIdProp="clubId"
          @update:showConfirmModal="updateShowModal"
          :key="clubId"
          tableViewProp="SITEADMIN"
        />
        <hr class="mt-2 h-px w-full border-0 bg-gray-500" />
        <h1 class="text-center" :class="tailwind.H1">
          {{ headerFormatter("Create a new club") }}
        </h1>
        <div class="button_wrapper">
          <RotaryButton label="Create" @click="createNewClub()" />
        </div> -->
      </section>
    </div>
  </template>
  
  <script setup lang="ts">
  import {
    TAILWIND_COMMON_CLASSES,
    type IApiException,
    type DistrictPagination,
  } from "@/utils/frontend/interfaces/Frontend";
  import { inject, ref } from "vue";
  import { useRouter } from 'vue-router';

  import AllClubMembersTable from "@/components/common/tables/AllClubMembersTable.vue";
  import BaseSelect from "@/components/common/baseformComponents/BaseSelect.vue";
  import RotaryButton from "@/components/common/RotaryButton.vue";
  import DistrictsApi from "@/services/Districts";
  import Utilities from "@/utils/frontend/classes/Utilities";
  import type IDistrict from "@/utils/shared/interfaces/DistrictInterface";
  import AllClubsInDisctrictTable from "@/components/common/tables/AllClubsInDisctrictTable.vue";
  import ConfirmModal from "@/components/common/modals/ConfirmModal.vue";
  import ExceptionModal from "@/components/common/modals/ExceptionModal.vue";
  import Toast from "@/components/common/toast/Toast.vue";
  import ClubsApi from "@/services/Club";
  import { useRotaryStore } from "@/stores/rotaryStore";
  import { onBeforeMount } from 'vue';

  const store = useRotaryStore();
  const showConfirmModal = ref({
    showConfirmModal: false,
    confirmModalMessage: "",
    idTobeDeleted: 0,
  });
  function updateShowModal(newValue: any) {
    showConfirmModal.value = newValue;
  }
  const clubId = ref(0);
  const updateClubId = (newValue: number) => {
    clubId.value = newValue;
  };
  
  const headerFormatter = Utilities.headerFormater;
  const tailwind = TAILWIND_COMMON_CLASSES;
  const serverException = ref(false);
  const expectionObject = ref({} as IApiException);
  const districtId = ref(0);
  const districtChosen = ref("");
  const districtNameList = ref([] as string[]);
  const districtMapChosenDistrictToID = ref(new Map<string, number>());
  const deleteConfirm = ref(null as any);
  const toast = ref({
    display: false,
    msg: "",
    width: "w-1/2",
    closeTimer: 4000,
  });
  const key = ref(0);
  const router = useRouter();
  
  onBeforeMount(async() => {
    try {
      const response = await DistrictsApi.paginationAllDistricts(1, 10);
      if (!Utilities.isAnApiError(response)) {
        if ((response as DistrictPagination).data.length >= 0) {
          (response as DistrictPagination).data.forEach((ele: IDistrict) => {
            districtNameList.value.push(ele.district_name);
            districtMapChosenDistrictToID.value.set(
              ele.district_name,
              ele.district_id
            );
          });
        }
      } else throw new Error("No districts found");
    } catch (error) {
      serverException.value = true;
      expectionObject.value = error as IApiException;
    }
  });
  
  function updateDeleteConfirm(value: boolean) {
    if (value) {
      deleteConfirm.value = value;
      deleteAdminConfirm();
    } else {
      deleteConfirm.value = value;
      resetSet();
    }
  }
  
  async function deleteAdminConfirm() {
    try {
      let response = await ClubsApi.deleteClub(showConfirmModal.value.idTobeDeleted);
      if (response === true) {
        resetSet();
      } else {
        resetSet();
        deleteConfirm.value = false;
        toast.value.display = true;
        toast.value.msg = "Cannot delete clubs with projects";
        setTimeout(() => {
          toast.value.display = false;
        }, 4000);
      }
    } catch (error) {
      serverException.value = true;
      expectionObject.value = error as IApiException;
    }
  }
  
  function createNewClub() {
    store.setClubFormProps({
      formModeProp: "CREATE",
    });
    router.push({ name: "SiteAdminClubForm" });
  }
  
  function resetSet() {
    key.value++;
    showConfirmModal.value = {
      showConfirmModal: false,
      confirmModalMessage: "",
      idTobeDeleted: 0,
    };
  }
  
  function createNewClubMember() {
    store.setUserFormProps({
      formModeProp: "CREATE",
      userCreationTypeProp: "CLUB_MEMBER",
      clubIdProp: clubId.value,
    });
    router.push({ name: "UserFormForSiteAdmin" });
  }
  </script>
  
  <script lang="ts">
  export default {
    name: "AdminClub",
  };

  </script>
  
  <style scoped lang="scss"></style>