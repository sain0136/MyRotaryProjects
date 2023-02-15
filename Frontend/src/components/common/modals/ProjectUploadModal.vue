<template>
  <!-- Main modal -->
  <div
    id="defaultModal"
    tabindex="-1"
    aria-hidden="true"
    class="fixed top-0 left-0 right-0 z-50 hidden h-modal w-full overflow-y-auto overflow-x-hidden p-4 md:inset-0 md:h-full"
  >
    <div class="relative h-full w-full max-w-2xl md:h-auto">
      <!-- Modal content -->
      <div class="relative rounded-lg bg-white shadow">
        <!-- Modal header -->
        <div class="flex items-start justify-between rounded-t border-b p-4">
          <h3 class="text-xl font-semibold text-gray-900">Terms of Service</h3>
        </div>
        <!-- Modal body -->
        <div class="space-y-6 p-6">
          <p></p>
          <p></p>
        </div>
        <!-- Modal footer -->
        <div
          class="flex items-center space-x-2 rounded-b border-t border-gray-200 p-6"
        >
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "ProjectUploadModal",
  components: {},
  props: {},
  data() {
    return {};
  },
  watch: {},
  async created() {},
  methods: {},
  computed: {},
});
</script>

<style scoped lang="scss"></style>
