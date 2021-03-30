<template>
<!-- 博客列表页 -->
  <div class="_blog_list">
    <div class="_header">
      <el-button type="primary" @click="$router.push('/addblog')"
        >写博客</el-button
      >
      <el-button type="primary" @click="$router.push('/edituser')"
        >修改个人信息</el-button
      >
    </div>
    <div class="_content">
      <div class="_block" v-for="(item, index) in List" :key="index" @click="$router.push('blogInfo?id='+item.id)">
        <div class="_tit">{{ item.title }}</div>
        <div class="_body ">
          <div class="_photo" v-if="item.userInfo">
            <img :src="$APIURL.BaseUrl+'/ipfs/'+item.userInfo.photo" alt="" />
          </div>

          <div class="_name">{{ item.userInfo.name }}</div>
          <div class="_text _one_omit" v-html="item.body"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { Querier } from "dbchain-js-client";
let that;
export default {
  name: "Home",
  data() {
    return {
      List: [],
    };
  },
  created() {
    that = this;
    this.getBlogs();
  },
  methods: {
    async getBlogs() {
      let data = await Querier(this.appCode).blogs.val();
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        const element = data[i];
        let userInfo = await Querier(this.appCode)
          .user.equal("dbchain_key", element.created_by)
          .val();
          userInfo.reverse();
          console.log(userInfo);
        data[i].userInfo = userInfo[0] ? userInfo[0] : {};
      }
      console.log(data);
      this.List = data;
    },
  },

  components: {},
  computed: {
    appCode() {
      return this.$APIURL.AppCode;
    },
  },
};
</script>
<style scoped lang='scss'>
._blog_list{
  width: 1200px;
  margin: 0 auto;
  ._header{
padding-top: 25px;
  }
  ._content{
._block{
  text-align: left;
  border-bottom: 1px solid #f4f4f4;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 4%);
  margin-bottom: 18px;
  padding-top: 6px;
  ._tit{
font-size: 22px;
    font-family: PingFang SC,Hiragino Sans GB,Arial,Microsoft YaHei,Verdana,Roboto,Noto,Helvetica Neue,sans-serif !important;
    margin-bottom: 12px;
  }
  ._body{
font-size: 18px;
display: flex;
cursor: pointer;
._photo
{
  min-width: 40px;
margin-right: 20px;
img{
  width: 40px;
  height: 40px;
}
}
._name{
font-size: 16px;
min-width: 60px;
margin-right: 20px;
}
._text{

}

  }
}
  }
}

</style>
