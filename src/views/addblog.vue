<template>
<!-- 添加博客页面 -->
  <div class="_add_blog">
    <div class="_tit">
      <el-input
        type="textarea"
        :rows="2"
        placeholder="请输入博客标题"
        v-model="tit"
      >
      </el-input>
    </div>
    <div class="_body">
      <el-input
        type="textarea"
        :rows="20"
        placeholder="请输入博客正文"
        v-model="body"
      >
      </el-input>
    </div>
    <div class="_fot">
      <el-button type="success" @click="addBlog()">上传博客</el-button>
    </div>
  </div>
</template>

<script>
import { insertRow, canInsertRow } from "dbchain-js-client";
let that;
export default {
  data() {
    return {
      tit: "",
      body: "",
    };
  },
  created(){
      that=this
  },
  methods:{
      addBlog(){
         if(!this.tit)return this.$message.error('请填写博客标题');
         if(!this.body)return this.$message.error('请填写博客内容')
        this.exInsertRow({'title':this.tit,
        'body':this.body},'blogs','博客添加成功')
      },
    /**
     * row 要插入的数据
     * tableName
     * text 成功后的message
     */
    async exInsertRow(row, tableName, text) {
      that.$store.commit("setIsLoding", true);
    //   尝试插入 如果成功则说明可正确插入数据
      let isCanInsert = await canInsertRow(
        that.appCode,
        tableName,
        row
      );
      if (!isCanInsert) {
        that.$store.commit("setIsLoding", false);
        return that.$message.error("暂时不能插入，请检查原因");
      }
      // 能进回调的都是成功提交了。
      insertRow(that.appCode, tableName, row, async () => {
            that.$store.commit("setIsLoding", false);
            that.$message.success(text);
            that.$router.push('/blogs')
      });
    },
  },
  computed:{
      appCode(){
        return this.$APIURL.AppCode
      }
  }
};
</script>

<style lang='scss' scoped>
._add_blog {
  width: 1200px;
  margin: 0 auto;
  padding-top: 35px;

  ._tit,
  ._body {
    width: 90%;
    margin: 0 auto;
  }
  ._tit {
    margin-bottom: 20px;
  }
  ._body {
    margin-bottom: 35px;
  }
}
</style>