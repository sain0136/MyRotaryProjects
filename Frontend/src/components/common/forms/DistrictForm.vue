<template>
  <h1>Test</h1>
  <!-- <div class="container mt-8 min-w-full gap-8" :class="tailwind.DIVCOL">
    <div class="container" :class="tailwind.DIVCOL">
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
      <ConfirmModal
        v-if="showConfirmModal.showConfirmModal"
        :modelValue="confirmNavigation"
        :question="showConfirmModal.confirmModalMessage"
      />
      <h1 class="text-center font-bold" :class="tailwind.H1">
        {{
          store.$state.districtFormProps.formModeProp === formMode.CREATE
            ? "Create a new District"
            : "Update District"
        }}
      </h1>
      <hr class="mt-2 h-px w-full border-0 bg-gray-500" />
      <form @submit.prevent="" class="flex w-2/4 flex-col p-8">
        <BaseInputsText label="First Name" v-model="district.district_name" />
        <BaseInputsText
          v-model="district.district_president"
          label="District Governer"
        />
        <BaseInputsTextEmail v-model="district.district_email" label="Email " />
        <BaseTextArea
          v-model="district.district_description"
          label="Description"
        />
        <h1 class="text-center font-bold" :class="tailwind.H1">
          Upload Forms <span>*Choose a form type to upload</span>
        </h1>

        <BaseSelect
          label="Project Report Forms"
          v-model="currentFormChoice"
          :options="formTypesList"
        />
        <div v-if="district" class="my-4 flex justify-center">
          <input
            accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.pdf,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            type="file"
            @change="handleFileChange($event)"
            class="report_file"
          />
        </div>
        <div class="my-4 flex justify-center">
          <RotaryButton label="Submit" />
        </div>
        <table v-if="district.district_details.reportLinks.length > 0"
          class="w-full text-left text-sm text-gray-500 dark:text-gray-400"
        >
          <thead class="text-s bg-primary-black uppercase text-primary-white">
            <tr>
              <th scope="col" class="px-6 py-3">FileType</th>
              <th scope="col" class="px-6 py-3">Link</th>
              <th scope="col" class="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody class="tb_r">
            <tr
              class="border-b"
              id="district_info"
              v-for="district in allDistricts"
              :key="district.district_id"
            >
              <th
                scope="row"
                class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
              >
                {{ district.district_number }}
              </th>
              <td class="px-6 py-4 text-primary-black">
                {{ district.district_name }}
              </td>
              <td class="px-6 py-4 text-primary-black">
                <div class="buttons_container2 flex gap-2">
                  <button
                    title="Edit District"
                    class="crud_buttons hover:text-primary-c"
                    @click="
                      () => {
                        store.setCurrentProps({
                          formModeProp: formMode.EDIT,
                          districtIdProp: district.district_id,
                        });
                        $router.push({
                          name: 'SiteAdminDistrictForm',
                        });
                      }
                    "
                  >
                    <font-awesome-icon
                      class="hover:text-primary-color"
                      icon="fa-solid fa-pen-to-square"
                    />
                  </button>
                  <button
                    title="Delete District"
                    class="crud_buttons hover:text-primary-c"
                    @click="
                      updateShowModal(
                        true,
                        district.district_name,
                        district.district_id
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
        <h1 class="text-center font-bold" :class="tailwind.H1"></h1>
        <h1 class="text-center font-bold" :class="tailwind.H1"></h1>
        <h1 class="text-center font-bold" :class="tailwind.H1"></h1>
      </form>
    </div>
  </div> -->
</template>

<script lang="ts">
import {
  TAILWIND_COMMON_CLASSES,
  type IApiException,
  FORM_MODE_PROP,
} from "@/utils/frontend/interfaces/Frontend";
import { defineComponent, ref } from "vue";
import RotaryButton from "@/components/common/RotaryButton.vue";
import BaseFileUpload from "@/components/common/baseformComponents/BaseFileUpload.vue";
import BaseSelect from "@/components/common/baseformComponents/BaseSelect.vue";
import BaseCheckBox from "@/components/common/baseformComponents/BaseCheckBox.vue";
import BaseInputsText from "@/components/common/baseformComponents/BaseInputsText.vue";
import BaseInputsTextEmail from "@/components/common/baseformComponents/BaseInputsTextEmail.vue";
import BaseTextArea from "@/components/common/baseformComponents/BaseTextArea.vue";
import useVuelidate from "@vuelidate/core";
import ConfirmModal from "@/components/common/../common/modals/ConfirmModal.vue";
import ExceptionModal from "@/components/common/modals/ExceptionModal.vue";
import Toast from "@/components/common/toast/Toast.vue";
import DistrictObject from "@/utils/shared/classes/DistrictObject";
import { useRotaryStore } from "@/stores/rotaryStore";
export default defineComponent({
  beforeRouteLeave(next: any) {
    if (this.allowedToLeaveForm) {
      next(true);
      return;
    }
    (this.showConfirmModal as any) = {
      showConfirmModal: true,
      confirmModalMessage:
        "Are you sure you want to leave form with subitting?",
      idTobeDeleted: 0,
    };
  },
  name: "DistrictForm",
  components: {
    RotaryButton,
    BaseFileUpload,
    BaseSelect,
    BaseCheckBox,
    BaseInputsText,
    BaseTextArea,
    ConfirmModal,
    ExceptionModal,
    Toast,
    BaseInputsTextEmail,
  },
  props: {},
  setup() {
    const store = useRotaryStore();
    const showConfirmModal = ref({
      showConfirmModal: false,
      confirmModalMessage: "",
      idTobeDeleted: 0,
    });
    function updateShowModal(newValue: any) {
      showConfirmModal.value = newValue;
    }
    const v$ = useVuelidate();
    return {
      showConfirmModal,
      updateShowModal,
      v$,
      store,
    };
  },
  data() {
    return {
      file: null,
      currentFormChoice: "",
      formTypesList: [
        "",
        "Dsg English",
        "Dsg French",
        "DM English",
        "DM French",
      ],
      formMode: FORM_MODE_PROP,
      district: new DistrictObject(),
      tailwind: TAILWIND_COMMON_CLASSES,
      serverException: false,
      expectionObject: {} as IApiException,
      confirmNavigation: null as any,
      toast: {
        display: false,
        msg: "",
        width: "w-1/2",
        closeTimer: 4000,
      },
      allowedToLeaveForm: false,
    };
  },
  watch: {
    confirmNavigation: {
      async handler(newValue: any) {
        if (newValue) {
          this.allowedToLeaveForm = true;
          this.$router.go(-1);
        }
      },
      immediate: true,
    },
  },
  async created() {
    if (
      this.store.$state.districtFormProps.formModeProp === this.formMode.EDIT
    ) {
    }
  },
  methods: {
    resetSet() {
      (this.showConfirmModal as any) = {
        showConfirmModal: false,
        confirmModalMessage: "",
        idTobeDeleted: 0,
      };
    },
    async handleFileChange(event: Event): Promise<void> {
      const target = event.target as HTMLInputElement;
      const files = target.files;
      if (!files || !files[0]) return;
      let file = files[0] as any;
      file = files[0] as any;
      this.file = file;
    },
  },
  computed: {},
});
</script>

<style scoped lang="scss"></style>
