import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoding: false, //搜索loding
    isUser: false,
    isMask: false,
  },
  getters: {
    // 查询搜索loding
    getIsLoding: (state) => state.isLoding,
    getIsUser: (state) => state.isUser,
    getIsMask: (state) => state.isMask
  },
  mutations: {
    // 设置loding
    setIsLoding(state, isLoding = false) {
      state.isLoding = isLoding;
    },
    setIsUser(state, isUser = true) {
      state.isUser = isUser;
    },
    setIsMask(state, isMask = false) {
      state.isMask = isMask
    }
  },
  actions: {

  },
  modules: {},
});
