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
      <div class="_list" v-for="(item, index) in discussAll" :key="index">
        <div class="_flex">
          <div class="_user">
            <img
              :src="$APIURL.BaseUrl + '/ipfs/' + item.userInfo.photo"
              alt=""
              srcset=""
            />
          </div>
          <div class="_userName">{{ item.userInfo.name }}</div>
          <div class="_text">{{ item.text }}</div>
          <div class="_btn_relay" @click="replay(item.id)">回复</div>
        </div>
        <div
          class="_flex _replay_flex"
          v-for="(r_item, j) in item.replays"
          :key="j"
        >
          <div class="_user">
            <img
              :src="$APIURL.BaseUrl + '/ipfs/' + r_item.userInfo.photo"
              alt=""
              srcset=""
            />
          </div>
          <div class="_userName">{{ r_item.userInfo.name }}</div>
          <div class="_span">回复</div>
          <div class="_userName">{{ item.userInfo.name }}</div>
          <div class="_text">{{ r_item.text }}</div>
          <div class="_btn_relay" @click="replay(item.id)">回复</div>
        </div>
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
          <el-button type="primary" @click="submit()">评论</el-button>
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
      discussAll: [],
    };
  },
  created() {
    that = this;
    this.getBlogInfo();
    this.getMsg();
  },
  methods: {
    async getBlogInfo() {
      // 按条件查询
      let data = await Querier(this.appCode).blogs.equal("id", this.blogId).val();
      if (!data[0]) return this.$message.error("此id无数据");
      this.blogInfo = data[0];
    },
    async getMsg() {
      let dataAll = await Querier(this.appCode).discuss.equal("blog_id", this.blogId).val();
      for (let i = 0; i < dataAll.length; i++) {
        const element = dataAll[i];
        let thatuser = await Querier(that.appCode)
          .user.equal("dbchain_key", element.created_by)
          .val();
        thatuser.reverse();
        console.log(thatuser);
        element.userInfo = thatuser[0] || {};
      }
      let msgAll = dataAll.filter((res) => {
        return res.blog_id && !res.discuss_id;
      });
      let replayAll = dataAll.filter((res) => {
        return res.blog_id && res.discuss_id;
      });

      console.log(msgAll);
      console.log(replayAll);
      for (let i = 0; i < msgAll.length; i++) {
        let data = [];
        let msg_id = msgAll[i].id;
        console.log(msg_id);
        for (let j = 0; j < replayAll.length; j++) {
          // data
          if (replayAll[j].discuss_id == msg_id) {
            console.log("ooo");
            data[data.length] = replayAll[j];
          }
        }
        msgAll[i].replays = data;
      }
      console.log(msgAll);
      this.discussAll = msgAll;
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
        that.textarea = "";
        that.getMsg();
      });
    },
    // 回复
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
            { discuss_id: messageId, blog_id: that.blogId, text: value },
            "discuss",
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
    // 评论
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

    ._list {
      padding-bottom: 14px;

      ._flex {
        display: flex;
        align-items: center;
        ._user {
          width: 45px;
          height: 45px;
          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }
        ._userName {
          margin-left: 8px;
          margin-right: 8px;
          color: coral;
        }
        ._text {
        }
        ._btn_relay {
          margin-left: 20px;
          color: #1989fa;
          cursor: pointer;
        }
      }
      ._replay_flex {
        padding-left: 20px;
      }
    }
  }
  ._btn {
    padding-top: 30px;
  }
}
</style>