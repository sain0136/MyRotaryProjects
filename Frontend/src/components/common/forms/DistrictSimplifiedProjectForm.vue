<template>
    <div class="landing_header w-full">
      <h1 class="header2_h1">District Simplified Project Form</h1>
    </div>
    <div class="formtabs_container p-16">
    <ul class=" justify-center flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
      <li class="mr-2" v-for="tab in tabs" :key="tab.name">
        <a

          @click="activeTab = tab.name" 
          class=" cursor-pointer inline-block p-4 rounded-t-lg text-2xl hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"
          :class="{' text-primary-dark-color  bg-gray-100 active dark:bg-gray-800 dark:text-blue-500': tab.name === activeTab}"
        >
          {{ tab.label }}
        </a>
      </li>
    </ul>
    <div class="form_wrapper" v-if="activeTab === 'Form'">
      <button type="button" @click="handleClick1()">
        Press Me!
      </button>
    </div>
    <div v-else-if="activeTab === 'Uploads'">Uploads</div>
    <div v-else-if="activeTab === 'Pdf'">Pdf</div>
    <div v-else-if="activeTab === 'Pledges'">Pledges</div>
    <div v-else-if="activeTab === 'Share'">Share</div>
    <div v-else-if="activeTab === 'Add Users'">Add Users</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useNotification } from "naive-ui";
interface Data {
  notification: ReturnType<typeof useNotification> | null;
}
export default defineComponent({
  name: "DistrictSimplifiedProjectForm",
  components: { },
  props: {},
  setup() {
    const notification = useNotification();
    return {
      handleClick1() {
        let count = 4;
        notification.success({
          title: "Api response",
          content: `This is a notification with count ${count}`,
          duration: 3000,
          closable: false,
        });
      },
    };
  },
  data() {
    return {
      activeTab: 'Form',
      tabs: [
        { name: 'Form', label: 'Form' },
        { name: 'Uploads', label: 'Uploads' },
        { name: 'Pdf', label: 'Pdf' },
        { name: 'Pledges', label: 'Pledges' },
        { name: 'Share', label: 'Share' },
        { name: 'Add Users', label: 'Add Users' },
      ],
    };
  },
  watch: {},
  async created() {},
  mounted() {
  },
  methods: {},
  computed: {},
});
</script>

<style scoped lang="scss">
@import "@/assets/syles.scss";
</style>
