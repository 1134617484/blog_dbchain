import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoding: false, //搜索loding
   
  },
  getters: {
    // 查询搜索loding
    getIsLoding: (state) => state.isLoding,
  },
  mutations: {
    // 设置loding
    setIsLoding(state, isLoding = false) {
      state.isLoding = isLoding;
    },
  },
  actions: {
    
  },
  modules: {},
});
