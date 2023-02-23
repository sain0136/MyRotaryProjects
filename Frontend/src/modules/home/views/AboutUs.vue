<template>
  <div class="container  min-w-full gap-8 " :class="tailwind.DIVCOL">
    <div class="landing_header w-full">
      <h1 class="header_h1">About Us</h1>
    </div>
    <div class="container px-24 pb-24 gap-12" :class="tailwind.DIVCOL">
      <section class="about_section w-4/5">
        <div class="about_items flex flex-col items-center">
          <h1 class="py-8 text-4xl font-bold text-primary-black">
            Welcome to Rotary Projects
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem iusto
            incidunt eius quod perspiciatis dolorem velit aliquid, ea labore quo
            doloribus odit reprehenderit pariatur nisi dicta minus? Autem, fuga
            consequuntur.
          </p>
        </div>
        <hr class="my-8 h-px w-full border-0 bg-gray-500" />
        <div>
          <ul>
            <li class="mt-4">
              <Strong> MyRotaryProjects Administrator:</Strong>
              Peter Labelle
            </li>
          </ul>
        </div>
      </section>
      <section class="mission_section  lg:w-10/12">
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
                  Raise more money with our custom made solution. Unlimited
                  campai pages pledge giving, monthly giving.
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
                  Raise more money with our custom made solution. Unlimited
                  campai pages pledge giving, monthly giving.
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
                  Raise more money with our custom made solution. Unlimited
                  campai pages pledge giving, monthly giving.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { TAILWIND_COMMON_CLASSES } from "@/utils/frontend/interfaces/Frontend";
import { defineComponent } from "vue";
export default defineComponent({
  name: "AboutUs",
  components: {},
  props: {},
  data() {
    return {
      tailwind: TAILWIND_COMMON_CLASSES,
    };
  },
  watch: {},
  async created() {},
  methods: {},
  computed: {},
});
</script>

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
