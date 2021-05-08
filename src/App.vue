<template>
  <div id="app" v-loading="isLogin">
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
    return {};
  },
  components: {
    blog_header: header,
  },
  computed: {
    isLogin() {
      return this.$store.getters.getIsLoding;
    },
  },
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
