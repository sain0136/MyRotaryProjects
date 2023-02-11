import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useRotaryStore = defineStore("main", {
  state: () => {
    return {
      isSiteAdminLoggedIn: false,
      isDistrictAdminLoggedIn: false,
      isClubAdminLoggedIn: false,
      isClubUserLoggedIn: false,
      //store current route for navigation
      currentRoute: "",
      //store current user login infromation
      loggedInUserData: {} as User,
      // Current club or District data for user logged in
      loggedInUsersDistrict: {} as District,
      loggedInUsersClub: {} as Club,
      //the project focused on for CRUD
      currentLoadedProjectData: {},
    };
  },
    // Keep state persistence through refresh
    persist: true,
      //Used to manipulate state variable without changing the States themseleves
  getters: {},
  //Actions to manipulate and change state
  actions: {
    
  },
});
