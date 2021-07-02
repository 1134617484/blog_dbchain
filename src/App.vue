<template>
  <div id="app" v-loading="isLogin" :class="isMask?'isMask':''">
    <div class="_header">
      <blog_header />
    </div>
    <router-view />
  </div>
</template>
<script>
import header from "@/components/header.vue";
export default {
  data() {
    return {
      Mask:''
    };
  },
  components: {
    blog_header: header,
  },
  computed: {
    isLogin() {
      return this.$store.getters.getIsLoding;
    },
    isMask(){
      return this.$store.getters.getIsMask;
    }
  },
  watch:{
    isMask(val){
      if(!val){
        return this.Mask.close()
      }
      this.Mask=this.$loading({
          lock: true,
          text: '',
          spinner: '.xx',
          background: 'rgba(0, 0, 0, 0.7)'
        });
    }
  }
};
</script>
<style  lang="scss" src='@/assets/css/global.scss'></style>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: #f8f8f8;
  overflow-y: clip;
}
body {
  padding: 0;
  margin: 0;
}
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
