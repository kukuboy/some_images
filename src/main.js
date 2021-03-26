import Vue from "vue";
import App from "./App.vue";
import api from "@/api/api";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import VueLazyload from "vue-lazyload";

Vue.use(VueLazyload, {
  preLoad: 1.3,
  attempt: 10,
});
Vue.config.productionTip = false;
Vue.use(api);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
