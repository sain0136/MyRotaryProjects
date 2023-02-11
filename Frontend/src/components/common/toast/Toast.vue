<template>
  <div
    v-if="display"
    id="toast-default"
    class="fade_enter_active absolute top-5 right-5 z-10 mt-8 flex max-w-xs items-center rounded-lg bg-primary-color p-4 text-gray-500 shadow dark:bg-gray-800 dark:text-gray-400"
    :class="width"
    role="alert"
  >
    <div class="ml-3 mr-4 text-base font-bold text-primary-black">
      {{ msg }} !
    </div>
    <button
      type="button"
      class="-mx-1.5 -my-1.5 ml-auto inline-flex h-8 w-8 rounded-lg bg-white p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-900 focus:ring-2 focus:ring-gray-300 dark:bg-gray-800 dark:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-white"
      data-dismiss-target="#toast-default"
      aria-label="Close"
    >
      <span class="sr-only">Close</span>
      <svg
        aria-hidden="true"
        class="h-5 w-5"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clip-rule="evenodd"
        ></path>
      </svg>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Toast",
  components: {},
  props: {
    msg: {
      type: String,
      default: "",
    },
    width: {
      type: String,
      default: "w-1/2" as string,
    },
    closeTimer: {
      type: Number,
      default: 4000 as number,
    },
  },
  data() {
    return {
      display: true,
    };
  },
  watch: {},
  async created() {
    setTimeout(() => {
      this.closeToast();
    }, this.closeTimer);
  },
  methods: {
    closeToast() {
     this.display = false;
    },
  },
  computed: {},
});
</script>

<style scoped lang="scss">
.fade_enter_active {
  animation: fade-in 1.5s;
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
