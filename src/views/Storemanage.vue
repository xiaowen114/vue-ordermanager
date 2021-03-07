<template>
  <div class="shopstore">
    <span class="box">店铺管理</span>
    <el-button type="primary" @click="EditBtn">编辑</el-button>
    <el-form :model="ShopForm" ref="ShopForm" :disabled="false">
      <el-form-item label="店铺名称" prop="name">
        <el-input size="small" v-model="ShopForm.name"></el-input>
      </el-form-item>
      <el-form-item label="店铺公告" prop="bulletin">
        <el-input
          type="textarea"
          :rows="4"
          size="small"
          v-model="ShopForm.bulletin"
        ></el-input>
      </el-form-item>
      <el-form-item label="店铺头像" prop="avatar">
        <el-upload
          class="avatar-uploader"
          action="http://127.0.0.1:5000/shop/upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img
            v-if="ShopForm.avatar"
            :src="imgBaseUrl + ShopForm.avatar"
            class="avatar"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="店铺图片" prop="pics">
        <el-upload
          action="http://127.0.0.1:5000/shop/upload"
          list-type="picture-card"
          :file-list="fileList"
          :on-success="handleAvatarSuccess1"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="配送费" prop="deliveryPrice">
        <el-input size="small" v-model="ShopForm.deliveryPrice"></el-input>
      </el-form-item>
      <el-form-item label="配送时间" prop="deliveryTime ">
        <el-input size="small" v-model="ShopForm.deliveryTime"></el-input>
      </el-form-item>
      <el-form-item label="配送描述" prop="description">
        <el-input size="small" v-model="ShopForm.description"></el-input>
      </el-form-item>
      <el-form-item label="店铺评分" prop="score">
        <el-input size="small" v-model="ShopForm.score"></el-input>
      </el-form-item>
      <el-form-item label="销量" prop="sellCount">
        <el-input size="small" v-model="ShopForm.sellCount"></el-input>
      </el-form-item>
      <el-form-item label="活动" prop="supports">
        <el-checkbox-group v-model="ShopForm.supports">
          <el-checkbox label="单人精彩套餐" name="supports"></el-checkbox>
          <el-checkbox
            label="VC无限橙果汁全场8折"
            name="supports"
          ></el-checkbox>
          <el-checkbox label="线下主题活动" name="supports"></el-checkbox>
          <el-checkbox label="单纯品牌曝光" name="supports"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="营业时间" prop="date">
        <el-time-picker
          is-range
          v-model="ShopForm.date"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          placeholder="选择时间范围"
        >
        </el-time-picker>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { GetShop, SetShopDate } from "@/api/apis.js";
export default {
  data() {
    return {
      imgBaseUrl: "http://127.0.0.1:5000/upload/shop/",
      dialogImageUrl: false,
   
      fileList: [],
      ShopForm: {
        supports: [],
        name: "",
        pics: [],
        avatar: "",
        bulletin: "",
        date: []
      }
    };
  },

  methods: {
    EditBtn() {
       SetShopDate(
         this.ShopForm.id,
         this.ShopForm.name,
         this.ShopForm.bulletin,
         this.ShopForm.avatar,
         this.ShopForm.deliveryPrice,
         this.ShopForm.deliveryTime,
         this.ShopForm.description,
         this.ShopForm.score,
         this.ShopForm.sellCount,
         JSON.stringify(this.ShopForm.supports),
         JSON.stringify(this.ShopForm.date),
         JSON.stringify(this.ShopForm.pics)
      
       ).then( res =>{
         console.log(res);
       })
         




      console.log(JSON.stringify(this.ShopForm.date));
    },
    //店铺头像上传
    handleAvatarSuccess(res) {
      this.ShopForm.avatar = res.imgUrl;
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
    },

    //=======
    handleAvatarSuccess1(res) {
      console.log(res);
      this.ShopForm.pics.push(res.imgUrl);
      this.fileList = this.ShopForm.pics.map(item => {
        return {
          url: this.imgBaseUrl + item
        };
      });
       
    }
  },
  created() {
    GetShop().then(res => {
      this.ShopForm = res.data.data;
    });
  }
};
</script>

<style lang="less" scoped>
.shopstore {
  background-color: white;
  margin: 15px 15px 0 15px;
  .box {
    line-height: 40px;
    margin-left: 20px;
  }
  /deep/ .el-form {
    padding: 0 0 0 20px;
    box-sizing: border-box;
    .el-form-item {
      margin: 0;
    }
    /deep/ .el-input {
      width: 200px;
    }
    .el-textarea__inner {
      width: 360px;
    }
    .el-form-item {
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      /deep/.el-upload {
        background-color: #f0f2f5;
        width: 100px;
        height: 100px;
        display: flex;
        justify-content: space-around;
        align-self: center;
        .el-icon-plus {
          display: flex;
          justify-content: space-around;
          align-self: center;
        }
      }
    }
  }
}
</style>