<template>
  <footer class="mt-auto flex-grow-0 bg-gray-800 text-primary-white">
    <div class="container mx-auto px-6 py-10">
      <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div class="col-span-1 flex flex-col">
          <div class="logo-box">
            <a href="#"
              ><img class="w-1/2 object-contain" :src="logo" alt=""
            /></a>
          </div>
          <div class="text mt-4">
            {{
              mainAssets?.assets?.contentManagement
                ?.myRotaryfooterDescription || ""
            }}
          </div>
          <ul class="social-icon-two mt-4 flex justify-evenly">
            <li>
              <a
                href="https://www.facebook.com/rotary"
                title="Rotary International Facebook"
              >
                <font-awesome-icon
                  class="text-3xl hover:text-primary-color"
                  icon="fa-brands fa-facebook" />
                <span class="fab fa-facebook"></span
              ></a>
            </li>
            <li>
              <a
                title="Rotary International Twitter"
                href="https://twitter.com/Rotary?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor"
              >
                <font-awesome-icon
                  class="text-3xl hover:text-primary-color"
                  icon="fa-brands fa-twitter" />
                <span class="fab fa-twitter"></span
              ></a>
            </li>
            <li>
              <a
                title="Rotary International Instagram"
                href="https://www.instagram.com/rotaryinternational/?hl=en"
              >
                <font-awesome-icon
                  class="text-3xl hover:text-primary-color"
                  icon="fa-brands fa-instagram" />
                <span class="fab fa-twitter"></span
              ></a>
            </li>
          </ul>
        </div>
        <div class="col-span-1 flex flex-wrap"></div>
        <div class="col-span-1 flex flex-col items-end">
          <h2 class="mb-4 text-center text-lg">Contact</h2>
          <ul class="list-style-one flex gap-4">
            <li class="flex flex-col items-end gap-2">
              <span class="icon flaticon-location-pin">
                <font-awesome-icon
                  icon="fa-solid fa-location-dot "
                  class="mt-1 mr-4 text-2xl text-primary-color"
                />{{
                  mainAssets?.assets?.contentManagement?.myRotaryAddress || ""
                }}</span
              >
              <span
                >{{ mainAssets?.assets?.contentManagement?.myRotaryCity || "" }}
                ,
                {{
                  mainAssets?.assets?.contentManagement?.myRotaryProvince || ""
                }}</span
              >
              <span>
                {{
                  mainAssets?.assets?.contentManagement?.myRotaryCountry || ""
                }}
                {{
                  mainAssets?.assets?.contentManagement?.myRotaryPostalCode ||
                  ""
                }}</span
              >
            </li>
          </ul>
          <span class=""
            ><font-awesome-icon
              icon="fa-solid fa-phone"
              class="mt-4 mr-2 text-2xl text-primary-color"
            />{{
              mainAssets?.assets?.contentManagement?.myRotaryPhone || ""
            }}</span
          >

          <span class="mt-auto flex"
            ><font-awesome-icon
              @click="
                () => {
                  mailTo(mainAssets?.assets?.contentManagement?.myRotaryEmail);
                }
              "
              title="Send Email"
              icon="fa-solid fa-envelope"
              class="mr-4 cursor-pointer text-2xl text-primary-color"
            />{{ mainAssets?.assets?.contentManagement?.myRotaryEmail || "" }}
          </span>
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
          <li>
            <a
              href="#"
              @click="
                () => {
                  $router.push({ name: 'LandingApp' });
                }
              "
              class="mx-3 hover:text-white"
              >Home</a
            >
          </li>
          <li>
            <a
              href="#"
              @click="
                () => {
                  $router.push({ name: 'ContactUs' });
                }
              "
              class="mx-3 hover:text-white"
              >Contact Us</a
            >
          </li>
          <!-- <li><a href="#" class="mx-3 hover:text-white">FAQ's</a></li> -->
        </ul>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import AssetsApi from "@/services/Assets";
import { useRotaryStore } from "@/stores/rotaryStore";
import ResourceLists from "@/utils/frontend/classes/ResourceLists";
import Utilities from "@/utils/frontend/classes/Utilities";
import type {
  MainAssets,
  IApiException,
} from "@/utils/frontend/interfaces/Frontend";
import { defineComponent } from "vue";
import toastController from "@/utils/composables/toastController";
import { useNotification, type NotificationType } from "naive-ui";

export default defineComponent({
  name: "LandingFooter",
  setup() {
    const store = useRotaryStore();
    const notification = useNotification();

    return { store, notification };
  },
  components: {},
  props: {
    title: {
      type: String,
      default: "Hello World",
    },
  },
  data() {
    return {
      siteValues: ResourceLists.siteValues,
      headerFormatter: Utilities.headerFormater,
      logo: "",
      serverException: false,
      expectionObject: {} as IApiException,
      mainAssets: {} as MainAssets,
    };
  },
  watch: {},
  async created() {
    try {
      this.mainAssets = (await AssetsApi.getMainAssets()) as MainAssets;
    } catch (error) {
      let er = error as Error;
      console.error(er.message);
      const useToast = toastController(
        this.notification,
        "error",
        "Error",
        er.message
      );
      useToast();
    }
    this.logo = this.store.$state.mainLogoUrl ?? "";
  },
  methods: {
    mailTo(email: string) {
      window.open(`mailto:${email}`);
    },
  },
  computed: {},
});
</script>

<style scoped lang="scss"></style>
