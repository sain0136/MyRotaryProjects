<template>
  <div class="admin_container ">
    <div class=" w-full">
      <h1 class="header2_h1">My Profile</h1>
    </div>
    <UserForm/>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import UserForm from '@/components/common/forms/UserForm.vue';
import { useRotaryStore } from '@/stores/rotaryStore';
export default defineComponent({
  name: 'MyProfile',
  setup() {
    const store = useRotaryStore();
    return { store };
  },
  components: {
    UserForm,
  },
  props: {},
  data() {
    return {};
  },
  watch: {},
  async created() {
    this.store.setUserFormProps({
        formModeProp: "UPDATE",
        userIdProp: this.store.$state.loggedInUserData.user_id,
        userCreationTypeProp: "DISTRICT_ADMIN",
        myProfileViewProp: true
      });
  },
  methods: {},
  computed: {},
});
</script>

<style scoped lang='scss'>
@import "@/assets/syles.scss";

</style>