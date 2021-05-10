<template>
<!-- 内置登录页 -->
  <div class="_login">
    <div class="_content">
      <div class="_box_card">
        <div class="_header">
          <img src="@/assets/img/user.png" alt="" srcset="">
        </div>
        <div class="_cont">
            <el-select v-model="data" placeholder="请选择账号" @change='selectLogin'>
              <el-option
                v-for="item in options"
                :key="item.mnemonic"
                :label="item.name"
                :value="item">
              </el-option>
            </el-select>
        </div>
        <div class="_btn"  @click="submitForm('ruleForm')">立即进入</div>
      </div>
   

      <!-- <el-card class="box-card">
        <div class="_head">登录</div>
        <el-form
          ref="ruleForm"
          class="demo-ruleForm"
          :label-position="labelPosition"
          label-width="120px"
          :model="ruleForm"
        >
        <el-form-item prop="mnemonic" class="_cont">
          <el-select v-model="data" placeholder="请选择账号" @change='selectLogin'>
              <el-option
                v-for="item in options"
                :key="item.mnemonic"
                :label="item.name"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>

          <div style="text-align: center">
            <el-button type="primary" @click="submitForm('ruleForm')"
              >立即登入</el-button
            >
          </div>
        </el-form>

        <div>当前助记词：{{ruleForm.mnemonic}}</div>
      </el-card> -->
    </div>

     <div class="_footer">
      <div class="_tit">
        当前助记词
      </div>
      <div class="_txt">{{ruleForm.mnemonic}}</div>
    </div>
  </div>
</template>

<script>
import {
  validateMnemonic,
  newMnemonic,
  createAndStoreKey,
  setMyName,
  getChainId,
  savePassphrase,
  hasKey,
  setBaseUrl,
  setChainId,
  detectChain,
  resetLazyFactory
} from "dbchain-js-client";

export default {
  data() {
    return {
      data:'张一',
      labelPosition: "right",
      ruleForm: {
        mnemonic: "bind dizzy trigger story senior session finger analyst text traffic scheme parent",
        password: "123456",
      },
      options:[
        {id:'',name:'张一',mnemonic:'bind dizzy trigger story senior session finger analyst text traffic scheme parent',password:'123456',key:''
        },
        {id:'',name:'张二',mnemonic:'citizen nice machine pioneer gossip lyrics tomato spray light food ethics throw',password:'123456',key:''
        },
        {id:'',name:'张三',mnemonic:'fuel lamp canal lazy barrel medal scheme coconut brass slender tackle satoshi',password:'123456',key:''
        },
        {id:'',name:'张四',mnemonic:'cross dirt blouse sheriff option system enemy anchor flight desk employ essay',password:'123456',key:''
        },
        {id:'',name:'张五',mnemonic:'cereal orient close profit else usual dizzy abandon rib doctor inner story',password:'123456',key:''
        },
        {id:'',name:'张六',mnemonic:'remember chicken impulse marine rose oak gate result cruise glad cup lazy',password:'123456',key:''
        },
      ]
    };
  },
  created() {
    //console.log(this);
    // 每次进入这页面，清除dbchain-js-client缓存
    resetLazyFactory()
    this.$store.commit("setIsLoding", false);
  },
  methods: {
    // 生成key
    async createKey() {
      // 生成对应私钥，需传入12个助记词（以中文隔开）
      createAndStoreKey(this.ruleForm.mnemonic, this.ruleForm.password);
      // 保存您设置的密码
      savePassphrase(this.ruleForm.password);
      // 设置访问参数前需调用dbchain提供的验证方法验证通过后方可设置访参，避免出现不知名错误,
      // 访回值如下 {status:false,content:'当前访参无法访问，请检查'}
      // 若不可设置，则应检查您提供的参数是否正确或网络是否存在问题
      // 此函数如非异步调用，则会返回promise，请检查需要异步调用时则需异步，否则使用中容易出错
      let isToBaseUrl = await detectChain(
        this.$APIURL.BaseUrl,
        this.$APIURL.ChainId
      );
      //console.log(isToBaseUrl);
      if (!isToBaseUrl.status) return this.$message.error(isToBaseUrl.content);
      // 设置默认访问参数 节点访问地址和节点id
      setBaseUrl(this.$APIURL.BaseUrl);
      setChainId(this.$APIURL.ChainId);
      // 关闭loding
      this.$store.commit("setIsLoding", false);
      return true;
    },
    // 点击登入
    async submitForm(formName) {
          let ismnemonic = await validateMnemonic(this.ruleForm.mnemonic);
          if (!ismnemonic) {
            return this.$message.error("助记词有误，请检查");
          }
          this.$store.commit("setIsLoding", true);
          // 此处生成对应私钥
          let iskey =await this.createKey();
          //console.log(iskey);
          if (iskey){
            this.$store.commit('setIsUser',new Date().getTime())
return this.$router.push('/blogs');
          } 
          return this.$message.error("创建私钥或设置节点信息失败");
       
    },
 
    selectLogin(e){
      //console.log(e)
      this.ruleForm.password=e.password;
      this.ruleForm.mnemonic=e.mnemonic;
      this.data=e.name
    }
  },
  computed: {
    appCode() {
      return this.$APIURL.AppCode;
    },
  },
};
</script>

<style lang="scss" scoped>
._login {
  width: 100vw;
  height: calc(100vh - 72px);
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  ._content {
   width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;    padding-top: 90px;
    ._head {
      padding-bottom: 20px;
      font-size: 18px;
    }
    ._items {
      position: relative;
      ._text {
        position: absolute;
        pointer-events: none;
        right: 9px;
        font-size: 12px;
        color: #888;
      }
    }
    ._box_card{
      width: 200px;
height: 275px;
background: #FFFFFF;
border-radius: 15px;
padding: 40px 50px;
._header{
  display: flex;
  justify-content: center;
  img{
    width: 108px;
height: 108px;
background: #D8D8D8;
box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.21);
border-radius: 50%;
  }
  // margin-bottom: ;
}
._cont{
  padding: 28.5px 0;
}
._btn{
  width: 200px;
height: 64px;
background: #2E44FF;
box-shadow: 0px 2px 24px 0px rgba(46, 68, 255, 0.43);
border-radius: 20px;

font-size: 24px;
font-family: SourceHanSansCN-Regular, SourceHanSansCN;
font-weight: 400;
color: #FFFFFF;
line-height: 64px;

cursor: pointer;
}
    }
  }
  ._footer{
    width: 522px;
height: 132px;
background: #EFEFEF;
border-radius: 11px;
._tit{
  font-size: 20px;
font-family: SourceHanSansCN-Medium, SourceHanSansCN;
font-weight: 500;
color: #444444;
line-height: 30px;
    padding: 17px 0 14px 0;
}
._txt{
  font-size: 18px;
font-family: SourceHanSansCN-Regular, SourceHanSansCN;
font-weight: 400;
color: #9E9E9E;
line-height: 26px;
text-align: left;
padding: 0 22px;
}
  }
}
</style>