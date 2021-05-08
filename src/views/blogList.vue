<template>
  <!-- 博客列表页 -->
  <div class="_blog_list">
    <div class="_header">
      <!-- <div>
        <el-button type="primary" @click="$router.push('/addblog')"
          >写博客</el-button
        >
      </div>
      <div>
        <el-button type="primary" @click="$router.push('/edituser')"
          >修改个人信息</el-button
        >

        <span @click="$router.push('/login')">退出</span>
      </div> -->
    </div>
    <div class="_search">
      <div class="group2 flex-row">
        <span class="_active _text">POPULAR</span>
        <span class="_text">最新</span>
        <span class="_text">评价最多</span>
        <div class="layer1 flex-col"><div class="block1 flex-col"></div></div>
      </div>
      <div class="_right">
        <div class="_inp">
          <input type="text" />
        </div>
        <span class="_icon">
          <img src="@/assets/img/soso.png" alt="" srcset="" />
        </span>
      </div>
    </div>
    <div class="_content">
      <div
        class="_block"
        v-for="(item, index) in List"
        :key="index"
        @click="$router.push('blogInfo?id=' + item.id)"
      >
        <div class="_tit _one_omit">{{ item.title }}</div>
        <div class="_body">
          <div class="_text _more_omit" v-html="item.body"></div>
          <div class="_user">
            <div class="_photo" v-if="item.userInfo">
              <img
                :src="$APIURL.BaseUrl + '/ipfs/' + item.userInfo.photo"
                alt=""
              />
              <div class="_name">{{ item.userInfo.name }}</div>
            </div>
            <div class="_lock">
              <span class="_icon">
                <img src="@/assets/img/lock.png" alt="" srcset="" />
              </span>
              <span>3210</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="_addbtn" @click="isAddBlog=true">写博客</div>

    <el-dialog :visible.sync="isAddBlog" :destroy-on-close="true"
    :show-close='false' width="1320px" custom-class='add_blog_dialog' top="calc((100vh - 764px) / 2)">
      <template>
        <addBlog @closeBlog='closeBlog()' @getBlogs="getBlogs()"/>
      </template>
</el-dialog>
  </div>
</template>

<script>
// @ is an alias to /src
import { Querier } from "dbchain-js-client";
import addBlog from "./addblog.vue"
let that;
export default {
  name: "Home",
  data() {
    return {
      List: [],
      isAddBlog:false
    };
  },
  created() {
    that = this;
    console.log(that)
    this.getBlogs();
  },
  methods: {
    async getBlogs() {
      let data = await Querier(this.appCode).blogs.val();
      //console.log(data);
      for (let i = 0; i < data.length; i++) {
        const element = data[i];
        let userInfo = await Querier(this.appCode)
          .user.equal("dbchain_key", element.created_by)
          .val();
        userInfo.reverse();
        //console.log(userInfo);
        data[i].userInfo = userInfo[0] ? userInfo[0] : {};
      }
      data.reverse();
      //console.log(data);
      this.List = data;
    },
    closeBlog(val){
      this.isAddBlog=false
    }
  },

  components: {
    addBlog
  },
  computed: {
    appCode() {
      return this.$APIURL.AppCode;
    },
  },
};
</script>
<style scoped lang='scss'>
._blog_list {
  width: 1360px;
  margin: 0 auto;
  ._header {
    // padding-top: 25px;
    display: flex;
    justify-content: space-between;
    div {
      &:last-child {
        span {
          margin-left: 30px;
          cursor: pointer;
        }
      }
    }
    .group1 {
      width: inherit;
    }
  }
  ._search {
    display: flex;
    padding: 31px 0;
    justify-content: space-between;

    ._text {
      font-size: 24px;
      font-family: SourceHanSansCN-Regular, SourceHanSansCN;
      font-weight: 400;
      color: #444444;
      line-height: 36px;
      margin-right: 36px;
    }
    ._active._text {
      font-size: 32px;
      font-family: SourceHanSansCN-Bold, SourceHanSansCN;
      font-weight: bold;
      color: #444444;
      line-height: 48px;
    }
    ._right {
      display: flex;
      position: relative;
      width: 393px;
      height: 52px;
      background: #efefef;
      border-radius: 11px;
      ._inp {
        width: 100%;
        input{
              border: none;
    background: initial;padding-left: 15px;
    padding-right: 15px;
    width: calc(100% - 30px);
    height: 100%;
    font-size: 22px;
    font-family: PingFang SC, Hiragino Sans GB, Arial, Microsoft YaHei, Verdana, Roboto, Noto, Helvetica Neue, sans-serif !important;
    &:active,&:focus-visible,&:focus{
      border: none; outline: none;
    }
        }
      }
      ._icon {
        position: absolute;
      right: 9px;
    top: 7px;
        img {
          width: 34px;
          height: 34px;
        }
      }
    }
  }
  ._content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    ._block {
      text-align: left;
      border-bottom: 1px solid #f4f4f4;
      box-shadow: 0 1px 2px 0 rgb(0 0 0 / 4%);
      margin-bottom: 18px;
      padding-top: 6px;
      width: 367px;
      height: 166px;
      padding: 24px 32px;
      background: #ffffff;
      box-shadow: 0px 10px 9px 0px rgba(230, 230, 230, 0.26);
      border-radius: 16px;
      margin-bottom: 22px;
      ._tit {
        font-size: 22px;
        font-family: PingFang SC, Hiragino Sans GB, Arial, Microsoft YaHei,
          Verdana, Roboto, Noto, Helvetica Neue, sans-serif !important;
        margin-bottom: 12px;
        height: 29px;
      }
      ._body {
        font-size: 18px;
        cursor: pointer;

        ._text {
          height: 78px;
          font-size: 16px;
          font-family: SourceHanSansCN-Regular, SourceHanSansCN;
          font-weight: 400;
          color: #9e9e9e;
          line-height: 26px;
        }
      }
      ._user {
        display: flex;
        justify-content: space-between;
        ._photo {
          min-width: 40px;
          margin-right: 20px;
          display: flex;
          align-items: center;
          padding-top: 14px;
          img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin-right: 12px;
          }
          ._name {
            font-size: 16px;
            min-width: 60px;
            margin-right: 20px;
            font-size: 22px;
            font-family: SourceHanSansCN-Regular, SourceHanSansCN;
            font-weight: 400;
            color: #444444;
            line-height: 33px;
          }
        }
        ._lock {
          display: flex;
          padding-top: 30px;
          span {
            font-size: 20px;
            font-family: DINAlternate-Bold, DINAlternate;
            font-weight: bold;
            color: #9e9e9e;
            line-height: 24px;
          }
          ._icon {
            margin-right: 7px;
            img {
              width: 20px;
              height: 20px;
            }
          }
        }
      }
    }
  }
  ._addbtn {
    position: fixed;
    bottom: 54px;
    right: calc(100vw - 1360px - (100vw - 1360px) / 2);
    width: 200px;
    height: 64px;
    background: #2e44ff;
    box-shadow: 0px 2px 24px 0px rgba(46, 68, 255, 0.43);
    border-radius: 20px;
    font-size: 24px;
    font-family: SourceHanSansCN-Regular, SourceHanSansCN;
    font-weight: 400;
    color: #ffffff;
    line-height: 36px;
    line-height: 64px;
    cursor: pointer;
  }
}
</style>
