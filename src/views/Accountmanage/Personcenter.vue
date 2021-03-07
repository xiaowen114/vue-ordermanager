<template>
  <div class="personCenter">
    <span class="box">个人中心</span>
    <span class="box">管理员ID:{{ id }}</span>
    <span class="box">账号:{{ account }}</span>
    <span class="box">用户组{{ userGroup }}</span>
    <span class="box">创建时间:{{ date }}</span>
    <p class="box">
      <span>管理员头像:</span>
      <el-upload
        class="avatar-uploader"
        action="http://127.0.0.1:5000/users/avatar_upload"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        :data="{ id }"
      >
        <img v-if="imageUrl" :src="imgbaseUrl + imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </p>
  </div>
</template>

<script>
import { GetPersonal } from "@/api/apis.js";
export default {
  data() {
    return {
      imgbaseUrl: "http://127.0.0.1:5000/upload/imgs/acc_img/",
      imageUrl: "",
      id: "",
      account: "",
      userGroup: "",
      date: "",
      id: ""
    };
  },
  methods: {
    //成功时候的回调
    handleAvatarSuccess(res) {
      console.log(res);
      let { code, msg, imgUrl } = res;

      if (code == 0) {
        this.imageUrl = imgUrl;
        this.$store.state.imgBaseUrl = this.imgbaseUrl + imgUrl;
      }
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  },
  created() {
    this.id = localStorage.getItem("id");
    console.log(this);
    GetPersonal(Number(localStorage.getItem("id"))).then(res => {
      console.log(res);
      let data = res.data.accountInfo;
      this.id = data.id;
      this.account = data.account;
      this.userGroup = data.userGroup;
      this.date = data.ctime;
    });
  }
};
</script>

<style lang="less" scoped>
.personCenter {
  background-color: white;
  margin: 15px 15px 0 15px;
  display: flex;
  flex-direction: column;
  .box {
    line-height: 40px;
    margin-left: 20px;
  }
  /deep/.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  /deep/.el-icon-plus {
    width: 100px;
    height: 100px;
    background-color: #f1f1f1;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  p {
    display: flex;
    align-items: center;
    span {
      margin-right: 20px;
    }
    margin-bottom: 20px;
  }
}
</style>