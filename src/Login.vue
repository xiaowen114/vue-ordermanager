<template>
  <div class="login">
    <div class="Login_box">
      <h1>系统登录</h1>
      <el-form
        :rules="rules"
        :model="ruleForm"
        status-icon
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <el-form-item prop="account">
          <el-input
            prefix-icon="iconfont icon-yidongduanicon-"
            v-model="ruleForm.account"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            @keydown.native.enter="SubmitBtn"
            @click.native="InputIconChange"
            prefix-icon="iconfont icon-mima"
            :type="boolean ? 'password' : 'username'"
            v-model="ruleForm.password"
            autocomplete="off"
            :suffix-icon="
              boolean
                ? 'iconfont icon-biyan'
                : 'iconfont icon-xianshizhengyanyan'
            "
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" size="middle" @click="SubmitBtn"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { CalculateRoute } from "@/router/router.js";
import { Login } from "@/api/apis.js";
import { UserName, PassWord } from "@/utils/reg.js";
export default {
  data() {
    var validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入账号"));
      } else {
        if (!UserName.test(value)) {
          callback(new Error("账号格式错误"));
        } else {
          callback();
        }
      }
    };
    var validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (!PassWord.test(value)) {
          callback(new Error("密码格式错误"));
        } else {
          callback();
        }
      }
    };
    return {
      rules: {
        account: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }]
      },
      boolean: true,
      ruleForm: {
        account: "",
        password: ""
      }
    };
  },
  methods: {
    // 点击提交验证
    SubmitBtn() {
      this.$refs.ruleForm.validate(res => {
        if (res) {
          Login({
            account: this.ruleForm.account,
            password: this.ruleForm.password
          }).then(async res => {
            console.log(res);
            if (res.data.code == 0) {
              this.$message({
                showClose: true,
                message: "恭喜你，登录成功",
                type: "success"
              });
              localStorage.role = res.data.role;
              localStorage.setItem("token", res.data.token);
              localStorage.setItem("id", res.data.id);
               CalculateRoute()
  
              this.$router.push("/");
              console.log(this.$router)
            }
          });
        } else {
          return false;
        }
      });
    },
    InputIconChange: function(e) {
      if (e.target.className.includes("biyan")) {
        this.boolean = !this.boolean;
      } else if (e.target.className.includes("icon-xianshizhengyanyan")) {
        this.boolean = !this.boolean;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.login {
  background-color: #2d3a4b;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .Login_box {
    width: 350px;
    height: 250px;
    h1 {
      margin-bottom: 15px;
      text-align: center;
      color: #ebebeb;
      font-size: 20px;
      line-height: 40px;
    }
    /deep/.el-input__prefix {
      display: flex;
      justify-content: center;
      align-self: center;
    }
    /deep/.el-input__inner {
      background-color: #283443;
      line-height: 40px;
      color: white;
    }
    .el-button {
      width: 100%;
    }
  }
}
</style>