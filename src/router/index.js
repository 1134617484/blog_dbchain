import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "login",
    component: () =>
    import(/* webpackChunkName: "login" */ "@/components/login/login.vue"),
  },
  {
    path: "/blogs",
    name: "blogs",
    component: () =>
      import(/* webpackChunkName: "blogs" */ "../views/blogList.vue"),
  },
  {
    path: "/addblog",
    name: "addblog",
    component: () =>
      import(/* webpackChunkName: "addblog" */ "../views/addblog.vue"),
  },
  {
    path: "/edituser",
    name: "edituser",
    component: () =>
      import(/* webpackChunkName: "edituser" */ "../views/user.vue"),
  },
  {
    path: "/blogInfo",
    name: "blogInfo",
    component: () =>
      import(/* webpackChunkName: "blogInfo" */ "../views/blogInfo.vue"),
  },
  
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
