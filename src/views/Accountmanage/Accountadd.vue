<template>
  <div class="addacc">
    <span class="box">账号列表</span>
    <el-form :model="addform" :rules="rules" ref="addform">
      <el-form-item label="账号" prop="account">
        <el-input v-model="addform.account" size="small"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="addform.password"
          size="small"
        ></el-input>
      </el-form-item>
      <el-form-item prop="userGroup" label="用户组">
        <el-select
          v-model="addform.userGroup"
          placeholder="请选择"
          size="small"
        >
          <el-option value="超级管理员">超级管理员</el-option>
          <el-option value="普通管理员">普通管理员</el-option>
        </el-select>
      </el-form-item>

      <el-button type="primary" size="small" @click="SubmitBtn">提交</el-button>
      <el-button size="small" @click="RestBtn">重置</el-button>
    </el-form>
  </div>
</template>

<script>
import { UserName, PassWord } from "@/utils/reg.js";
import { AddAccount } from "@/api/apis.js";
export default {
  data() {
    var validateAccount = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入账号"));
      } else if (!UserName.test(value)) {
        callback(new Error("账号格式错误"));
      } else {
        callback();
      }
    };
    var validatePassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入密码"));
      } else if (!PassWord.test(value)) {
        callback(new Error("密码格式错误"));
      } else {
        callback();
      }
    };
    return {
      rules: {
        account: [{ validator: validateAccount, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }]
      },
      addform: {
        account: "",
        password: "",
        userGroup: ""
      }
    };
  },
  methods: {
    SubmitBtn() {
      this.$refs.addform.validate(res => {
        if (res) {
          this.$confirm("你确定要添加账号吗, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              AddAccount(
                this.addform.account,
                this.addform.password,
                this.addform.userGroup
              ).then(res => {
                if (res.data.code == 0) {
                  this.$message({
                    type: "success",
                    message: "添加成功!"
                  });
                  this.$router.push("/account/accountlist")
                }
              });
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "添加失败"
              });
            });
        }
      });
    },
    RestBtn(){
        this.addform.account ="",
        this.addform.password ="",
        this.addform.userGroup =""
    }
  }
};
</script>

<style lang="less" scoped>
.addacc {
  background-color: white;
  margin: 15px 15px 0 15px;
  .box {
    line-height: 40px;
    margin-left: 20px;
  }
  /deep/ .el-form {
    margin-top: 10px;
    margin-left: 20px;
    /deep/ .el-input {
      width: 200px;
    }
  }
  .el-button {
    margin-bottom: 20px;
  }
}
</style>