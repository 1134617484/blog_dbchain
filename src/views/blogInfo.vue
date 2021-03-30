<template>
  <div class="_blogInfo">
    <div class="_cont">
      <div class="_tit">{{ blogInfo.title }}</div>
      <div
        class="_body"
        v-html="blogInfo.body ? blogInfo.body : '暂无内容'"
      ></div>
    </div>
    <div class="_discuss">
        <div class="_list">
            
        </div>
      <div class="_block_inp">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="textarea"
        >
        </el-input>
        <div class="_btn">
          <el-button type="primary" @click="submit()">主要按钮</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
let that;
import { getQueryString } from "@/utils/mUtils";
import { Querier, insertRow, canInsertRow } from "dbchain-js-client";
export default {
  data() {
    return {
      blogInfo: "", // 博客详情
      textarea: "", //评论内容
      discussAll:[]
    };
  },
  created() {
    that = this;
    this.getBlogInfo();
    this.getMsg()
  },
  methods: {
    async getBlogInfo() {
      // 按条件查询
      let data = await Querier(this.appCode)
        .blogs.equal("id", this.blogId)
        .val();
      if (!data[0]) return this.$message.error("此id无数据");
      this.blogInfo = data[0];
    },
    async getMsg() {
      let dataAll = await Querier(this.appCode).discuss.val();
      console.log(dataAll);
      this.discussAll=dataAll
    //   let replayAll = await Querier(this.appCode).replay.val();
    //   console.log(replayAll);

    //   for (let i = 0; i < dataAll.length; i++) {
    //     let data = [];
    //     let msg_id = dataAll[i].id;
    //     console.log(msg_id);
    //     for (let j = 0; j < replayAll.length; j++) {
    //       // data
    //       if (replayAll[j].message_id == msg_id) {
    //         console.log("ooo");
    //         data[data.length] = replayAll[j];
    //       }
    //     }
    //     dataAll[i].replays = data;
    //   }
    //   this.msg = dataAll;
    //   this.loading = false;
      // replays
    },
    /**
     * row 要插入的数据
     * tableName
     * text 成功后的message
     */
    async insertRow(row, tableName, text) {
      console.log(row, tableName, text);
      console.log(that);
      that.$store.commit("setIsLoding", true);
      console.log(that.appCode, tableName, row);
      let isCanInsert = await canInsertRow(that.appCode, tableName, row);
      console.log(isCanInsert);
      if (!isCanInsert) {
        that.$store.commit("setIsLoding", false);
        return that.$message.error("暂时不能插入，请检查原因");
      }
      // 能进回调的都是成功提交了。
      insertRow(that.appCode, tableName, row, async () => {
        that.$store.commit("setIsLoding", false);
        that.$message.success(text);
        // that.form={}
        that.textarea=''
        that.getMsg();
      });
    },
    replay(messageId) {
      //回复留言功能
      this.$prompt("回复留言", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^[\s\S]*.*[^\s][\s\S]*$/,
        inputErrorMessage: "回复不能为空",
      })
        .then(({ value }) => {
          let date = new Date();
          console.log(messageId);
          this.insertRow(
            { message_id: messageId, replay: value },
            "replay",
            "回复成功"
          );
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },

    submit() {
      let date = new Date();
      if (this.textarea.length == 0) {
        //非空判断
        this.$message({
          type: "error",
          message: "留言内容不能为空",
        });
      } else {
        this.insertRow(
          { text: this.textarea, blog_id: this.blogId },
          "discuss",
          "评论成功"
        );
      }
      this.title = "";
      this.content = "";
      // this.getMsg();
    },
  },
  computed: {
    appCode() {
      return this.$APIURL.AppCode;
    },
    blogId() {
      return getQueryString("id");
    },
  },
};
</script>

<style lang='scss' scoped>
._blogInfo {
  width: 1200px;
  margin: 0 auto;
  ._cont {
    ._body {
      min-height: 600px;
      font-family: -apple-system, BlinkMacSystemFont, Helvetica Neue,
        PingFang SC, Microsoft YaHei, Source Han Sans SC, Noto Sans CJK SC,
        WenQuanYi Micro Hei, sans-serif;
      font-size: 15px;
      color: #121212;
      text-align: left;
    }
    ._tit {
      line-height: 32px;
      color: #121212;
      margin-top: 12px;
      margin-bottom: 4px;
      font-size: 22px;
      font-weight: 600;
      margin-bottom: 30px;
    }
    margin-bottom: 60px;
  }
  ._discuss {
    ._block_inp {
      width: 85%;
      margin: 0 auto;
    }
  }
}
</style>