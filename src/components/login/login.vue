<template>
<!-- 内置登录页 -->
  <div class="_login">
    <div class="_content">
      <el-card class="box-card">
        <div class="_head">登录</div>
        <el-form
          ref="ruleForm"
          class="demo-ruleForm"
          :label-position="labelPosition"
          label-width="80px"
          :model="ruleForm"
        >
        <el-form-item prop="mnemonic">
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
      </el-card>
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
    console.log(this);
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
      console.log(isToBaseUrl);
      if (!isToBaseUrl.status) return this.$message.error(isToBaseUrl.content);
      // 设置默认访问参数 节点访问地址和节点id
      setBaseUrl(this.$APIURL.BaseUrl);
      setChainId(this.$APIURL.ChainId);
      // 关闭loding
      this.$store.commit("setIsLoding", false);
      return true;
    },
    // 点击登入
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let ismnemonic = await validateMnemonic(this.ruleForm.mnemonic);
          if (!ismnemonic) {
            return this.$message.error("助记词有误，请检查");
          }
          this.$store.commit("setIsLoding", true);
          // 此处生成对应私钥
          let iskey =await this.createKey();
          console.log(iskey);
          if (iskey) return this.$router.push('/blogs');
          return this.$message.error("创建私钥或设置节点信息失败");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // async getRouter(address=this.$DBChain.getAddress()) {
    //   this.$store.commit("setIsLoding", true);
    //   console.log(address)
    //   // 先在学生表中查看
    //   let studentAll =await this.$DBChain
    //     .Querier(this.appCode)
    //     .student.compareAll([
    //       ["address", address],
    //       ["status", "1"],
    //     ])
    //     .val();
    //   console.log(studentAll);
    //   studentAll.reverse();
    //   console.log(studentAll)
    //   if(studentAll.length>0){
    //     this.$store.commit('setUserType','2')
    //     this.$store.commit("setIsLoding", false);
    //     this.$store.commit('changeUserInfo',studentAll[0])
    //     return this.$router.push('/student')
    //     }
    //   let teacherAll =await this.$DBChain
    //     .Querier(this.appCode)
    //     .teacher.compareAll([
    //       ["address", address],
    //       ["status", "1"],
    //     ])
    //     .val();
    //   console.log(teacherAll);
    //   teacherAll.reverse();
    //   if(teacherAll.length>0){
    //     this.$store.commit('setUserType','1')
    //     this.$store.commit("setIsLoding", false);
    //     this.$store.commit('changeUserInfo',teacherAll[0])
    //     return this.$router.push('/index')
    //     }
    //   let adminAll =await this.$DBChain
    //     .Querier(this.appCode)
    //     .admin.compareAll([
    //       ["address", address],
    //       ["status", "1"],
    //     ])
    //     .val();
    //   console.log(adminAll);
    //   adminAll.reverse();
    //   if(adminAll.length>0){
    //     this.$store.commit('setUserType','0')
    //     this.$store.commit("setIsLoding", false);
    //     this.$store.commit('changeUserInfo',adminAll[0])
    //     return this.$router.push('/index')
    //     }
    // },
    selectLogin(e){
      console.log(e)
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
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  ._content {
    width: 500px;
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
  }
}
</style>