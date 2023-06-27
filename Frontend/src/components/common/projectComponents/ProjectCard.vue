<template>
  <div class="project_card">
    <div class="max-w-sm border-gray-200 bg-white shadow">
      <div class="h-1/2 cursor-pointer" @click="foward()">
        <img
          v-if="!projectLoaded.image_link.url"
          class="w-full cursor-pointer object-cover"
          :src="pictureArray[randomPictureSelector]"
          alt=""
        />
        <img v-else :src="projectLoaded.image_link.url" alt="Cover" />
      </div>
      <div class="p-5">
        <a @click="foward()">
          <h5
            id="projectName"
            class="mb-2 cursor-pointer text-2xl font-bold tracking-tight text-gray-900 hover:text-primary-color sm:text-base"
          >
            {{ projectLoaded.project_name }}
          </h5>
        </a>
        <p class="desc overflow-hidden font-normal text-gray-700">
          {{ truncatedDesc }}
        </p>
        <div class="status mt-4 flex gap-4">
          <h3 class="mb-5 text-lg font-bold text-primary-green">Status:</h3>
          <h3 class="mb-5 text-lg font-bold text-primary-black">
            {{ projectLoaded.project_status }}
          </h3>
        </div>
      </div>

      <div class="status_bar p-5">
        <div
          class="donate_bar wow fadeIn animated"
          data-wow-delay="0ms"
          data-wow-duration="0ms"
        >
          <div class="bar_inner">
            <div
              class="bar"
              :style="{
                width: percentage + '%',
              }"
            >
              <div class="count_box counted">
                <span class="count-text" data-speed="2000" data-stop="82">{{
                  percentage
                }}</span
                >%
              </div>
            </div>
          </div>
        </div>
        <div class="causes_info flex flex-col">
          <span class="flex justify-between gap-4">
            <strong class=" ">Raised:</strong>
            {{
              currencyFormatterFunding(projectLoaded.anticipated_funding)
            }}</span
          >
          <span class="flex justify-between gap-4 text-primary-color"
            ><strong class="">Goal:</strong
            >{{ currencyFormatterFunding(projectLoaded.funding_goal) }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import ResourceLists from "@/utils/frontend/classes/ResourceLists";
import type {
  IClubProject,
  IDmProject,
  IDsgProject,
} from "@/utils/shared/interfaces/ProjectsInterface";
import { defineComponent } from "vue";
export default defineComponent({
  name: "ProjectCard",
  components: {},
  props: {
    default: {
      type: String,
      default: "",
    },
    project: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      randomPictureSelector: 1,
      truncatedDesc: "",
      pictureArray: [] as string[],
      projectId: 0,
      percentage: 0,
      projectLoaded: {} as IDmProject | IDsgProject | IClubProject,
      imageLinkFound: false,
    };
  },
  watch: {},
  async created() {
    this.setupCard();
  },
  methods: {
    escapeHTML(unsafe: string) {
      // write a string find or function below if the string contains any of the following characters patterns: ))) or (((
      if (unsafe.includes(")))") || unsafe.includes("(((")) {
        return ResourceLists.unsafeTextReplacement;
      }
      return unsafe;
    },
    async setupCard() {
      this.projectLoaded = this.project as
        | IDmProject
        | IDsgProject
        | IClubProject;

      this.pictureArray = [];
      for (let index = 1; index < 25; index++) {
        this.pictureArray.push("/sample-cause" + index + ".jpg");
      }
      // Shuffle the array using the Fisher-Yates algorithm
      for (let i = this.pictureArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.pictureArray[i], this.pictureArray[j]] = [
          this.pictureArray[j],
          this.pictureArray[i],
        ];
      }
      this.randomPictureSelector =
        (this.randomPictureSelector + 1) % this.pictureArray.length;
      this.truncatedDesc = this.escapeHTML(
        this.projectLoaded.project_description.slice(0, 150) + "..."
      );
      console.log(this.truncatedDesc);
      this.percentage = Math.trunc(
        (this.projectLoaded.anticipated_funding /
          this.projectLoaded.funding_goal) *
          100
      );
      if (this.projectLoaded.image_link) {
        this.imageLinkFound = true;
      }
    },
    currencyFormatterFunding(amount: number) {
      const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      });
      return formatter.format(amount);
    },
    foward() {
      this.$router.push({
        name: "CardDetails",
        params: { id: this.projectLoaded.project_id },
      });
    },
  },
  computed: {},
});
</script>

<style scoped lang="scss">
@import "@/assets/syles.scss";
.desc {
  line-height: 1.2em;
  max-height: 6em;
  overflow: hidden;
}
img {
  aspect-ratio: 1/0.7;
  image-rendering: smooth;
}
.status_bar {
  flex: 1 1 0;

  .causes_info {
    color: #b1b1b1;
    font-size: 1rem;
    font-weight: 700;
    text-transform: uppercase;
    white-space: nowrap;
  }

  .causes_info strong {
    color: #000000;
    font-weight: 700;
  }

  .causes_info span {
    font-weight: 700;
  }
  .theme_color {
    color: #ffb607;
  }

  .donate_bar {
    position: relative;
    width: 100%;
    margin-bottom: 1rem;
    visibility: visible;
    animation-duration: 0ms;
    animation-delay: 0ms;
    animation-name: fadeIn;
  }

  .bar_inner {
    position: relative;
    width: 100%;
    height: 10px;
    background: #f1f1f1;
  }

  .bar {
    left: -1px;
    position: absolute;
    // left: -100%;
    top: -1px;
    height: 11px;
    background: #ffb607;
    -webkit-transition: all 2000ms ease;
    -ms-transition: all 2000ms ease;
    -o-transition: all 2000ms ease;
    -moz-transition: all 2000ms ease;
    transition: all 2000ms ease;
  }

  .count_box {
    position: absolute;
    right: -1rem;
    top: -15px;
    width: 35px;
    height: 35px;
    color: #000000;
    font-size: 0.8rem;
    font-weight: 600;
    line-height: 30px;
    text-align: center;
    border-radius: 50%;
    background: #ffffff;
    border: 2px solid #ffb607;
    font-family: "Lato", sans-serif;
  }
}

#projectName{

}
</style>
