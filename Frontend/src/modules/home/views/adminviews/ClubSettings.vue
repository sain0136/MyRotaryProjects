<template>
  <div class="admin_container ">
    <h1>Hello World</h1>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import { useRotaryStore } from '@/stores/rotaryStore';
export default defineComponent({
  name: 'ClubSettings',
  setup() {
    const store = useRotaryStore();
    return { store };
  },
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

<style scoped lang='scss'>
</style>