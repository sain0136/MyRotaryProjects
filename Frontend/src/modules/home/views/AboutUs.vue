<script lang="ts">
export default {
  name: "AboutUs",
};
</script>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import ResourceLists from "@/utils/frontend/classes/ResourceLists";
import {
  TAILWIND_COMMON_CLASSES,
  type MainAssets,
} from "@/utils/frontend/interfaces/Frontend";
import toastController from "@/utils/composables/toastController";
import { useNotification, type NotificationType } from "naive-ui";
import AssetsApi from "@/services/Assets";
// Data
const tailwind = ref(TAILWIND_COMMON_CLASSES);
const resources = ref(ResourceLists);
const notification = useNotification();
let mainAssets = ref<MainAssets | null>(null);

onMounted(async () => {
  try {
    mainAssets.value = (await AssetsApi.getMainAssets()) as MainAssets;
  } catch (error) {
    let er = error as Error;
    console.error(er.message);
    const useToast = toastController(
      notification,
      "error",
      "Error",
      er.message
    );
    useToast();
  }
});
</script>

<template>
  <div class="container min-w-full gap-8" :class="tailwind.DIVCOL">
    <div class="landing_header w-full">
      <h1 class="header_h1">About Us</h1>
    </div>
    <div class="container gap-12 px-24 pb-24" :class="tailwind.DIVCOL">
      <section class="about_section w-4/5">
        <div class="about_items flex flex-col items-center">
          <h1 class="py-8 text-4xl font-bold text-primary-black">
            Welcome to Rotary Projects
          </h1>
          <p>
            {{ mainAssets?.assets.contentManagement.myRotaryAbout || "" }}
          </p>
        </div>
        <hr class="my-8 h-px w-full border-0 bg-gray-500" />
        <div>
          <ul>
            <li class="mt-4">
              <Strong> MyRotaryProjects Administrator:</Strong>
              {{
                mainAssets?.assets.contentManagement.myRotaryAdminFullName || ""
              }}
            </li>
            <li>
              <Strong>Email:</Strong>
              {{
                mainAssets?.assets.contentManagement.myRotaryAdminEmail || ""
              }}
            </li>
          </ul>
        </div>
      </section>
      <section class="mission_section lg:w-10/12">
        <div class="inner_container border border-gray-300">
          <div class="row flex flex-col gap-4 md:flex-row md:gap-0">
            <div class="services">
              <div class="inner_box border border-gray-300 p-8">
                <div class="block_number">01</div>
                <h1 class="-mt-8 text-lg font-medium">Our History</h1>
                <div class="title whitespace-nowrap font-semibold">
                  Work Since 1987 with Pride
                </div>
                <div
                  class="text mt-4 box-border italic text-primary-gray antialiased"
                >
                  For over 30 years, we have been helping organizations raise
                  money with pride. Our custom-made solution provides unlimited
                  campaign pages, pledge giving options, and monthly giving.
                  With our expertise, we have helped numerous organizations
                  reach their fundraising goals and continue to support their
                  efforts to make a positive impact in the world.
                </div>
              </div>
            </div>
            <div class="services">
              <div class="inner_box border border-gray-300 p-8">
                <div class="block_number">02</div>
                <h1 class="-mt-8 text-lg font-medium">Our Mission</h1>
                <div class="title whitespace-nowrap font-semibold">
                  Mission to make smile the world
                </div>
                <div
                  class="text mt-4 box-border italic text-primary-gray antialiased"
                >
                  At our core, we believe in making the world a better place by
                  bringing smiles to people's faces. Our mission is to help
                  organizations raise more money with our custom-made solution,
                  providing unlimited campaign pages, pledge giving options, and
                  monthly giving. By enabling our clients to achieve their
                  fundraising goals, we can support their efforts to make a
                  difference and bring joy to those in need.
                </div>
              </div>
            </div>
            <div class="services">
              <div class="inner_box border border-gray-300 p-8">
                <div class="block_number">03</div>
                <h1 class="-mt-8 text-lg font-medium">Large Community</h1>
                <div class="title whitespace-nowrap font-semibold">
                  Join our community & help others
                </div>
                <div
                  class="text mt-4 box-border italic text-primary-gray antialiased"
                >
                  Join our community and help make a difference in the world.
                  Our custom-made solution provides unlimited campaign pages,
                  pledge giving options, and monthly giving. By joining forces
                  with our community, we can support each other's fundraising
                  efforts and have a greater impact on those in need. With our
                  large community, we provide a supportive and collaborative
                  environment to help organizations achieve their fundraising
                  goals and make a positive change in the world.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/syles.scss";
.inner_box {
  height: 100%;
  width: 100%;
}
.block_number {
  font-weight: 700;
  font-size: 4rem;
  line-height: 1em;
  color: rgba(0, 0, 0, 0.07);
}
</style>
