<template>
  <div class="my-8 flex min-w-full flex-col items-center gap-16">
    <Toast
      v-if="toast.display"
      :msg="toast.msg"
      :width="toast.width"
      :closeTimer="toast.closeTimer"
    />
    <!-- Cover Image Upload -->
    <div
      class="flex h-1/2 w-1/3 max-w-md flex-col gap-2 rounded-lg border border-primary-color bg-primary-white p-4"
    >
      <div class="mb-4">
        <h1 class="my-2 text-center font-bold" :class="tailwind.H1">
          Upload Cover Image
        </h1>
        <input
          class="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400"
          id="file_input"
          type="file"
          @change="handleFileChange($event)"
          accept="image/*"
        />
      </div>
      <ErrorValidation
        v-if="v$.coverImage.$error"
        :errorMsg="v$.coverImage.$errors[0].$message"
      />
      <div class="flex justify-center gap-4">
        <RotaryButton @click="submit(false)" label="Submit" />
        <RotaryButton
          @click="clear()"
          label="Clear"
          data-modal-hide="popup-modal"
        />
      </div>
    </div>
    <!-- Downloaod Report -->
    <div
      v-if="project.grant_type !== 'Club Project'"
      class="flex flex-col gap-4 text-center font-bold"
    >
      <h1 class="my-2 text-center font-bold" :class="tailwind.H1">
        {{
          store.$state.loggedInUsersDistrict.district_details.reportLinks
            .length > 0
            ? "Download Your Districts Reports"
            : "No Reports Forms Contact Your Admin"
        }}
      </h1>
      <ul
        v-if="
          store.$state.loggedInUsersDistrict.district_details.reportLinks
            .length > 0
        "
      >
        <li
          v-for="report in store.$state.loggedInUsersDistrict.district_details
            .reportLinks"
          :key="report.id"
          class="flex justify-center gap-2"
        >
          <p class="font-bold">{{ report.extraLabel }} Report:</p>
          <a class="hover:text-primary-color" :href="report.url" target="_blank"
            >Click To Download</a
          >
        </li>
      </ul>
    </div>
    <!-- Report/Evidence Uploads -->

    <div class="uploads_DSG_DM" v-if="project.grant_type !== 'Club Project'">
      <div
        class="flex h-1/2 flex-col gap-2 rounded-lg border border-primary-color bg-primary-white p-4"
      >
        <h1 class="my-2 text-center font-bold" :class="tailwind.H1">
          Upload Evidence
        </h1>
        <span class="text-center">You can drag and drop</span>
        <input
          multiple
          class="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 p-16 text-sm text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400"
          id="file_input"
          type="file"
          @change="handleEvidenceFilesChange($event)"
          accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          ref="evidenceFiles"
        />
        <h1 class="my-2 text-center font-bold" :class="tailwind.H1">
          Upload Report Images
        </h1>
        <input
          multiple
          class="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 p-16 text-sm text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400"
          id="file_input"
          type="file"
          @change="handleReportImagesChange($event)"
          accept="image/*"
          ref="reportImages"
        />
        <h1 class="my-2 text-center font-bold" :class="tailwind.H1">
          Upload Files
        </h1>
        <input
          multiple
          class="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 p-16 text-sm text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400"
          id="file_input"
          type="file"
          @change="handleReportFilesChange($event)"
          accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.pdf,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          ref="reportFiles"
        />
        <ErrorValidation
          v-if="v$.atLeastUploadOne.$error"
          :errorMsg="v$.atLeastUploadOne.$errors[0].$message"
        />
        <div class="flex justify-center gap-4">
          <RotaryButton @click="submit(true)" label="Submit" />
          <RotaryButton
            @click="clear()"
            label="Clear"
            data-modal-hide="popup-modal"
          />
        </div>
      </div>
      <h1 class="my-2 text-center font-bold" :class="tailwind.H1">
        Evidence Files Table
      </h1>
      <table
        v-if="evidenceTable.length > 0"
        class="w-full text-left text-sm text-gray-500 dark:text-gray-400"
      >
        <thead
          class="t_head text-s bg-primary-black uppercase text-primary-white"
        >
          <tr>
            <th>File Type</th>
            <th>Url</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="border bg-white"
            v-for="(item, index) in evidenceTable"
            :key="index"
          >
            <th
              scope="row"
              class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
            >
              {{ getLinkType(item.url) }}
            </th>
            <td class="flex gap-1 px-6 py-4 text-primary-black">
              <a
                target="_blank"
                class="font-bold hover:text-primary-color"
                :href="item.url"
                >Link</a
              >
            </td>
            <td class="px-6 py-4 text-primary-black">
              <button
                title="Delete item"
                class="crud-buttons"
                @click="deleteFile(item)"
              >
                <font-awesome-icon
                  class="social-icon"
                  icon="trash-alt"
                ></font-awesome-icon>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <p class="text-center font-semibold" v-else>No Files</p>
      <h1 class="my-2 text-center font-bold" :class="tailwind.H1">
        Report Files Table
      </h1>
      <table
        v-if="reportTable.length > 0"
        class="w-full text-left text-sm text-gray-500 dark:text-gray-400"
      >
        <thead
          class="t_head text-s bg-primary-black uppercase text-primary-white"
        >
          <tr>
            <th>FileName</th>
            <th>File Type</th>
            <th>Url</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="border bg-white"
            v-for="(item, index) in reportTable"
            :key="index"
          >
            <td class="flex gap-1 px-6 py-4 font-bold text-primary-black">
              {{ normalizeFilename(item.fileType) }}
            </td>
            <th
              scope="row"
              class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
            >
              {{ getLinkType(item.url) }}
            </th>

            <td class="flex gap-1 px-6 py-4 text-primary-black">
              <a
                target="_blank"
                class="font-bold hover:text-primary-color"
                :href="item.url"
                >Link</a
              >
            </td>
            <td class="px-6 py-4 text-primary-black">
              <button
                title="Delete item"
                class="crud-buttons"
                @click="deleteFile(item)"
              >
                <font-awesome-icon
                  class="social-icon"
                  icon="trash-alt"
                ></font-awesome-icon>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <p class="text-center font-semibold" v-else>No Files</p>
      <div
        v-if="reportTable.length > 0"
        class="slideshow_container relative m-auto w-1/2"
      >
        <div class="fade">
          <img :src="gallaryActive.url" style="width: 100%" />
          <a class="prev" @click="changeSlides(-1)">&#10094;</a>
          <a class="next" @click="changeSlides(1)">&#10095;</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type { StorageInformation } from "@/utils/shared/interfaces/ProjectsInterface";
