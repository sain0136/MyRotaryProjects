<template>
  <div class="admin_container ">
    <DistrictForm/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DistrictForm from "@/components/common/forms/DistrictForm.vue";
import { useRotaryStore } from "@/stores/rotaryStore";

export default defineComponent({
  name: "DistrictSettings",
  setup() {
    const store = useRotaryStore();
    return { store };
  },
  components: {
    DistrictForm,
  },
  props: {},
  data() {
    return {};
  },
  watch: {},
  async created() {
    this.store.setDistrictFormProps({
      formModeProp: "UPDATE",
      districtIdProp: this.store.$state.loggedInUserData.district_id as number ,
    });
  },
  methods: {},
  computed: {},
});
</script>

<style scoped lang="scss"></style>
