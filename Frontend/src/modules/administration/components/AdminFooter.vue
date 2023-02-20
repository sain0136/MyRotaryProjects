<template>
  <footer class="bg-gray-900 text-primary-white py-8 flex-grow-0 mt-auto ">
  <div class="container mx-auto px-6">
    <div class="flex items-center justify-between">
      <p class="text-sm">Copyright &copy; My RotaryProjects 2023</p>
      <ul class="flex">
        <li><a href="#" class="text-white hover:text-gray-400 px-3">Contact</a></li>
        <li><a href="#" class="text-white hover:text-gray-400 px-3">Terms & Conditions</a></li>
        <li><a href="#" class="text-white hover:text-gray-400 px-3">Privacy Policy</a></li>
      </ul>
    </div>
  </div>
</footer>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'AdminFooter',
  components: {
    
  },
  props: {
    at: {
      type: String,
      default: 'bottom',
    },
  },
  data() {
    return {
      toast: {
  
      },
    };
  },
  watch: {},
  async created() {},
  methods: {},
  computed: {},
});
</script>

<style scoped lang='scss'>
</style>