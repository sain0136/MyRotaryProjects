import { createApp } from "vue";
import { createPinia } from "pinia";
import VueSocialSharing from 'vue-social-sharing'
import naive from "naive-ui";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import { faAt } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faEnvelopeCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { faCircleDown } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF ,faSquareFacebook } from "@fortawesome/free-brands-svg-icons";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faUserLock } from "@fortawesome/free-solid-svg-icons";
import { faDiagramProject } from "@fortawesome/free-solid-svg-icons";
import { faFileContract } from "@fortawesome/free-solid-svg-icons";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faPersonCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { faFlag } from "@fortawesome/free-solid-svg-icons";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { faX , faPlus} from "@fortawesome/free-solid-svg-icons";
import {
  faArrowUpRightFromSquare,
  faAngleDown,
  faQuestion,
  faCheckToSlot,
  faFile
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faPlus,
  faFile,
  faSquareFacebook,
  faCheckToSlot,
  faQuestion,
  faAngleDown,
  faLocationDot,
  faArrowUpRightFromSquare,
  faX,
  faArrowRightFromBracket,
  faFlag,
  faCirclePlus,
  faPersonCircleCheck,
  faThumbsUp,
  faPaperPlane,
  faFileContract,
  faDiagramProject,
  faUserSecret,
  faAt,
  faEnvelope,
  faPenToSquare,
  faTrashCan,
  faFacebook,
  faTwitter,
  faInstagram,
  faAngleRight,
  faEnvelopeCircleCheck,
  faPhone,
  faLocationDot,
  faFacebookF,
  faRightToBracket,
  faArrowRight,
  faCheck,
  faUserLock,
  faCircleDown
);
import App from "@/App.vue";
import router from "@/router";

import "@/assets/base.css";

const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(VueSocialSharing);
app.use(pinia);
app.use(naive);
app.use(router);
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");
