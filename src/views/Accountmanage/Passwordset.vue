<template>
  <div class="passwordset">
    <span class="box">账号列表</span>

    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="原密码" prop="OldPwd">
        <el-input type="password" v-model="ruleForm.OldPwd"></el-input>
      </el-form-item>

      <el-form-item label="新密码" prop="NewPwd">
        <el-input type="password" v-model="ruleForm.NewPwd"></el-input>
      </el-form-item>

      <el-form-item label="新密码" prop="ConfirmPwd">
        <el-input type="password" v-model="ruleForm.ConfirmPwd"></el-input>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="submitForm">提交</el-button>
    <el-button class="btn" @click="resetForm('ruleForm')">重置</el-button>
  </div>
</template>

<script>
import { PassWord  } from "@/utils/reg.js";
import { PwdIsRight,SetPassword } from "@/api/apis.js";
export default {
  data() {
    var validateUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入原密码"));
      } else {
        PwdIsRight(this.ruleForm.OldPwd, localStorage.getItem("id")).then(
          res => {
            if (res.data.code == 0) {
              callback();
            } else {
              callback(new Error("原密码不正确"));
            }
          }
        );
      }
    };
    var validateUsername1 = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入新密码"));
      } else if (!PassWord.test(value)) {
        callback(new Error("密码格式不正确"));
      } else {
        if (this.ruleForm.ConfirmPwd) {
          this.$refs.ruleForm.validateField("ConfirmPwd");
        }
        callback();
      }
    };
    var validateUsername2 = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请再次输入新密码"));
      } else if (value !== this.ruleForm.NewPwd) {
        callback(new Error("两次输入的密码不一样"));
      } else {
        callback();
      }
    };

    return {
      rules: {
        OldPwd: [{ validator: validateUsername, trigger: "blur" }],
        NewPwd: [{ validator: validateUsername1, trigger: "blur" }],
        ConfirmPwd: [{ validator: validateUsername2, trigger: "blur" }]
      },
      ruleForm: {
        OldPwd: "",
        NewPwd: "",
        ConfirmPwd: ""
      }
    };
  },
  methods: {
    //提交
    submitForm() {
      
      this.$refs.ruleForm.validate(res => {
        if (res) {
          
          SetPassword(this.ruleForm.NewPwd, localStorage.getItem("id")).then(res =>{
            if(res.data.code == 0){
              localStorage.removeItem("id")
              localStorage.removeItem("role")
              localStorage.removeItem("token")
              this.$router.push("/login")
            }
          });
        } else {
          return false;
        }
      });
    },
    //重置
    resetForm(name) {
      this.$refs[name].resetFields()
    }
  }
};
</script>

<style lang="less" scoped>
.passwordset {
  background-color: white;
  margin: 15px 15px 0 15px;
  .box {
    line-height: 40px;
    margin-left: 20px;
  }
  /deep/.el-input__inner {
    width: 200px;
  }
  .btn {
    margin-bottom: 40px;
  }
  .el-button{
    margin-left: 40px;
    margin-top: 16px;
  }
}
</style>