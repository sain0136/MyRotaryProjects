<template>
  <div
    v-if="display"
    id="toast-default"
    class="fade_enter_active absolute top-5 right-5 z-10 mt-8 flex max-w-xs items-center rounded-lg bg-primary-color p-4 text-gray-500 shadow dark:bg-gray-800 dark:text-gray-400"
    :class="width"
    role="alert"
  >
    <div class="ml-3 mr-4 text-base font-bold text-primary-black ">
      {{ msg }}
    </div>

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
