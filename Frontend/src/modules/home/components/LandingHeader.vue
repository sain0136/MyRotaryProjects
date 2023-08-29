<template>
  <header
    class="landing_header header-type-one top-0 w-full border-b-2 bg-white"
  >
    <!--Header Top-->
    <div class="header_top bg-primary-color py-4">
      <div class="auto_container px-0 sm:flex md:px-64">
        <div
          class="flex w-full flex-col justify-between gap-4 md:flex md:flex-row md:justify-between"
        >
          <div class="top-left">
            <ul class="flex justify-center">
              <li class="flex text-primary-white">
                <font-awesome-icon
                  icon="fa-solid fa-envelope"
                  class="mr-2 cursor-pointer text-xl hover:text-2xl"
                />
                <span class="icon fa fa-envelope mr-1">{{
                  mainAssets?.assets?.contentManagement?.myRotaryEmail || ""
                }}</span>
              </li>
            </ul>
          </div>
          <div class="top-right flex items-center justify-center">
            <ul class="social-icon-one flex gap-4">
              <li class="li_border">
                <a href="https://www.facebook.com/rotary">
                  <font-awesome-icon
                    class="text-2xl hover:text-3xl hover:text-white"
                    icon="fa-brands fa-facebook" />
                  <span class="fab fa-facebook"></span
                ></a>
              </li>
              <li class="li_border">
                <a
                  href="https://twitter.com/Rotary?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor"
                >
                  <font-awesome-icon
                    class="text-2xl hover:text-3xl hover:text-white"
                    icon="fa-brands fa-twitter" />
                  <span class="fab fa-twitter"></span
                ></a>
              </li>
              <li class="li_border">
                <a href="https://www.instagram.com/rotaryinternational/?hl=en">
                  <font-awesome-icon
                    class="text-2xl hover:text-3xl hover:text-white"
                    icon="fa-brands fa-instagram" />
                  <span class="fab fa-twitter"></span
                ></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!--End Header Top-->
    <!-- Nav Bar -->

    <nav
      class="rounded border-gray-200 bg-primary-white px-2 py-2.5 dark:bg-gray-900 sm:px-4"
    >
      <div
        class="sm:none container mx-auto flex flex-wrap items-center justify-center"
      >
        <div href="" class="contents items-center">
          <img
            :src="logo"
            class="mr-3 hidden max-w-[50%] sm:max-w-[10%] md:block"
            alt="rotary-logo"
          />
        </div>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          class="ml-3 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 md:hidden"
          aria-controls="navbar-default"
          aria-expanded="false"
          @click="toggleMenu()"
        >
          <span class="sr-only">Open main menu</span>
          <svg
            class="h-6 w-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
        <div
          class="w-full md:block md:w-auto"
          :class="revealMenu"
          id="navbar-default"
        >
          <ul
            class="mt-4 flex flex-col rounded-lg border border-gray-100 bg-primary-white p-4 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-primary-white md:text-sm md:font-medium md:hover:bg-transparent"
          >
            <li>
              <router-link
                :to="{ path: '/' }"
                class="block rounded py-2 pl-3 pr-4 text-lg font-medium text-primary-black hover:text-primary-color"
              >
                Home
              </router-link>
            </li>
            <li v-if="store.$state.isSiteAdminLoggedIn">
              <router-link
                :to="{ name: 'AdminHome' }"
                id="admin_portal"
                class="block rounded py-2 pl-3 pr-4 text-lg font-medium text-primary-black hover:text-primary-color"
              >
                Admin Portal
              </router-link>
            </li>
            <li>
              <router-link
                :to="{ name: 'AboutUs' }"
                class="block rounded py-2 pl-3 pr-4 text-lg font-medium text-primary-black hover:text-primary-color"
              >
                About
              </router-link>
            </li>
            <li>
              <router-link
                :to="{ name: 'ContactUs' }"
                class="block rounded py-2 pl-3 pr-4 text-lg font-medium text-primary-black hover:text-primary-color"
              >
                Contact Us
              </router-link>
            </li>
            <li>
              <router-link
                :to="{ name: 'Stats' }"
                class="block rounded py-2 pl-3 pr-4 text-lg font-medium text-primary-black hover:text-primary-color"
              >
                Stats
              </router-link>
            </li>
            <li>
              <router-link
                v-if="!isUserLoggedIn"
                :to="{ name: 'UserLogin' }"
                class="block rounded py-2 pl-3 pr-4 text-lg font-medium text-primary-black hover:text-primary-color"
              >
                Sign In
              </router-link>
              <a
                v-else
                @click="signOut()"
                class="block cursor-pointer rounded py-2 pl-3 pr-4 text-lg font-medium text-primary-black hover:text-primary-color"
                >Sign Out</a
              >
            </li>
            <li v-if="isUserLoggedIn">
              <button
                id="dropdownNavbarLink"
                data-dropdown-toggle="dropdownNavbar"
                class="flex w-full items-center justify-between py-2 pl-3 pr-4 text-lg font-medium text-primary-black hover:text-primary-color"
                @click="toggleAdminDropdown()"
              >
                Admin
                <font-awesome-icon
                  icon="fa-solid fa-angle-down"
                  class="ml-1 mt-1"
                />
              </button>
              <div
                id="dropdownNavbar"
                class="z-10 bg-primary-gray"
                :class="revealAdminDropdown"
                @click="toggleAdminDropdown()"
              >
                <ul class="whitespace-nowrap text-sm">
                  <li>
                    <router-link
                      :to="{ name: 'MyProfile' }"
                      class="block py-2 pl-3 pr-1 text-lg font-medium text-primary-black hover:bg-primary-color"
                    >
                      My Profile
                    </router-link>
                  </li>
                  <li v-if="store.$state.isDistrictAdminLoggedIn">
                    <router-link
                      :to="{ name: 'DistrictSettings' }"
                      @click="setDisrictForm()"
                      class="block py-2 pl-3 pr-1 text-lg font-medium text-primary-black hover:bg-primary-color"
                    >
                      District Settings
                    </router-link>
                  </li>
                  <li v-if="store.$state.isDistrictAdminLoggedIn">
                    <router-link
                      :to="{ name: 'DistrictAdminClubs' }"
                      class="block py-2 pl-3 pr-1 text-lg font-medium text-primary-black hover:bg-primary-color"
                    >
                      Add/Edit Clubs
                    </router-link>
                  </li>
                  <li
                    v-if="
                      store.$state.isClubAdminLoggedIn ||
                      store.$state.isSiteAdminLoggedIn
                    "
                  >
                    <router-link
                      :to="{ name: 'ClubSettings' }"
                      class="block py-2 pl-3 pr-1 text-lg font-medium text-primary-black hover:bg-primary-color"
                    >
                      My Club Settings
                    </router-link>
                  </li>
                  <li>
                    <router-link
                      :to="{ name: 'MyProjects' }"
                      class="block py-2 pl-3 pr-1 text-lg font-medium text-primary-black hover:bg-primary-color"
                    >
                      Create/Edit My Projects
                    </router-link>
                  </li>
                  <li
                    v-if="
                      store.$state.isDistrictAdminLoggedIn ||
                      store.$state.isSiteAdminLoggedIn
                    "
                  >
                    <router-link
                      :to="{ name: 'DistrictProjects' }"
                      class="block py-2 pl-3 pr-1 text-lg font-medium text-primary-black hover:bg-primary-color"
                    >
                      View/Edit District Projects
                    </router-link>
                  </li>
                  <li v-if="store.$state.isClubAdminLoggedIn">
                    <router-link
                      :to="{ name: 'ClubProjects' }"
                      class="block py-2 pl-3 pr-1 text-lg font-medium text-primary-black hover:bg-primary-color"
                    >
                      Edit Clubs Projects
                    </router-link>
                  </li>
                  <li>
                    <router-link
                      v-if="
                        store.$state.loggedInUserData.role[0].district_role ===
                          'District Admin' ||
                        store.$state.loggedInUserData.role[0].district_role ===
                          'District Grants Chair'
                      "
                      :to="{ name: 'ProjectApprovals' }"
                      class="block py-2 pl-3 pr-1 text-lg font-medium text-primary-black hover:bg-primary-color"
                    >
                      Project Approvals
                    </router-link>
                  </li>
                  <li>
                    <router-link
                      v-if="
                        store.$state.loggedInUserData.role[0].district_role ===
                          'District Admin' ||
                        store.$state.loggedInUserData.role[0].district_role ===
                          'District Grants Chair' ||
                        store.$state.loggedInUserData.role[0].district_role ===
                          'District Foundations Chair' ||
                        store.$state.loggedInUserData.role[0].district_role ===
                          'District International Chair'
                      "
                      :to="{ name: 'ReportApprovals' }"
                      class="block py-2 pl-3 pr-1 text-lg font-medium text-primary-black hover:bg-primary-color"
                    >
                      Report Approvals
                    </router-link>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script lang="ts">
