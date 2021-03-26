import Vue from "vue";
import App from "./App.vue";
import api from "@/api/api";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;
Vue.use(api);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
