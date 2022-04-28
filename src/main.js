import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import LoadingPage from "../src/components/LoadingPage.vue";
import ErrorMessage from "../src/components/ErrorMessage.vue";

Vue.config.productionTip = false;
Vue.component("LoadingPage", LoadingPage);
Vue.component("ErrorMessage", ErrorMessage);

import "@/assets/css/global.css";

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
