<template>
  <div id="app" v-loading="isLogin">
    <router-view />
  </div>
</template>
<script>
export default {
  data() {
    return {};
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
}
body{
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