import RotaryButton from "@/components/common/RotaryButton.vue";
import ErrorValidation from "@/components/common/baseformComponents/ErrorValidation.vue";
import UploadsApi from "@/services/Uploads";
import {
  ErrorMessages,
  TAILWIND_COMMON_CLASSES,
  type IApiError,
} from "@/utils/frontend/interfaces/Frontend";
import type {
  IClubProject,
  IDmProject,
  IDsgProject,
} from "@/utils/shared/interfaces/ProjectsInterface";
import useVuelidate from "@vuelidate/core";
import { helpers, required } from "@vuelidate/validators";
import { defineComponent } from "vue";
import Utilities from "@/utils/frontend/classes/Utilities";
import Toast from "@/components/common/toast/Toast.vue";
import { useRotaryStore } from "@/stores/rotaryStore";
import { GrantType } from "@/utils/shared/interfaces/SharedInterface";
export default defineComponent({
  name: "UploadForm",
  setup() {
    const v$ = useVuelidate();
    const store = useRotaryStore();
    return {
      v$,
      store,
    };
  },
  components: {
    RotaryButton,
    ErrorValidation,
    Toast,
  },
  props: {
    projectProp: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      reportImagesForGallery: [] as Array<StorageInformation>,
      galleryIndex: 0,
      gallaryActive: {} as StorageInformation,
      submitted: false,
      atLeastUploadOne: "",
      toast: {
        display: false,
        msg: "",
        width: "w-1/2",
        closeTimer: 4000,
      },
      uploadResponse: "",
      tailwind: TAILWIND_COMMON_CLASSES,
      currentFormChoice: "",
      coverImage: null,
      evidenceFiles: [] as File[],
      reportImages: [] as File[],
      reportFiles: [] as File[],
      notCoverButton: false,
      project: this.projectProp as IDsgProject | IClubProject | IDmProject,
      evidenceTable: [] as Array<StorageInformation>,
      reportTable: [] as Array<StorageInformation>,
    };
  },
  validations() {
    return {
      coverImage: {
        required: helpers.withMessage(
          ErrorMessages.IMAGE_NOT_UPLOADED,
          (value: any) => {
            return value !== null || this.notCoverButton;
          }
        ),
      },
      atLeastUploadOne: {
        atLeastUploadOne: helpers.withMessage(
          ErrorMessages.NO_FILES_UPLOADED,
          () => {
            if (
              this.reportFiles.length < 1 &&
              this.reportImages.length < 1 &&
              this.evidenceFiles.length < 1 &&
              this.coverImage == null
            ) {
              return false;
            }
            return true;
          }
        ),
      },
    };
  },
  watch: {},
  async created() {
    this.setTables();
    this.reportImagesForGallery = this.reportTable.filter(
      (item) => item.fileType === "image_report"
    );
    this.gallaryActive = this.reportImagesForGallery[0];
  },
  methods: {
    changeSlides(n: number) {
      if (this.galleryIndex + n > this.reportImagesForGallery.length - 1) {
        this.galleryIndex = 0;
      } else if (this.galleryIndex + n < 0) {
        this.galleryIndex = this.reportImagesForGallery.length - 1;
      } else {
        this.galleryIndex += n;
      }
      this.gallaryActive = this.reportImagesForGallery[this.galleryIndex];
    },
    normalizeFilename(filename: string) {
      if (filename === "image_report") {
        return "Report Image";
      } else {
        return "Report File";
      }
    },
    setTables() {
      this.evidenceTable = this.project.file_uploads.evidence_files;
      this.reportTable = this.project.file_uploads.reports_files;
    },
    async deleteFile(fileToDelete: StorageInformation) {
      try {
        const response = await UploadsApi.deleteAnUpload(
          fileToDelete,
          this.project.project_id
        );
        if (!Utilities.isAnApiError(response)) {
          window.scrollTo(0, 0);
          this.toast.display = true;
          this.toast.msg = "File Deleted Successfully";
          setTimeout(() => {
            this.toast.display = false;
          }, 3000);
          this.clear();
          this.evidenceTable = (
            response as IDsgProject | IClubProject | IDmProject
          ).file_uploads.evidence_files;
          this.reportTable = (
            response as IDsgProject | IClubProject | IDmProject
          ).file_uploads.reports_files;
        } else {
          window.scrollTo(0, 0);
          this.toast.display = true;
          this.toast.msg = "Error Deleting File";
          setTimeout(() => {
            this.toast.display = false;
          }, 3000);
        }
      } catch (error) {
        alert(error);
      }
    },
    async handleFileChange(event: Event): Promise<void> {
      const target = event.target as HTMLInputElement;
      const files = target.files;
      if (!files || !files[0]) return;
      let file = files[0] as any;
      file = files[0] as any;
      this.coverImage = file;
    },
    async handleEvidenceFilesChange(event: Event): Promise<void> {
      const target = event.target as HTMLInputElement;
      const files = target.files;
      if (!files || !files[0]) return;
      let evidenceFiles = [] as File[];
      for (let index = 0; index < files.length; index++) {
        evidenceFiles[index] = files[index];
      }
      this.evidenceFiles = evidenceFiles;
    },
    async handleReportImagesChange(event: Event): Promise<void> {
      const target = event.target as HTMLInputElement;
      const files = target.files;
      if (!files || !files[0]) return;
      let reportImages = [] as File[];
      for (let index = 0; index < files.length; index++) {
        reportImages[index] = files[index];
      }
      this.reportImages = reportImages;
    },
    async handleReportFilesChange(event: Event): Promise<void> {
      const target = event.target as HTMLInputElement;
      const files = target.files;
      if (!files || !files[0]) return;
      let reportFiles = [] as File[];
      for (let index = 0; index < files.length; index++) {
        reportFiles[index] = files[index];
      }
      this.reportFiles = reportFiles;
    },
    async submit(notCoverButton: boolean): Promise<void> {
      if (notCoverButton) {
        this.notCoverButton = true;
      }
      await this.v$.$validate();
      if (this.v$.$error) return;
      try {
        this.v$.$reset();
        const response = await UploadsApi.fileUpload({
          image_cover: this.coverImage as unknown as File,
          file_evidence: this.evidenceFiles,
          file_report: this.reportFiles,
          image_report: this.reportImages,
          project_id: this.project.project_id,
        });
        if (typeof response === "object") {
          window.scrollTo(0, 0);
          this.toast.display = true;
          this.toast.msg = "Upload Successful";
          setTimeout(() => {
            this.toast.display = false;
          }, 3000);
          this.evidenceTable = (
            response as unknown as IDsgProject | IClubProject | IDmProject
          ).file_uploads?.evidence_files;
          this.reportTable = (
            response as unknown as IDsgProject | IClubProject | IDmProject
          ).file_uploads?.reports_files;
          this.clear();
        } else if (typeof response !== "boolean") {
          window.scrollTo(0, 0);
          this.toast.display = true;
          this.toast.msg = (response as IApiError).message;
          setTimeout(() => {
            this.toast.display = false;
          }, 3000);
          this.clear();
        }
      } catch (error: any) {
        this.toast.display = true;
          this.toast.msg = "Server Error Contact Admin";
        setTimeout(() => {
          this.toast.display = false;
        }, 4000);
      }
    },
    clear() {
      this.v$.$reset();
      this.v$.atLeastUploadOne.$reset();
      this.coverImage = null;
      this.evidenceFiles = [];
      this.reportFiles = [];
      this.reportImages = [];
      const fileInput = document.getElementById(
        "file_input"
      ) as HTMLInputElement;
      fileInput.value = "";
      if (this.project.grant_type !== GrantType.CLUBPROJECT) {
        (this.$refs.reportImages as HTMLInputElement).value = "";
        (this.$refs.reportFiles as HTMLInputElement).value = "";
        (this.$refs.evidenceFiles as HTMLInputElement).value = "";
      }
      this.notCoverButton = false;
    },
    getLinkType(str: string) {
      const regex =
        /\.jpg$|\.jpeg$|\.png$|\.gif$|\.bmp$|\.doc$|\.docx$|\.pdf$|\.txt$/i;
      const match = str.match(regex);
      if (match) {
        if (
          match[0] === ".jpg" ||
          match[0] === ".jpeg" ||
          match[0] === ".png"
        ) {
          return "Image";
        } else {
          if (match[0] === ".pdf") {
            return "PDF";
          } else if (match[0] === ".doc" || match[0] === ".docx") {
            return "Word ";
          } else if (match[0] === ".txt") {
            return "Text";
          }
          return "File";
        }
      } else {
        return "Filetype Unknown";
      }
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

.mySlides {
  display: none;
}
.prev,
.next {
  cursor: pointer;
  position: absolute;
  top: 50%;
  width: auto;
  margin-top: -22px;
  padding: 16px;
  color: white;
  font-weight: bold;
  font-size: 18px;
  transition: 0.6s ease;
  border-radius: 0 3px 3px 0;
  user-select: none;
}

.next {
  right: 0;
  border-radius: 3px 0 0 3px;
}

/* On hover, add a black background color with a little bit see-through */
.prev:hover,
.next:hover {
  background-color: rgba(0, 0, 0, 0.8);
}

/* Fading animation */
.fade {
  animation-name: fade;
  animation-duration: 1.5s;
}

@keyframes fade {
  from {
    opacity: 0.4;
  }
  to {
    opacity: 1;
  }
}
</style>
