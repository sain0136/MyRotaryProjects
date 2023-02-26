<template>
  <header
    class="landing_header header-type-one top-0 w-full border-b-2 bg-white"
  >
    <!--Header Top-->
    <div class="header_top bg-primary-color py-4">
      <div class="auto_container px-64">
        <div class="justify-between sm:flex-col md:flex md:flex-row">
          <div class="top-left">
            <ul class="flex justify-center">
              <li class="text-primary-white">
                <font-awesome-icon
                  icon="fa-solid fa-envelope"
                  class="mr-2 cursor-pointer text-xl hover:text-2xl"
                />
                <span class="icon fa fa-envelope mr-1"
                  >info@cornwallrotary.com</span
                >
              </li>
            </ul>
          </div>
          <div class="top-right flex items-center">
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
    <nav
      class="header_bottom rounded border-gray-200 bg-primary-white px-2 py-2.5 sm:px-4"
    >
      <div
        class="container mx-auto flex h-16 flex-wrap items-center justify-between"
      >
        <div class="mb-4 h-full">
          <img
            src="/rotaryTransparent.png"
            class="object-fit-cover mr-3 h-full"
            alt=""
          />
        </div>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          class="ml-3 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 md:hidden"
          aria-controls="navbar-default"
          aria-expanded="false"
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
        <div class="hidden w-full md:block md:w-auto" id="navbar-default">
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
                @click="toggleDropdown()"
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
                :class="revealDropdown"
                @click="toggleDropdown()"
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
                  <li
                    v-if="
                      store.$state.isClubAdminLoggedIn
                    "
                  >
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
import { useRotaryStore } from "@/stores/rotaryStore";
import { defineComponent } from "vue";
export default defineComponent({
  name: "LandingHeader",
  setup() {
    const store = useRotaryStore();
    return { store };
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
      revealDropdown: "hidden",
    };
  },
  watch: {},
  async created() {},
  methods: {
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
    toggleDropdown() {
      if (this.revealDropdown == "hidden") {
        this.revealDropdown = "";
      } else {
        this.revealDropdown = "hidden";
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

<style scoped lang="scss"></style>
