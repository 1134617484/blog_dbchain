<template>
<!-- 用户信息修改页 -->
  <div class="_user">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="姓名">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="form.sex" placeholder="请选择性别">
          <el-option label="女" value="女"></el-option>
          <el-option label="男" value="男"></el-option>
        </el-select>
        <!-- <el-input v-model="form.name"></el-input> -->
      </el-form-item>
      <el-form-item label="年龄">
        <el-input v-model="form.age"></el-input>
      </el-form-item>
      <el-form-item label="头像">
          <div class="_photo" >
              <img v-if="photo" :src="$APIURL.BaseUrl+'/ipfs/'+form.photo" alt="">
          </div>
        <span class="_inp _block_add_inp">
          <span class="_upload_file">
            <!-- <span class="_icon">
              <icon-svg icon-class="icon-shangchuan" />
            </span> -->
            <input
              type="file"
              class="_upload_file_input"
              @change="uploadFile($event)"
            />
            <span class="_relative_span">上传文件</span>
          </span>
        </span>
      </el-form-item>
      <el-form-item>
        <el-button type="info" @click="$router.push('/blogs')">取消</el-button>
        <el-button type="primary" @click="onSubmit">更新个人信息</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
import {
  Querier,
  insertRow,
  canInsertRow,
  getAddress,
  uploadFile
} from "dbchain-js-client";
let that;
export default {
  data() {
    return {
        photo:'',
      form: {
        name: "",
        age: "",
        dbchain_key: "",
        sex: "",
        photo: "",
      },
    };
  },
  created() {
    that = this;
    this.getuserInfo();
  },
  methods: {
    async getuserInfo() {
      let key = getAddress();
      console.log(key);
      let userinf = await Querier(this.appCode).user.equal("dbchain_key", key).val();
      userinf.reverse();
      console.log(userinf);
      this.form=userinf[0]?userinf[0]:this.form;
      this.form.photo?this.photo=this.form.photo:'';
      this.form.dbchain_key=key
    },
    onSubmit() {
      console.log("submit!");
      this.exInsertRow(this.form,'user','修改个人信息成功')
    },
    // file类型需上传文件
    uploadFile(e) {
      console.log(e);
      let file = e.target.files[0];
      uploadFile(file).then((res) => {
        console.log(res);
        that.form.photo=res;
        that.photo=that.form.photo
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
      let isCanInsert = await canInsertRow(
        that.appCode,
        tableName,
        row
      );
      console.log(isCanInsert);
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
  computed: {
    appCode() {
      return this.$APIURL.AppCode;
    },
  },
};
</script>

<style scoped lang='scss'>
._user{
    width: 1200px;
    margin: 0 auto;
    padding-top: 50px;
    ._photo{
        img{
            width: 80px;
            height: 80px;
        }
    }
}
</style>