<template>
  <nav
    class="border-gray-200 bg-primary-black p-3 dark:border-gray-700 dark:bg-gray-800"
  >
    <div class="flex w-full justify-center">
      <img
        src="/transparent-logo.png"
        class="mr-3 h-6 sm:h-10"
        alt="Rotary Logo"
      />
      <span
        class="self-center whitespace-nowrap text-xl font-semibold text-primary-white"
        >Admin Web Portal</span
      >
    </div>
    <hr class="my-2 h-px border-0 bg-gray-500" />
    <!-- <n-config-provider :theme-overrides="themeOverrides" :theme="darkTheme">
      <n-menu
        v-model:value="activeKey"
        mode="horizontal"
        :options="menuOptions"
      />
    </n-config-provider > -->

    <div class="container mx-auto flex flex-wrap items-center justify-center">
      <button
        data-collapse-toggle="navbar-solid-bg"
        type="button"
        class="ml-3 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:text-primary-color focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
        aria-controls="navbar-solid-bg"
        aria-expanded="false"
        id="triggerEl"
        @click="toggleNavBar()"
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
        :class="hidden"
        id="navbar-solid-bg"
      >
        <ul
          class="mt-4 flex flex-col flex-wrap justify-center rounded-lg bg-gray-50 dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-transparent md:text-sm md:font-medium"
        >
          <li>
            <router-link
              class="block rounded py-2 pl-3 pr-4 text-2xl font-bold text-gray-700 hover:text-primary-color md:bg-transparent md:p-0 md:text-primary-white"
              :to="{ name: 'AdminHome' }"
              >Settings</router-link
            >
          </li>
          <li>
            <router-link
              class="block rounded py-2 pl-3 pr-4 text-2xl font-bold text-gray-700 hover:text-primary-color md:bg-transparent md:p-0 md:text-primary-white"
              :to="{ path: '/' }"
              >Landing Page</router-link
            >
          </li>
          <li>
            <router-link
              class="block rounded py-2 pl-3 pr-4 text-2xl font-bold text-gray-700 hover:text-primary-color md:bg-transparent md:p-0 md:text-primary-white"
              :to="{ name: 'AllDistricts' }"
              >Districts</router-link
            >
          </li>
          <li>
            <router-link
              class="block rounded py-2 pl-3 pr-4 text-2xl font-bold text-gray-700 hover:text-primary-color md:bg-transparent md:p-0 md:text-primary-white"
              :to="{ name: 'DistrictAdmins' }"
              >Administrators</router-link
            >
          </li>
          <li>
            <router-link
              class="block rounded py-2 pl-3 pr-4 text-2xl font-bold text-gray-700 hover:text-primary-color md:bg-transparent md:p-0 md:text-primary-white"
              :to="{ name: 'ClubAdmin' }"
              >Clubs & Members</router-link
            >
          </li>
          <li>
            <router-link
              class="block rounded py-2 pl-3 pr-4 text-2xl font-bold text-gray-700 hover:text-primary-color md:bg-transparent md:p-0 md:text-primary-white"
              :to="{ name: 'AllProjects' }"
              >All Projects</router-link
            >
          </li>
          <li>
            <a
              id="last_nav_item"
              class="block cursor-pointer rounded py-2 pl-3 pr-4 text-2xl font-bold text-gray-700 hover:text-primary-color md:bg-transparent md:p-0 md:text-primary-white"
              @click="
                () => {
                  signOut();
                }
              "
              >Sign Out</a
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, ref, h } from "vue";
import type { MenuOption } from "naive-ui";
import { Collapse } from "flowbite";
import type { CollapseOptions } from "flowbite";
import { useRotaryStore } from "@/stores/rotaryStore";
import { RouterLink } from "vue-router";
import router from "@/router";
import { darkTheme } from "naive-ui";
import { NConfigProvider } from "naive-ui";

import type GlobalThemeOverrides from "naive-ui";
export default defineComponent({
  name: "AdminHeader",
  components: {},
  props: {
    at: {
      type: String,
      default: "top",
    },
  },
  setup() {
    const activeKey = ref<string | null>(null);
    const store = useRotaryStore();
    return { store, activeKey };
  },
  data() {
    return {
      collapse: {} as Collapse,
      hidden: "hidden",
    };
  },
  watch: {},
  async created() {
    const $targetEl: HTMLElement = document.getElementById(
      "targetEl"
    ) as HTMLElement;
    const $triggerEl: HTMLElement = document.getElementById(
      "triggerEl"
    ) as HTMLElement;
    const options: CollapseOptions = {
      onCollapse: () => {
        console.log("element has been collapsed");
      },
      onExpand: () => {
        console.log("element has been expanded");
      },
      onToggle: () => {
        console.log("element has been toggled");
      },
    };
    this.collapse = new Collapse($targetEl, $triggerEl, options);
  },
  methods: {
    toggleNavBar() {
      this.hidden = this.hidden === "hidden" ? "" : "hidden";
    },
    async signOut() {
      try {
        if (this.store.$state.isSiteAdminLoggedIn) {
          await this.store.signOut();
          this.$router.push("/admin-login");
        } else {
        }
      } catch (error) {
        alert(error);
      }
    },
  },
  computed: {},
});
</script>

<style scoped lang="scss">
li {
  white-space: nowrap;
}
</style>