import AssetsApi from "@/services/Assets";
import { useRotaryStore } from "@/stores/rotaryStore";
import toastController from "@/utils/composables/toastController";
import type { MainAssets } from "@/utils/frontend/interfaces/Frontend";
import { useNotification } from "naive-ui";
import { defineComponent } from "vue";
export default defineComponent({
  name: "LandingHeader",
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
      revealAdminDropdown: "hidden",
      revealMenu: "hidden",
      logo: "",
      mainAssets: {} as MainAssets,
    };
  },
  watch: {},
  async created() {
    await this.getAssets();
    this.getLogo();
  },
  methods: {
    async getAssets() {
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
    },
    async getLogo() {
      this.logo = this.store.$state.mainLogoUrl ?? "";
    },
    setDisrictForm() {
      this.store.setDistrictFormProps({
        formModeProp: "UPDATE",
        districtIdProp: this.store.$state.loggedInUserData.districtId,
        districtSettingsView: true,
      });
    },
    async signOut() {
      await this.store.signOut();
      this.$router.push("/");
    },
    toggleAdminDropdown() {
      if (this.revealAdminDropdown == "hidden") {
        this.revealAdminDropdown = "";
      } else {
        this.revealAdminDropdown = "hidden";
      }
    },
    toggleMenu() {
      if (this.revealMenu == "hidden") {
        this.revealMenu = "";
      } else {
        this.revealMenu = "hidden";
      }
    },
  },
  computed: {
    isUserLoggedIn() {
      const state = this.store.$state;
      return (
        state.isClubUserLoggedIn ||
        state.isClubAdminLoggedIn ||
        state.isDistrictAdminLoggedIn ||
        state.isSiteAdminLoggedIn
      );
    },
  },
});
</script>

<style scoped lang="scss">
@import "@/assets/syles.scss";
#dropdownNavbar {
  position: absolute;
  inset: 0px auto auto 0px;
  margin: 0px;
  transform: translate(-64px, 54px);
}

@keyframes highlight {
  from {
    font-size: 1.125rem;
    color: $nearBlack;
  }
  to {
    font-size: 1.175rem;
    color: $primaryColor;
  }
}

#admin_portal {
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  animation-name: highlight;
}
</style>
