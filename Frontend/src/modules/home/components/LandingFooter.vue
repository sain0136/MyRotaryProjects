<template>
  <footer class="bg-gray-800 text-primary-white flex-grow-0 mt-auto ">
    <div class="container mx-auto px-6 py-10">
      <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div class="col-span-1 flex flex-col">
          <div class="logo-box">
            <a href="#"
              ><img class="w-1/2 object-contain" :src="logo" alt=""
            /></a>
          </div>
          <div class="text mt-4">
            Lorem ipsum dolor sit amet, vix an natu tur eleifend, mel amet
            laorit menandri. Ei item justo complectitur duo.
          </div>
          <ul class="social-icon-two mt-4 flex justify-evenly">
            <li>
              <a href="https://www.facebook.com/rotary">
                <font-awesome-icon
                  class="text-3xl hover:text-primary-color"
                  icon="fa-brands fa-facebook" />
                <span class="fab fa-facebook"></span
              ></a>
            </li>
            <li>
              <a
                href="https://twitter.com/Rotary?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor"
              >
                <font-awesome-icon
                  class="text-3xl hover:text-primary-color"
                  icon="fa-brands fa-twitter" />
                <span class="fab fa-twitter"></span
              ></a>
            </li>
            <li>
              <a href="https://www.instagram.com/rotaryinternational/?hl=en">
                <font-awesome-icon
                  class="text-3xl hover:text-primary-color"
                  icon="fa-brands fa-instagram" />
                <span class="fab fa-twitter"></span
              ></a>
            </li>
          </ul>
        </div>
        <div class="col-span-1 flex flex-wrap">
          <h2 class=" basis-full text-lg">Quick Links</h2>
          <ul class="list mb-4 flex basis-1/2 flex-col gap-2">
            <li class="cursor-pointer hover:text-primary-color">
              <font-awesome-icon
                icon="fa-solid fa-angle-right"
                class="mr-2"
              /><a href="#">About us</a>
            </li>
            <li class="cursor-pointer hover:text-primary-color">
              <font-awesome-icon
                icon="fa-solid fa-angle-right"
                class="mr-2"
              /><a href="#">Recent projects</a>
            </li>
            <li class="cursor-pointer hover:text-primary-color">
              <font-awesome-icon
                icon="fa-solid fa-angle-right"
                class="mr-2"
              /><a href="#">Our Mission</a>
            </li>
            <li class="cursor-pointer hover:text-primary-color">
              <font-awesome-icon
                icon="fa-solid fa-angle-right"
                class="mr-2"
              /><a href="#">FAQ’s</a>
            </li>
            <li class="cursor-pointer hover:text-primary-color">
              <font-awesome-icon
                icon="fa-solid fa-angle-right"
                class="mr-2"
              /><a href="#">Privacy &amp; plicy</a>
            </li>
          </ul>
          <ul class="list flex basis-1/2 flex-col gap-2">
            <li class="cursor-pointer hover:text-primary-color">
              <font-awesome-icon
                icon="fa-solid fa-angle-right"
                class="mr-2"
              /><a href="#">Help center</a>
            </li>
            <li class="cursor-pointer hover:text-primary-color">
              <font-awesome-icon
                icon="fa-solid fa-angle-right"
                class="mr-2"
              /><a href="#">Android App</a>
            </li>
            <li class="cursor-pointer hover:text-primary-color">
              <font-awesome-icon
                icon="fa-solid fa-angle-right"
                class="mr-2"
              /><a href="#">Internships</a>
            </li>
            <li class="cursor-pointer hover:text-primary-color">
              <font-awesome-icon
                icon="fa-solid fa-angle-right"
                class="mr-2"
              /><a href="#">Press</a>
            </li>
          </ul>
        </div>

        <div class="col-span-1 flex flex-col">
          <h2 class="mb-4 text-lg">Our Address</h2>
          <ul class="list-style-one flex gap-4">
            <font-awesome-icon
              icon="fa-solid fa-location-dot "
              class="mt-1 text-2xl text-primary-color"
            />
            <li class="flex flex-col gap-2">
              <span class="icon flaticon-location-pin"> 239 Pitt Street</span>
              <span>Cornwall , Ontario</span>
              <span> Canada K6H 5R8</span>
            </li>
          </ul>
          <span class=""
            ><font-awesome-icon
              icon="fa-solid fa-phone"
              class="mt-4 mr-2 text-2xl text-primary-color"
            />+1 613 330 5497</span
          >

          <span class="mt-auto flex"
            ><font-awesome-icon
              icon="fa-solid fa-envelope"
              class="mr-4 cursor-pointer text-2xl text-primary-color"
            />MyRotaryProjects@gmail.com</span
          >
        </div>
      </div>
      <div
        class="mt-8 flex flex-col items-center justify-between border-t border-gray-700 py-4 md:flex-row"
      >
        <div class="text-sm">
          &copy;
          {{ headerFormatter("2023 All Rights Reserved MyRotaryProjects") }}
        </div>
        <ul class="footer-nav mt-4 flex md:mt-0">
          <li><a href="#" class="mx-3 hover:text-white">Home</a></li>
          <li><a href="#" class="mx-3 hover:text-white">Contact Us</a></li>
          <li><a href="#" class="mx-3 hover:text-white">FAQ's</a></li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import AssetsApi from "@/services/Assets";
import Utilities from "@/utils/frontend/classes/Utilities";
import type {
  MainAssets,
  IApiException,
} from "@/utils/frontend/interfaces/Frontend";
import { defineComponent } from "vue";
export default defineComponent({
  name: "LandingFooter",
  components: {},
  props: {
    title: {
      type: String,
      default: "Hello World",
    },
  },
  data() {
    return {
      headerFormatter: Utilities.headerFormater,
      logo: "",
      serverException: false,
      expectionObject: {} as IApiException,
    };
  },
  watch: {},
  async created() {
    try {
      const response = await AssetsApi.getMainAssets();
      const imgUrl = new URL("./serve-logo", import.meta.url).href;
      this.logo = (response as MainAssets).assets.main_logo.url
        ? (response as MainAssets).assets.main_logo.url
        : imgUrl;
    } catch (error) {
      this.serverException = true;
      this.expectionObject = error as IApiException;
    }
  },
  methods: {},
  computed: {},
});
</script>

<style scoped lang="scss"></style>
