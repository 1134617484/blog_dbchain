<template>
  <div class="_header">
    <div class="_left _local" @click="$router.push('/blogs')">
      <img src="@/assets/img/logo.png" alt="" srcset="" />
    </div>
    <div class="_right"  v-if="!islogin">
      <span class="_name" @click="openCard()">{{ name }}</span>
      <div class="_img" @click="openCard()"> 
        <img :src="getUserImg()" alt="" srcset="" />
      </div>

      <div class="_card" v-show="showUserCard">
        <div class="_card_header">
          <div class="_left">
            <span
              class="_icon"
              @click.stop="sex = 0"
              :class="sex == 0 ? '_isactive' : ''"
            >
              <img src="@/assets/img/user_man.png" alt="" srcset="" />
            </span>
            <span
              class="_icon"
              @click.stop="sex = 1"
              :class="sex !== 0 ? '_isactive' : ''"
            >
              <img src="@/assets/img/user_wuman.png" alt="" srcset="" />
            </span>
            <div class="_inp">
              <el-input v-model="age"></el-input>
            </div>
          </div>
          <div class="_right">
            <div class="_close" @click.capture="closeCard()">
              <img src="@/assets/img/user_close.png" alt="" />
            </div>
          </div>
        </div>

        <div class="_card_cont">
          <div class="_card_userImg" @click.stop="openUploadFile">
            <img :src="getUserImg()" alt="" srcset="" />
          </div>
          <input
            ref="uploadFile"
            accept="image/*"
            v-show="false"
            type="file"
            name=""
            id=""
            @change="uploadFile($event)"
          />
          <!-- <div class="_file_img">
            <img src="" alt="" srcset="">
          </div> -->
        </div>
        <div class="_card_name _inp">
          <el-input v-model="name"></el-input>
        </div>
        <div class="_card_save" @click="onSubmit()">保存</div>
        <div class="_card_outlogin" @click.stop="outLogin()">
          <span class="_card_txt">NEXT</span>
          <span class="_card_img">
            <img src="@/assets/img/user_outlogin.png" alt="" srcset="" />
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  Querier,
  insertRow,
  canInsertRow,
  getAddress,
  uploadFile,
} from "dbchain-js-client";
let that;
export default {
  data() {
    return {
      userInfo: {},
      name: "",
      age: "",
      photo: "",
      sex: "",
      showUserCard: false,
      islogin:false
    };
  },
  created() {
    console.log(this);
    that = this;
    this.getUserInfo();
  },
  methods: {
    async getUserInfo() {
      let data = await Querier(this.appCode)
        .table("user")
        .compareAll([["dbchain_key", getAddress()]])
        .last.val();
      console.log(data);
      this.userInfo = data[0];
      this.name = data[0].name;
      this.age = data[0].age;
      this.photo = data[0].photo;
      this.sex = data[0].sex;
    },
    getUserImg() {
      if (this.photo) {
        console.log("1");
        return this.$APIURL.BaseUrl + "/ipfs/" + this.photo;
      }
      return require("@/assets/img/user.png");
    },
    openCard() {
      this.showUserCard = true;
      this.$store.commit("setIsMask", true);
    },
    closeCard() {
      this.showUserCard = false;
      this.$store.commit("setIsMask", false);
    },

    onSubmit() {
      //console.log("submit!");
      this.exInsertRow(
        {
          name: this.name+'',
          age: this.age+'',
          photo: this.photo+'',
          sex: this.sex+'',
          dbchain_key: getAddress()
        },
        "user",
        "修改个人信息成功"
      );
      this.closeCard();
    },
    openUploadFile() {
      this.$refs.uploadFile.click();
    },
    // file类型需上传文件
    uploadFile(e) {
      //console.log(e);
      let file = e.target.files[0];
      uploadFile(file, this.appCode).then((res) => {
        //console.log(res);
        that.userInfo.photo = res;
        that.photo = that.userInfo.photo;
      });
    },
    /**
     * row 要插入的数据
     * tableName
     * text 成功后的message
     */
    async exInsertRow(row, tableName, text) {
      console.log(row, tableName, text);
      that.$store.commit("setIsLoding", true);
      //   尝试插入 如果成功则说明可正确插入数据
      let isCanInsert = await canInsertRow(that.appCode, tableName, row);
      //console.log(isCanInsert);
      if (!isCanInsert) {
        that.$store.commit("setIsLoding", false);
        return that.$message.error("暂时不能插入，请检查原因");
      }
      // 能进回调的都是成功提交了。
      insertRow(that.appCode, tableName, row, async () => {
        that.$store.commit("setIsLoding", false);
        that.$message.success(text);
        that.getUserInfo();
      });
    },

    outLogin(){
      this.closeCard()
      this.$router.push('/login')
    }
  },
  computed: {
    isUser() {
      return this.$store.getters.getIsUser;
    },
    appCode() {
      return this.$APIURL.AppCode;
    },
  },
  watch: {
    isUser(val) {
      console.log(val);
      this.getUserInfo();
    },
    $route(val) {
      console.log(val)
      if(val.path=='/login'){
        this.islogin=true
      }else{
        this.islogin=false
      }
    },
  },
};
</script>
<style scoped lang="scss">
._header {
  padding: 14px 0;
  width: 1360px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  height: 44px;
  z-index: 1;
  ._left {
    img {
      height: 48px;
      cursor: pointer;
    }
  }
  ._right {
    line-height: 48px;
    display: flex;
    position: relative;
    ._name {
      font-size: 25px;
      font-family: SourceHanSansCN-Bold, SourceHanSansCN;
      font-weight: bold;
      color: #444444;
      margin-right: 22px;
    }
    ._img {
      img {
        width: 44px;
        height: 44px;
        border-radius: 50%;
      }
    }
    ._card {
      top: 82px;
      right: 0px;
      position: absolute;
      width: 255px;
      height: 358px;
      background: #ffffff;
      border-radius: 15px;
      z-index: 2015;
      padding: 19px 25px 30px 20px;
      ._card_header {
        display: flex;
        width: 100%;
        justify-content: space-between;
        margin-bottom: 26px;
        ._left {
          display: flex;
          align-items: center;
          ._icon {
            line-height: 0px;
            margin-right: 22px;
            width: 36px;
            height: 32px;
            padding-top: 4px;
            img {
            }
          }
          ._isactive {
            background: #efefef;
            border-radius: 11px;
            padding-top: 4px;
          }
          ._inp {
            min-width: 66px;
            height: 36px;
            width: 66px;

            font-size: 28px;
            font-family: SourceHanSansCN-Bold, SourceHanSansCN;
            font-weight: bold;
            color: #444444;
            line-height: 42px;
            display: flex;
            align-items: center;
          }
        }
        ._icon {
          display: inline-block;
          cursor: pointer;
          img {
            height: 28px;
            width: 28px;
          }
        }
        ._right {
          ._close {
            display: flex;
            align-items: center;
            img {
              cursor: pointer;
              width: 20px;
              height: 20px;
            }
          }
        }
      }
      ._card_cont {
        margin-bottom: 17px;
        ._card_userImg {
          line-height: initial;

          img {
            width: 108px;
            height: 108px;
            border-radius: 50%;
            cursor: pointer;
            background: #d8d8d8;
            box-shadow: 0px 4px 12px 0px rgb(0 0 0 / 21%);
          }
        }
      }
      ._card_name {
        height: 36px;
        background: #efefef;
        border-radius: 11px;
        line-height: 36px;
        margin-bottom: 32px;
        width: 100%;
      }
      ._card_save {
        height: 64px;
        background: #2e44ff;
        box-shadow: 0px 2px 24px 0px rgba(46, 68, 255, 0.43);
        border-radius: 20px;
        font-size: 20px;
        font-family: SourceHanSansCN-Bold, SourceHanSansCN;
        font-weight: bold;
        color: #ffffff;
        line-height: 62px;
        margin-bottom: 22px;
      }
      ._card_outlogin {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        font-family: SourceHanSansCN-Bold, SourceHanSansCN;
        font-weight: bold;
        color: #444444;
        line-height: 30px;
        cursor: pointer;
        span {
          display: inline-block;
          line-height: initial;
        }
        ._card_img {
          margin-left: 8px;
          img {
            width: 18px;
            height: 18px;
          }
        }
      }
    }
  }
}
</style>