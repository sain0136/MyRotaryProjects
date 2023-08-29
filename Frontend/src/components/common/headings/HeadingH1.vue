<script lang="ts">
export default {
  name: "HeadingH1",
};
</script>

<script setup lang="ts">
import { reactive, computed } from "vue";

// Props
const props = defineProps<{
  headerText: string;
  subHeaderText?: string;
  capitalize?: boolean;
  headerTailwindClasses?: string;
  subHeaderTailwindClasses?: string;
}>();
// Computed
const headerTextCapCase = computed(() => {
  return props.headerText.toUpperCase();
});
</script>

<template>
  <div>
    <h1
      v-if="headerText"
      :class="headerTailwindClasses"
      class="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-4xl lg:text-5xl"
    >
      {{ capitalize ? headerTextCapCase : headerText }}
    </h1>
    <p
      v-if="subHeaderText"
      :class="subHeaderTailwindClasses"
      class="mb-6 text-lg font-normal text-gray-500 dark:text-gray-400 sm:px-16 lg:text-xl xl:px-48"
    >
      {{ subHeaderText }}
    </p>
  </div>
</template>

<style scoped></style>
