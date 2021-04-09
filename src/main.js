import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.config.productionTip = false;
import * as DBChain from "dbchain-js-client";
Vue.prototype.$DBChain = DBChain;
import { APIURL } from "@/api/_init_.js";
Vue.prototype.$APIURL = APIURL;
Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
