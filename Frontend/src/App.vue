<template>
  <n-message-provider>
  <n-notification-provider placement="top-right">
    <router-view />
  </n-notification-provider>
</n-message-provider>

</template>

<script lang="ts">
import { RouterView } from "vue-router";
import { useRotaryStore } from "@/stores/rotaryStore";
import { onMounted } from "vue";
import AssetsApi from "./services/Assets";
import type { MainAssets } from "./utils/frontend/interfaces/Frontend";

export default {
  name: "App",
  components: {
    RouterView,
  },
  setup() {
    const store = useRotaryStore();

    onMounted(async () => {
      try {
        // check that string for main url contains static part of the file name
        if (store.$state.mainLogoUrl === "") {
          const response = await AssetsApi.getMainAssets();
          const imgUrl = new URL("./serve-logo", import.meta.url).href;
          let logo = (response as MainAssets).assets.main_logo.url
            ? (response as MainAssets).assets.main_logo.url
            : imgUrl;
          store.$state.mainLogoUrl = logo;
        }
      } catch (error) {
        console.log(error);
      }
    });
  },
};
</script>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }

}
</style>