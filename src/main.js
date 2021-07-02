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
import { img_Base } from "@/assets/base/base64.js";
console.log(img_Base);
Vue.prototype.$img = img_Base;

//异常处理
Vue.config.errorHandler = function (err, vm, info) {
  console.log(`Error: ${err.toString()}\nInfo: ${info}`);
};
//全局注册自定义指令，用于判断当前图片是否能够加载成功，可以加载成功则赋值为img的src属性，否则使用默认图片
Vue.directive("real-img", async function (el, binding) {
  let imgURL = binding.value; //获取图片地址
  let defaultURL = el.getAttribute("default-img"); //获取默认图片地址
  if (imgURL) {
    let exist = await imageIsExist(imgURL);
    if (exist) {
      el.setAttribute("src", imgURL);
    } else {
      if (defaultURL) {
        el.setAttribute("src", defaultURL);
      }
    }
  }
});
/**
 * 检测图片是否存在
 * @param url
 */
let imageIsExist = function (url) {
  return new Promise((resolve) => {
    var img = new Image();
    img.onload = function () {
      if (this.complete == true) {
        resolve(true);
        img = null;
      }
    };
    img.onerror = function () {
      resolve(false);
      img = null;
    };
    img.src = url;
  });
};
// 加载更多
Vue.directive('loadmore', {
  bind(el, binding) {
    // const selectWrap = el.querySelector('.el-table__body-wrapper')
    el.addEventListener('scroll', function() {
      let sign = 0
      const scrollDistance = this.scrollHeight - this.scrollTop - this.clientHeight
      if (scrollDistance <= sign) {
        binding.value()
      }
    })
  }
})
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
