/* eslint-disable */

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import vueScrollTo from "vue-scroll-to";
import VueQrcodeReader from "vue-qrcode-reader";
import axios from "axios";
import qs from "qs";
// import BootstrapVue from 'bootstrap-vue'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
import "bootstrap/dist/css/bootstrap.css";
import ElementUI from "element-ui";
import locale from "element-ui/lib/locale/lang/en";
Vue.use(ElementUI, { locale });
import "element-ui/lib/theme-chalk/index.css";
import moment from "moment";
Vue.prototype.$moment = moment;
import { baseUrl } from "./const.js";
// Vue.use(BootstrapVue)
Vue.use(VueQrcodeReader);
Vue.use(vueScrollTo);
Vue.config.productionTip = false;
Vue.prototype.$http = axios;
Vue.prototype.$http.defaults.baseURL = baseUrl;
console.log(Vue.prototype.$http.defaults.baseURL);
// Vue.prototype.$http.defaults.timeout = 6500;
// console.log("loading moment.js...");
Vue.prototype.$moment = moment;
// console.log(Vue.prototype.$moment);
// console.log("loading qs for x-www-form-urlencoded requests...");
Vue.prototype.$qs = qs;
// console.log(Vue.prototype.$qs);

new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});
