<template>
  <div class="container mb-8 min-w-full">
    <ExceptionModal
      v-if="serverException"
      :message="expectionObject.message"
      :stackTrace="expectionObject.stack"
      :toggleModel="true"
    />
    <Toast
      v-if="toast.display"
      :msg="toast.msg"
      :width="toast.width"
      :closeTimer="toast.closeTimer"
    />
    <div class="landing_header">
      <h1 class="header_h1">Our Projects</h1>
    </div>
    <h1 class="py-8 text-center text-2xl font-bold text-primary-black">
      {{ loadedProject.project_name }}
    </h1>

    <div class="card_details px-24 pb-24">
      <hr class="mt-2 h-px w-full border-0 bg-gray-500" />
      <div class="upper_box mt-4 flex justify-between">
        <div class="basic_info flex flex-col">
          <span>
            <strong>Project Code:</strong> {{ loadedProject.project_code }}
          </span>
          <span v-if="loadedProject.projectDetails?.districtClubData.clubName">
            <Strong> Rotary Club: </Strong>
            {{ loadedProject.projectDetails.districtClubData.clubName }}
          </span>
          <span
            v-if="loadedProject.projectDetails?.districtClubData.district_name"
          >
            <Strong> Rotary Distict: </Strong>
            {{ loadedProject.projectDetails.districtClubData.district_name }}
          </span>
          <span>
            <Strong> Project Type: </Strong> {{ loadedProject.grant_type }}
          </span>
          <span>
            <strong>Raised:</strong>
            {{
              currencyFormatterAnticipated(loadedProject.anticipated_funding)
            }}</span
          >
          <span
            ><strong>Goal: </strong>
            {{ currencyFormatterAnticipated(loadedProject.funding_goal) }}
          </span>
          <span
            ><strong>Estimated Completion: </strong
            >{{ loadedProject.completion_date }}</span
          >
          <span
            ><strong>Status: </strong>{{ loadedProject.project_status }}</span
          >
        </div>
        <div class="flex flex-col justify-end">
          <div
            v-if="
              loadedProject.anticipated_funding != loadedProject.funding_goal
            "
          >
            <RotaryButton
              label="Make A Pledge"
              :theme="buttonTheme"
              @click="redirectToPledgeForm()"
            />
          </div>
          <div class="fully" v-else>
            <h1 class="bg-primary-green py-2 px-4 font-bold text-primary-white">
              Fully Funded!
            </h1>
          </div>
        </div>
      </div>
      <hr class="my-8 h-px w-full border-0 bg-gray-500" />
      <div class="lower_box">
        <div class="text-primary-black">
          <h1 class="py-8 text-2xl font-bold text-primary-black">
            Description:
          </h1>
          <blockquote class="w-5/6 border-l-4 border-gray-400 py-2 px-4">
            {{ loadedProject.project_description }}
          </blockquote>
        </div>
        <div class="text mt-4">
          <blockquote>
            <ul>
              <li>
                <span class="text-xl font-bold text-primary-black"
                  >Region:</span
                >
                {{ loadedProject.region }}
              </li>
              <li class="mt-8">
                <span class="text-xl font-bold text-primary-black">
                  Country:
                </span>
                {{ loadedProject.country }}
              </li>
              <li class="mt-8">
                <span class="text-xl font-bold text-primary-black">
                  {{ headerFormatter("Rotary Areas of Focus:") }}
                </span>
                <ul class="mt-4 flex flex-col gap-4  p-4">
                  <li
                    v-for="area in areasOfFocus"
                    :key="area + 'area_focus'"
                    class="ml-4 flex gap-2 text-xl font-bold text-primary-black"
                  >
                    <font-awesome-icon
                      class="self-center"
                      icon="fa-solid fa-arrow-right"
                    />{{ area }}
                  </li>
                </ul>
              </li>
            </ul>
          </blockquote>
        </div>
        <hr class="mt-8 h-px w-full border-0 bg-gray-500" />

        <div class="faq_section mt-8 flex justify-between">
   

          <div class="content_column">
            <h1 class="mb-2 text-2xl font-bold text-primary-black">
              Our Pledge Process
            </h1>
            <ul class="faq_steps flex flex-col gap-2">
              <li class="flex gap-2">
                <font-awesome-icon icon="fa-solid fa-check" class="mt-1" />
                <span class="font-semibold">{{
                  headerFormatter(
                    "Log in a district or club memebr and make a pledge."
                  )
                }}</span>
              </li>
              <li class="flex gap-2">
                <font-awesome-icon icon="fa-solid fa-check" class="mt-1" />
                <span class="font-semibold">{{
                  headerFormatter(
                    "If you are not part of rotary you can still pledge."
                  )
                }}</span>
              </li>
              <li class="flex gap-2">
                <font-awesome-icon icon="fa-solid fa-check" class="mt-1" />
                <span class="font-semibold">{{
                  headerFormatter(
                    "Simply make a guest account and promise an amount."
                  )
                }}</span>
              </li>
              <li class="flex gap-2">
                <font-awesome-icon icon="fa-solid fa-check" class="mt-1" />
                <span class="font-semibold">{{
                  headerFormatter(
                    "When the project is Fully Funded and approved you will be contacted by the Projects's creators!"
                  )
                }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import ProjectsApi from "@/services/Projects";
import Utilities from "@/utils/frontend/classes/Utilities";
import {
  TAILWIND_COMMON_CLASSES,
  type IApiException,
  MyError,
} from "@/utils/frontend/interfaces/Frontend";
import type {
  IClubProject,
  IDmProject,
  IDsgProject,
} from "@/utils/shared/interfaces/ProjectsInterface";
import RotaryButton from "@/components/common/RotaryButton.vue";

import { defineComponent } from "vue";
import ResourceLists from "@/utils/frontend/classes/ResourceLists";
export default defineComponent({
  name: "CardDetails",
  components: {
    RotaryButton,
  },
  props: {
    project: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      areasOfFocus: [] as string[],
      loadedProject: {} as IDsgProject | IDmProject | IClubProject,
      tailwind: TAILWIND_COMMON_CLASSES,
      serverException: false,
      expectionObject: {} as IApiException,
      headerFormatter: Utilities.headerFormater,
      toast: {
        display: false,
        msg: "",
        width: "w-1/2",
        closeTimer: 4000,
      },
      buttonTheme:
        " py-2 px-4 font-medium text-primary-white  bg-primary-green text-primary-white hover:bg-primary-dark-green",
    };
  },
  watch: {},
  async created() {
    await this.loadProject();
  },
  methods: {
    async loadProject() {
      try {
        const projectId = this.$route.params.id as string;
        const response = await ProjectsApi.getProjectById(Number(projectId));
        if (!Utilities.isAnApiError(response)) {
          this.loadedProject = response as
            | IDsgProject
            | IDmProject
            | IClubProject;
          const conversion = ResourceLists.reverseTermConversionMap;
          for (const [key, value] of Object.entries(
            this.loadedProject.area_focus
          )) {
            if (value === true) {
              this.areasOfFocus.push(conversion().get(key) as string);
            }
          }
        } else
          throw new MyError(
            (response as IApiException).message,
            (response as IApiException).stack
          );
      } catch (error) {
        this.serverException = true;
        this.expectionObject = error as IApiException;
      }
    },
    redirectToPledgeForm() {
      this.$router.push({
        name: "PledgeForm",
        params: { id: this.loadedProject.project_id },
      });
    },
    currencyFormatterAnticipated(amount: number) {
      const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      });
      return formatter.format(amount);
    },
  },
  computed: {},
});
</script>

<style scoped lang="scss">
@import "@/assets/syles.scss";
span {
  font-size: 1rem;
  font-weight: 500;
}
blockquote {
  font-size: 1rem;
  font-weight: 500;
}
</style>
